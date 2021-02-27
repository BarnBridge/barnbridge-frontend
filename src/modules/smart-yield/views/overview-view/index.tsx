import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import uniqBy from 'lodash/uniqBy';
import { ZERO_BIG_NUMBER, formatUSDValue } from 'web3/utils';

import Card from 'components/antd/card';
import Select from 'components/antd/select';
import Icons, { IconNames } from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import PoolsProvider, { usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import PoolsTable from 'modules/smart-yield/views/overview-view/pools-table';

type State = {
  activeMarket?: SYMarketMeta;
};

const InitialState: State = {
  activeMarket: Array.from(Markets.values())[0],
};

const OverviewViewInner: React.FC = () => {
  const poolsCtx = usePools();
  const { pools, loading } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);

  const totalLiquidity = React.useMemo<BigNumber>(() => {
    return pools.reduce((sum, pool) => {
      return sum.plus(pool.state.seniorLiquidity).plus(pool.state.juniorLiquidity);
    }, ZERO_BIG_NUMBER);
  }, [pools]);

  const originatorsOpts = React.useMemo(() => {
    return uniqBy(pools, 'underlyingSymbol').reduce(
      (list, pool) => {
        list.push({
          value: pool.underlyingSymbol,
          label: pool.meta?.name!,
        });

        return list;
      },
      [{ value: '', label: 'All originators' }],
    );
  }, [pools]);

  return (
    <>
      <div className="tab-cards mb-64">
        {Array.from(Markets.values()).map(market => (
          <button
            key={market.name}
            className={cn('tab-card', state.activeMarket === market && 'active')}
            onClick={() => {
              setState(
                mergeState<State>({
                  activeMarket: market,
                }),
              );
            }}>
            <Icons name={market.icon as IconNames} width={40} height={40} className="mr-16" />
            <div>
              <Text type="p1" weight="semibold" color="primary">
                {market.name}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Markets
              </Text>
            </div>
          </button>
        ))}
      </div>
      {state.activeMarket && (
        <>
          <Text type="p1" weight="semibold" color="secondary" className="mb-8">
            <Hint text=" ">{state.activeMarket.name} total liquidity</Hint>
          </Text>
          <Text type="h2" color="primary" className="mb-40">
            {formatUSDValue(totalLiquidity)}
          </Text>
        </>
      )}
      <Card title={<Select options={originatorsOpts} disabled={loading} value="" />} noPaddingBody>
        <PoolsTable activeMarket={state.activeMarket} />
      </Card>
    </>
  );
};

const OverviewView: React.FC = () => {
  return (
    <PoolsProvider>
      <OverviewViewInner />
    </PoolsProvider>
  );
};

export default OverviewView;
