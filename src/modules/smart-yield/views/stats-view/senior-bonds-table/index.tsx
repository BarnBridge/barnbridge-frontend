import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import IconBubble from 'components/custom/icon-bubble';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { APISYSeniorBonds, useSyAPI } from 'modules/smart-yield/api';
import { SYPool, useSYPool } from 'modules/smart-yield/providers/pool-provider';

type TableEntity = APISYSeniorBonds & {
  poolEntity?: SYPool;
};

const TokenNameColumn: React.FC = () => {
  const { pool } = useSYPool();

  return (
    <div className="flex">
      <IconBubble name={pool?.meta?.icon} bubbleName={pool?.market?.icon} className="mr-16" />
      <div className="flex flow-row">
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {pool?.underlyingSymbol}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {pool?.market?.name}
        </Text>
      </div>
    </div>
  );
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => <TokenNameColumn />,
  },
  {
    title: 'Deposited',
    align: 'right',
    render: function Render(_, entity) {
      const { convertTokenInUSD } = useKnownTokens();

      return (
        <>
          <Tooltip
            title={formatToken(entity.depositedAmount, {
              decimals: entity.underlyingTokenDecimals,
              tokenName: entity.underlyingTokenSymbol,
            })}>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {formatToken(entity.depositedAmount) ?? '-'}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(convertTokenInUSD(entity.depositedAmount, entity.underlyingTokenSymbol)) ?? '-'}
          </Text>
        </>
      );
    },
  },
  {
    title: 'Redeemable',
    align: 'right',
    render: function Render(_, entity) {
      const { convertTokenInUSD } = useKnownTokens();

      return (
        <>
          <Tooltip
            title={formatToken(entity.redeemableAmount, {
              decimals: entity.underlyingTokenDecimals,
              tokenName: entity.underlyingTokenSymbol,
            })}>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {formatToken(entity.redeemableAmount) ?? '-'}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(convertTokenInUSD(entity.redeemableAmount, entity.underlyingTokenSymbol)) ?? '-'}
          </Text>
        </>
      );
    },
  },
  {
    title: 'Address',
    render: function Render(_, entity) {
      const { getEtherscanAddressUrl } = useWeb3();

      return (
        <ExternalLink href={getEtherscanAddressUrl(entity.accountAddress)}>
          <Text type="p1" weight="semibold" color="blue">
            {shortenAddr(entity.accountAddress)}
          </Text>
        </ExternalLink>
      );
    },
  },
  {
    title: 'Tx Hash / Timestamp',
    render: function Render(_, entity) {
      const { getEtherscanTxUrl } = useWeb3();

      return (
        <>
          <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)} className="mb-4">
            <Text type="p1" weight="semibold" color="blue">
              {shortenAddr(entity.transactionHash)}
            </Text>
          </ExternalLink>
          <Text type="small" weight="semibold" color="secondary">
            {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
          </Text>
        </>
      );
    },
  },
  {
    title: 'Maturity Date',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {format(entity.maturityDate * 1_000, 'MM.dd.yyyy')}
        </Text>
        <Text type="small" weight="semibold">
          {format(entity.maturityDate * 1_000, 'HH:mm')}
        </Text>
      </>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
  total: number;
  pageSize: number;
  page: number;
  filters: {
    redeemed: string;
    sortBy: string;
    sortDir: string;
  };
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
  filters: {
    redeemed: 'all',
    sortBy: 'none',
    sortDir: 'desc',
  },
};

const Filters: TableFilterType[] = [
  {
    name: 'redeemed',
    label: 'Type',
    defaultValue: 'all',
    itemRender: () => {
      const options = [
        {
          value: 'all',
          label: 'All senior bonds',
        },
        {
          value: 'false',
          label: 'Active',
        },
        {
          value: 'true',
          label: 'Redeemed',
        },
      ];

      return <Select options={options} className="full-width" />;
    },
  },
  {
    name: 'sortBy',
    label: 'Sort by',
    defaultValue: 'none',
    itemRender: () => {
      const options = [
        {
          value: 'none',
          label: 'Default',
        },
        {
          value: 'maturityDate',
          label: 'Maturity Date',
        },
        {
          value: 'depositedAmount',
          label: 'Deposited Amount',
        },
        {
          value: 'redeemableAmount',
          label: 'Redeemable Amount',
        },
      ];

      return <Select options={options} className="full-width" />;
    },
  },
  {
    name: 'sortDir',
    label: 'Sort direction',
    defaultValue: 'desc',
    itemRender: () => {
      const options = [
        {
          value: 'desc',
          label: 'Descending',
        },
        {
          value: 'asc',
          label: 'Ascending',
        },
      ];

      return <Select options={options} className="full-width" />;
    },
  },
];

type Props = {
  tabs: React.ReactNode;
};

const SeniorBondsTable: React.FC<Props> = ({ tabs }) => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;
  const syAPI = useSyAPI();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    (async () => {
      setState(prevState => ({
        ...prevState,
        loading: true,
      }));

      try {
        const history = await syAPI.fetchSYSeniorBonds(
          pool.smartYieldAddress,
          state.page,
          state.pageSize,
          state.filters.redeemed !== 'all' ? state.filters.redeemed : undefined,
          state.filters.sortBy !== 'none' ? state.filters.sortBy : undefined,
          state.filters.sortBy !== 'none' ? state.filters.sortDir : undefined,
        );

        setState(prevState => ({
          ...prevState,
          loading: false,
          data: history.data,
          total: history.meta.count,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
          data: [],
          total: 0,
        }));
      }
    })();
  }, [pool?.smartYieldAddress, state.page, state.filters]);

  function handleFilterChange(filters: Record<string, any>) {
    setState(prevState => ({
      ...prevState,
      page: 1,
      filters: {
        ...prevState.filters,
        ...filters,
      },
    }));
  }

  function handlePageChange(page: number) {
    setState(prevState => ({
      ...prevState,
      page,
    }));
  }

  return (
    <>
      <header className="card-header flex align-center justify-space-between ph-24 pv-0">
        {tabs}
        <TableFilter filters={Filters} value={state.filters} onChange={handleFilterChange} />
      </header>
      <Table<TableEntity>
        columns={Columns}
        dataSource={state.data}
        rowKey="transactionHash"
        loading={state.loading}
        pagination={{
          total: state.total,
          pageSize: state.pageSize,
          current: state.page,
          position: ['bottomRight'],
          showTotal: (total: number, [from, to]: [number, number]) => (
            <Text type="p2" weight="semibold" color="secondary">
              Showing {from} to {to} out of {total} entries
            </Text>
          ),
          onChange: handlePageChange,
        }}
        scroll={{
          x: true,
        }}
      />
    </>
  );
};

export default SeniorBondsTable;
