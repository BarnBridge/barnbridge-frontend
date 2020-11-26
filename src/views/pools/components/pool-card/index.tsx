import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';

import InfoTooltip from 'components/info-tooltip';
import IconsSet from 'components/icons-set';

import { formatBigValue, formatBONDValue, formatUSDValue, getPoolIcons, getPoolNames, PoolTypes } from 'web3/utils';
import { useWallet } from 'wallets/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';

import s from './styles.module.css';

export type PoolCardProps = {
  stableToken?: boolean;
  unilpToken?: boolean;
  bondToken?: boolean;
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
  const { yf, yfLP, yfBOND, staking, aggregated } = useWeb3Contracts();

  const { stableToken = false, unilpToken = false, bondToken = false } = props;

  const icons = React.useMemo<React.ReactNode[]>(() => {
    if (stableToken) {
      return getPoolIcons(PoolTypes.STABLE);
    } else if (unilpToken) {
      return getPoolIcons(PoolTypes.UNILP);
    } else if (bondToken) {
      return getPoolIcons(PoolTypes.BOND);
    }

    return [];
  }, [stableToken, unilpToken, bondToken]);

  const nameLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return getPoolNames(PoolTypes.STABLE).join('/');
    } else if (unilpToken) {
      return getPoolNames(PoolTypes.UNILP).join('/');
    } else if (bondToken) {
      return getPoolNames(PoolTypes.BOND).join('/');
    }

    return '-';
  }, [stableToken, unilpToken, bondToken]);

  const epochLabel = React.useMemo<string>(() => {
    if (stableToken) {
      return `EPOCH ${yf.currentEpoch ?? '-'}/${yf.totalEpochs ?? '-'}`;
    } else if (unilpToken) {
      return `EPOCH ${yfLP.currentEpoch ?? '-'}/${yfLP.totalEpochs ?? '-'}`;
    } else if (bondToken) {
      return `EPOCH ${yfBOND.currentEpoch ?? '-'}/${yfBOND.totalEpochs ?? '-'}`;
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND]);

  const isStakingEnabled = React.useMemo<boolean>(() => {
    if (unilpToken) {
      return yfLP.currentEpoch! > 0;
    }

    return true;
  }, [unilpToken, yfLP]);

  const epochReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBONDValue(yf.epochReward)} BOND`;
    } else if (unilpToken) {
      return `${formatBONDValue(yfLP.epochReward)} BOND`;
    } else if (bondToken) {
      return `${formatBONDValue(yfBOND.epochReward)} BOND`;
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND]);

  const potentialReward = React.useMemo<string>(() => {
    if (stableToken) {
      return `${formatBONDValue(yf.potentialReward)} BOND`;
    } else if (unilpToken) {
      return `${formatBONDValue(yfLP.potentialReward)} BOND`;
    } else if (bondToken) {
      return `${formatBONDValue(yfBOND.potentialReward)} BOND`;
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND]);

  const balance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(aggregated.yfStakedValue);
    } else if (unilpToken) {
      return formatUSDValue(aggregated.yfLPStakedValue);
    } else if (bondToken) {
      return formatUSDValue(aggregated.yfBONDStakedValue);
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, aggregated]);

  const effectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(aggregated.yfEffectiveStakedValue);
    } else if (unilpToken) {
      return formatUSDValue(aggregated.yfLPEffectiveStakedValue);
    } else if (bondToken) {
      return formatUSDValue(aggregated.yfBONDEffectiveStakedValue);
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, aggregated]);

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
    } else if (unilpToken) {
      if (yfLP.nextPoolSize) {
        const uniShare = staking.uniswap.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yfLP.nextPoolSize)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            value: formatBigValue(yfLP.nextPoolSize, UNISWAPTokenMeta.decimals),
            share: uniShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    } else if (bondToken) {
      if (yfBOND.nextPoolSize) {
        const bondShare = staking.bond.nextEpochPoolSize
          ?.multipliedBy(100)
          .div(yfBOND.nextPoolSize)
          .toNumber();

        if (bondShare) {
          shares.push({
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            value: formatBigValue(yfBOND.nextPoolSize, BONDTokenMeta.decimals),
            share: bondShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    }

    return shares;
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND, staking]);

  const myBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(yf.nextEpochStake);
    } else if (unilpToken && yfLP.nextEpochStake) {
      return formatUSDValue(aggregated.myLPStakedValue);
    } else if (bondToken && yfBOND.nextEpochStake) {
      return formatUSDValue(aggregated.myBONDStakedValue);
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND, aggregated]);

  const myEffectiveBalance = React.useMemo<string | React.ReactNode>(() => {
    if (stableToken) {
      return formatUSDValue(yf.epochStake);
    } else if (unilpToken && yfLP.epochStake) {
      return formatUSDValue(aggregated.myLPEffectiveStakedValue);
    } else if (bondToken && yfBOND.epochStake) {
      return formatUSDValue(aggregated.myBondEffectiveStakedValue);
    }

    return '-';
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND, aggregated]);

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
    } else if (unilpToken) {
      if (yfLP.nextEpochStake) {
        const uniShare = staking.uniswap.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yfLP.nextEpochStake)
          .toNumber();

        if (uniShare) {
          shares.push({
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            value: formatBigValue(yfLP.nextEpochStake, UNISWAPTokenMeta.decimals),
            share: uniShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    } else if (bondToken) {
      if (yfBOND.nextEpochStake) {
        const bondShare = staking.bond.nextEpochUserBalance
          ?.multipliedBy(100)
          .div(yfBOND.nextEpochStake)
          .toNumber();

        if (bondShare) {
          shares.push({
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            value: formatBigValue(yfBOND.nextEpochStake, BONDTokenMeta.decimals),
            share: bondShare,
            color: 'var(--text-color-3)',
          });
        }
      }
    }

    return shares;
  }, [stableToken, unilpToken, bondToken, yf, yfLP, yfBOND, staking]);

  function handleStaking() {
    if (stableToken) {
      history.push('/pools/stable');
    } else if (unilpToken) {
      history.push('/pools/unilp');
    } else if (bondToken) {
      history.push('/pools/bond');
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
            onClick={handleStaking}>Staking</Antd.Button>
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
