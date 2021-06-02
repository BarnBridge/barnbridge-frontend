import { useEffect, useState } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { formatUSD } from 'web3/utils';

import { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import config from 'config';

import { PairsTable } from './table';

import { PoolType } from 'modules/smart-exposure/utils';
import { getRelativeTime } from 'utils';

import s from './s.module.scss';

const PoolsView: React.FC = () => {
  const [pools, setPools] = useState<PoolType[]>([]);
  const [activePool, setActivePool] = useState<PoolType>();

  useEffect(() => {
    const url = new URL(`/api/smartexposure/pools`, config.api.baseUrl);

    fetch(url.toString())
      .then(result => result.json())
      .then(result => {
        setPools(result.data);
        setActivePool(result.data[0]);
      });
  }, []);

  return (
    <>
      <div className="tab-cards mb-64">
        {pools.map(pool => {
          const tokenA = getTokenBySymbol(pool.tokenA.symbol);
          const tokenB = getTokenBySymbol(pool.tokenB.symbol);

          return (
            <button
              key={pool.poolName}
              type="button"
              className={cn('tab-card', activePool === pool && 'active')}
              disabled={false}
              // style={{ color: !pool.active ? 'red' : '' }}
              onClick={() => setActivePool(pool)}>
              <IconsPair
                icon1={tokenA?.icon as IconNames}
                icon2={tokenB?.icon as IconNames}
                size={40}
                className="mr-16"
              />
              <div>
                <Text type="p1" weight="semibold" color="primary">
                  {pool.poolName}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  Pools
                </Text>
              </div>
            </button>
          );
        })}
      </div>
      {activePool ? (
        <div className={cn(s.stats, 'mb-40')}>
          <div>
            <div className="text-p1 fw-semibold color-secondary">{activePool.poolName} total liquidity</div>
            <div className="text-h2 fw-bold">{formatUSD(activePool.state.poolLiquidity)}</div>
          </div>
          <div>
            <div className="text-sm fw-semibold color-secondary">Rebalancing strategies</div>
            <div className="flex align-center text-p1 fw-semibold">
              {getRelativeTime(activePool.state.rebalancingInterval)}
              <span className="middle-dot ph-16 color-border" /> {'>'} {activePool.state.rebalancingCondition}%
              deviation from target
            </div>
          </div>
          <div>
            <div className="text-sm fw-semibold color-secondary">Last rebalance</div>
            <div className="flex align-center text-p1 fw-semibold">
              {format(new Date(activePool.state.lastRebalance * 1000), 'dd.MM.yyyy HH:mm')}
            </div>
          </div>
        </div>
      ) : null}
      {activePool && (
        <div className="card">
          <PairsTable pool={activePool} />
        </div>
      )}
    </>
  );
};

export default PoolsView;
