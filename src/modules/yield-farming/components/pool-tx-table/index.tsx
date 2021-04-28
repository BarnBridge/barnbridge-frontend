import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import formatDistance from 'date-fns/formatDistance';
import capitalize from 'lodash/capitalize';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import {
  formatToken,
  formatUSD,
  getEtherscanAddressUrl,
  getEtherscanTxUrl,
  getTokenMeta,
  shortenAddr,
} from 'web3/utils';

import Button from 'components/antd/button';
import Select, { SelectOption } from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PoolTxListProvider, {
  PoolTxListItem,
  usePoolTxList,
} from 'modules/yield-farming/providers/pool-tx-list-provider';
import { ReactComponent as EmptyBoxSvg } from 'resources/svg/empty-box.svg';
import { useWallet } from 'wallets/wallet';

import { PoolActions, PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const TypeFilters: SelectOption[] = [
  { value: 'all', label: 'All pool transactions' },
  { value: 'deposits', label: 'Deposits' },
  { value: 'withdrawals', label: 'Withdrawals' },
];

const Columns: ColumnsType<PoolTxListItem> = [
  {
    title: 'Transaction type',
    render: (_: any, record) => (
      <div className="flex flow-col col-gap-16 align-center">
        <div className={s.icon}>{getTokenMeta(record.token)?.icon}</div>
        <div>
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            {capitalize(record.type)}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {getTokenMeta(record.token)?.name}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'usdAmount',
    align: 'right',
    render: (value: BigNumber, record: PoolTxListItem) => {
      const tokenMeta = getTokenMeta(record.token);

      return (
        <Tooltip
          placement="bottomRight"
          title={
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {formatToken(record.amount, {
                tokenName: tokenMeta?.name,
                decimals: tokenMeta?.decimals,
              })}
            </Text>
          }>
          <div className="full-width">
            {record.type === 'DEPOSIT' && (
              <Text type="p1" weight="semibold" color="green">
                + {formatToken(record.amount)}
              </Text>
            )}
            {record.type === 'WITHDRAW' && (
              <Text type="p1" weight="semibold" color="red">
                - {formatToken(record.amount)}
              </Text>
            )}
            <Text type="small" weight="semibold" color="secondary">
              {formatUSD(value)}
            </Text>
          </div>
        </Tooltip>
      );
    },
  },
  {
    title: 'Address',
    dataIndex: 'user',
    render: (value: string) => (
      <ExternalLink href={getEtherscanAddressUrl(value)}>
        <Text type="p1" weight="semibold" color="blue">
          {shortenAddr(value)}
        </Text>
      </ExternalLink>
    ),
  },
  {
    title: 'Transaction hash',
    dataIndex: 'txHash',
    render: (value: string) => (
      <ExternalLink href={getEtherscanTxUrl(value)}>
        <Text type="p1" weight="semibold" color="blue">
          {shortenAddr(value)}
        </Text>
      </ExternalLink>
    ),
  },
  {
    title: 'Time',
    dataIndex: 'blockTimestamp',
    align: 'right',
    render: (value: number) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatDistance(new Date(value * 1_000), new Date(), {
          addSuffix: true,
        })}
      </Text>
    ),
  },
];

export type PoolTxTableProps = {
  label: string;
  ownTransactions?: boolean;
  pool?: PoolTypes;
  action?: PoolActions;
};

