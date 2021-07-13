import { useState } from 'react';
import cn from 'classnames';

import Select from 'components/antd/select';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Tabs } from 'components/custom/tabs';
import { TransactionApiType } from 'modules/smart-exposure/api';
import { TransactionsTable } from 'modules/smart-exposure/components/transactions-table';
import { useWallet } from 'wallets/walletProvider';

import { PositionsTable } from './positions';

type FiltersStateType = {
  transactionType: TransactionApiType['transactionType'] | '';
};

const tabs: { id: 'positions' | 'transactionHistory'; children: string }[] = [
  {
    id: 'positions',
    children: 'Positions',
  },
  {
    id: 'transactionHistory',
    children: 'Transaction history',
  },
];

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

type Props = {
  poolAddress?: string;
  className?: string;
};

export const PortfolioTable: React.FC<Props> = ({ poolAddress, className }) => {
  const [activeTab, setActiveTab] = useState<'positions' | 'transactionHistory'>(tabs[0].id);
  const { account } = useWallet();
  const [filtersState, setFiltersState] = useState<FiltersStateType>(initialFiltersState);

  function handleFilterChange(filters: Record<string, any>) {
    setFiltersState(prevState => ({
      ...prevState,
      ...filters,
    }));
  }

  return (
    <section className={cn('card', className)}>
      <header
        className="card-header flex align-center p-0"
        style={{
          borderBottom: '1px solid var(--theme-border-color)',
          overflowX: 'auto',
          paddingRight: 16,
          paddingLeft: 24,
        }}>
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} variation="normal" size="small" />
        {activeTab === 'transactionHistory' && (
          <TableFilter
            filters={filtersOptions}
            value={filtersState}
            onChange={handleFilterChange}
            className="ml-auto"
          />
        )}
      </header>
      {activeTab === 'positions' ? (
        <PositionsTable poolAddress={poolAddress} />
      ) : (
        <TransactionsTable
          poolAddress={poolAddress}
          accountAddress={account}
          transactionType={filtersState.transactionType || undefined}
        />
      )}
    </section>
  );
};
