import { Fragment, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { format } from 'date-fns';
import { formatPercent, formatUSD } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Text } from 'components/custom/typography';
import { getTokenBySymbol } from 'components/providers/knownTokensProvider';
import { PoolApiType, fetchPools } from 'modules/smart-exposure/api';

import { PairsTable } from './table';

import { getRelativeTime } from 'utils';

const PoolsView: React.FC = () => {
  const [pools, setPools] = useState<PoolApiType[]>([]);
  const [selectedPools, setSelectedPools] = useState<PoolApiType[]>([]);

  useEffect(() => {
    fetchPools().then(result => {
      setPools(result);
    });
  }, []);

  const poolsToDisplay = selectedPools.length ? selectedPools : pools;

  const totalValueLocked = useMemo(() => pools.reduce((acc, pool) => acc + Number(pool.state.poolLiquidity), 0), [
    pools,
  ]);

  return (
    <>
      <div className="tab-cards mb-40">
        {pools.map(pool => {
          const tokenA = getTokenBySymbol(pool.tokenA.symbol);
          const tokenB = getTokenBySymbol(pool.tokenB.symbol);
          const isActive = true; // poolsCtx.pools.some(p => p.protocolId === market.id);
          const isSelected = selectedPools.includes(pool);

          return (
            <button
              key={pool.poolName}
              type="button"
              className={cn('tab-card', isActive && isSelected && 'active')}
              disabled={!isActive}
              style={{ color: !isActive ? 'red' : '' }}
              onClick={() => {
                const newSelection = selectedPools.includes(pool)
                  ? selectedPools.filter(ps => ps !== pool)
                  : [...selectedPools, pool];
                setSelectedPools(newSelection);
                // setMarketsSelection(newSelection.map(m => m.id).join('<#>'));
              }}>
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
              <Icon
                name={isActive && isSelected ? 'checkbox-checked' : 'checkbox'}
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
        {formatUSD(totalValueLocked)}
      </Text>

      {poolsToDisplay.map(pool => {
        const tokenA = getTokenBySymbol(pool.tokenA.symbol);
        const tokenB = getTokenBySymbol(pool.tokenB.symbol);

        return (
          <Fragment key={pool.poolAddress}>
            <div className="card mb-8 p-24 flex wrap align-center col-gap-64 row-gap-16">
              <div className="flex">
                <IconsPair
                  icon1={tokenA?.icon as IconNames}
                  icon2={tokenB?.icon as IconNames}
                  size={40}
                  className="mr-16"
                />
                <div>
                  <Text type="p1" weight="semibold" color="primary" className="mb-4">
                    {pool.poolName} total liquidity
                  </Text>
                  <Text type="small" weight="semibold" color="secondary">
                    {formatUSD(pool.state.poolLiquidity)}
                  </Text>
                </div>
              </div>
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Rebalancing strategies
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                  Every {getRelativeTime(pool.state.rebalancingInterval) || '0 seconds'}
                  <span className="middle-dot ph-16 color-border" /> {'>'}{' '}
                  {formatPercent(BigNumber.from(pool.state.rebalancingCondition)?.unscaleBy(18) ?? 0)} deviation from
                  target
                </Text>
              </div>
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Last rebalance
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                  {format(new Date(pool.state.lastRebalance * 1000), 'dd.MM.yyyy HH:mm')}
                </Text>
              </div>
            </div>

            <div className="card mb-32">
              <PairsTable pool={pool} />
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default PoolsView;
