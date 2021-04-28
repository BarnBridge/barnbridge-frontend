import React from 'react';
import { SelectValue } from 'antd/lib/select';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatToken, formatUSD, getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Table from 'components/antd/table';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { convertTokenInUSD, getTokenByAddress, useKnownTokens } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { APIYFPoolActionType, APIYFPoolTransaction, fetchYFPoolTransactions } from 'modules/yield-farming/api';
import { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

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

const TransactionColumn: React.FC<{ entity: TableEntity }> = props => {
  const { entity } = props;
  const knownToken = getTokenByAddress(entity.tokenAddress);

  if (!knownToken) {
    return null;
  }

  return (
    <div className="flex flow-col col-gap-16 align-center">
      <Icon name={knownToken.icon as IconNames} width={40} height={40} />
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
};

const AmountColumn: React.FC<{ entity: TableEntity }> = props => {
  const { entity } = props;
  const isStake = entity.actionType === APIYFPoolActionType.DEPOSIT;
  const knownToken = getTokenByAddress(entity.tokenAddress);

  if (!knownToken) {
    return null;
  }

  const amount = entity.amount.unscaleBy(knownToken.decimals);

  return (
    <>
      <Tooltip
        placement="bottomLeft"
        title={
          <Text type="p2" weight="semibold" color="primary">
            {formatToken(amount, {
              decimals: knownToken.decimals,
            }) ?? '-'}
          </Text>
        }>
        <Text type="p1" weight="semibold" wrap={false} color={isStake ? 'green' : 'red'} className="mb-4">
          {isStake ? '+' : '-'}
          {formatToken(amount, {
            tokenName: knownToken.symbol,
          }) ?? '-'}
        </Text>
      </Tooltip>
      <Text type="small" weight="semibold" wrap={false}>
        {formatUSD(convertTokenInUSD(amount, knownToken.symbol))}
      </Text>
    </>
  );
};

function getColumns(isAll: boolean): ColumnsType<TableEntity> {
  return [
    {
      title: 'Transaction',
      width: '25%',
      render: (_, entity) => <TransactionColumn entity={entity} />,
    },
    {
      title: 'Amount',
      width: '25%',
      render: (_, entity) => <AmountColumn entity={entity} />,
    },
    isAll
      ? {
          title: 'Address',
          dataIndex: 'from',
          width: '25%',
          render: (_, entity) => (
            <ExternalLink href={getEtherscanAddressUrl(entity.userAddress)} className="link-blue">
              <Text type="p1" weight="semibold">
                {shortenAddr(entity.userAddress)}
              </Text>
            </ExternalLink>
          ),
        }
      : {},
    {
      title: 'Transaction hash/timestamp',
      width: '25%',
      render: (_, entity) => (
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
      ),
    },
  ];
}

const TX_OPTS: SelectOption[] = [
  {
    label: 'All pool transactions',
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

const PoolTransactions: React.FC = () => {
  const knownTokensCtx = useKnownTokens();
  const wallet = useWallet();
  const yfPoolCtx = useYFPool();

  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);
  const [activeTab, setActiveTab] = React.useState(wallet.isActive ? 'own' : 'all');

  const defaultSelectedToken = knownTokensCtx.getTokenBySymbol(yfPoolCtx.poolMeta?.tokens[0]!);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        actionType: 'all',
        tokenAddress: defaultSelectedToken?.address ?? 'all',
      },
    }));

    function onPoolTx() {
      if (activeTab === 'own') {
        reload();
      }
    }

    yfPoolCtx.poolMeta?.contract.on('tx:success', onPoolTx);

    return () => {
      yfPoolCtx.poolMeta?.contract.off('tx:success', onPoolTx);
    };
  }, [yfPoolCtx.poolMeta]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      page: 1,
    }));
  }, [activeTab]);

  React.useEffect(() => {
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
        } = await fetchYFPoolTransactions(
          state.page,
          state.pageSize,
          state.filters.tokenAddress,
          activeTab === 'own' ? wallet.account : 'all',
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
  }, [yfPoolCtx.poolMeta, wallet.account, activeTab, state.page, state.pageSize, state.filters, version]);

  React.useEffect(() => {
    setActiveTab(wallet.isActive ? 'own' : 'all');
  }, [wallet.isActive]);

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

  const tableColumns = React.useMemo(() => {
    return getColumns(activeTab === 'all');
  }, [activeTab]);

  return (
    <div className="card mb-32">
      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <div className="flex align-center">
            {yfPoolCtx.poolMeta?.tokens.length! > 1 && (
              <Select
                className="full-width mr-16"
                options={
                  yfPoolCtx.poolMeta?.tokens.map(token => ({
                    value: knownTokensCtx.getTokenBySymbol(token)?.address ?? 'all',
                    label: token,
                  })) ?? []
                }
                value={state.filters.tokenAddress}
                onChange={handleTokenFilterChange}
              />
            )}

            <Select
              className="full-width"
              options={TX_OPTS}
              value={state.filters.actionType}
              onChange={handleTypeFilterChange}
            />
          </div>
        }>
        {wallet.isActive && <Tabs.Tab key="own" tab="My transactions" />}
        <Tabs.Tab key="all" tab="All transactions" />
      </Tabs>

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

export default PoolTransactions;
