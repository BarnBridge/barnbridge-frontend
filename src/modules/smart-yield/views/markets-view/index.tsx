import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useSessionStorage } from 'react-use-storage';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import IconOld from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useNetwork } from 'components/providers/networkProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { KnownMarkets, MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import PoolsTable from 'modules/smart-yield/views/markets-view/pools-table';
import { PolygonNetwork } from 'networks/polygon';

const MarketsView: FC = () => {
  const { activeNetwork } = useNetwork();
  const poolsCtx = usePools();

  const [marketsSelection, setMarketsSelection] = useSessionStorage<string | undefined>(
    `${activeNetwork.id}#sy-markets-selection`,
  );

  const [selectedMarkets, setSelectedMarkets] = useState<MarketMeta[]>([]);

  const marketsToDisplay = useMemo(() => {
    if (!selectedMarkets.length) {
      return KnownMarkets.filter(market => {
        return poolsCtx.pools.some(pool => pool.protocolId === market.id);
      });
    }

    return selectedMarkets;
  }, [selectedMarkets, poolsCtx.pools]);

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
          return poolsCtx.pools.some(pool => pool.protocolId === market.id);
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
                <div onClick={ev => ev.stopPropagation()}>
                  <Tooltip title={market.warning}>
                    <IconOld name="warn-circle" className="ml-8" />
                  </Tooltip>
                </div>
              )}
              <IconOld
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
      <div className="mb-40 flex align-center">
        <Text type="h2" weight="bold" color="primary" className="mr-8">
          {formatUSD(poolsCtx.getMarketTVL())}
        </Text>
        <Tooltip
          title={
            <>
              The BarnBridge SMART Yield contracts are covered by:
              <br /> - Nexus Mutual,{' '}
              <a
                href="https://app.nexusmutual.io/cover/buy/get-quote?address=0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840"
                rel="noopener noreferrer"
                target="_blank">
                click here
              </a>{' '}
              to purchase coverage
              <br /> - Bridge Mutual,{' '}
              <a
                href="https://app.bridgemutual.io/user/cover/0xdb9A242cfD588507106919051818e771778202e9"
                rel="noopener noreferrer"
                target="_blank">
                click here
              </a>{' '}
              to purchase coverage
            </>
          }>
          <Icon name="insured" color="green" size={32} />
        </Tooltip>
      </div>
      <AntdSpin spinning={poolsCtx.loading}>
        {marketsToDisplay.map(selectedMarket => (
          <Fragment key={selectedMarket.id}>
            <div className="card mb-8 p-24 flex wrap align-center col-gap-64 row-gap-16">
              <div className="flex">
                <TokenIcon
                  name={selectedMarket.icon.active as TokenIconNames}
                  {...(selectedMarket.warning ? { bubble2Name: 'warn-circle' } : {})}
                  size={40}
                  className="mr-16"
                />
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
