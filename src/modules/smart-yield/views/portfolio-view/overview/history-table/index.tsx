import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import capitalize from 'lodash/capitalize';
import { formatBigValue, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { HistoryTypes, Markets, SYUserTxHistory, fetchSYUserTxHistory } from 'modules/smart-yield/api';
import { useWallet } from 'wallets/wallet';

type TableEntity = SYUserTxHistory;

const Columns: ColumnsType<TableEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name="usdc-token" bubbleName={Markets.get(entity.protocolId)?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            -
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {Markets.get(entity.protocolId)?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Transaction Hash
      </Text>
    ),
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
    title: (
      <Text type="small" weight="semibold">
        Date
      </Text>
    ),
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {format(entity.blockTimestamp, 'MM.dd.yyyy')}
        </Text>
        <Text type="small" weight="semibold">
          {format(entity.blockTimestamp, 'HH:mm')}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Amount
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.amount)}
        </Text>
        <Text type="small" weight="semibold">
          $ -
        </Text>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Tranche
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {capitalize(entity.tranche)}
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Transaction type
      </Text>
    ),
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
  }, [wallet.account, state.page]);

  function handlePageChange(page: number) {
    setState(
      mergeState<State>({
        page,
      }),
    );
  }

  return (
    <Card
      title={
        <Grid flow="col" colsTemplate="1fr max-content">
          <Text type="p1" weight="semibold" color="primary">
            Transaction history
          </Text>
          <Button type="light">
            <Icons name="filter" />
            Filter
          </Button>
        </Grid>
      }
      noPaddingBody>
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
