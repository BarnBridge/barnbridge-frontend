import { useState } from 'react';

import Select from 'components/antd/select';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { TrancheApiType, TransactionApiType } from 'modules/smart-exposure/api';
import { TransactionsTable } from 'modules/smart-exposure/components/transactions-table';

type FiltersStateType = {
  transactionType: TransactionApiType['transactionType'] | '';
};

const initialFiltersState: FiltersStateType = {
  transactionType: '',
};

const filtersOptions: TableFilterType[] = [
  {
    name: 'transactionType',
    label: 'Transaction type',
    defaultValue: '',
    itemRender: () => {
      const tokenOpts = [
        {
          value: '',
          label: 'All types',
        },
        {
          value: 'DEPOSIT',
          label: 'Deposit',
        },
        {
          value: 'WITHDRAW',
          label: 'Withdraw',
        },
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
        }}>
        <div className="text-p1 fw-semibold color-primary mr-8">Transaction history</div>
        <TableFilter filters={filtersOptions} value={filtersState} onChange={handleFilterChange} className="ml-auto" />
      </header>
      <TransactionsTable transactionType={filtersState.transactionType || undefined} />
    </div>
  );
};
