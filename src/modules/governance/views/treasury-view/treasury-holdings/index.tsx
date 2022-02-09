import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Select from 'components/antd/select';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink, ExplorerTxLink } from 'components/button';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { TokenType, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import {
  APITreasuryHistory,
  APITreasuryToken,
  useFetchTreasuryHistory,
  useFetchTreasuryTokens,
} from 'modules/governance/api';
import { MarketMeta } from 'modules/smart-yield/providers/markets';

import { formatDate, formatTime } from 'utils/date';

type ExtendedAPITreasuryToken = APITreasuryToken & {
  balanceAmount: BigNumber | undefined;
  balanceAmountUSD: BigNumber | undefined;
  market: MarketMeta | undefined;
  token: TokenType | undefined;
};

type ExtendedAPITreasuryHistory = APITreasuryHistory & {
  token: TokenType | undefined;
  amount: BigNumber | undefined;
  amountUSD: BigNumber | undefined;
};

type HistoryFilterType = {
  token: string;
  direction: string;
};

const Columns: ColumnType<ExtendedAPITreasuryHistory>[] = [
  {
    heading: 'Token Name',
    render: entity => (
      <div className="flex flow-col col-gap-12 align-center">
        <TokenIcon name={entity.token?.icon} className="mr-16" size={32} />
        <div className="flex flow-row row-gap-4">
          <Text type="body1" weight="semibold" color="primary">
            {entity.tokenSymbol ?? '-'}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            {entity.token?.name ?? '-'}
          </Text>
        </div>
      </div>
    ),
  },
  {
    heading: 'Transaction Hash',
    render: entity => (
      <ExplorerTxLink address={entity.transactionHash}>
        <Text type="body1" weight="semibold" color="blue">
          {shortenAddr(entity.transactionHash)}
        </Text>
      </ExplorerTxLink>
    ),
  },
  {
    heading: 'Date',
    render: entity => (
      <>
        <Text type="body1" weight="semibold" color="primary" className="mb-4">
          {formatDate(entity.blockTimestamp * 1_000)}
        </Text>
        <Text type="caption" weight="semibold" color="secondary">
          {formatTime(entity.blockTimestamp * 1_000)}
        </Text>
      </>
    ),
  },
  {
    heading: <div className="text-right">Amount</div>,
    render: entity => (
      <Tooltip
        placement="bottomRight"
        title={formatToken(entity.amount, {
          decimals: entity.tokenDecimals,
          tokenName: entity.tokenSymbol,
        })}>
        <div className="text-right">
          <Text type="body1" weight="semibold" color={entity.transactionDirection === 'IN' ? 'green' : 'red'}>
            {entity.transactionDirection === 'IN' ? '+' : '-'} {formatToken(entity.amount) ?? '-'}
          </Text>
          <Text type="caption" weight="semibold">
            {formatUSD(entity.amountUSD) ?? '-'}
          </Text>
        </div>
      </Tooltip>
    ),
  },
  {
    heading: 'From',
    render: entity => (
      <ExplorerAddressLink
        address={entity.transactionDirection === 'IN' ? entity.counterpartyAddress : entity.accountAddress}>
        <Text type="body1" weight="semibold" color="blue">
          {entity.transactionDirection === 'IN'
            ? entity.counterpartyLabel || shortenAddr(entity.counterpartyAddress)
            : entity.accountLabel || shortenAddr(entity.accountAddress)}
        </Text>
      </ExplorerAddressLink>
    ),
  },
  {
    heading: 'To',
    render: entity => (
      <ExplorerAddressLink
        address={entity.transactionDirection === 'OUT' ? entity.counterpartyAddress : entity.accountAddress}>
        <Text type="body1" weight="semibold" color="blue">
          {entity.transactionDirection === 'OUT'
            ? entity.counterpartyLabel || shortenAddr(entity.counterpartyAddress)
            : entity.accountLabel || shortenAddr(entity.accountAddress)}
        </Text>
      </ExplorerAddressLink>
    ),
  },
];

const TreasuryHoldings: FC = () => {
  const config = useConfig();
  const [reload, version] = useReload();
  const { getAmountInUSD, getToken } = useTokens();
  const { getOrCreateContract, getContract } = useContractFactory();

  const [historyPage, setHistoryPage] = useState(1);
  const historyPageSize = 10;
  const [tokenFilter, setTokenFilter] = useState('all');
  const [directionFilter, setDirectionFilter] = useState('all');
  const filterValue = useMemo<HistoryFilterType>(
    () => ({
      token: tokenFilter,
      direction: directionFilter,
    }),
    [tokenFilter, directionFilter],
  );

  const { data: treasuryTokens = [] } = useFetchTreasuryTokens();
  const { data: historyResult, loading: historyLoading } = useFetchTreasuryHistory(
    historyPage,
    tokenFilter,
    directionFilter,
  );
  const historyItems = historyResult?.data ?? [];
  const historyItemsCount = historyResult?.meta.count ?? 0;

  const tokensSource = useMemo(() => {
    const tokens = (treasuryTokens ?? [])
      .map<ExtendedAPITreasuryToken | undefined>(treasuryToken => {
        const token = getToken(treasuryToken.symbol);

        if (!token) {
          return undefined;
        }

        const tokenContract = getContract<Erc20Contract>(treasuryToken.address);
        const balanceAmount = tokenContract
          ?.getBalanceOf(config.contracts.dao?.governance)
          ?.unscaleBy(treasuryToken.decimals);
        const balanceAmountUSD = getAmountInUSD(balanceAmount, treasuryToken.symbol);

        return {
          ...treasuryToken,
          balanceAmount,
          balanceAmountUSD,
          token,
        } as ExtendedAPITreasuryToken;
      })
      .filter(Boolean) as ExtendedAPITreasuryToken[];

    tokens.sort((a, b) =>
      a.balanceAmountUSD && b.balanceAmountUSD ? b.balanceAmountUSD.minus(a.balanceAmountUSD).toNumber() : 0,
    );

    return tokens;
  }, [getAmountInUSD, getContract, treasuryTokens, version]);

  const totalHoldingsUSD = useMemo(() => {
    return BigNumber.sumEach(tokensSource, item => item.balanceAmountUSD ?? BigNumber.ZERO);
  }, [tokensSource]);

  const historySource = useMemo(() => {
    return (historyItems?.map(item => {
      const token = getToken(item.tokenSymbol);
      const amount = BigNumber.from(item.amount);
      const amountUSD = getAmountInUSD(amount, item.tokenSymbol);

      return {
        ...item,
        token,
        amount,
        amountUSD,
      };
    }) ?? []) as ExtendedAPITreasuryHistory[];
  }, [historyItems]);

  const historyFilters = useMemo(() => {
    return [
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
            ...tokensSource.map(token => ({
              value: token.address,
              label: token.token?.name ?? token.symbol,
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
              label: 'All pool transactions',
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
    ] as TableFilterType<HistoryFilterType>[];
  }, [tokensSource]);

  useEffect(() => {
    treasuryTokens?.forEach(token => {
      getOrCreateContract(token.address, () => new Erc20Contract([], token.address), {
        afterInit: contract => {
          contract.on(Web3Contract.UPDATE_DATA, reload);
          contract.loadCommon().catch(Error);
          contract.loadBalance(config.contracts.dao?.governance).catch(Error);
        },
      });
    });
  }, [treasuryTokens]);

  function handleFilterChange(filters: HistoryFilterType) {
    setHistoryPage(1);
    setTokenFilter(filters.token);
    setDirectionFilter(filters.direction);
  }

  return (
    <>
      <Text
        type="h2"
        weight="bold"
        color="primary"
        className="mb-4"
        tooltip={formatUSD(totalHoldingsUSD) ?? '-'}
        style={{ display: 'inline-block' }}>
        {formatUSD(totalHoldingsUSD, { compact: true }) ?? '-'}
      </Text>
      <Text type="body2" weight="semibold" color="secondary" className="mb-32">
        Total holdings balance
      </Text>
      <div
        className="mb-32"
        style={
          {
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, max-content))',
          } as CSSProperties
        }>
        {tokensSource.map(item => (
          <div
            key={item.address}
            className="card flex flow-col wrap justify-space-between col-gap-12 row-gap-8 align-center p-24">
            <div className="flex col-gap-12">
              <TokenIcon name={item.token?.icon} size={32} />
              <div className="flex flow-row row-gap-4">
                <Text type="body1" weight="semibold" color="primary">
                  {item.symbol ?? '-'}
                </Text>
                <Text type="caption" weight="semibold" color="secondary">
                  {item.token?.name ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex flow-row row-gap-4">
              <Text type="body1" weight="semibold" color="primary">
                {formatToken(item.balanceAmount) ?? '-'}
              </Text>
              <Text type="caption" weight="semibold" color="secondary">
                {formatUSD(item.balanceAmountUSD) ?? '-'}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header" style={{ justifyContent: 'space-between' }}>
          <Text type="body1" weight="semibold" color="primary">
            Transaction history
          </Text>
          <TableFilter<HistoryFilterType> filters={historyFilters} value={filterValue} onChange={handleFilterChange} />
        </div>
        <Table<ExtendedAPITreasuryHistory>
          columns={Columns}
          data={historySource}
          rowKey={row => `${row.transactionHash}_${row.tokenSymbol}`}
          loading={historyLoading}
          // locale={{
          //   emptyText: 'No entries', // TODO: Add support of empty result to Table component
          // }}
        />
        <TableFooter
          total={historyItemsCount}
          current={historyPage}
          pageSize={historyPageSize}
          onChange={setHistoryPage}
          text={({ total, from, to }) => (
            <>
              Showing {from} to {to} out of {total} transactions
            </>
          )}
        />
      </div>
    </>
  );
};

export default TreasuryHoldings;
