import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatBigValue, formatUSDValue, getEtherscanAddressUrl } from 'web3/utils';

import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import StatusTag from 'components/custom/status-tag';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import {
  APISYJuniorRedeem,
  APISYPool,
  Markets,
  Pools,
  SYMarketMeta,
  SYPoolMeta,
  fetchSYJuniorInstantWithdrawals,
  fetchSYJuniorRedeems,
} from 'modules/smart-yield/api';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import { useWallet } from 'wallets/wallet';

type TableEntity = APISYJuniorRedeem & {
  pool?: APISYPool & {
    meta?: SYPoolMeta;
    market?: SYMarketMeta;
  };
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.pool?.meta?.icon} bubbleName={entity.pool?.market?.icon} />
        <Grid flow="row" gap={4} className="ml-auto">
          <ExternalLink
            href={getEtherscanAddressUrl(entity.pool?.smartYieldAddress)}
            className="grid flow-col col-gap-4 align-start">
            <Text type="p1" weight="semibold" color="blue">
              {entity.pool?.underlyingSymbol}
            </Text>
            <Icon name="arrow-top-right" width={8} height={8} color="blue" />
          </ExternalLink>
          <Text type="small" weight="semibold">
            {entity.pool?.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: 'Redeemed balance',
    width: '20%',
    align: 'right',
    sorter: (a, b) => a.underlyingOut.toNumber() - b.underlyingOut.toNumber(),
    render: (_, entity) => (
      <>
        <Tooltip title={formatBigValue(entity.underlyingOut, entity.pool?.underlyingDecimals)}>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(entity.underlyingOut)}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(entity.underlyingOut)}
        </Text>
      </>
    ),
  },
  {
    title: 'Redeemed at',
    width: '40%',
    align: 'right',
    sorter: (a, b) => a.blockTimestamp - b.blockTimestamp,
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
      </Text>
    ),
  },
  {
    title: 'Withdraw type',
    width: '40%',
    align: 'right',
    sorter: (a, b) => a.blockTimestamp - b.blockTimestamp,
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {entity.juniorBondAddress ? '2 step' : 'Instant'}
      </Text>
    ),
  },
  {
    width: '20%',
    render: () => <StatusTag text="Redeemed" color="green" />,
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
        const instantWithdrawals = await fetchSYJuniorInstantWithdrawals(wallet.account, state.page, state.pageSize);

        const dataIW = instantWithdrawals.data.map(item => {
          return {
            juniorBondAddress: '',
            userAddress: '',
            juniorBondId: item.blockTimestamp,
            smartYieldAddress: item.smartYieldAddress,
            tokensIn: item.tokensIn,
            maturesAt: 0,
            underlyingOut: item.underlyingOut,
            blockTimestamp: item.blockTimestamp,
          } as APISYJuniorRedeem;
        });

        const data = redeems.data.concat(dataIW).map(item => {
          const pool = pools.find(poolItem => poolItem.smartYieldAddress === item.smartYieldAddress);

          return {
            ...item,
            pool: pool
              ? {
                  ...pool,
                  meta: Pools.get(pool.underlyingSymbol),
                  market: Markets.get(pool.protocolId),
                }
              : undefined,
          };
        });

        setState(
          mergeState<State>({
            loading: false,
            data,
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
