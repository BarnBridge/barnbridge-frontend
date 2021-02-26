import React from 'react';
import { useHistory } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import uniqBy from 'lodash/uniqBy';
import { formatBigValue, formatUSDValue, ZERO_BIG_NUMBER } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons, { IconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Hint, Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { Markets, SYMarketMeta } from 'modules/smart-yield/api';
import PoolsProvider, { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';

type State = {
  activeMarket?: SYMarketMeta;
};

const InitialState: State = {
  activeMarket: Array.from(Markets.values())[0],
};

type PoolEntity = {
  pool: PoolsSYPool;
  goDeposit: () => void;
};

const TableColumns: ColumnsType<PoolEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Originator
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.pool.meta?.icon!} bubbleName={entity.pool.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.pool.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold">
            {entity.pool.meta?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Senior Liquidity
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.pool.state.seniorLiquidity)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(ZERO_BIG_NUMBER)}
        </Text>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Senior APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.pool.state.seniorApy)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Junior Liquidity
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.pool.state.juniorLiquidity)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(ZERO_BIG_NUMBER)}
        </Text>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Junior APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="purple">
        {formatBigValue(entity.pool.state.juniorApy)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Originator APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.pool.state.originatorApy)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        jToken conversion rate
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          1 {entity.pool.underlyingSymbol}
        </Text>
        <Text type="small" weight="semibold">
          = ${formatBigValue(entity.pool.state.jTokenPrice)} j{entity.pool.underlyingSymbol}
        </Text>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Wallet balance
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.pool.underlyingContract?.balance)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(ZERO_BIG_NUMBER)}
        </Text>
      </Grid>
    ),
  },
  {
    title: null,
    render: (_, entity) => (
      <Button type="primary" onClick={() => entity.goDeposit()}>
        Deposit
      </Button>
    ),
  },
];

const OverviewViewInner: React.FC = () => {
  const history = useHistory();
  const pools = usePools();

  const [state, setState] = React.useState<State>(InitialState);

  const entities = React.useMemo<PoolEntity[]>(() => {
    return pools.pools
      .filter(pool => !state.activeMarket || pool.protocolId === state.activeMarket.id)
      .map(pool => {
        if (state.activeMarket && pool.protocolId !== state.activeMarket.id) {
          return undefined;
        }

        return {
          pool,
          goDeposit: () => {
            history.push(`/smart-yield/${pool.smartYieldAddress}/deposit`);
          },
        };
      })
      .filter(Boolean) as PoolEntity[];
  }, [pools.pools, state.activeMarket]);

  const totalLiquidity = React.useMemo<BigNumber>(() => {
    return entities.reduce((sum, entity) => {
      return sum.plus(entity.pool.state.seniorLiquidity).plus(entity.pool.state.juniorLiquidity);
    }, ZERO_BIG_NUMBER);
  }, [entities]);

  const originatorsOpts = React.useMemo(() => {
    return uniqBy(pools.pools, 'underlyingSymbol').reduce(
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
      <Card title={<Select options={originatorsOpts} disabled={pools.loading} value="" />} noPaddingBody>
        <Table<PoolEntity>
          columns={TableColumns}
          dataSource={entities}
          rowKey={entity => entity.pool.smartYieldAddress}
          loading={pools.loading}
          scroll={{
            x: true,
          }}
        />
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
