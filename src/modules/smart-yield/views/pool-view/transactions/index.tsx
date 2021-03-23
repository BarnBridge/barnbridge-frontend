import React from 'react';
import { SelectValue } from 'antd/lib/select';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatToken, formatUSD, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Table from 'components/antd/table';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import {
  APISYRewardPoolTransaction,
  Markets,
  Pools,
  RewardHistoryShortTypes,
  fetchSYRewardPoolTransactions,
} from 'modules/smart-yield/api';
import { SYRewardPool, useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

type TableEntity = APISYRewardPoolTransaction & {
  pool?: SYRewardPool;
};

type State = {
  transactions: TableEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  filters: {
    type: string;
  };
};

const InitialState: State = {
  transactions: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  filters: {
    type: 'all',
  },
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Transaction',
    render: (_, entity) => {
      const market = Markets.get(entity.pool?.protocolId ?? '');
      const meta = Pools.get(entity.pool?.underlyingSymbol ?? '');

      return (
        <div className="flex flow-col col-gap-16 align-center">
          {market && meta && <IconBubble name={meta.icon} bubbleName="bond-token" secondBubbleName={market.icon} />}
          <div>
            <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
              {RewardHistoryShortTypes.get(entity.transactionType) ?? entity.transactionType}
            </Text>
            <Text type="small" weight="semibold" wrap={false}>
              {entity.pool?.poolToken.symbol}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Amount',
    render: (_, entity) => (
      <>
        <Tooltip
          title={formatToken(entity.amount, {
            decimals: entity.pool?.poolTokenDecimals,
          })}>
          <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
            {formatToken(entity.amount, {
              tokenName: entity.pool?.poolToken.symbol,
            })}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" wrap={false}>
          {formatUSD(entity.pool?.poolToken.convertInUnderlying(entity.amount)?.multipliedBy(1))}
        </Text>
      </>
    ),
  },
  {
    title: 'Transaction hash/timestamp',
    render: (_, entity) => (
      <>
        <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)} className="link-blue mb-4">
          {shortenAddr(entity.transactionHash)}
        </ExternalLink>
        <Text type="small" weight="semibold" color="secondary">
          {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
        </Text>
      </>
    ),
  },
];

const Transactions: React.FC = () => {
  const wallet = useWallet();
  const rewardPool = useRewardPool();

  const [state, setState] = React.useState<State>(InitialState);
  const [activeTab, setActiveTab] = React.useState('own');

  const txOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All transactions',
        value: 'all',
      },
      ...Array.from(RewardHistoryShortTypes).map(([value, label]) => ({ label, value })),
    ];
  }, []);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        type: 'all',
      },
    }));
  }, [activeTab]);

  React.useEffect(() => {
    if (!rewardPool.pool) {
      return;
    }

    const { poolAddress } = rewardPool.pool;

    setState(prevState => ({
      ...prevState,
      loading: true,
      transactions: [],
      total: 0,
    }));

    (async () => {
      try {
        const {
          data: transactions,
          meta: { count },
        } = await fetchSYRewardPoolTransactions(
          poolAddress,
          state.page,
          state.pageSize,
          activeTab === 'own' ? wallet.account : 'all',
          state.filters.type,
        );

        setState(prevState => ({
          ...prevState,
          loading: false,
          transactions: transactions.map(transaction => ({
            ...transaction,
            pool: rewardPool.pool,
          })),
          total: count,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, [rewardPool.pool, wallet, activeTab, state.page, state.pageSize, state.filters]);

  function handleTypeFilterChange(value: SelectValue) {
    setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        type: String(value),
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
      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Select
            className="full-width"
            options={txOpts}
            value={state.filters.type}
            onChange={handleTypeFilterChange}
          />
        }>
        <Tabs.Tab key="own" tab="My transactions" />
        <Tabs.Tab key="all" tab="All transactions" />
      </Tabs>

      <Table<TableEntity>
        columns={Columns}
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

export default Transactions;
