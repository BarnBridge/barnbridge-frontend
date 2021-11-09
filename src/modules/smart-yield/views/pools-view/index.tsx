import { FC, useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'components/providers/networkProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { KnownMarkets, MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import { PoolCard } from 'modules/smart-yield/views/pools-view/pool-card';
import { PolygonNetwork } from 'networks/polygon';

const PoolsView: FC = () => {
  const { activeNetwork } = useNetwork();
  const rewardPoolsCtx = useRewardPools();
  const { loading, pools } = rewardPoolsCtx;

  const [marketsSelection, setMarketsSelection] = useSessionStorage<string | undefined>(
    `${activeNetwork.id}#sy-markets-selection`,
  );

  const [selectedMarkets, setSelectedMarkets] = useState<MarketMeta[]>([]);

  const marketsToDisplay = useMemo(() => {
    if (!selectedMarkets.length) {
      return KnownMarkets.filter(market => {
        return pools.some(pool => pool.meta.protocolId === market.id);
      });
    }

    return selectedMarkets;
  }, [selectedMarkets, pools]);

  useEffect(() => {
    const activeMarkets = marketsSelection
      ?.split('<#>')
      .map(marketId => {
        return getKnownMarketById(marketId)!;
      })
      .filter(Boolean);

    setSelectedMarkets(activeMarkets ?? []);
  }, [marketsSelection]);

  return (
    <>
      <div className="tab-cards mb-64">
        {KnownMarkets.filter(market => {
          return pools.some(pool => pool.meta.protocolId === market.id);
        }).map(market => {
          const isSelected = selectedMarkets.includes(market);

          return (
            <button
              key={market.name}
              type="button"
              className={cn('tab-card', isSelected && 'active')}
              onClick={() => {
                const newSelection = selectedMarkets.includes(market)
                  ? selectedMarkets.filter(ps => ps !== market)
                  : [...selectedMarkets, market];
                setSelectedMarkets(newSelection);
                setMarketsSelection(newSelection.map(m => m.id).join('<#>'));
              }}>
              <TokenIcon
                name={market.icon.active as TokenIconNames}
                {...(activeNetwork === PolygonNetwork ? { bubble2Name: 'polygon' } : undefined)}
                size={24}
                className="mr-16"
              />
              <Text type="p1" weight="semibold" color="primary">
                {market.name}
              </Text>
              {market.warning && (
                <Tooltip title={market.warning}>
                  <Icon name="warn-circle" className="ml-8" />
                </Tooltip>
              )}
              <Icon
                name={isSelected ? 'checkbox-checked' : 'checkbox'}
                style={{
                  marginLeft: 16,
                  flexShrink: 0,
                }}
              />
            </button>
          );
        })}
      </div>
      <Text type="p1" weight="semibold" color="secondary" className="mb-4">
        Total value locked
      </Text>
      <Text type="h2" weight="bold" color="primary" className="mb-40">
        {formatUSD(rewardPoolsCtx.getMarketTVL())}
      </Text>
      <AntdSpin spinning={loading}>
        <div className="flex flow-row row-gap-32">
          {marketsToDisplay.map(selectedMarket => {
            const marketPools = pools.filter(pool => pool.meta.protocolId === selectedMarket.id);

            if (marketPools.length === 0) {
              return null;
            }

            return (
              <div key={selectedMarket.id} className="flex flow-row mb-40">
                <div className="flex wrap align-center col-gap-64 row-gap-16 mb-32">
                  <div className="flex">
                    <TokenIcon name={selectedMarket.icon.active as TokenIconNames} size={40} className="mr-16" />
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
                      {formatUSD(rewardPoolsCtx.getMarketTVL(selectedMarket.id))}
                    </Text>
                  </div>
                </div>
                <div className="flex wrap row-gap-32 col-gap-32">
                  {marketPools.map(marketPool => (
                    <PoolCard key={marketPool.smartYield.address} pool={marketPool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </AntdSpin>
    </>
  );
};

export default PoolsView;
