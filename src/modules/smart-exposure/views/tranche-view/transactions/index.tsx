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
  const [dataList, setDataList] = useState<TransactionApiType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState(1);
  const total = 54;
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchTransactions()
      .then(result => {
        if (Array.isArray(result)) {
          setDataList(result);
        }
      })
      .catch(err => {
        setDataList([]);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleFilterChange(filters: Record<string, any>) {
    setFiltersState(prevState => ({
      ...prevState,
      ...filters,
    }));
  }

  const columns: ColumnType<TransactionApiType>[] = [
    {
      heading: 'Transaction type',
      // @ts-ignore
      render: item => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {item.transactionType === 'WITHDRAW' ? 'Withdraw' : 'Deposit'}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            Multiple tokens
          </Text>
        </div>
      ),
    },
    {
      heading: `${tranche.tokenA.symbol} amount`,
      render: item => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <div className="flex align-center mb-4">
            <Icon name={getTokenIconBySymbol(tranche.tokenA.symbol)} width={16} height={16} className="mr-4" />
            <Text type="p1" weight="semibold" color="red">
              - 10.00 TBD
            </Text>
          </div>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(BigNumber.from(item.amountA)?.unscaleBy(tranche.tokenA.decimals))}
          </Text>
        </div>
      ),
    },
    {
      heading: `${tranche.tokenB.symbol} amount`,
      // @ts-ignore
      render: item => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <div className="flex align-center mb-4">
            <Icon name={getTokenIconBySymbol(tranche.tokenB.symbol)} width={16} height={16} className="mr-4" />
            <Text type="p1" weight="semibold" color="red">
              - 10.00 TBD
            </Text>
          </div>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(BigNumber.from(item.amountB)?.unscaleBy(tranche.tokenB.decimals))}
          </Text>
        </div>
      ),
    },
    {
      heading: 'Pool token amount',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">TBD</div>,
    },
    {
      heading: 'Address',
      // @ts-ignore
      render: item => (
        <a
          href={getEtherscanAddressUrl(item.accountAddress)}
          className="link-blue"
          target="_blank"
          rel="noreferrer noopener">
          {shortenAddr(item.accountAddress, 6, 4)}
        </a>
      ),
    },
    {
      heading: 'Transaction Hash',
      // @ts-ignore
      render: item => (
        <a
          href={getEtherscanTxUrl(item.transactionHash)}
          className="link-blue"
          target="_blank"
          rel="noreferrer noopener">
          {shortenAddr(item.transactionHash, 6, 4)}
        </a>
      ),
    },
    {
      heading: 'Date',
      // @ts-ignore
      render: item => {
        const date = new Date(item.blockTimestamp * 1000);
        return (
          <>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {format(date, 'dd.MM.yyyy')}
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              {format(date, 'HH:mm')}
            </Text>
          </>
        );
      },
    },
  ];

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
      <Table<TransactionApiType> columns={columns} data={dataList} />
      <TableFooter total={total} current={current} pageSize={pageSize} onChange={setCurrent}>
        {({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} entries
          </>
        )}
      </TableFooter>
    </div>
  );
};
