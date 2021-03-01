import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { SYJuniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool } from 'modules/smart-yield/views/overview-view/pools-provider';

import { getFormattedDuration } from 'utils';

export type LockedPositionsTableEntity = {
  pool: PoolsSYPool;
  jBond: SYJuniorBondToken;
  redeem: () => void;
};

const Columns: ColumnsType<LockedPositionsTableEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Token Name
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
            {entity.pool.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Redeemable balance
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <>
        <Tooltip
          title={formatBigValue(
            getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals),
            entity.pool.underlyingDecimals,
          )}>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Time left
      </Text>
    ),
    width: '40%',
    align: 'right',
    render: (_, entity) => (
      <UseLeftTime end={entity.jBond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.jBond.maturesAt * 1_000) : 'Redeem now'}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: '20%',
    render: (_, entity) => (
      <Button
        type="ghost"
        className="ml-auto"
        disabled={entity.jBond.maturesAt * 1_000 > Date.now()}
        onClick={entity.redeem}>
        Redeem
      </Button>
    ),
  },
];

type Props = {
  loading: boolean;
  data: LockedPositionsTableEntity[];
};

const LockedPositionsTable: React.FC<Props> = props => {
  const { loading, data } = props;

  return (
    <Table<LockedPositionsTableEntity>
      columns={Columns}
      dataSource={data}
      rowKey={row => `${row.pool.protocolId}:${row.jBond.jBondId}`}
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default LockedPositionsTable;
