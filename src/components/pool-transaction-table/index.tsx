import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { capitalize } from 'lodash';

import Dropdown, { DropdownOption } from 'components/dropdown';
import ExternalLink from 'components/externalLink';

import { TokenInfo } from 'web3/contracts';
import { getEtherscanTxUrl } from 'web3/utils';
import { useTransactions } from 'hooks/useTransactions';

import s from './styles.module.css';

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'DEPOSIT', label: 'Deposits' },
  { value: 'WITHDRAW', label: 'Withdrawals' },
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
        <ExternalLink href={getEtherscanTxUrl(row.txHash)}>{value}</ExternalLink>
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
  tokens: Map<string, TokenInfo>;
};

const PoolTransactionTable: React.FunctionComponent<PoolTransactionTableProps> = props => {
  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const { loading, data, fetch } = useTransactions({
    token: tokenFilter !== 'all' ? tokenFilter as string : undefined,
    type: typeFilter !== 'all' ? typeFilter as string : undefined,
  });

  const tokenFilterOptions = React.useMemo<DropdownOption[]>(() => {
    return [
      { value: 'all', label: 'All tokens' },
      ...Array.from(props.tokens.entries()).map(entry => ({
        value: entry[1].address,
        label: entry[0],
      })),
    ];
  }, [props.tokens]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerLabel}>{props.label}</div>
        <div className={s.filters}>
          <Dropdown
            button
            label="Tokens"
            items={tokenFilterOptions}
            selected={tokenFilter}
            onSelect={setTokenFilter}
          />
          <Dropdown
            button
            label="Show"
            items={TypeFilters}
            selected={typeFilter}
            onSelect={setTypeFilter}
          />
        </div>
      </div>
      <Antd.Table
        className={s.table}
        loading={loading}
        columns={Columns}
        rowKey="txHash"
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default PoolTransactionTable;
