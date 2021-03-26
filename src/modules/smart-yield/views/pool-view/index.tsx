import React from 'react';
import { Link } from 'react-router-dom';
import AntdSwitch from 'antd/lib/switch';
import { formatBigValue, formatPercent, getHumanValue } from 'web3/utils';

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
  const { rewardPool } = useRewardPool();

  const [enabling, setEnabling] = React.useState(false);

  if (!rewardPool) {
    return null;
  }

  async function handleSwitchChange(value: boolean) {
    setEnabling(true);

    try {
      await rewardPool?.poolToken.approve(value, rewardPool?.poolAddress);
    } catch {}

    setEnabling(false);
  }

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  return (
    <>
      <div className="mb-16">
        <Link to="/smart-yield/pools" className="button-text" style={{ display: 'inline-flex' }}>
          <Icon name="left-arrow" width={14} height={12} className="mr-12" color="inherit" />
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
              {formatBigValue(getHumanValue(rewardPool.pool.poolSize, rewardPool.poolToken.decimals)?.multipliedBy(1))}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APR</dt>
            <dd>{formatPercent(getHumanValue(rewardPool.pool.apr, rewardPool.rewardToken.decimals))}</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Daily rewards</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatBigValue(getHumanValue(rewardPool.pool.dailyReward, rewardPool.rewardToken.decimals))}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Rewards left</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatBigValue(getHumanValue(rewardPool.pool.rewardLeft, rewardPool.rewardToken.decimals))}
            </dd>
          </div>
          {wallet.isActive && (
            <div>
              <dt>Enable Token</dt>
              <dd>
                <AntdSwitch
                  style={{ justifySelf: 'flex-start' }}
                  checked={rewardPool.poolToken.isAllowed}
                  loading={rewardPool.poolToken.isAllowed === undefined || enabling}
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
    </>
  );
};

export default PoolView;
