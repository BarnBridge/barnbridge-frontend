import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink } from 'components/button';
import { ExternalLink } from 'components/button';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
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
    title: 'Token Name',
    render: function Render(_, entity) {
      const { projectToken } = useKnownTokens();

      return (
        <div className="flex flow-col align-center">
          <TokenIcon
            name={entity.token?.icon as TokenIconNames}
            bubble1Name={projectToken.icon}
            bubble2Name={entity.market?.icon.active as TokenIconNames}
            className="mr-16"
          />
          <div className="flex flow-row">
            <ExplorerAddressLink address={entity.smartYieldAddress} className="flex flow-col mb-4">
              <Text type="body1" weight="semibold" color="primary" className="mr-4">
                {entity.underlyingSymbol}
              </Text>
            </ExplorerAddressLink>
            <Text type="caption" weight="semibold">
              {entity.market?.name}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Current balance',
    width: '20%',
    align: 'right',
    sorter: (a, b) =>
      a.smartYieldBalance
        .unscaleBy(a.underlyingDecimals)
        ?.comparedTo(b.smartYieldBalance.unscaleBy(b.underlyingDecimals)!) ?? 0,
    render: function BalanceRender(_, entity) {
      const { getAmountInUSD } = useTokens();
      const value = entity.smartYieldBalance.unscaleBy(entity.underlyingDecimals);
      const uValue = value?.multipliedBy(entity.state.jTokenPrice);
      const valueInUSD = getAmountInUSD(uValue, entity.underlyingSymbol);

      return (
        <>
          <Tooltip
            title={formatToken(entity.smartYieldBalance, {
              scale: entity.underlyingDecimals,
              decimals: entity.underlyingDecimals,
            })}>
            <Text type="body1" weight="semibold" color="primary">
              {formatToken(entity.smartYieldBalance, {
                scale: entity.underlyingDecimals,
                tokenName: entity.contracts.smartYield?.symbol,
              })}
            </Text>
          </Tooltip>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(valueInUSD)}
          </Text>
        </>
      );
    },
  },
  {
    title: (
      <Hint
        text={
          <Grid flow="row" gap={8} align="start">
            <Text type="body2">
              The Junior APY is estimated based on the current state of the pool. The actual APY you get for your
              positions might differ.
            </Text>
            <ExternalLink href="https://docs.barnbridge.com/beginners-guide-to-smart-yield#junior-apy">
              Learn more
            </ExternalLink>
          </Grid>
        }>
        Variable APY
      </Hint>
    ),
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.state.juniorApy - b.state.juniorApy,
    render: (_, entity) => (
      <Text type="body1" weight="semibold" color="purple">
        {formatPercent(entity.state.juniorApy)}
      </Text>
    ),
  },
  {
    title: (
      <Hint
        text={
          <Grid flow="row" gap={8} align="start">
            <Text type="body2">
              This is the amount of time you would have to wait if you chose to go through the 2 step withdrawal
              process.
            </Text>
            <ExternalLink href="https://integrations.barnbridge.com/specs/smart-yield-specifications#steps-for-exit">
              Learn more
            </ExternalLink>
          </Grid>
        }>
        Withdraw wait time
      </Hint>
    ),
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.smartYieldAbond.maturesAt - b.smartYieldAbond.maturesAt,
    render: (_, entity) => (
      <UseLeftTime end={entity.smartYieldAbond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="body1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.smartYieldAbond.maturesAt * 1_000) : ''}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
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
