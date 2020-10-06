import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { capitalize } from 'lodash';

import Dropdown, { DropdownOption } from 'components/dropdown';

import { useTransactions } from 'hooks/useTransactions';

import s from './styles.module.css';

const TokenFilters: DropdownOption[] = [
  { value: 'all', label: 'All tokens' },
  { value: 'usdc', label: 'USDC' },
  { value: 'dai', label: 'DAI' },
  { value: 'susd', label: 'sUSD' },
  { value: 'uni', label: 'USDC_BOND_UNI_LP' },
];

const ShowFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'deposit', label: 'Deposits' },
  { value: 'withdraw', label: 'Withdrawals' },
];

const Columns: ColumnsType<any> = [
  {
    title: 'From',
    dataIndex: 'userShort',
  },
  {
    title: 'TX Hash',
    dataIndex: 'txHashShort',
    render: (value, row) => {
      return (
        <a href={`https://rinkeby.etherscan.io/tx/${row.txHash}`}
           rel="noopener noreferrer"
           target="_blank">{value}</a>
      );
    },
  },
  {
    title: 'Time',
    dataIndex: 'timeDistance',
  },
  {
    title: 'Amount',
    dataIndex: 'amountFormat',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: value => capitalize(value),
  },
];

export type PoolTransactionTableProps = {
  label: string;
};

const PoolTransactionTable: React.FunctionComponent<PoolTransactionTableProps> = props => {
  const { loading, data } = useTransactions();

  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');
  const [showFilter, setShowFilter] = React.useState<string | number>('all');

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>{props.label}</div>
        <div className={s.filters}>
          <Dropdown
            button
            label="Tokens"
            items={TokenFilters}
            selected={tokenFilter}
            onSelect={setTokenFilter}
          />
          <Dropdown
            button
            label="Show"
            items={ShowFilters}
            selected={showFilter}
            onSelect={setShowFilter}
          />
        </div>
      </div>
      <Antd.Table
        className={s.table}
        loading={loading}
        columns={Columns}
        rowKey="txHash"
        dataSource={data}
      />
    </div>
  );
};

export default PoolTransactionTable;
