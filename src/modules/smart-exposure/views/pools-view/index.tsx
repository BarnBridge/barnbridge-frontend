import { Fragment, useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { formatPercent, formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { PoolApiType, useSeAPI } from 'modules/smart-exposure/api';

import { PairsTable } from './table';

import { calculateRebalancingCondition } from 'modules/smart-exposure/utils';
import { getRelativeTime } from 'utils';

const PoolsView: React.FC = () => {
  const [pools, setPools] = useState<PoolApiType[]>([]);
  const [selectedPools, setSelectedPools] = useState<PoolApiType[]>([]);
  const { getTokenBySymbol } = useKnownTokens();
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchPools().then(result => {
      setPools(result ?? []);
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
      <div className="mb-40 flex align-center">
        <Text type="h2" weight="bold" color="primary" className="mr-8">
          {formatUSD(totalValueLocked)}
        </Text>
        <Tooltip
          title={
            <>
              The BarnBridge SMART Exposure contracts are covered by:
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
          <Icon name="insured" color="green" width={32} height={32} />
        </Tooltip>
      </div>

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
                <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4 mb-4">
                  Rebalancing Strategy
                  <InfoTooltip>
                    Rebalancing of the tranche is triggered based on the conditions the pool is set up with. They can be
                    either time or deviation based.
                  </InfoTooltip>
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                  Every {getRelativeTime(pool.state.rebalancingInterval) || '0 seconds'}
                </Text>
              </div>
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Last rebalance
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                  {pool.state.lastRebalance
                    ? format(new Date(pool.state.lastRebalance * 1000), 'dd.MM.yyyy HH:mm')
                    : 'Always'}
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
