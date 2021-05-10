import React from 'react';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';
import { ZERO_BIG_NUMBER, formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/known-tokens-provider';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import { PoolsCard } from 'modules/smart-yield/views/pools-view/pool-card';

const PoolsView: React.FC = () => {
  const knownTokensCtx = useKnownTokens();
  const rewardPoolsCtx = useRewardPools();
  const { loading, rewardPools } = rewardPoolsCtx;

  const [activeMarket, setActiveMarket] = React.useState<SYMarketMeta | undefined>();

  React.useEffect(() => {
    const market = Array.from(Markets.values()).find(market => market.id === rewardPoolsCtx.rewardPools[0]?.protocolId);
    setActiveMarket(market);
  }, [rewardPoolsCtx.rewardPools]);

  const activeMarketTotalValueLocked = React.useMemo(() => {
    return rewardPools
      .filter(pool => pool.protocolId === activeMarket?.id)
      .reduce((sum, c) => {
        if (!c.pool.poolSize) {
          return sum;
        }

        const usdValue = knownTokensCtx.convertTokenInUSD(
          c.pool.poolSize.unscaleBy(c.poolToken.decimals),
          c.poolToken.symbol!,
        );

        if (!usdValue) {
          return sum;
        }

        return sum.plus(usdValue);
      }, ZERO_BIG_NUMBER);
  }, [rewardPoolsCtx, activeMarket]);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values()).map(market => {
          const isActive = rewardPoolsCtx.rewardPools.some(pool => pool.protocolId === market.id);

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
      <div className="flex mb-32">
        <div>
          <Text type="p1" weight="semibold" color="secondary">
            Total value locked
          </Text>
          <Text type="h2" weight="bold" color="primary">
            {formatUSD(activeMarketTotalValueLocked)}
          </Text>
        </div>
      </div>
      <AntdSpin spinning={loading}>
        <div className="flex row-gap-32 col-gap-32">
          {rewardPools
            .filter(pool => pool.protocolId === activeMarket?.id)
            .map(rewardPool => (
              <PoolsCard key={rewardPool.poolAddress} rewardPool={rewardPool} />
            ))}
        </div>
      </AntdSpin>
    </>
  );
};

export default PoolsView;
