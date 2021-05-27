import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { formatPercent, formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { BondToken } from 'components/providers/known-tokens-provider';
import RewardPoolProvider, { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import Stake from 'modules/smart-yield/views/pool-view/stake';
import Statistics from 'modules/smart-yield/views/pool-view/statistics';
import Transactions from 'modules/smart-yield/views/pool-view/transactions';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const PoolViewInner: FC = () => {
  const walletCtx = useWallet();
  const rewardPoolCtx = useRewardPool();

  const { market: poolMarket, uToken, pool } = rewardPoolCtx;
  const rewardTokens = pool ? Array.from(pool.rewardTokens.values()) : [];

  const [enabling, setEnabling] = useState(false);

  const apr = BigNumber.ZERO;
  // const apr = React.useMemo(() => { /// ???
  //   if (!rewardPool) {
  //     return undefined;
  //   }
  //
  //   const { poolSize, dailyReward } = rewardPool.pool;
  //
  //   if (!poolSize || !dailyReward) {
  //     return undefined;
  //   }
  //
  //   const bondPrice = BondToken.price ?? 1;
  //   const jTokenPrice = rewardPool.poolToken.price ?? 1;
  //
  //   const yearlyReward = dailyReward
  //     .dividedBy(10 ** BondToken.decimals)
  //     .multipliedBy(bondPrice)
  //     .multipliedBy(365);
  //   const poolBalance = poolSize
  //     .dividedBy(10 ** (rewardPool.poolToken.decimals ?? 0))
  //     .multipliedBy(jTokenPrice)
  //     .multipliedBy(1);
  //
  //   if (poolBalance.isEqualTo(ZERO_BIG_NUMBER)) {
  //     return ZERO_BIG_NUMBER;
  //   }
  //
  //   return yearlyReward.dividedBy(poolBalance);
  // }, [rewardPool?.pool.poolSize, rewardPool?.pool.dailyReward, BondToken.price]);

  console.log(pool);
  if (!pool) {
    return null;
  }

  const { rewardPool, smartYield } = pool;

  async function handleSwitchChange(value: boolean) {
    setEnabling(true);

    try {
      await smartYield.approve(rewardPool.address, value);
    } catch {}

    setEnabling(false);
  }

  return (
    <div className="container-limit">
      <div className="mb-16">
        <Link to="/smart-yield/pools" className="button-text" style={{ display: 'inline-flex' }}>
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-32">
        <IconBubble
          name={uToken?.icon}
          bubbleName="static/token-bond"
          secondBubbleName={poolMarket?.icon.active}
          width={36}
          height={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold" color="primary">
          {smartYield.symbol}
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Pool balance</dt>
            <dd>
              <IconBubble
                name={uToken?.icon}
                bubbleName="static/token-bond"
                secondBubbleName={poolMarket?.icon.active}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(rewardPool.poolSize, {
                scale: smartYield.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APR</dt>
            <dd>{formatPercent(apr) ?? '-'}</dd>
          </div>
          {rewardTokens.map(rewardToken => (
            <React.Fragment key={rewardToken.address}>
              <div className={s.headerTermRow}>
                <dt>{rewardToken.symbol} daily rewards</dt>
                <dd>
                  <Icon name={rewardToken.icon!} className="mr-8" width="16" height="16" />
                  {formatToken(rewardPool.getDailyRewardFor(rewardToken.address), {
                    scale: rewardToken.decimals,
                  }) ?? '-'}
                </dd>
              </div>
              <div className={s.headerTermRow}>
                <dt>{rewardToken.symbol} rewards left</dt>
                <dd>
                  <Icon name={rewardToken.icon!} className="mr-8" width="16" height="16" />
                  {formatToken(rewardPool.getRewardLeftFor(rewardToken.address), {
                    scale: rewardToken.decimals,
                  }) ?? '-'}
                </dd>
              </div>
            </React.Fragment>
          ))}
        </dl>
      </div>
      {walletCtx.isActive && (
        <div className={s.stakeStatisticsContainer}>
          <Stake className={s.stake} />
          <Statistics className={s.statistics} />
        </div>
      )}
      <Transactions />
    </div>
  );
};

const PoolView: FC = () => {
  return (
    <RewardPoolProvider>
      <PoolViewInner />
    </RewardPoolProvider>
  );
};

export default PoolView;
