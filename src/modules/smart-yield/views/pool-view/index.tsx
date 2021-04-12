import React from 'react';
import { Link } from 'react-router-dom';
import AntdSwitch from 'antd/lib/switch';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { ZERO_BIG_NUMBER, formatPercent, formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { Markets, Pools } from 'modules/smart-yield/api';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import Stake from 'modules/smart-yield/views/pool-view/stake';
import Statistics from 'modules/smart-yield/views/pool-view/statistics';
import Transactions from 'modules/smart-yield/views/pool-view/transactions';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const PoolView: React.FC = () => {
  const wallet = useWallet();
  const web3c = useWeb3Contracts();
  const { rewardPool } = useRewardPool();

  const [enabling, setEnabling] = React.useState(false);

  const apr = React.useMemo(() => {
    if (!rewardPool) {
      return undefined;
    }

    const { poolSize, dailyReward } = rewardPool.pool;

    if (!poolSize || !dailyReward) {
      return undefined;
    }

    const bondPrice = web3c.uniswap.bondPrice ?? 1;
    const jTokenPrice = rewardPool.poolToken.price ?? 1;

    const yearlyReward = dailyReward
      .dividedBy(10 ** BONDTokenMeta.decimals)
      .multipliedBy(bondPrice)
      .multipliedBy(365);
    const poolBalance = poolSize
      .dividedBy(10 ** (rewardPool.poolToken.decimals ?? 0))
      .multipliedBy(jTokenPrice)
      .multipliedBy(1);

    if (poolBalance.isEqualTo(ZERO_BIG_NUMBER)) {
      return ZERO_BIG_NUMBER;
    }

    return yearlyReward.dividedBy(poolBalance);
  }, [rewardPool?.pool.poolSize, rewardPool?.pool.dailyReward]);

  if (!rewardPool) {
    return null;
  }

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  async function handleSwitchChange(value: boolean) {
    setEnabling(true);

    try {
      await rewardPool?.poolToken.approve(value, rewardPool?.poolAddress);
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
          name={meta?.icon}
          bubbleName="bond-circle-token"
          secondBubbleName={market?.icon}
          width={36}
          height={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold" color="primary">
          {rewardPool?.poolToken.symbol}
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Pool balance</dt>
            <dd>
              <IconBubble
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(rewardPool.pool.poolSize, {
                scale: rewardPool.poolToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APR</dt>
            <dd>{formatPercent(apr) ?? '-'}</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Daily rewards</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatToken(rewardPool.pool.dailyReward, {
                scale: rewardPool.rewardToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Rewards left</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatToken(rewardPool.pool.rewardLeft, {
                scale: rewardPool.rewardToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          {wallet.isActive && (
            <div className={s.headerTermRow}>
              <dt>Enable Token</dt>
              <dd>
                <AntdSwitch
                  style={{ justifySelf: 'flex-start' }}
                  checked={rewardPool.poolToken.isAllowedOf(rewardPool.poolAddress)}
                  loading={rewardPool.poolToken.isAllowedOf(rewardPool.poolAddress) === undefined || enabling}
                  onChange={handleSwitchChange}
                />
              </dd>
            </div>
          )}
        </dl>
      </div>
      {wallet.isActive && (
        <div className={s.stakeStatisticsContainer}>
          <Stake className={s.stake} />
          <Statistics className={s.statistics} />
        </div>
      )}
      <Transactions />
    </div>
  );
};

export default PoolView;
