import React from 'react';
import { Link } from 'react-router-dom';
import AntdSwitch from 'antd/lib/switch';
import { formatBigValue, formatPercent, getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import Stake from 'modules/smart-yield/views/pool-view/stake';
import Statistics from 'modules/smart-yield/views/pool-view/statistics';
import Transactions from 'modules/smart-yield/views/pool-view/transactions';

import s from './s.module.scss';

const PoolView: React.FC = () => {
  const { pool } = useRewardPool();

  if (!pool) {
    return null;
  }

  function handleSwitchChange(value: boolean) {
    pool?.poolToken.approve(value, pool?.poolAddress);
  }

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
          name="usdc-token"
          bubbleName="bond-circle-token"
          secondBubbleName="compound"
          width={36}
          height={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold" color="primary">
          {pool?.poolToken.symbol}
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Pool balance</dt>
            <dd>{formatBigValue(getHumanValue(pool.pool.poolSize, pool.poolToken.decimals)?.multipliedBy(1))}</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APR</dt>
            <dd>{formatPercent(getHumanValue(pool.pool.apr, pool.rewardToken.decimals))}</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Daily rewards</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatBigValue(getHumanValue(pool.pool.dailyReward, pool.rewardToken.decimals))}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Rewards left</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatBigValue(getHumanValue(pool.pool.rewardLeft, pool.rewardToken.decimals))}
            </dd>
          </div>
          <div>
            <dt>Enable Token</dt>
            <dd>
              <AntdSwitch
                style={{ justifySelf: 'flex-start' }}
                checked={pool.poolToken.isAllowed}
                // loading={state.enabled === undefined || state.enabling}
                onChange={handleSwitchChange}
              />
            </dd>
          </div>
        </dl>
      </div>
      <div className={s.stakeStatisticsContainer}>
        <Stake className={s.stake} />
        <Statistics className={s.statistics} />
      </div>
      <Transactions />
    </>
  );
};

export default PoolView;
