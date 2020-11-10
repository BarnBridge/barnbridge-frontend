import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import InfoTooltip from 'components/info-tooltip';
import IconsSet from 'components/icons-set';

import {
  formatBigValue,
  formatBONDValue,
  formatUSDValue,
  LP_TOKEN_ICONS,
  LP_TOKEN_NAMES,
  STABLE_TOKEN_ICONS,
  STABLE_TOKEN_NAMES,
} from 'web3/utils';
import { useWallet } from 'web3/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';

import s from 'views/pools/components/pool-card/styles.module.css';

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
  const wallet = useWallet();
  const { yf, yflp, staking, aggregated } = useWeb3Contracts();

  const { stableToken = false, lpToken = false } = props;

  const icons = React.useMemo<React.ReactNode[]>(() => {
    if (stableToken) {
      return STABLE_TOKEN_ICONS;
    } else if (lpToken) {
      return LP_TOKEN_ICONS;
    }

    return [];
  }, [stableToken, lpToken]);

  const nameLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return STABLE_TOKEN_NAMES.join('/');
    } else if (lpToken) {
      return LP_TOKEN_NAMES.join('/');
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
      return `${formatBONDValue(yf.epochReward)} BOND`;
    } else if (lpToken) {
      return `${formatBONDValue(yflp.epochReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const potentialReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBONDValue(yf.potentialReward)} BOND`;
    } else if (lpToken) {
      return `${formatBONDValue(yflp.potentialReward)} BOND`;
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp]);

  const balance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(yf.nextPoolSize);
    } else if (lpToken && yflp.nextPoolSize) {
      return formatUSDValue(aggregated.lpStakedValue);
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const effectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(yf.poolSize);
    } else if (lpToken && yflp.poolSize) {
      return formatUSDValue(aggregated.lpEffectiveStakedValue);
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
            icon: USDCTokenMeta.icon,
            name: USDCTokenMeta.name,
            value: formatUSDValue(staking.usdc.nextEpochPoolSize),
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
            icon: DAITokenMeta.icon,
            name: DAITokenMeta.name,
            value: formatUSDValue(staking.dai.nextEpochPoolSize),
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
            icon: SUSDTokenMeta.icon,
            name: SUSDTokenMeta.name,
            value: formatUSDValue(staking.susd.nextEpochPoolSize),
            share: susdShare,
            color: '#1e1a31',
          });
        }
      }
    } else if (lpToken) {
      if (yflp.nextPoolSize) {
        const uniShare = staking.uniswap.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yflp.nextPoolSize)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            value: formatBigValue(yflp.nextPoolSize, UNISWAPTokenMeta.decimals),
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
      return formatUSDValue(yf.nextEpochStake);
    } else if (lpToken && yflp.nextEpochStake) {
      return formatUSDValue(aggregated.mylpStakedValue);
    }

    return '-';
  }, [stableToken, lpToken, yf, yflp, aggregated]);

  const myEffectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(yf.epochStake);
    } else if (lpToken && yflp.epochStake) {
      return formatUSDValue(aggregated.mylpEffectiveStakedValue);
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
            icon: USDCTokenMeta.icon,
            name: USDCTokenMeta.name,
            value: formatUSDValue(staking.usdc.nextEpochUserBalance),
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
            icon: DAITokenMeta.icon,
            name: DAITokenMeta.name,
            value: formatUSDValue(staking.dai.nextEpochUserBalance),
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
            icon: SUSDTokenMeta.icon,
            name: SUSDTokenMeta.name,
            value: formatUSDValue(staking.susd.nextEpochUserBalance),
            share: susdShare,
            color: '#1e1a31',
          });
        }
      }
    } else if (lpToken) {
      if (yflp.nextEpochStake) {
        const uniShare = staking.uniswap.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yflp.nextEpochStake)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            value: formatBigValue(yflp.nextEpochStake, UNISWAPTokenMeta.decimals),
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
        {wallet.isActive && (
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
        {wallet.isActive && (
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

      {wallet.isActive && (
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
