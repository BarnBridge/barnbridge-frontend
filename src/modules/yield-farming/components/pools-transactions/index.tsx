import React, { FC, useEffect, useMemo, useState } from 'react';
import { SelectValue } from 'antd/lib/select';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Table from 'components/antd/table';
import ExternalLink from 'components/custom/externalLink';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { APIYFPoolActionType, APIYFPoolTransaction, useYfAPI } from 'modules/yield-farming/api';
import { useWallet } from 'wallets/walletProvider';

import { useYFPools } from '../../providers/pools-provider';

type TableEntity = APIYFPoolTransaction;

type State = {
  transactions: TableEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  filters: {
    actionType: string;
    tokenAddress: string;
  };
};

const InitialState: State = {
  transactions: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  filters: {
    actionType: 'all',
    tokenAddress: 'all',
  },
};

function getColumns(isAll: boolean): ColumnsType<TableEntity> {
  return [
    {
      title: 'Transaction',
      width: '25%',
      render: function TransactionColumn(_, entity) {
        const { getTokenByAddress } = useKnownTokens();
        const knownToken = getTokenByAddress(entity.tokenAddress);

        if (!knownToken) {
          return null;
        }

        return (
          <div className="flex flow-col col-gap-16 align-center">
            <TokenIcon name={knownToken.icon as TokenIconNames} size={40} />
            <div>
              <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
                {entity.actionType === APIYFPoolActionType.DEPOSIT && 'Stake'}
                {entity.actionType === APIYFPoolActionType.WITHDRAW && 'Unstake'}
              </Text>
              <Text type="small" weight="semibold" wrap={false}>
                {knownToken.name}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Amount',
      width: '25%',
      render: function AmountColumn(_, entity) {
        const { getTokenByAddress, convertTokenInUSD } = useKnownTokens();
        const isStake = entity.actionType === APIYFPoolActionType.DEPOSIT;
        const knownToken = getTokenByAddress(entity.tokenAddress);

        if (!knownToken) {
          return null;
        }

        const amount = entity.amount.unscaleBy(knownToken.decimals);

        return (
          <>
            <Text type="p1" weight="semibold" wrap={false} color={isStake ? 'green' : 'red'} className="mb-4">
              {isStake ? '+' : '-'}
              {formatToken(amount, {
                tokenName: knownToken.symbol,
                decimals: knownToken.decimals,
              }) ?? '-'}
            </Text>
            <Text type="small" weight="semibold" wrap={false}>
              {formatUSD(convertTokenInUSD(amount, knownToken.symbol))}
            </Text>
          </>
        );
      },
    },
    isAll
      ? {
          title: 'Address',
          dataIndex: 'from',
          width: '25%',
          render: function Render(_, entity) {
            const { getEtherscanAddressUrl } = useWeb3();

            return (
              <ExternalLink href={getEtherscanAddressUrl(entity.userAddress)} className="link-blue">
                <Text type="p1" weight="semibold">
                  {shortenAddr(entity.userAddress)}
                </Text>
              </ExternalLink>
            );
          },
        }
      : {},
    {
      title: 'Transaction hash/timestamp',
      width: '25%',
      render: function Render(_, entity) {
        const { getEtherscanTxUrl } = useWeb3();

        return (
          <>
            <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)} className="link-blue mb-4">
              <Text type="p1" weight="semibold">
                {shortenAddr(entity.transactionHash)}
              </Text>
            </ExternalLink>
            <Text type="small" weight="semibold" color="secondary">
              {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
            </Text>
          </>
        );
      },
    },
  ];
}

const TX_OPTS: SelectOption[] = [
  {
    label: 'All transactions',
    value: 'all',
  },
  {
    label: 'Stake',
    value: APIYFPoolActionType.DEPOSIT,
  },
  {
    label: 'Unstake',
    value: APIYFPoolActionType.WITHDRAW,
  },
];

const PoolsTransactions: FC = () => {
  const walletCtx = useWallet();
  const poolsCtx = useYFPools();
  const yfAPI = useYfAPI();

  const [state, setState] = useState<State>(InitialState);
  const [activeTab, setActiveTab] = useState('all');

  const tokens = useMemo(() => {
    return poolsCtx.yfPools.map(pool => pool.tokens).flat();
  }, []);

  const tableColumns = useMemo(() => {
    return getColumns(activeTab === 'all');
  }, [activeTab]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        actionType: 'all',
        tokenAddress: 'all',
      },
    }));
  }, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      page: 1,
    }));
  }, [activeTab]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      total: 0,
    }));

    (async () => {
      try {
        const {
          data: transactions,
          meta: { count },
        } = await yfAPI.fetchYFPoolTransactions(
          state.page,
          state.pageSize,
          state.filters.tokenAddress,
          activeTab === 'own' ? walletCtx.account ?? 'all' : 'all',
          state.filters.actionType,
        );

        setState(prevState => ({
          ...prevState,
          loading: false,
          transactions,
          total: count,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
          transactions: [],
        }));
      }
    })();
  }, [walletCtx.account, activeTab, state.page, state.pageSize, state.filters]);

  function handleTokenFilterChange(value: SelectValue) {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        tokenAddress: String(value),
      },
    }));
  }

  function handleTypeFilterChange(value: SelectValue) {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        actionType: String(value),
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
    <div className="card mb-32">
      <div className="card-header flex flow-col align-center justify-space-between pv-0">
        <Tabs
          activeKey={activeTab}
          tabs={[
            {
              id: 'all',
              children: 'Transactions',
            },
          ]}
          onClick={setActiveTab}
        />
        <div className="flex align-center">
          {tokens.length! > 1 && (
            <Select
              className="mr-16"
              style={{ minWidth: 150 }}
              options={[
                {
                  value: 'all',
                  label: 'All tokens',
                },
                ...tokens.map(token => ({
                  value: token.address ?? 'all',
                  label: token.symbol,
                })),
              ]}
              value={state.filters.tokenAddress}
              onChange={handleTokenFilterChange}
            />
          )}

          <Select
            style={{ minWidth: 200 }}
            options={TX_OPTS}
            value={state.filters.actionType}
            onChange={handleTypeFilterChange}
          />
        </div>
      </div>

      <Table<TableEntity>
        columns={tableColumns}
        dataSource={state.transactions}
        loading={state.loading}
        rowKey="transactionHash"
        pagination={{
          total: state.total,
          current: state.page,
          pageSize: state.pageSize,
          position: ['bottomRight'],
          showTotal: (total: number, [from, to]: [number, number]) => (
            <Text type="p2" weight="semibold" color="secondary">
              Showing {from} to {to} out of {total} transactions
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

export default PoolsTransactions;
