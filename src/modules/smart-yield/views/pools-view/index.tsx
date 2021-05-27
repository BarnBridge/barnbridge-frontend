import React, { FC, useEffect, useMemo, useState } from 'react';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { KnownMarkets, MarketMeta } from 'modules/smart-yield/providers/markets';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import { PoolCard } from 'modules/smart-yield/views/pools-view/pool-card';

const PoolsView: FC = () => {
  const rewardPoolsCtx = useRewardPools();
  const { loading, pools } = rewardPoolsCtx;

  const [activeMarket, setActiveMarket] = useState<MarketMeta | undefined>();

  const activeMarketTVL = useMemo(() => {
    return activeMarket ? rewardPoolsCtx.getMarketTVL(activeMarket.id) : undefined;
  }, [activeMarket]);

  const activeMarketPools = useMemo(() => {
    return pools.filter(pool => pool.meta.protocolId === activeMarket?.id);
  }, [activeMarket]);

  useEffect(() => {
    const market = KnownMarkets.find(market => market.id === pools[0]?.meta.protocolId);
    setActiveMarket(market);
  }, [pools]);

  return (
    <>
      <div className="tab-cards mb-64">
        {KnownMarkets.map(market => {
          const isActive = pools.some(pool => pool.meta.protocolId === market.id);

          return (
            <button
              key={market.name}
              type="button"
              className={cn('tab-card', activeMarket === market && 'active')}
              disabled={!isActive}
              style={{ color: !isActive ? 'red' : '' }}
              onClick={() => setActiveMarket(market)}>
              <Icon
                name={(isActive ? market.icon.active : market.icon.inactive) as IconNames}
                width={40}
                height={40}
                className="mr-16"
                color="inherit"
              />
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
      <div className="flex mb-32">
        <div>
          <Text type="p1" weight="semibold" color="secondary">
            Total value locked
          </Text>
          <Text type="h2" weight="bold" color="primary">
            {formatUSD(activeMarketTVL)}
          </Text>
        </div>
      </div>
      <AntdSpin spinning={loading}>
        <div className="flex row-gap-32 col-gap-32">
          {activeMarketPools.map(pool => (
            <PoolCard key={pool.smartYield.address} pool={pool} />
          ))}
        </div>
      </AntdSpin>
    </>
  );
};

export default PoolsView;
