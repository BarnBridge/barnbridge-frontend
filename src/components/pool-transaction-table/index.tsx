import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatDistance } from 'date-fns';
import capitalize from 'lodash/capitalize';
import pipe from 'lodash/fp/pipe';
import filter from 'lodash/fp/filter';

import Dropdown, { DropdownOption } from 'components/dropdown';
import ExternalLink from 'components/externalLink';
import { PoolTransaction, usePoolTransactions } from 'components/pool-transactions-provider';

import { formatBigValue, getEtherscanTxUrl, shortenAddr } from 'web3/utils';
import {
  CONTRACT_DAI_ADDR,
  CONTRACT_SUSD_ADDR,
  CONTRACT_UNISWAP_V2_ADDR,
  CONTRACT_USDC_ADDR,
  TOKEN_DAI_KEY,
  TOKEN_SUSD_KEY,
  TOKEN_UNISWAP_KEY,
  TOKEN_USDC_KEY,
  useWeb3Contracts,
} from 'web3/contracts';
import { useWeb3 } from 'web3/provider';

import { ReactComponent as EmptyBoxSvg } from 'resources/svg/empty-box.svg';
import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: 'DEPOSIT', label: 'Deposits' },
  { value: 'WITHDRAW', label: 'Withdrawals' },
];

const Columns: ColumnsType<any> = [
  {
    title: '',
    dataIndex: 'token',
    width: 24,
    render: (value: string) => {
      switch (value) {
        case CONTRACT_USDC_ADDR:
          return (<USDCIcon className={s.icon} />);
        case CONTRACT_DAI_ADDR:
          return (<DAIIcon className={s.icon} />);
        case CONTRACT_SUSD_ADDR:
          return (<SUSDIcon className={s.icon} />);
        case CONTRACT_UNISWAP_V2_ADDR:
          return (<UNISWAPIcon className={s.icon} />);
      }
    },
  },
  {
    title: 'From',
    dataIndex: 'user',
    render: (value: string) => shortenAddr(value),
  },
  {
    title: 'TX Hash',
    dataIndex: 'txHash',
    render: (value: string) => (
      <ExternalLink href={getEtherscanTxUrl(value)}>{shortenAddr(value)}</ExternalLink>
    ),
  },
  {
    title: 'Time',
    dataIndex: 'blockTimestamp',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: PoolTransaction, b: PoolTransaction) => {
      return a.blockTimestamp - b.blockTimestamp;
    },
    render: (value: number) => formatDistance(new Date(value), new Date(), {
      addSuffix: true,
    }),
  },
  {
    title: 'Amount',
    dataIndex: 'usdAmount',
    sortDirections: ['descend', 'ascend'],
    sorter: (a: PoolTransaction, b: PoolTransaction) => {
      return (a.usdAmount?.toNumber() ?? 0) - (b.usdAmount?.toNumber() ?? 0);
    },
    align: 'right',
    render: (value: BigNumber, record: PoolTransaction) => {
      return (
        <Antd.Tooltip title={(
          <span>
            <strong>{record.tokenAmount?.toFormat()}</strong>&nbsp;
            {record.token === CONTRACT_USDC_ADDR && 'USDC'}
            {record.token === CONTRACT_DAI_ADDR && 'DAI'}
            {record.token === CONTRACT_SUSD_ADDR && 'SUSD'}
            {record.token === CONTRACT_UNISWAP_V2_ADDR && 'USDC_BOND_UNI_LP'}
          </span>
        )}>
          ${formatBigValue(value, 2, '-', 2)}
        </Antd.Tooltip>
      );
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: capitalize,
  },
];

export type PoolTransactionTableProps = {
  label: string;
  ownTransactions?: boolean;
  stableToken?: boolean;
  lpToken?: boolean;
};

const PoolTransactionTable: React.FunctionComponent<PoolTransactionTableProps> = props => {
  const { ownTransactions } = props;
  const { account } = useWeb3();
  const web3c = useWeb3Contracts();

  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const { loading, transactions } = usePoolTransactions();

  const tokenFilterOptions = React.useMemo<DropdownOption[]>(() => {
    return [
      { value: 'all', label: 'All tokens' },
      ...props.stableToken ? [
        { value: CONTRACT_USDC_ADDR, label: TOKEN_USDC_KEY },
        { value: CONTRACT_DAI_ADDR, label: TOKEN_DAI_KEY },
        { value: CONTRACT_SUSD_ADDR, label: TOKEN_SUSD_KEY },
      ] : [],
      ...props.lpToken ? [
        { value: CONTRACT_UNISWAP_V2_ADDR, label: TOKEN_UNISWAP_KEY },
      ] : [],
    ];
  }, [props.stableToken, props.lpToken]);

  const data = React.useMemo(() => {
    return pipe(
      // filter by own transactions
      ownTransactions
        ? filter({ user: account?.toLowerCase() })
        : (t: PoolTransaction) => t,
      // filter by transaction token
      tokenFilter !== 'all'
        ? filter({ token: tokenFilter })
        : (t: PoolTransaction) => t,
      // filter by transaction type
      typeFilter !== 'all'
        ? filter({ type: typeFilter })
        : (t: PoolTransaction) => t,
    )(transactions);
  }, [transactions, ownTransactions, tokenFilter, typeFilter, web3c.staking]);  // eslint-disable-line react-hooks/exhaustive-deps

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
            disabled={loading}
            onSelect={setTokenFilter}
          />
          <Dropdown
            button
            label="Show"
            items={TypeFilters}
            selected={typeFilter}
            disabled={loading}
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
        scroll={{ x: true }}
        locale={{
          emptyText: (
            <div className={s.emptyBlock}>
              <EmptyBoxSvg />
              <div className={s.emptyLabel}>There are no transaction to show</div>
            </div>
          ),
        }}
        showSorterTooltip={false}
        pagination={{
          pageSize: 10,
          defaultCurrent: 1,
          total: data.length,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showLessItems: true,
          showTotal: (total: number, range: number[]) => {
            return <span>Showing {range[0]} to {range[1]} out of {total} entries</span>;
          },
        }}
      />
    </div>
  );
};

export default PoolTransactionTable;
