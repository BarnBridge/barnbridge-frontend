import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import Erc20Contract from 'web3/contracts/erc20Contract';
import Web3Contract from 'web3/contracts/web3Contract';
import { formatToken, formatUSD, getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon, { IconNames, TokenIconNames } from 'components/custom/icon';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import {
  APITreasuryHistory,
  APITreasuryToken,
  fetchTreasuryHistory,
  fetchTreasuryTokens,
} from 'modules/governance/api';
import { Pools } from 'modules/smart-yield/api';

const CONTRACT_DAO_GOVERNANCE_ADDR = String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase();

type APITreasuryTokenEntity = APITreasuryToken & {
  token: Erc20Contract;
};

type State = {
  tokens: {
    items: APITreasuryTokenEntity[];
    loading: boolean;
  };
  history: {
    items: APITreasuryHistory[];
    total: number;
    page: number;
    pageSize: number;
    loading: boolean;
    filters: {
      token: string;
      direction: string;
    };
  };
};

const InitialState: State = {
  tokens: {
    items: [],
    loading: false,
  },
  history: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    filters: {
      token: 'all',
      direction: 'all',
    },
  },
};

const Columns: ColumnsType<APITreasuryHistory> = [
  {
    title: 'Token Name',
    render: (_, entity) => {
      const meta = Pools.get(entity.tokenSymbol);

      return (
        <div className="flex flow-col align-center">
          <Icon name={(meta?.icon as TokenIconNames) ?? 'token-unknown'} className="mr-16" />
          <Text type="p1" weight="semibold" color="primary" className="mr-4">
            {entity.tokenSymbol}
          </Text>
        </div>
      );
    },
  },
  {
    title: 'Transaction Hash',
    render: (_, entity) => (
      <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)}>
        <Text type="p1" weight="semibold" color="blue">
          {shortenAddr(entity.transactionHash)}
        </Text>
      </ExternalLink>
    ),
  },
  {
    title: 'Date',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy')}
        </Text>
        <Text type="small" weight="semibold">
          {format(entity.blockTimestamp * 1_000, 'HH:mm')}
        </Text>
      </>
    ),
  },
  {
    title: 'Amount',
    render: (_, entity) => (
      <Tooltip
        placement="bottomRight"
        title={formatToken(entity.amount, {
          decimals: entity.tokenDecimals,
        })}>
        <Text type="p1" weight="semibold" color={entity.transactionDirection === 'IN' ? 'green' : 'red'}>
          {entity.transactionDirection === 'IN' ? '+' : '-'} {formatToken(entity.amount)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSD(new BigNumber(entity.amount).multipliedBy(1))}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: 'From',
    render: (_, entity) => {
      let address = '';
      let label = '';

      if (entity.transactionDirection === 'IN') {
        address = entity.counterpartyAddress;
        label = entity.counterpartyLabel || shortenAddr(entity.counterpartyAddress) || '';
      } else {
        address = entity.accountAddress;
        label = entity.accountLabel || shortenAddr(entity.accountAddress) || '';
      }

      return (
        <ExternalLink href={getEtherscanAddressUrl(address)}>
          <Text type="p1" weight="semibold" color="blue">
            {label}
          </Text>
        </ExternalLink>
      );
    },
  },
  {
    title: 'To',
    render: (_, entity) => {
      let address = '';
      let label = '';

      if (entity.transactionDirection === 'OUT') {
        address = entity.counterpartyAddress;
        label = entity.counterpartyLabel || shortenAddr(entity.counterpartyAddress) || '';
      } else {
        address = entity.accountAddress;
        label = entity.accountLabel || shortenAddr(entity.accountAddress) || '';
      }

      return (
        <ExternalLink href={getEtherscanAddressUrl(address)}>
          <Text type="p1" weight="semibold" color="blue">
            {label}
          </Text>
        </ExternalLink>
      );
    },
  },
];

