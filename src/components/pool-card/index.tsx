import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import InfoTooltip from 'components/info-tooltip';
import IconsSet from 'components/icons-set';

import { formatBigValue } from 'web3/utils';
import { useWeb3 } from 'web3/provider';
import { LP_ICON_SET, STABLE_ICON_SET, useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNIIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

export type PoolCardProps = {
  stableToken?: boolean;
  lpToken?: boolean;
};

type TokenBalanceShare = {
  icon: React.ReactNode;
  name: string;
  value: string;
  share: number;
  color: string;
};

const PoolCard: React.FunctionComponent<PoolCardProps> = props => {
  const history = useHistory();
  const web3 = useWeb3();
  const { yf, yflp, staking, aggregated } = useWeb3Contracts();

  const { stableToken = false, lpToken = false } = props;

  const icons = React.useMemo<React.ComponentType<any>[]>(() => {
    if (stableToken) {
      return STABLE_ICON_SET;
    } else if (lpToken) {
      return LP_ICON_SET;
    }

    return [];
  }, [stableToken, lpToken]);

  const nameLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return 'USDC/DAI/sUSD';
    } else if (lpToken) {
      return 'USDC_BOND_UNI_LP';
    }

    return '-';
  }, [stableToken, lpToken]);

  const epochLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return `EPOCH ${yf.currentEpoch ?? '-'}/${yf.totalEpochs ?? '-'}`;
    } else if (lpToken) {
      return `EPOCH ${yflp.currentEpoch ?? '-'}/${yflp.totalEpochs ?? '-'}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const isStakingEnabled = React.useMemo<boolean>(() => {
    if (lpToken) {
      return yflp.currentEpoch! > 0;
    }

    return true;
  }, [lpToken, yflp]);

  const epochReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBigValue(yf.epochReward)} BOND`;
    } else if (lpToken) {
      return `${formatBigValue(yflp.epochReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const potentialReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBigValue(yf.potentialReward)} BOND`;
    } else if (lpToken) {
      return `${formatBigValue(yflp.potentialReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const balance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(yf.nextPoolSize, 2)}`;
    } else if (lpToken && yflp.nextPoolSize) {
      return `$ ${formatBigValue(aggregated.lpStakedValue, 2)}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const effectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(yf.poolSize, 2)}`;
    } else if (lpToken && yflp.poolSize) {
      return `$ ${formatBigValue(aggregated.lpEffectiveStakedValue, 2)}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const balanceShares = React.useMemo<TokenBalanceShare[]>(() => {
    const shares: TokenBalanceShare[] = [];

    if (stableToken) {
      if (yf.nextPoolSize) {
        const usdcShare = staking.usdc.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yf.nextPoolSize)
          .toNumber();

        if (usdcShare) {
          shares.push({
            icon: <USDCIcon />,
            name: 'USDC',
            value: `$ ${formatBigValue(staking.usdc.nextEpochPoolSize, 2)}`,
            share: usdcShare,
            color: '#4f6ae6',
          });
        }

        const daiShare = staking.dai.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yf.nextPoolSize)
          .toNumber();

        if (daiShare) {
          shares.push({
            icon: <DAIIcon />,
            name: 'DAI',
            value: `$ ${formatBigValue(staking.dai.nextEpochPoolSize, 2)}`,
            share: daiShare,
            color: '#ffd160',
          });
        }

        const susdShare = staking.susd.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yf.nextPoolSize)
          .toNumber() ?? 0;

        if (susdShare) {
          shares.push({
            icon: <SUSDIcon />,
            name: 'SUSD',
            value: `$ ${formatBigValue(staking.susd.nextEpochPoolSize)}`,
            share: susdShare,
            color: '#1e1a31',
          });
        }
      }
    } else if (lpToken) {
      if (yflp.nextPoolSize) {
        const uniShare = staking.uniswap_v2.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yflp.nextPoolSize)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: <UNIIcon />,
            name: 'USDC_BOND_UNI_LP',
            value: formatBigValue(yflp.nextPoolSize, 18),
            share: uniShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    }

    return shares;
  }, [stableToken, lpToken, yf, yflp, staking]);

  const myBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(yf.nextEpochStake, 2)}`;
    } else if (lpToken && yflp.nextEpochStake) {
      return `$ ${formatBigValue(aggregated.mylpStakedValue, 2)}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const myEffectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return `$ ${formatBigValue(yf.epochStake, 2)}`;
    } else if (lpToken && yflp.epochStake) {
      return `$ ${formatBigValue(aggregated.mylpEffectiveStakedValue, 2)}`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const myBalanceShares = React.useMemo<TokenBalanceShare[]>(() => {
    const shares: TokenBalanceShare[] = [];

    if (stableToken) {
      if (yf.nextEpochStake) {
        const usdcShare = staking.usdc.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yf.nextEpochStake)
          .toNumber();

        if (usdcShare) {
          shares.push({
            icon: <USDCIcon />,
            name: 'USDC',
            value: `$ ${formatBigValue(staking.usdc.nextEpochUserBalance, 2)}`,
            share: usdcShare,
            color: '#4f6ae6',
          });
        }

        const daiShare = staking.dai.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yf.nextEpochStake)
          .toNumber();

        if (daiShare) {
          shares.push({
            icon: <DAIIcon />,
            name: 'DAI',
            value: `$ ${formatBigValue(staking.dai.nextEpochUserBalance, 2)}`,
            share: daiShare,
            color: '#ffd160',
          });
        }

        const susdShare = staking.susd.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yf.nextEpochStake)
          .toNumber() ?? 0;

        if (susdShare) {
          shares.push({
            icon: <SUSDIcon />,
            name: 'SUSD',
            value: `$ ${formatBigValue(staking.susd.nextEpochUserBalance, 2)}`,
            share: susdShare,
            color: '#1e1a31',
          });
        }
      }
    } else if (lpToken) {
      if (yflp.nextEpochStake) {
        const uniShare = staking.uniswap_v2.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yflp.nextEpochStake)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: <UNIIcon />,
            name: 'USDC_BOND_UNI_LP',
            value: formatBigValue(yflp.nextEpochStake, 18),
            share: uniShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    }

    return shares;
  }, [stableToken, lpToken, yf, yflp, staking]);

  function handleStacking() {
    if (stableToken) {
      history.push('/pools/stable-token');
    } else if (lpToken) {
      history.push('/pools/lp-token');
    }
  }

  return (
    <div className={s.component}>
      <div className={s.row1}>
        <IconsSet className={s.pool_avatars} icons={icons} />
        <div className={s.pool_info}>
          <div className={s.pool_label}>{nameLabel}</div>
          <div className={s.pool_epoch}>{epochLabel}</div>
        </div>
        {web3.isActive && (
          <Antd.Button
            type="primary"
            className={s.stakingBtn}
            disabled={!isStakingEnabled}
            onClick={handleStacking}>Staking</Antd.Button>
        )}
      </div>

      <div className={s.row2}>
        <div className={s.col1}>
          <div className={s.row_label}>REWARD</div>
          <div className={s.row_value}>
            <span>{epochReward}</span>
          </div>
        </div>
        {web3.isActive && (
          <div className={s.col2}>
            <div className={s.row_label}>MY POTENTIAL REWARD</div>
            <div className={s.row_value}>
              <span>{potentialReward}</span>
            </div>
          </div>
        )}
      </div>

      <div className={s.row3}>
        <div className={s.row_label}>
          <span>POOL BALANCE</span>
          <InfoTooltip title={
            <span>
              This number shows the total staked balance of the pool, and the effective balance of the pool.
              <br /><br />
              When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore pool balance and effective pool balance will differ in most cases.
            </span>
          } />
        </div>
        <div className={s.row_value}>{balance}</div>
        <div className={s.row_value_2}>{effectiveBalance} effective balance</div>
        <div className={s.pool_stak_bar}>
          {balanceShares.map((tokenShare, index) => (
            <Antd.Tooltip key={index} placement="top" title={(
              <div className={s.balance_tooltip}>
                <div>{tokenShare.icon}</div>
                <span>{tokenShare.name}:</span>
                <span>{tokenShare.value}</span>
              </div>
            )}>
              <div style={{ width: `${tokenShare.share}%`, backgroundColor: tokenShare.color }} />
            </Antd.Tooltip>
          ))}
        </div>
      </div>

      {web3.isActive && (
        <div className={s.row4}>
          <div className={s.row_label}>
            <span>MY POOL BALANCE</span>
            <InfoTooltip title={
              <span>
              This number shows your total staked balance in the pool, and your effective staked balance in the pool.
              <br /><br />
              When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore your pool balance and your effective pool balance will differ in most cases.
            </span>
            } />
          </div>
          <div className={s.row_value}>{myBalance}</div>
          <div className={s.row_value_2}>{myEffectiveBalance} effective balance</div>
          <div className={s.pool_stak_bar}>
            {myBalanceShares.map((tokenShare, index) => (
              <Antd.Tooltip key={index} placement="top" title={(
                <div className={s.balance_tooltip}>
                  <div>{tokenShare.icon}</div>
                  <span>{tokenShare.name}:</span>
                  <span>{tokenShare.value}</span>
                </div>
              )}>
                <div style={{ width: `${tokenShare.share}%`, backgroundColor: tokenShare.color }} />
              </Antd.Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PoolCard;
