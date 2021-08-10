import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';

import Select from 'components/antd/select';
import { Chart } from 'components/chart';
import TableFilter from 'components/custom/table-filter';
import { PeriodChartTabs, PeriodTabsKey } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { TransactionsTable } from 'modules/smart-exposure/components/transactions-table';

import data from './mock';

import { formatTick } from 'utils/chart';

const MarketView = () => {
  return (
    <>
      <TokensPrice className="mb-32" />
      <PoolPerformance />
    </>
  );
};

export default MarketView;

const TokensPrice: React.FC<{ className?: string }> = ({ className }) => {
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="p1" weight="semibold">
          Tokens price
        </Text>
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </div>
      <Chart
        data={data}
        x={{
          key: 'point',
          format: item => formatTick(item, PeriodTabsKey.month),
          itemFormat: item => format(new Date(item), 'MM.dd.yyyy HH:mm'),
        }}
        y={{
          format: value =>
            Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value),
          itemsFormat: value => Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value),
          items: [
            {
              key: 'tokenALiquidity',
              title: 'TokenA',
              color: 'yellow',
            },
            {
              key: 'tokenBLiquidity',
              title: 'TokenB',
              color: 'purple',
            },
          ],
        }}
      />
    </div>
  );
};

const PoolPerformance: React.FC<{ className?: string }> = ({ className }) => {
  const [periodFilter, setPeriodFilter] = useState<PeriodTabsKey>(PeriodTabsKey.day);

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="p1" weight="semibold">
          Pool performance
        </Text>
        <PeriodChartTabs activeKey={periodFilter} onClick={setPeriodFilter} size="small" className="ml-auto" />
      </div>
      <Chart
        data={data}
        x={{
          key: 'point',
          format: item => formatTick(item, PeriodTabsKey.month),
          itemFormat: item => format(new Date(item), 'MM.dd.yyyy HH:mm'),
        }}
        y={{
          format: value =>
            Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(value),
          itemsFormat: value => Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value),
          items: [
            {
              key: 'tokenALiquidity',
              title: 'TokenA',
              color: 'yellow',
            },
            {
              key: 'tokenBLiquidity',
              title: 'TokenB',
              color: 'purple',
            },
          ],
        }}
      />
    </div>
  );
};

// const filtersOptions: TableFilterType[] = [
//   {
//     name: 'transactionType',
//     label: 'Transaction type',
//     defaultValue: '',
//     itemRender: () => {
//       const tokenOpts = [
//         {
//           value: '',
//           label: 'All types',
//         },
//         {
//           value: 'DEPOSIT',
//           label: 'Deposit',
//         },
//         {
//           value: 'WITHDRAW',
//           label: 'Withdraw',
//         },
//       ];

//       return <Select options={tokenOpts} className="full-width" />;
//     },
//   },
// ];

// type FiltersStateType = {
//   transactionType: TransactionApiType['transactionType'] | '';
// };

// const initialFiltersState: FiltersStateType = {
//   transactionType: '',
// };

// const TransactionHistory: React.FC<{ className?: string }> = ({ className }) => {
//   const [filtersState, setFiltersState] = useState<FiltersStateType>(initialFiltersState);

//   return (
//     <div className="card">
//       <header
//         className="flex align-center"
//         style={{
//           borderBottom: '1px solid var(--theme-border-color)',
//           padding: '12px 16px 12px 24px',
//           overflowX: 'auto',
//         }}>
//         <div className="text-p1 fw-semibold color-primary mr-8">Transaction history</div>
//         <TableFilter filters={filtersOptions} value={filtersState} onChange={handleFilterChange} className="ml-auto" />
//       </header>
//       <TransactionsTable transactionType={filtersState.transactionType || undefined} />
//     </div>
//   );
// };
