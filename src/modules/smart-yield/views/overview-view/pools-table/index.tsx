import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { SYMarketMeta } from 'modules/smart-yield/api';

import { PoolsSYPool, usePools } from '../pools-provider';

type PoolEntity = PoolsSYPool;

const TableColumns: ColumnsType<PoolEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Originator
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.meta?.icon!} bubbleName={entity.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold">
            {entity.meta?.name}
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
          {formatBigValue(entity.state.seniorLiquidity)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(new BigNumber(entity.state.seniorLiquidity))}
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
        {formatBigValue(entity.state.seniorApy * 100)}%
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
          {formatBigValue(entity.state.juniorLiquidity)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(new BigNumber(entity.state.juniorLiquidity))}
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
        {formatBigValue(entity.state.juniorApy * 100)}%
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
        {formatBigValue(entity.state.originatorApy * 100)}%
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
          1 {entity.underlyingSymbol}
        </Text>
        <Text type="small" weight="semibold">
          = {formatBigValue(entity.state.jTokenPrice)} j{entity.underlyingSymbol}
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
          {formatBigValue(getHumanValue(entity.underlyingBalance, entity.underlyingDecimals))}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(getHumanValue(entity.underlyingBalance, entity.underlyingDecimals))}
        </Text>
      </Grid>
    ),
  },
  {
    title: null,
    render: function (_, entity) {
      return (
        <NavLink to={`/smart-yield/${entity.smartYieldAddress}/deposit`}>
          <Button type="ghost">Deposit</Button>
        </NavLink>
      );
    },
  },
];

type Props = {
  activeMarket?: SYMarketMeta;
};

const PoolsTable: React.FC<Props> = props => {
  const { activeMarket } = props;

  const poolsCtx = usePools();
  const { pools, loading } = poolsCtx;

  const entities = React.useMemo<PoolEntity[]>(() => {
    return pools.filter(pool => !activeMarket || pool.protocolId === activeMarket.id);
  }, [pools, activeMarket]);

  return (
    <Table<PoolEntity>
      columns={TableColumns}
      dataSource={entities}
      rowKey={entity => entity.smartYieldAddress}
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default PoolsTable;
