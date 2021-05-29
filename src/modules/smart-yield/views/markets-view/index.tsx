import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { ZERO_BIG_NUMBER, formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import PoolsTable from 'modules/smart-yield/views/markets-view/pools-table';

const MarketsView: React.FC = () => {
  const poolsCtx = usePools();
  const history = useHistory();
  const location = useLocation();
  const { getMarketTVL } = useRewardPools();
  const [selectedMarkets, setSelectedMarkets] = useState<SYMarketMeta[]>([]);

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search);
    const queryMarketIds: string[] = urlQuery.getAll('m').map(decodeURIComponent) ?? [];

    const selectedMarketsFromUrl = Array.from(Markets.values()).filter(market => queryMarketIds.includes(market.id));
    setSelectedMarkets(selectedMarketsFromUrl);
  }, [poolsCtx.pools, location.search]);

  // const activeMarketTotalLiquidity = useMemo(() => {
  //   return poolsCtx.pools.reduce((sum, pool) => {
  //     if (pool.protocolId !== activeMarket?.id) {
  //       return sum;
  //     }

  //     return sum.plus(pool.state.seniorLiquidity).plus(pool.state.juniorLiquidity);
  //   }, ZERO_BIG_NUMBER);
  // }, [activeMarket, poolsCtx.pools]);

  const marketsToDisplay = useMemo(() => {
    if (!selectedMarkets.length) {
      return Array.from(Markets.values()).filter(market => {
        return poolsCtx.pools.some(pool => pool.protocolId === market.id);
      });
    }

    return selectedMarkets;
  }, [selectedMarkets, poolsCtx.pools]);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values()).map(market => {
          const isActive = poolsCtx.pools.some(pool => pool.protocolId === market.id);
          const isSelected = selectedMarkets.includes(market);

          return (
            <button
              key={market.name}
              type="button"
              className={cn('tab-card', isSelected && 'active')}
              disabled={!isActive}
              style={{ color: !isActive ? 'red' : '' }}
              onClick={() => {
                const newSelection = selectedMarkets.includes(market)
                  ? selectedMarkets.filter(ps => ps !== market)
                  : [...selectedMarkets, market];
                setSelectedMarkets(newSelection);
                history.replace(
                  `?${decodeURIComponent(new URLSearchParams(newSelection.map(sm => ['m', sm.id])).toString())}`,
                );
              }}>
              <Icon name={market.icon as IconNames} width={24} height={24} className="mr-16" color="inherit" />
              <Text type="p1" weight="semibold" color="primary">
                {market.name}
              </Text>
              <Icon
                name={isSelected ? 'checkbox-checked' : 'checkbox'}
                style={{
                  marginLeft: 24,
                  flexShrink: 0,
                }}
              />
            </button>
          );
        })}
      </div>
      {marketsToDisplay.map(selectedMarket => (
        <>
          <div className="card mb-8 p-24 flex wrap align-center col-gap-64 row-gap-16">
            <div className="flex">
              <Icon name={selectedMarket.icon as IconNames} width={40} height={40} className="mr-16" color="inherit" />
              <div>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {selectedMarket.name}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  Markets
                </Text>
              </div>
            </div>
            <div>
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Total value locked
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {}
                {getMarketTVL()}
              </Text>
            </div>
          </div>
          <div className="card mb-32">
            <PoolsTable activeMarket={selectedMarket} />
          </div>
        </>
      ))}
    </>
  );
};

export default MarketsView;
