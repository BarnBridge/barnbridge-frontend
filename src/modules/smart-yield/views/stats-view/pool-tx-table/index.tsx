import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import capitalize from 'lodash/capitalize';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink, ExplorerTxLink } from 'components/button';
import Grid from 'components/custom/grid';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import {
  APISYPoolTransaction,
  APISYTxHistoryType,
  HistoryShortTypes,
  HistoryTypes,
  isPositiveHistoryType,
  useSyAPI,
} from 'modules/smart-yield/api';
import { SYPool, useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { formatDate, formatTime } from 'utils/date';

type TableEntity = APISYPoolTransaction & {
  poolEntity?: SYPool;
  isTokenAmount?: boolean;
  computedAmount?: BigNumber;
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: function Render(_, entity) {
      const { projectToken } = useKnownTokens();

      return (
        <div className="flex">
          {entity.isTokenAmount ? (
            <TokenIcon
              name={entity.poolEntity?.token?.icon as TokenIconNames}
              bubble1Name={projectToken.icon}
              bubble2Name={entity.poolEntity?.market?.icon.active as TokenIconNames}
              className="mr-16"
            />
          ) : (
            <TokenIcon
              name={entity.poolEntity?.token?.icon as TokenIconNames}
              bubble1Name={entity.poolEntity?.market?.icon.active as TokenIconNames}
              className="mr-16"
            />
          )}
          <div className="flex flow-row">
            <ExplorerAddressLink
              address={
                entity.isTokenAmount ? entity.poolEntity?.contracts.smartYield.address : entity.underlyingTokenAddress
              }
              className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="primary" className="mr-4">
                {entity.isTokenAmount ? entity.poolEntity?.contracts.smartYield.symbol : entity.underlyingTokenSymbol}
              </Text>
            </ExplorerAddressLink>
            <Text type="small" weight="semibold" color="secondary">
              {entity.poolEntity?.market?.name}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Tranche / Transaction',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {capitalize(entity.tranche)}
        </Text>
        <Text type="small" weight="semibold">
          {HistoryShortTypes.get(entity.transactionType)}
        </Text>
      </>
    ),
  },
  {
    title: 'Amount',
    align: 'right',
    render: (_, entity) => {
      const isPositive = isPositiveHistoryType(entity.transactionType as APISYTxHistoryType);

      return (
        <Tooltip
          title={
            <Text type="small" weight="semibold" color="primary">
              {formatToken(entity.amount, {
                tokenName: entity.isTokenAmount
                  ? entity.poolEntity?.contracts.smartYield.symbol
                  : entity.underlyingTokenSymbol,
                decimals: entity.poolEntity?.underlyingDecimals,
              })}
            </Text>
          }>
          <Text type="p1" weight="semibold" color={isPositive ? 'green' : 'red'}>
            {isPositive ? '+' : '-'} {formatToken(entity.amount)}
          </Text>
          <Text type="small" weight="semibold">
            {formatUSD(entity.computedAmount)}
          </Text>
        </Tooltip>
      );
    },
  },
  {
    title: 'Address',
    render: function Render(_, entity) {
      return (
        <Grid flow="row" gap={4}>
          <ExplorerAddressLink address={entity.accountAddress}>
            <Text type="p1" weight="semibold" color="blue">
              {shortenAddr(entity.accountAddress)}
            </Text>
          </ExplorerAddressLink>
        </Grid>
      );
    },
  },
  {
    title: 'Transaction Hash',
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <ExplorerTxLink address={entity.transactionHash}>
          <Text type="p1" weight="semibold" color="blue">
            {shortenAddr(entity.transactionHash)}
          </Text>
        </ExplorerTxLink>
      </Grid>
    ),
  },
  {
    title: 'Date',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {formatDate(entity.blockTimestamp * 1_000)}
        </Text>
        <Text type="small" weight="semibold">
          {formatTime(entity.blockTimestamp * 1_000)}
        </Text>
      </>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
  total: number;
  pageSize: number;
  page: number;
  filters: {
    transactionType: string;
  };
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
  filters: {
    transactionType: 'all',
  },
};

const Filters: TableFilterType[] = [
  {
    name: 'transactionType',
    label: 'Transaction direction',
    defaultValue: 'all',
    itemRender: () => {
      const options = [
        {
          value: 'all',
          label: 'All transactions',
        },
        ...Array.from(HistoryTypes.entries()).map(([type, label]) => ({
          value: type,
          label,
        })),
      ];

      return <Select options={options} className="full-width" />;
    },
  },
];

type Props = {
  tabs: React.ReactNode;
};

const PoolTxTable: React.FC<Props> = ({ tabs }) => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;
  const syAPI = useSyAPI();
  const [state, setState] = React.useState<State>(InitialState);

  const { getToken } = useTokens();

  React.useEffect(() => {
    (async () => {
      if (!pool) {
        return;
      }

      setState(prevState => ({
        ...prevState,
        loading: true,
      }));

      try {
        const transactions = await syAPI.fetchSYPoolTransactions(
          pool.smartYieldAddress,
          state.page,
          state.pageSize,
          state.filters.transactionType,
        );

        setState(prevState => ({
          ...prevState,
          loading: false,
          data: transactions.data,
          total: transactions.meta.count,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
          data: [],
          total: 0,
        }));
      }
    })();
  }, [pool?.smartYieldAddress, state.page, state.filters.transactionType]);

  const mappedData = React.useMemo(
    () =>
      state.data.map(item => {
        let isTokenAmount: boolean | undefined;
        let computedAmount: BigNumber | undefined;

        if (pool) {
          const tokenPrice = getToken(pool.underlyingSymbol)?.price ?? 0;

          if (
            [
              APISYTxHistoryType.SENIOR_DEPOSIT,
              APISYTxHistoryType.SENIOR_REDEEM,
              APISYTxHistoryType.JUNIOR_DEPOSIT,
              APISYTxHistoryType.JUNIOR_REDEEM,
              APISYTxHistoryType.SBOND_SEND,
              APISYTxHistoryType.SBOND_RECEIVE,
            ].includes(item.transactionType as APISYTxHistoryType)
          ) {
            isTokenAmount = false;
            computedAmount = BigNumber.from(item.amount)?.multipliedBy(tokenPrice);
          }

          if (
            [
              APISYTxHistoryType.JUNIOR_INSTANT_WITHDRAW,
              APISYTxHistoryType.JUNIOR_REGULAR_WITHDRAW,
              APISYTxHistoryType.JTOKEN_SEND,
              APISYTxHistoryType.JTOKEN_RECEIVE,
              APISYTxHistoryType.JBOND_SEND,
              APISYTxHistoryType.JBOND_RECEIVE,
              APISYTxHistoryType.JUNIOR_STAKE,
              APISYTxHistoryType.JUNIOR_UNSTAKE,
            ].includes(item.transactionType as APISYTxHistoryType)
          ) {
            isTokenAmount = true;
            computedAmount = new BigNumber(item.amount).multipliedBy(pool.state.jTokenPrice).multipliedBy(tokenPrice);
          }
        }

        return {
          ...item,
          poolEntity: pool,
          isTokenAmount,
          computedAmount,
        } as TableEntity;
      }),
    [state.data, pool],
  );

  function handleFilterChange(filters: Record<string, any>) {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        ...filters,
      },
    }));
  }

  function handlePageChange(page: number) {
    setState(prevState => ({
      ...prevState,
      page,
    }));
  }

  return (
    <>
      <header className="card-header flex align-center justify-space-between ph-24 pv-0">
        {tabs}
        <TableFilter filters={Filters} value={state.filters} onChange={handleFilterChange} />
      </header>
      <Table<TableEntity>
        columns={Columns}
        dataSource={mappedData}
        rowKey={entity => `${entity.transactionHash}_${entity.transactionType}`}
        loading={state.loading}
        pagination={{
          total: state.total,
          pageSize: state.pageSize,
          current: state.page,
          position: ['bottomRight'],
          showTotal: (total: number, [from, to]: [number, number]) => (
            <Text type="p2" weight="semibold" color="secondary">
              Showing {from} to {to} out of {total} entries
            </Text>
          ),
          onChange: handlePageChange,
        }}
        scroll={{
          x: true,
        }}
      />
    </>
  );
};

export default PoolTxTable;