const Filters: TableFilterType[] = [
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
        ...Array.from(Pools.entries()).map(([key, value]) => ({
          value: key,
          label: value.name ?? '-',
        })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
  {
    name: 'direction',
    label: 'Transaction direction',
    defaultValue: 'all',
    itemRender: () => {
      const options = [
        {
          value: 'all',
          label: 'All transactions',
        },
        {
          value: 'in',
          label: 'In',
        },
        {
          value: 'out',
          label: 'Out',
        },
      ];

      return <Select options={options} className="full-width" />;
    },
  },
];

const TreasuryHoldings: React.FC = () => {
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  function handlePaginationChange(page: number) {
    setState(prevState => ({
      ...prevState,
      history: {
        ...prevState.history,
        page,
      },
    }));
  }

  function handleFilterChange(filters: Record<string, any>) {
    setState(prevState => ({
      ...prevState,
      history: {
        ...prevState.history,
        filters: {
          ...prevState.history.filters,
          ...filters,
        },
        page: 1,
      },
    }));
  }

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      tokens: {
        ...prevState.tokens,
        loading: true,
      },
    }));

    fetchTreasuryTokens()
      .then(data => {
        setState(prevState => ({
          ...prevState,
          tokens: {
            ...prevState.tokens,
            items: data.map(item => {
              const tokenContract = new Erc20Contract([], item.tokenAddress);
              tokenContract.on(Web3Contract.UPDATE_DATA, reload);
              tokenContract.loadBalance(CONTRACT_DAO_GOVERNANCE_ADDR);

              return {
                ...item,
                token: tokenContract,
              };
            }),
            loading: false,
          },
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          tokens: {
            ...prevState.tokens,
            items: [],
            loading: false,
          },
        }));
      });
  }, []);

  React.useEffect(() => {
    const { page, pageSize, filters } = state.history;

    setState(prevState => ({
      ...prevState,
      history: {
        ...prevState.history,
        loading: true,
      },
    }));

    fetchTreasuryHistory(page, pageSize, filters.token, filters.direction)
      .then(data => {
        setState(prevState => ({
          ...prevState,
          history: {
            ...prevState.history,
            items: data.data,
            total: data.meta.count,
            loading: false,
          },
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          history: {
            ...prevState.history,
            items: [],
            total: 0,
            loading: false,
          },
        }));
      });
  }, [state.history.page, state.history.filters]);

  const totalHoldings = React.useMemo(() => {
    if (state.tokens.loading) {
      return undefined;
    }

    return state.tokens.items.reduce((a, c) => {
      const v = c.token.getBalanceOf(CONTRACT_DAO_GOVERNANCE_ADDR)?.unscaleBy(c.tokenDecimals)?.multipliedBy(1);

      return a.plus(v ?? 0);
    }, BigNumber.ZERO);
  }, [state.tokens, version]);

  return (
    <>
      <Text type="p1" weight="semibold" color="secondary" className="mb-8">
        Total holdings balance
      </Text>
      <Text type="h2" weight="bold" color="primary" className="mb-40">
        {formatUSD(totalHoldings) ?? '-'}
      </Text>
      <div className="flexbox-list mb-32" style={{ '--gap': '32px' } as React.CSSProperties}>
        {state.tokens.items.map(item => (
          <div key={item.tokenAddress} className="card p-24" style={{ minWidth: 195 }}>
            <div className="flex mb-16">
              <Icon name={(Pools.get(item.tokenSymbol)?.icon as IconNames) ?? 'token-unknown'} className="mr-8" />
              <Text type="p1" weight="semibold" color="primary">
                {item.tokenSymbol}
              </Text>
            </div>
            <Text type="h3" weight="bold" color="primary" className="mb-4">
              {formatToken(item.token.getBalanceOf(CONTRACT_DAO_GOVERNANCE_ADDR)?.unscaleBy(item.tokenDecimals)) ?? '-'}
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              {formatUSD(
                item.token.getBalanceOf(CONTRACT_DAO_GOVERNANCE_ADDR)?.unscaleBy(item.tokenDecimals)?.multipliedBy(1),
              ) ?? '-'}
            </Text>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header flex flow-col align-center justify-space-between pv-12">
          <Text type="p1" weight="semibold" color="primary">
            Transaction history
          </Text>
          <TableFilter filters={Filters} value={state.history.filters} onChange={handleFilterChange} />
        </div>
        <Table<APITreasuryHistory>
          inCard
          columns={Columns}
          dataSource={state.history.items}
          rowKey="transactionHash"
          loading={state.history.loading}
          locale={{
            emptyText: 'No entries',
          }}
          pagination={{
            total: state.history.total,
            current: state.history.page,
            pageSize: state.history.pageSize,
            position: ['bottomRight'],
            showTotal: (total: number, [from, to]: [number, number]) => (
              <Text type="p2" weight="semibold" color="secondary">
                Showing {from} to {to} out of {total} entries
              </Text>
            ),
            onChange: handlePaginationChange,
          }}
          scroll={{
            x: true,
          }}
        />
      </div>
    </>
  );
};

export default TreasuryHoldings;