const PoolTxTableInner: React.FC<PoolTxTableProps> = props => {
  const { label, ownTransactions, pool, action } = props;

  const wallet = useWallet();
  const web3c = useWeb3Contracts();
  const poolTxList = usePoolTxList();

  React.useEffect(() => {
    poolTxList.changeUserFilter(ownTransactions ? wallet.account : undefined);

    poolTxList.changeTokenFilter(undefined);

    if (action === PoolActions.DEPOSIT) {
      poolTxList.changeTypeFilter('deposits');
    } else if (action === PoolActions.WITHDRAW) {
      poolTxList.changeTypeFilter('withdrawals');
    } else {
      poolTxList.changeTypeFilter(undefined);
    }
  }, []);

  const tokenFilterOptions = React.useMemo<SelectOption[]>(() => {
    const options: SelectOption[] = [];

    if ((pool ?? PoolTypes.STABLE) === PoolTypes.STABLE) {
      options.push(
        {
          value: USDCTokenMeta.address,
          label: USDCTokenMeta.name,
        },
        {
          value: DAITokenMeta.address,
          label: DAITokenMeta.name,
        },
        {
          value: SUSDTokenMeta.address,
          label: SUSDTokenMeta.name,
        },
      );
    }

    if ((pool ?? PoolTypes.UNILP) === PoolTypes.UNILP) {
      options.push({
        value: UNISWAPTokenMeta.address,
        label: UNISWAPTokenMeta.name,
      });
    }

    if ((pool ?? PoolTypes.BOND) === PoolTypes.BOND) {
      options.push({
        value: BONDTokenMeta.address,
        label: BONDTokenMeta.name,
      });
    }

    if (options.length !== 1) {
      options.unshift({
        value: 'all',
        label: 'All tokens',
      });
    }

    return options;
  }, [pool]);

  const tableData = React.useMemo<(PoolTxListItem & { usdAmount: BigNumber | undefined })[]>(() => {
    return poolTxList.transactions.map(tx => {
      const price = web3c.getTokenUsdPrice(tx.token);

      return {
        ...tx,
        usdAmount: price ? tx.amount.multipliedBy(price) : undefined,
      };
    });
  }, [web3c, poolTxList.transactions]);

  const CardEmptyText = (
    <Grid flow="row" gap={16} align="center" padding={[54, 0]}>
      <EmptyBoxSvg />
      <Text type="p1" color="secondary">
        There are no transactions to show
      </Text>
    </Grid>
  );

  const CardFooter = (
    <Grid align="center" justify="center">
      <Button type="light" disabled={poolTxList.loading} onClick={poolTxList.loadNext}>
        Load more transactions
      </Button>
    </Grid>
  );

  return (
    <div className={cn(s.table, 'card')}>
      <Grid
        flow="col"
        align="center"
        justify="space-between"
        className={cn(s.chartTitleContainer, 'card-header pv-12 ph-24')}>
        <Text type="p1" weight="semibold" color="primary">
          {label}
        </Text>
        <Grid flow="col" gap={24} className={s.chartTitleFilters}>
          <Select
            label="Tokens"
            options={tokenFilterOptions}
            value={poolTxList.tokenFilter ?? 'all'}
            disabled={poolTxList.loading}
            onSelect={value => {
              poolTxList.changeTokenFilter(value !== 'all' ? (value as string) : undefined);
            }}
            className={s.chartTitleFilter}
          />
          <Select
            label="Show"
            options={TypeFilters}
            value={poolTxList.typeFilter ?? 'all'}
            disabled={poolTxList.loading}
            onSelect={value => {
              poolTxList.changeTypeFilter(value !== 'all' ? (value as string) : undefined);
            }}
            className={s.chartTitleFilter}
          />
        </Grid>
      </Grid>
      <Table<PoolTxListItem>
        inCard
        columns={Columns}
        rowKey="txHash"
        dataSource={tableData}
        loading={!poolTxList.loaded && poolTxList.loading}
        locale={{
          emptyText: CardEmptyText,
        }}
        footer={() => !poolTxList.isEnd && poolTxList.transactions.length > 0 && CardFooter}
        scroll={{
          x: true,
        }}
      />
    </div>
  );
};

const PoolTxTable: React.FC<PoolTxTableProps> = props => (
  <PoolTxListProvider>
    <PoolTxTableInner {...props} />
  </PoolTxListProvider>
);

export default PoolTxTable;
