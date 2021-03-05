import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
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
import { SYJuniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool } from 'modules/smart-yield/providers/pools-provider';

import { getFormattedDuration } from 'utils';

export type LockedPositionsTableEntity = {
  pool: PoolsSYPool;
  jBond: SYJuniorBondToken;
  redeem: () => void;
};

const Columns: ColumnsType<LockedPositionsTableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.pool.meta?.icon!} bubbleName={entity.pool.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <ExternalLink
            href={getEtherscanAddressUrl(entity.pool.smartYieldAddress)}
            className="grid flow-col col-gap-4 align-start">
            <Text type="p1" weight="semibold" color="blue">
              {entity.pool.underlyingSymbol}
            </Text>
            <Icons name="arrow-top-right" width={8} height={8} color="blue" />
          </ExternalLink>
          <Text type="small" weight="semibold">
            {entity.pool.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Hint
        text={
          <Grid flow="row" gap={8} align="start">
            <Text type="p2">
              This value is based on current junior token prices. At the actual maturity date of the junior bond, the
              price may differ and be higher or lower.
            </Text>
            <ExternalLink href="#">Learn more</ExternalLink>
          </Grid>
        }>
        Redeemable balance
      </Hint>
    ),
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.jBond.tokens.toNumber() - b.jBond.tokens.toNumber(),
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
    title: 'Time left',
    width: '40%',
    align: 'right',
    sorter: (a, b) => a.jBond.maturesAt - b.jBond.maturesAt,
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
