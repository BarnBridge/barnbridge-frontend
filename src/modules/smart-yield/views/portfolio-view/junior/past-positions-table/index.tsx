import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatBigValue, formatUSDValue } from 'web3/utils';

import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import {
  Markets,
  Pools,
  SYJuniorRedeem,
  SYMarketMeta,
  SYPool,
  SYPoolMeta,
  fetchSYJuniorRedeems,
} from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

type TableEntity = SYJuniorRedeem & {
  pool?: SYPool & {
    meta?: SYPoolMeta;
    market?: SYMarketMeta;
  };
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.pool?.meta?.icon!} bubbleName={entity.pool?.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.pool?.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold">
            {entity.pool?.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Redeemed balance
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.underlyingOut, 18)}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(entity.underlyingOut)}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Redeemed at
      </Text>
    ),
    width: '40%',
    align: 'right',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
      </Text>
    ),
  },
  {
    width: '20%',
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

const PastPositionsTable: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();
  const [reload] = useReload();

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
        const redeems = await fetchSYJuniorRedeems(wallet.account, state.page, state.pageSize);

        setState(
          mergeState<State>({
            loading: false,
            data: redeems.data,
            total: redeems.meta.count,
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

  React.useEffect(() => {
    state.data.map(item => {
      const pool = pools.find(pool => pool.smartYieldAddress === item.smartYieldAddress);

      item.pool = undefined;

      if (pool) {
        item.pool = {
          ...pool,
          meta: Pools.get(pool.underlyingSymbol),
          market: Markets.get(pool.protocolId),
        };
      }
    });

    reload();
  }, [pools, state.data]);

  function handlePageChange(page: number) {
    setState(
      mergeState<State>({
        page,
      }),
    );
  }

  return (
    <Table<TableEntity>
      columns={Columns}
      dataSource={state.data}
      rowKey="juniorBondId"
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
  );
};

export default PastPositionsTable;
