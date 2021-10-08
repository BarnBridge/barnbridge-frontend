import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import capitalize from 'lodash/capitalize';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { mergeState } from 'hooks/useMergeState';
import {
  APISYTxHistoryType,
  APISYUserTxHistory,
  HistoryShortTypes,
  isPositiveHistoryType,
  useSyAPI,
} from 'modules/smart-yield/api';
import { SYPool } from 'modules/smart-yield/providers/pool-provider';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import HistoryTableFilter, {
  HistoryTableFilterValues,
} from 'modules/smart-yield/views/portfolio-view/overview/history-table-filter';
import { useWallet } from 'wallets/walletProvider';

type TableEntity = APISYUserTxHistory & {
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
        <Grid flow="col" gap={16} align="center">
          {entity.isTokenAmount ? (
            <TokenIcon
              name={entity.poolEntity?.token?.icon as TokenIconNames}
              bubble1Name={projectToken.icon}
              bubble2Name={entity.poolEntity?.market?.icon.active as TokenIconNames}
            />
          ) : (
            <TokenIcon
              name={entity.poolEntity?.token?.icon as TokenIconNames}
              bubble1Name={entity.poolEntity?.market?.icon.active as TokenIconNames}
            />
          )}
          <Grid flow="row" gap={4} className="ml-auto">
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {entity.underlyingTokenSymbol}
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              {entity.poolEntity?.market?.name}
            </Text>
          </Grid>
        </Grid>
      );
    },
  },
  {
    title: 'Tranche / Transaction',
    align: 'right',
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
                tokenName: entity.poolEntity?.contracts.smartYield.symbol,
                decimals: entity.poolEntity?.underlyingDecimals,
              })}
            </Text>
          }>
          <Text type="p1" weight="semibold" color={isPositive ? 'green' : 'red'}>
            {isPositive ? '+' : '-'}{' '}
            {formatToken(entity.amount, {
              tokenName: entity.isTokenAmount
                ? entity.poolEntity?.contracts.smartYield.symbol
                : entity.underlyingTokenSymbol,
            })}
          </Text>
          <Text type="small" weight="semibold">
            {formatUSD(entity.computedAmount)}
          </Text>
        </Tooltip>
      );
    },
  },
  {
    title: 'Transaction Hash',
    render: function Render(_, entity) {
      const { getEtherscanTxUrl } = useWeb3();

      return (
        <Grid flow="row" gap={4}>
          <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)}>
            <Text type="p1" weight="semibold" color="blue">
              {shortenAddr(entity.transactionHash)}
            </Text>
          </ExternalLink>
        </Grid>
      );
    },
  },
  {
    title: 'Date',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy')}
        </Text>
        <Text type="small" weight="semibold">
          {format(entity.blockTimestamp * 1_000, 'HH:mm')}
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
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
};

const InitialFilters: HistoryTableFilterValues = {
  originator: 'all',
  token: 'all',
  transactionType: 'all',
};

const HistoryTable: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();
  const syAPI = useSyAPI();
  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [filters, setFilters] = React.useState<HistoryTableFilterValues>(InitialFilters);

  const { getToken } = useTokens();

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(
        mergeState<State>({
          loading: true,
        }),
      );

      try {
        const history = await syAPI.fetchSYUserTxHistory(
          wallet.account,
          state.page,
          state.pageSize,
          filters.originator,
          filters.token,
          filters.transactionType,
        );

        setState(
          mergeState<State>({
            loading: false,
            data: history.data,
            total: history.meta.count,
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            data: [],
            total: 0,
          }),
        );
      }
    })();
  }, [wallet.account, filters.originator, filters.token, filters.transactionType, state.page]);

  const mappedData = React.useMemo(
    () =>
      state.data.map(item => {
        const pool = pools.find(poolItem => poolItem.smartYieldAddress === item.pool);

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
    [state.data, pools],
  );

  function handleFiltersApply(values: HistoryTableFilterValues) {
    setState(prevState => ({
      ...prevState,
      page: 1,
    }));

    setFilters(prevState => ({
      ...prevState,
      ...values,
    }));
  }

  function handlePageChange(page: number) {
    setState(
      mergeState<State>({
        page,
      }),
    );
  }

  return (
    <div className="card">
      <div className="card-header pv-12">
        <Grid flow="col" colsTemplate="1fr max-content" align="center">
          <Text type="p1" weight="semibold" color="primary">
            Transaction history
          </Text>
          <HistoryTableFilter originators={pools} value={filters} onChange={handleFiltersApply} />
        </Grid>
      </div>
      <Table<TableEntity>
        columns={Columns}
        dataSource={mappedData}
        rowKey="transactionHash"
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
    </div>
  );
};

export default HistoryTable;
