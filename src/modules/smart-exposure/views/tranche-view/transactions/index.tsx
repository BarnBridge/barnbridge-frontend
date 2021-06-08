import { useEffect, useState } from 'react';

import Select from 'components/antd/select';
import { Table, TableFooter } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { TransactionApiType, fetchTransactions } from 'modules/smart-exposure/api';

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

export const TransactionsView = () => {
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

  const columns = [
    {
      heading: 'Transaction type',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">{item}</div>,
    },
    {
      heading: 'WBTC amount',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
    },
    {
      heading: 'ETH amount',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
    },
    {
      heading: 'Pool token amount',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
    },
    {
      heading: 'Address',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
    },
    {
      heading: 'Transaction Hash',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
    },
    {
      heading: 'Date',
      // @ts-ignore
      render: item => <div className="text-p1 fw-semibold color-primary mr-4">Asd</div>,
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
