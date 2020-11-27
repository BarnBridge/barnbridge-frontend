import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatDistance } from 'date-fns';
import capitalize from 'lodash/capitalize';
import cx from 'classnames';

import Dropdown, { DropdownOption } from 'components/dropdown';
import ExternalLink from 'components/externalLink';
import PoolTxListProvider, { PoolTxListItem, usePoolTxList } from 'views/pools/components/pool-tx-list-provider';

import { formatBigValue, formatUSDValue, getEtherscanTxUrl, getTokenMeta, shortenAddr } from 'web3/utils';
import { useWallet } from 'wallets/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';

import { ReactComponent as EmptyBoxSvg } from 'resources/svg/empty-box.svg';

import s from './styles.module.css';

const DEPOSITS_KEY = 'deposits';
const WITHDRAWALS_KEY = 'withdrawals';

const TypeFilters: DropdownOption[] = [
  { value: 'all', label: 'All transactions' },
  { value: DEPOSITS_KEY, label: 'Deposits' },
  { value: WITHDRAWALS_KEY, label: 'Withdrawals' },
];

const Columns: ColumnsType<any> = [
  {
    title: '',
    dataIndex: 'token',
    width: 24,
    className: s.iconCol,
    render: (value: string) => {
      return (
        <div className={s.icon}>{getTokenMeta(value)?.icon}</div>
      );
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
    render: (value: number) => formatDistance(new Date(value), new Date(), {
      addSuffix: true,
    }),
  },
  {
    title: 'Amount',
    dataIndex: 'usdAmount',
    align: 'right',
    render: (value: BigNumber, record: PoolTxListItem) => {
      const tokenMeta = getTokenMeta(record.token);

      return (
        <Antd.Tooltip title={(
          <span>
            <strong>{formatBigValue(record.amount)}</strong>&nbsp;
            {tokenMeta?.name}
          </span>
        )}>
          {formatUSDValue(value)}
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
  className?: string;
  label: string;
  ownTransactions?: boolean;
  deposits?: boolean;
  withdrawals?: boolean;
  stableToken?: boolean;
  unilpToken?: boolean;
  bondToken?: boolean;
};

const PoolTransactionTableInner: React.FunctionComponent<PoolTransactionTableProps> = props => {
  const { ownTransactions } = props;

  const web3c = useWeb3Contracts();
  const wallet = useWallet();
  const poolTxList = usePoolTxList();

  const [tokenFilter, setTokenFilter] = React.useState<string | number>('all');
  const [typeFilter, setTypeFilter] = React.useState<string | number>('all');

  const tokenFilterOptions = React.useMemo<DropdownOption[]>(() => {
    const options: DropdownOption[] = [];

    if (props.stableToken) {
      options.push(
        { value: USDCTokenMeta.address, label: USDCTokenMeta.name },
        { value: DAITokenMeta.address, label: DAITokenMeta.name },
        { value: SUSDTokenMeta.address, label: SUSDTokenMeta.name },
      );
    }

    if (props.unilpToken) {
      options.push({ value: UNISWAPTokenMeta.address, label: UNISWAPTokenMeta.name });
    }

    if (props.bondToken) {
      options.push({ value: BONDTokenMeta.address, label: BONDTokenMeta.name });
    }

    if (options.length !== 1) {
      options.unshift({ value: 'all', label: 'All tokens' });
    }

    return options;
  }, [props.stableToken, props.unilpToken, props.bondToken]);

  React.useEffect(() => {
    setTokenFilter(tokenFilterOptions[0].value);
  }, [tokenFilterOptions]);

  React.useEffect(() => {
    if (props.deposits) {
      setTypeFilter(DEPOSITS_KEY);
    } else if (props.withdrawals) {
      setTypeFilter(WITHDRAWALS_KEY);
    }
  }, [props.deposits, props.withdrawals]);

  React.useEffect(() => {
    poolTxList.load({
      user: ownTransactions ? wallet.account?.toLowerCase() : undefined,
      token: tokenFilter !== 'all' ? String(tokenFilter) : undefined,
      type: typeFilter !== 'all' ? String(typeFilter) : undefined,
    }).catch(x => x);
  }, [ownTransactions, tokenFilter, typeFilter]);  // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    poolTxList.startPooling();

    return () => {
      poolTxList.stopPooling();
    };
  }, []);

  const data = React.useMemo<(PoolTxListItem & { usdAmount: BigNumber | undefined })[]>(() => {
    return poolTxList.transactions.map(tx => {
      const price = web3c.getTokenUsdPrice(tx.token);

      return {
        ...tx,
        usdAmount: price ? tx.amount.multipliedBy(price) : undefined,
      };
    });
  }, [web3c, tokenFilter, poolTxList.transactions]);

  return (
    <div className={cx(s.component, props.className)}>
      <div className={s.header}>
        <div className={s.headerLabel}>{props.label}</div>
        <div className={s.filters}>
          <Dropdown
            button
            label="Tokens"
            items={tokenFilterOptions}
            selected={tokenFilter}
            disabled={poolTxList.loading}
            onSelect={setTokenFilter}
          />
          <Dropdown
            button
            label="Show"
            items={TypeFilters}
            selected={typeFilter}
            disabled={poolTxList.loading}
            onSelect={setTypeFilter}
          />
        </div>
      </div>
      <Antd.Table
        className={s.table}
        loading={!poolTxList.loaded && poolTxList.loading}
        columns={Columns}
        rowKey="txHash"
        dataSource={data}
        scroll={{ x: true }}
        locale={{
          emptyText: (
            <div className={s.emptyBlock}>
              <EmptyBoxSvg />
              <div className={s.emptyLabel}>There are no transactions to show</div>
            </div>
          ),
        }}
        showSorterTooltip={false}
        pagination={false}
        footer={() => (
          <>
            {!poolTxList.isEnd && (
              <Antd.Button
                type="primary"
                size="large"
                disabled={poolTxList.loading}
                onClick={poolTxList.loadNext}>Load more transactions</Antd.Button>
            )}
          </>
        )}
      />
    </div>
  );
};

const PoolTransactionTable: React.FunctionComponent<PoolTransactionTableProps> = props => (
  <PoolTxListProvider>
    <PoolTransactionTableInner {...props} />
  </PoolTxListProvider>
);

export default PoolTransactionTable;
