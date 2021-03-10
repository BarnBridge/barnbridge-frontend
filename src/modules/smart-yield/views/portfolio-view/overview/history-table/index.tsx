import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import capitalize from 'lodash/capitalize';
import { formatBigValue, formatUSDValue, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { APISYUserTxHistory, HistoryTypes, Markets, Pools, fetchSYUserTxHistory } from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import HistoryTableFilter, {
  HistoryTableFilterValues,
} from 'modules/smart-yield/views/portfolio-view/overview/history-table-filter';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

type TableEntity = APISYUserTxHistory;

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble
          name={Pools.get(entity.underlyingTokenSymbol)?.icon}
          bubbleName={Markets.get(entity.protocolId)?.icon}
        />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {entity.underlyingTokenSymbol}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {Markets.get(entity.protocolId)?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: 'Transaction Hash',
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)}>
          <Text type="p1" weight="semibold" color="blue">
            {shortenAddr(entity.transactionHash)}
          </Text>
        </ExternalLink>
      </Grid>
    ),
  },
  {
    title: 'Date',
    sorter: (a, b) => a.blockTimestamp - b.blockTimestamp,
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
  {
    title: 'Amount',
    sorter: (a, b) => {
      const diff = a.amount - b.amount;

      if (diff < 0) {
        return -1;
      }

      if (diff > 0) {
        return 1;
      }

      return 0;
    },
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Tooltip title={formatBigValue(entity.amount, 18)}>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(entity.amount)}
            {` ${entity.underlyingTokenSymbol}`}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold">
          {formatUSDValue(new BigNumber(entity.amount))}
        </Text>
      </Grid>
    ),
  },
  {
    title: 'Tranche',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {capitalize(entity.tranche)}
      </Text>
    ),
  },
  {
    title: 'Transaction type',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {HistoryTypes.get(entity.transactionType)}
      </Text>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
  total: number;
  pageSize: number;
  page: number;
  originatorFilter: string;
  tokenFilter: string;
  transactionTypeFilter: string;
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
  originatorFilter: 'all',
  tokenFilter: 'all',
  transactionTypeFilter: 'all',
};

const HistoryTable: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();

  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);

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
        const history = await fetchSYUserTxHistory(
          wallet.account,
          state.page,
          state.pageSize,
          state.originatorFilter,
          state.tokenFilter,
          state.transactionTypeFilter,
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
  }, [wallet.account, state.originatorFilter, state.tokenFilter, state.transactionTypeFilter, state.page]);

  function handleFiltersApply(filters: HistoryTableFilterValues) {
    setState(prevState => ({
      ...prevState,
      page: 1,
      originatorFilter: filters.originator,
      tokenFilter: filters.token,
      transactionTypeFilter: filters.transactionType,
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
    <Card
      className={s.card}
      noPaddingBody
      title={
        <Grid flow="col" colsTemplate="1fr max-content" align="center">
          <Text type="p1" weight="semibold" color="primary">
            Transaction history
          </Text>
          <HistoryTableFilter originators={pools} onFiltersApply={handleFiltersApply} />
        </Grid>
      }>
      <Table
        columns={Columns}
        dataSource={state.data}
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
    </Card>
  );
};

export default HistoryTable;
