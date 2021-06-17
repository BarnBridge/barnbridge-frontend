import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { formatUSD, getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Select from 'components/antd/select';
import Icon from 'components/custom/icon';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { getTokenIconBySymbol } from 'components/providers/known-tokens-provider';
import { TrancheApiType, TransactionApiType, fetchTransactions } from 'modules/smart-exposure/api';
import { TransactionsTable } from 'modules/smart-exposure/components/transactions-table';

type FiltersStateType = {
  originator: string;
  token: string;
};

const initialFiltersState: FiltersStateType = {
  originator: 'all',
  token: 'all',
};

const filtersOptions: TableFilterType[] = [
  {
    name: 'originator',
    label: 'Originators',
    defaultValue: 'all',
    itemRender: () => {
      const tokenOpts = [
        {
          value: 'all',
          label: 'All originators',
        },
        {
          value: 'asd',
          label: 'Asd',
        },
        {
          value: 'qwe',
          label: 'Qwe',
        },
        // ...Array.from(Markets.entries()).map(([key, value]) => ({
        //   value: key,
        //   label: value.name ?? '-',
        // })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
  {
    name: 'token',
    label: 'Token address',
    defaultValue: 'all',
    itemRender: () => {
      const tokenOpts = [
        {
          value: 'all',
          label: 'All tokens',
        },
        {
          value: 'asd1',
          label: 'Asd1',
        },
        {
          value: 'qwe1',
          label: 'Qwe1',
        },
        // ...Array.from(Pools.entries()).map(([key, value]) => ({
        //   value: key,
        //   label: value.name ?? '-',
        // })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
];

export const TransactionsView = ({ tranche }: { tranche: TrancheApiType }) => {
  const [filtersState, setFiltersState] = useState<FiltersStateType>(initialFiltersState);

  function handleFilterChange(filters: Record<string, any>) {
    setFiltersState(prevState => ({
      ...prevState,
      ...filters,
    }));
  }

  return (
    <div className="card">
      <header
        className="flex align-center"
        style={{
          borderBottom: '1px solid var(--theme-border-color)',
          padding: '12px 16px 12px 24px',
          overflowX: 'auto',
          // width: 100%;
        }}>
        <div className="text-p1 fw-semibold color-primary mr-8">Transaction history</div>
        <TableFilter filters={filtersOptions} value={filtersState} onChange={handleFilterChange} className="ml-auto" />
      </header>
      <TransactionsTable />
    </div>
  );
};
