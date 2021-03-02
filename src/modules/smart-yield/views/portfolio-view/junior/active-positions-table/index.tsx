import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { SYAbond } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool } from 'modules/smart-yield/views/overview-view/pools-provider';

import { getFormattedDuration } from 'utils';

export type ActivePositionsTableEntity = PoolsSYPool & {
  smartYieldBalance: BigNumber;
  smartYieldAbond: SYAbond;
};

const Columns: ColumnsType<ActivePositionsTableEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Token Name
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
            {entity.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Current balance
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <>
        <Tooltip
          title={formatBigValue(
            getHumanValue(entity.smartYieldBalance, entity.underlyingDecimals),
            entity.underlyingDecimals,
          )}>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(getHumanValue(entity.smartYieldBalance, entity.underlyingDecimals))}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(getHumanValue(entity.smartYieldBalance, entity.underlyingDecimals))}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        APY
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.state.juniorApy * 100)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Withdraw wait time
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <UseLeftTime end={entity.smartYieldAbond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.smartYieldAbond.maturesAt * 1_000) : ''}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: '20%',
    render: (_, entity) => (
      <NavLink
        to={{
          pathname: `/smart-yield/withdraw`,
          search: `?m=${entity.protocolId}&t=${entity.underlyingSymbol}`,
        }}>
        <Button type="primary" className="ml-auto">
          Withdraw
        </Button>
      </NavLink>
    ),
  },
];

type Props = {
  loading: boolean;
  data: ActivePositionsTableEntity[];
};

const ActivePositionsTable: React.FC<Props> = props => {
  const { loading, data } = props;

  return (
    <Table<ActivePositionsTableEntity>
      columns={Columns}
      dataSource={data}
      rowKey="smartYieldAddress"
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default ActivePositionsTable;
