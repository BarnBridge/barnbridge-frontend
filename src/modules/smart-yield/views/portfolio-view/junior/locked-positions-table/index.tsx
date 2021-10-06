import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, formatUSD, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
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
    render: function Render(_, entity) {
      const { getEtherscanAddressUrl } = useWeb3();
      const { projectToken } = useKnownTokens();

      return (
        <div className="flex flow-col align-center">
          <TokenIcon
            name={entity.pool.token?.icon as TokenIconNames}
            bubble1Name={projectToken.icon}
            bubble2Name={entity.pool.market?.icon.active as TokenIconNames}
            className="mr-16"
          />
          <div className="flex flow-row">
            <ExternalLink href={getEtherscanAddressUrl(entity.pool.smartYieldAddress)} className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="blue" className="mr-4">
                {entity.pool.underlyingSymbol}
              </Text>
              <Icon name="arrow-top-right" width={8} height={8} color="blue" />
            </ExternalLink>
            <Text type="small" weight="semibold">
              {entity.pool.market?.name}
            </Text>
          </div>
        </div>
      );
    },
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
    render: function Render(_, entity) {
      const knownTokensCtx = useKnownTokens();
      const value = entity.jBond.tokens.unscaleBy(entity.pool.underlyingDecimals);
      const uValue = value?.multipliedBy(entity.pool.state.jTokenPrice);
      const valueInUSD = knownTokensCtx.convertTokenInUSD(uValue, entity.pool.underlyingSymbol);

      return (
        <>
          <Tooltip
            title={formatBigValue(
              getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals),
              entity.pool.underlyingDecimals,
            )}>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
              {` ${entity.pool.contracts.smartYield?.symbol}`}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(valueInUSD)}
          </Text>
        </>
      );
    },
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
