import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatUSDValue, getEtherscanAddressUrl, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { SYAbond } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool } from 'modules/smart-yield/providers/pools-provider';

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
          <ExternalLink
            href={getEtherscanAddressUrl(entity.smartYieldAddress)}
            className="grid flow-col col-gap-4 align-start">
            <Text type="p1" weight="semibold" color="blue">
              {entity.underlyingSymbol}
            </Text>
            <Icons name="arrow-top-right" width={8} height={8} color="blue" />
          </ExternalLink>
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
    sorter: (a, b) =>
      (getHumanValue(a.smartYieldBalance, a.underlyingDecimals)?.toNumber() ?? 0) -
      (getHumanValue(b.smartYieldBalance, b.underlyingDecimals)?.toNumber() ?? 0),
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
      <Hint
        text={
          <Grid flow="row" gap={8} align="start">
            <Text type="p2">
              The Junior APY is estimated based on the current state of the pool. The actual APY you get for your
              positions might differ.
            </Text>
            <ExternalLink href="#">Learn more</ExternalLink>
          </Grid>
        }>
        <Text type="small" weight="semibold">
          APY
        </Text>
      </Hint>
    ),
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.state.juniorApy - b.state.juniorApy,
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.state.juniorApy * 100)}%
      </Text>
    ),
  },
  {
    title: (
      <Hint
        text={
          <Grid flow="row" gap={8} align="start">
            <Text type="p2">
              This is the amount of time you would have to wait if you chose to go through the 2 step withdrawal
              process.
            </Text>
            <ExternalLink href="#">Learn more</ExternalLink>
          </Grid>
        }>
        <Text type="small" weight="semibold">
          Withdraw wait time
        </Text>
      </Hint>
    ),
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.smartYieldAbond.maturesAt - b.smartYieldAbond.maturesAt,
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
