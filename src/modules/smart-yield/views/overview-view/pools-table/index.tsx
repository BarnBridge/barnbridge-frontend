import React from 'react';
import { useHistory } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatUSDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { SYMarketMeta } from 'modules/smart-yield/api';
import { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';

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
          {formatUSDValue(new BigNumber(entity.pool.state.seniorLiquidity))}
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
        {formatBigValue(entity.pool.state.seniorApy * 100)}%
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
          {formatUSDValue(new BigNumber(entity.pool.state.juniorLiquidity))}
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
        {formatBigValue(entity.pool.state.juniorApy * 100)}%
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
        {formatBigValue(entity.pool.state.originatorApy * 100)}%
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
          = {formatBigValue(entity.pool.state.jTokenPrice)} j{entity.pool.underlyingSymbol}
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
          {formatBigValue(entity.pool.underlyingBalance)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(entity.pool.underlyingBalance)}
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

type Props = {
  activeMarket?: SYMarketMeta;
};

const PoolsTable: React.FC<Props> = props => {
  const { activeMarket } = props;

  const history = useHistory();
  const pools = usePools();

  const entities = React.useMemo<PoolEntity[]>(() => {
    return pools.pools
      .filter(pool => !activeMarket || pool.protocolId === activeMarket.id)
      .map(pool => ({
        pool,
        goDeposit: () => {
          history.push(`/smart-yield/${pool.smartYieldAddress}/deposit`);
        },
      }))
      .filter(Boolean) as PoolEntity[];
  }, [pools.pools, activeMarket]);

  return (
    <Table<PoolEntity>
      columns={TableColumns}
      dataSource={entities}
      rowKey={entity => entity.pool.smartYieldAddress}
      loading={pools.loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default PoolsTable;
