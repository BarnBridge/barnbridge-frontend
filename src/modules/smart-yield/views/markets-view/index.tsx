import React from 'react';
import cn from 'classnames';
import { ZERO_BIG_NUMBER, formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import PoolsTable from 'modules/smart-yield/views/markets-view/pools-table';

const MarketsView: React.FC = () => {
  const poolsCtx = usePools();

  const [activeMarket, setActiveMarket] = React.useState<SYMarketMeta | undefined>();

  React.useEffect(() => {
    const market = Array.from(Markets.values()).find(market => market.id === poolsCtx.pools[0]?.protocolId);
    setActiveMarket(market);
  }, [poolsCtx.pools]);

  const activeMarketTotalLiquidity = React.useMemo(() => {
    return poolsCtx.pools.reduce((sum, pool) => {
      if (pool.protocolId !== activeMarket?.id) {
        return sum;
      }

      return sum.plus(pool.state.seniorLiquidity).plus(pool.state.juniorLiquidity);
    }, ZERO_BIG_NUMBER);
  }, [activeMarket, poolsCtx.pools]);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values()).map(market => {
          const isActive = poolsCtx.pools.some(pool => pool.protocolId === market.id);

          return (
            <button
              key={market.name}
              type="button"
              className={cn('tab-card', activeMarket === market && 'active')}
              disabled={!isActive}
              style={{ color: !isActive ? 'red' : '' }}
              onClick={() => setActiveMarket(market)}>
              <Icon name={market.icon as IconNames} width={40} height={40} className="mr-16" color="inherit" />
              <div>
                <Text type="p1" weight="semibold" color="primary">
                  {market.name}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {isActive ? 'Markets' : 'Coming soon'}
                </Text>
              </div>
            </button>
          );
        })}
      </div>
      {activeMarket && (
        <>
          <Hint text="This number shows the total liquidity provided to the market by the junior and senior tranche holders.">
            <Text type="p1" weight="semibold" color="secondary" className="mb-8">
              {activeMarket.name} total liquidity
            </Text>
          </Hint>
          <Text type="h2" weight="bold" color="primary" className="mb-40">
            {formatUSD(activeMarketTotalLiquidity)}
          </Text>
        </>
      )}
      <div className="card">
        <PoolsTable activeMarket={activeMarket} />
      </div>
    </>
  );
};

export default MarketsView;
