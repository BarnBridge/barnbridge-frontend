import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'components/providers/networkProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import PoolsTable from 'modules/smart-yield/views/markets-view/pools-table';
import { PolygonNetwork } from 'networks/polygon';

const MarketsView: FC = () => {
  const { activeNetwork } = useNetwork();
  const poolsCtx = usePools();

  const [marketsSelection, setMarketsSelection] = useSessionStorage<string | undefined>(
    `${activeNetwork.id}#sy-markets-selection`,
  );

  const [selectedMarkets, setSelectedMarkets] = useState<SYMarketMeta[]>([]);

  const marketsToDisplay = useMemo(() => {
    if (!selectedMarkets.length) {
      return Array.from(Markets.values()).filter(market => {
        return poolsCtx.pools.some(pool => pool.protocolId === market.id);
      });
    }

    return selectedMarkets;
  }, [selectedMarkets, poolsCtx.pools]);

  useEffect(() => {
    const markets = Array.from(Markets.values());
    const activeMarkets = marketsSelection
      ?.split('<#>')
      .map(marketId => {
        return markets.find(mk => mk.id === marketId)!;
      })
      .filter(Boolean);

    setSelectedMarkets(activeMarkets ?? []);
  }, [marketsSelection]);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values())
          .filter(market => {
            return poolsCtx.pools.some(pool => pool.protocolId === market.id);
          })
          .map(market => {
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
                  name={market.icon as TokenIconNames}
                  bubble2Name={activeNetwork === PolygonNetwork ? 'polygon' : undefined}
                  size={24}
                  className="mr-16"
                />
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
      <Text type="p1" weight="semibold" color="secondary" className="mb-4">
        Total value locked
      </Text>
      <Text type="h2" weight="bold" color="primary" className="mb-40">
        {formatUSD(poolsCtx.getMarketTVL())}
      </Text>
      <AntdSpin spinning={poolsCtx.loading}>
        {marketsToDisplay.map(selectedMarket => (
          <Fragment key={selectedMarket.id}>
            <div className="card mb-8 p-24 flex wrap align-center col-gap-64 row-gap-16">
              <div className="flex">
                <TokenIcon name={selectedMarket.icon as TokenIconNames} size={40} className="mr-16" />
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
                  {formatUSD(poolsCtx.getMarketTVL(selectedMarket.id))}
                </Text>
              </div>
            </div>
            <div className="card mb-32">
              <PoolsTable activeMarket={selectedMarket} />
            </div>
          </Fragment>
        ))}
      </AntdSpin>
    </>
  );
};

export default MarketsView;
