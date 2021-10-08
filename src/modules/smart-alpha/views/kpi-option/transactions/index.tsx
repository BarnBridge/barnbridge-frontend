import React, { FC, useEffect, useMemo, useState } from 'react';
import { SelectValue } from 'antd/lib/select';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink, ExplorerTxLink } from 'components/custom/externalLink';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { KpiOptionType, KpiTransactionType, useFetchKpiOptionTransactions } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { getKpiOptionTokenIconNames } from 'modules/smart-alpha/utils';

import s from './s.module.scss';

function getColumns(kpiOption: KpiOptionType, isAll: boolean): ColumnType<KpiTransactionType>[] {
  return [
    {
      heading: 'Transaction',
      render: entity => {
        const [tokenName, tokenBubble1Name, tokenBubble2Name] = getKpiOptionTokenIconNames(kpiOption.poolToken.symbol);

        return (
          <div className="flex flow-col col-gap-16 align-center">
            <TokenIcon
              name={tokenName}
              bubble1Name={tokenBubble1Name}
              bubble2Name={tokenBubble2Name}
              outline={['purple', 'green']}
            />
            <div>
              <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
                {entity.transactionType}
              </Text>
              <Text type="small" weight="semibold" wrap={false}>
                {kpiOption.poolToken.symbol}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      heading: 'Amount',
      render: function TransactionRender(entity) {
        const { getAmountInUSD } = useTokens();
        const isStake = entity.transactionType === 'DEPOSIT';
        const amount = BigNumber.from(entity.amount);
        const amountInUSD = getAmountInUSD(amount, kpiOption.poolToken.symbol!);

        return (
          <>
            <Tooltip
              placement="bottomLeft"
              title={
                formatToken(amount, {
                  decimals: kpiOption.poolToken.decimals,
                }) ?? '-'
              }>
              <Text type="p1" weight="semibold" wrap={false} color={isStake ? 'green' : 'red'} className="mb-4">
                {isStake ? '+' : '-'}
                {formatToken(amount, {
                  tokenName: kpiOption.poolToken.symbol,
                }) ?? '-'}
              </Text>
            </Tooltip>
            <Text type="small" weight="semibold" wrap={false}>
              {formatUSD(amountInUSD)}
            </Text>
          </>
        );
      },
    },
    ...(isAll
      ? [
          {
            heading: 'Address',
            render: entity => (
              <ExplorerAddressLink address={entity.userAddress} className="link-blue">
                <Text type="p1" weight="semibold">
                  {shortenAddr(entity.userAddress)}
                </Text>
              </ExplorerAddressLink>
            ),
          },
        ]
      : []),
    {
      heading: 'Transaction hash/timestamp',
      render: entity => (
        <>
          <ExplorerTxLink address={entity.transactionHash} className="link-blue mb-4">
            <Text type="p1" weight="semibold">
              {shortenAddr(entity.transactionHash)}
            </Text>
          </ExplorerTxLink>
          <Text type="small" weight="semibold" color="secondary">
            {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
          </Text>
        </>
      ),
    },
  ];
}

const Transactions: FC<{ poolAddress: string; kpiOption: KpiOptionType; version: number }> = ({
  poolAddress,
  kpiOption,
  version,
}) => {
  const wallet = useWallet();

  const limit = 10;
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(wallet.isActive ? 'own' : 'all');
  const [transactionType, setTransactionType] = useState('all');

  const { data, loading, load } = useFetchKpiOptionTransactions(
    poolAddress,
    page,
    limit,
    activeTab === 'own' ? wallet.account : 'all',
    transactionType,
  );

  useEffect(() => {
    if (version > 0) {
      load().catch(Error);
    }
  }, [version]);

  const kpiTransactions = data?.data;
  const totalTransactions = data?.meta.count ?? 0;

  const txOpts = useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All transactions',
        value: 'all',
      },
      {
        label: 'Deposit',
        value: 'deposit',
      },
      {
        label: 'Withdraw',
        value: 'withdraw',
      },
    ];
  }, []);

  useEffect(() => {
    setPage(1);
    setTransactionType('all');
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(wallet.isActive ? 'own' : 'all');
  }, [wallet.isActive]);

  function handleTypeFilterChange(value: SelectValue) {
    setPage(1);
    setTransactionType(String(value));
  }

  function handlePageChange(page: number) {
    setPage(page);
  }

  const tableColumns = useMemo(() => {
    return getColumns(kpiOption, activeTab === 'all');
  }, [kpiOption, activeTab]);

  return (
    <div className="card mb-32">
      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Select className="full-width" options={txOpts} value={transactionType} onChange={handleTypeFilterChange} />
        }>
        {wallet.isActive && <Tabs.Tab key="own" tab="My transactions" />}
        <Tabs.Tab key="all" tab="All transactions" />
      </Tabs>

      <Table<KpiTransactionType>
        columns={tableColumns}
        data={kpiTransactions ?? []}
        rowKey={item => item.transactionHash}
        loading={loading}
      />
      <TableFooter
        total={totalTransactions}
        current={page}
        pageSize={limit}
        onChange={handlePageChange}
        text={({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} transactions
          </>
        )}
      />
    </div>
  );
};

export default Transactions;
