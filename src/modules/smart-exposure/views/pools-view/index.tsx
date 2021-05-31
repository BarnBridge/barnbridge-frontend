import { useEffect, useState } from 'react';
import cn from 'classnames';

import { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import config from 'config';

import { PairsTable, PoolType } from './table';

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
      <div className={cn(s.stats, 'mb-40')}>
        <div>
          <div className="text-p1 fw-semibold color-secondary">WBTC/ETH total liquidity</div>
          <div className="text-h2 fw-bold">$ 310,000,000.00</div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary">Rebalancing strategies</div>
          <div className="flex align-center text-p1 fw-semibold">
            Every day <span className="middle-dot ph-16 color-border" /> {'>'} 2% deviation from target
          </div>
        </div>
      </div>
      {activePool && (
        <div className="card">
          <PairsTable pool={activePool} />
        </div>
      )}
    </>
  );
};

export default PoolsView;
