import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { capitalize } from 'lodash';

import Dropdown, { DropdownOption } from 'components/dropdown';
import ExternalLink from 'components/externalLink';
import { getEtherscanTxUrl } from 'web3/utils';
import { useTransactions } from 'hooks/useTransactions';

import { TOKEN_DAI_KEY, TOKEN_SUSD_KEY, TOKEN_UNISWAP_KEY, TOKEN_USDC_KEY, TOKENS_MAP } from 'web3/contracts';

import { ReactComponent as EmptyBoxSvg } from 'resources/svg/empty-box.svg';

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
  stableToken?: boolean;
  lpToken?: boolean;
};

const PoolTransactionTable: React.FunctionComponent<PoolTransactionTableProps> = props => {
  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const { loading, data, isEnd, fetch, fetchMore } = useTransactions({
    token: tokenFilter !== 'all' ? tokenFilter as string : undefined,
    type: typeFilter !== 'all' ? typeFilter as string : undefined,
  });

  const tokenFilterOptions = React.useMemo<DropdownOption[]>(() => {
    return [
      { value: 'all', label: 'All tokens' },
      ...props.stableToken ? [
        { value: TOKENS_MAP.get(TOKEN_USDC_KEY)?.address ?? TOKEN_USDC_KEY, label: TOKEN_USDC_KEY },
        { value: TOKENS_MAP.get(TOKEN_DAI_KEY)?.address ?? TOKEN_DAI_KEY, label: TOKEN_DAI_KEY },
        { value: TOKENS_MAP.get(TOKEN_SUSD_KEY)?.address ?? TOKEN_SUSD_KEY, label: TOKEN_SUSD_KEY },
      ] : [],
      ...props.lpToken ? [
        { value: TOKENS_MAP.get(TOKEN_UNISWAP_KEY)?.address ?? TOKEN_UNISWAP_KEY, label: TOKEN_UNISWAP_KEY },
      ] : [],
    ];
  }, [props.stableToken, props.lpToken]);

  React.useEffect(() => {
    fetch();
  }, [fetch]);

  function handleLoadMore() {
    fetchMore();
  }

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
        scroll={{ x: true }}
        locale={{
          emptyText: (
            <div className={s.emptyBlock}>
              <EmptyBoxSvg />
              <div className={s.emptyLabel}>There are no transaction to show</div>
            </div>
          ),
        }}
        footer={!isEnd ? () => (
          <Antd.Button
            type="primary"
            className={s.moreBtn}
            disabled={loading}
            onClick={handleLoadMore}>Show more transactions</Antd.Button>
        ) : undefined}
      />
    </div>
  );
};

export default PoolTransactionTable;
