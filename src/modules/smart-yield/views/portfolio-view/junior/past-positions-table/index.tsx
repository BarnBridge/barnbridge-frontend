import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink, ExplorerTxLink } from 'components/button';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { mergeState } from 'hooks/useMergeState';
import { APISYJuniorPastPosition, JuniorPastPositionTypes, useSyAPI } from 'modules/smart-yield/api';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { formatDateTime } from 'utils/date';

type TableEntity = APISYJuniorPastPosition & {
  pool?: PoolsSYPool;
  forfeits?: BigNumber;
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: function Render(_, entity) {
      const { projectToken } = useKnownTokens();

      return (
        <div className="flex flow-col align-center">
          <TokenIcon
            name={entity.pool?.token?.icon as TokenIconNames}
            bubble1Name={projectToken.icon}
            bubble2Name={entity.pool?.market?.icon.active as TokenIconNames}
            className="mr-16"
          />
          <div className="flex flow-row">
            <ExplorerAddressLink address={entity.pool?.smartYieldAddress} className="flex flow-col mb-4">
              <Text type="body1" weight="semibold" color="primary" className="mr-4">
                {entity.pool?.underlyingSymbol}
              </Text>
            </ExplorerAddressLink>
            <Text type="caption" weight="semibold">
              {entity.pool?.market?.name}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Transaction hash/timestamp',
    render: (_, entity) => (
      <>
        <ExplorerTxLink address={entity.transactionHash} variation="link" className="mb-4">
          {shortenAddr(entity.transactionHash)}
        </ExplorerTxLink>
        <Text type="caption" weight="semibold" color="secondary">
          {formatDateTime(entity.blockTimestamp * 1_000)}
        </Text>
      </>
    ),
  },
  {
    title: 'Tokens in',
    align: 'right',
    sorter: (a, b) => a.tokensIn.toNumber() - b.tokensIn.toNumber(),
    render: function Render(_, entity) {
      const { getAmountInUSD } = useTokens();
      const value = entity.tokensIn;
      const uValue = value?.multipliedBy(entity.pool?.state.jTokenPrice ?? 0);
      const valueInUSD = getAmountInUSD(uValue, entity.pool?.underlyingSymbol!);

      return (
        <>
          <Tooltip title={formatBigValue(entity.tokensIn, entity.pool?.underlyingDecimals)}>
            <Text type="body1" weight="semibold" color="primary">
              {formatToken(entity.tokensIn, {
                tokenName: entity.pool?.contracts.smartYield?.symbol,
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
    title: 'Underlying out',
    align: 'right',
    sorter: (a, b) => a.underlyingOut.toNumber() - b.underlyingOut.toNumber(),
    render: function Render(_, entity) {
      const { getAmountInUSD } = useTokens();
      return (
        <>
          <Tooltip title={formatBigValue(entity.underlyingOut, entity.pool?.underlyingDecimals)}>
            <Text type="body1" weight="semibold" color="primary">
              {formatToken(entity.underlyingOut, {
                tokenName: entity.pool?.underlyingSymbol,
              })}
            </Text>
          </Tooltip>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(getAmountInUSD(entity.underlyingOut, entity.pool?.underlyingSymbol))}
          </Text>
        </>
      );
    },
  },
  {
    title: 'Forfeits',
    align: 'right',
    sorter: (a, b) => a.forfeits?.toNumber() ?? 0 - b.underlyingOut?.toNumber() ?? 0,
    render: function Render(_, entity) {
      const { getAmountInUSD } = useTokens();
      return (
        <>
          <Tooltip title={formatBigValue(entity.forfeits ?? BigNumber.ZERO, entity.pool?.underlyingDecimals)}>
            <Text type="body1" weight="semibold" color="primary">
              {formatToken(entity.forfeits, {
                tokenName: entity.pool?.underlyingSymbol,
              })}
            </Text>
          </Tooltip>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(getAmountInUSD(entity.forfeits, entity.pool?.underlyingSymbol))}
          </Text>
        </>
      );
    },
  },
  {
    title: 'Withdraw type',
    align: 'right',
    render: (_, entity) => (
      <Text type="body1" weight="semibold" color="primary">
        {JuniorPastPositionTypes.get(entity.transactionType)}
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
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
};

type Props = {
  originatorFilter: string;
  tokenFilter: string;
  transactionTypeFilter: string;
};

const PastPositionsTable: React.FC<Props> = props => {
  const { originatorFilter, tokenFilter, transactionTypeFilter } = props;

  const wallet = useWallet();
  const poolsCtx = usePools();
  const syAPI = useSyAPI();

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
        const pastPositions = await syAPI.fetchSYJuniorPastPositions(
          wallet.account,
          state.page,
          state.pageSize,
          originatorFilter,
          tokenFilter,
          transactionTypeFilter,
        );

        const data = pastPositions.data.map(item => {
          const pool = pools.find(poolItem => poolItem.smartYieldAddress === item.smartYieldAddress);

          return {
            ...item,
            pool,
          };
        });

        setState(
          mergeState<State>({
            loading: false,
            data,
            total: pastPositions.meta.count,
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
  }, [wallet.account, state.page, originatorFilter, tokenFilter, transactionTypeFilter]);

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
      rowKey="transactionHash"
      loading={state.loading}
      pagination={{
        total: state.total,
        pageSize: state.pageSize,
        current: state.page,
        position: ['bottomRight'],
        showTotal: (total: number, [from, to]: [number, number]) => (
          <Text type="body2" weight="semibold" color="secondary">
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
