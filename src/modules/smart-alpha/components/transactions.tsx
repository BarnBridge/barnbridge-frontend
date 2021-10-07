import { useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Select from 'components/antd/select';
import { ExternalLink } from 'components/button';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon } from 'components/token-icon';
import { TransactionApiType, useFetchTransactions } from 'modules/smart-alpha/api';

const transactionTypeLabelMap = {
  JUNIOR_ENTRY: 'Junior entry',
  JUNIOR_REDEEM_TOKENS: 'Junior redeem tokens',
  JUNIOR_EXIT: 'Junior exit',
  JUNIOR_REDEEM_UNDERLYING: 'Junior redeem underlying',
  SENIOR_ENTRY: 'Senior entry',
  SENIOR_REDEEM_TOKENS: 'Senior redeem tokens',
  SENIOR_EXIT: 'Senior exit',
  SENIOR_REDEEM_UNDERLYING: 'Senior redeem underlying',
  JTOKEN_SEND: 'Jtoken send',
  JTOKEN_RECEIVE: 'Jtoken receive',
  STOKEN_SEND: 'Stoken send',
  STOKEN_RECEIVE: 'Stoken receive',
};

const filtersOptions: TableFilterType[] = [
  {
    name: 'transactionType',
    label: 'Transaction type',
    defaultValue: '',
    itemRender: () => {
      const tokenOpts = [
        {
          value: '',
          label: 'All types',
        },
        ...Object.entries(transactionTypeLabelMap).map(([value, label]) => ({ value, label })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
];

export const TransactionsTable = ({
  poolAddress,
  accountAddress,
}: {
  poolAddress?: string;
  accountAddress?: string;
}) => {
  function handleFilterChange(filters: Record<string, any>) {
    setFilters(prevState => ({
      ...prevState,
      ...filters,
    }));
  }

  const [filters, setFilters] = useState<{
    page: number;
    pageSize: number;
    transactionType: TransactionApiType['transactionType'] | '';
  }>({
    page: 1,
    pageSize: 10,
    transactionType: '',
  });

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      transactionType: filters.transactionType,
    }));
  }, [filters.transactionType]);

  const { data, loading } = useFetchTransactions({
    page: filters.page,
    limit: filters.pageSize,
    userAddress: accountAddress,
    poolAddress,
    transactionType: filters.transactionType,
  });

  const columns: ColumnType<TransactionApiType>[] = useMemo(() => getColumns(accountAddress), [accountAddress]);

  return (
    <section className="card">
      <header className="card-header flex align-center pv-12">
        <Text type="p1" weight="semibold">
          Transaction history
        </Text>

        <TableFilter filters={filtersOptions} value={filters} onChange={handleFilterChange} className="ml-auto" />
      </header>
      <Table<TransactionApiType> columns={columns} data={data?.data || []} loading={loading} />
      <TableFooter
        total={data?.meta.count ?? 0}
        current={filters.page}
        pageSize={filters.pageSize}
        onChange={page =>
          setFilters(prevFilters => ({
            ...prevFilters,
            page,
          }))
        }
        text
      />
    </section>
  );
};

function getColumns(accountAddress?: string): ColumnType<TransactionApiType>[] {
  return [
    {
      heading: 'Token Name',
      render: function Render(item) {
        const { getToken } = useTokens();

        const poolToken = getToken(item.poolTokenSymbol);
        const oracleToken = getAsset(item.oracleAssetSymbol);

        const [outline, bubble1Name, bubble2Name] =
          {
            JUNIOR_EXIT: ['purple', 'bond', oracleToken?.icon],
            JUNIOR_REDEEM_TOKENS: ['purple', 'bond', oracleToken?.icon],
            JTOKEN_SEND: ['purple', 'bond', oracleToken?.icon],
            JTOKEN_RECEIVE: ['purple', 'bond', oracleToken?.icon],
            SENIOR_EXIT: ['green', 'bond', oracleToken?.icon],
            SENIOR_REDEEM_TOKENS: ['green', 'bond', oracleToken?.icon],
            STOKEN_SEND: ['green', 'bond', oracleToken?.icon],
            STOKEN_RECEIVE: ['green', 'bond', oracleToken?.icon],
          }[item.transactionType] ?? [];

        return (
          <div className="flex align-center" style={{ whiteSpace: 'nowrap' }}>
            <TokenIcon
              name={poolToken?.icon}
              outline={outline}
              {...(bubble1Name ? { bubble1Name } : {})}
              {...(bubble2Name ? { bubble2Name } : {})}
              size={32}
              className="mr-16"
            />
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {item.tokenSymbol}
            </Text>
          </div>
        );
      },
    },
    {
      heading: `Side / transaction`,
      render: item => (
        <div style={{ whiteSpace: 'nowrap' }}>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {item.tranche === 'SENIOR' ? 'Senior' : null}
            {item.tranche === 'JUNIOR' ? 'Junior' : null}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {transactionTypeLabelMap[item.transactionType] || null}
          </Text>
        </div>
      ),
    },
    {
      heading: `Amount`,
      render: function Render(item) {
        const isIncome = checkIsIncome(item.transactionType, !!accountAddress);
        const oracleToken = getAsset(item.oracleAssetSymbol);

        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Text type="p1" weight="semibold" color={isIncome ? 'green' : 'red'} tooltip={formatUSD(item.amountInUSD)}>
              {isIncome ? '+' : '-'} {formatToken(BigNumber.from(item.amount))}
            </Text>
            <Text
              type="small"
              weight="semibold"
              color="secondary"
              tooltip={formatToken(BigNumber.from(item.amountInQuoteAsset), {
                decimals: oracleToken?.decimals,
              })}>
              {formatToken(BigNumber.from(item.amountInQuoteAsset), {
                tokenName: item.oracleAssetSymbol,
              })}
            </Text>
          </div>
        );
      },
    },
    ...(accountAddress
      ? []
      : [
          {
            heading: 'Address',
            // @ts-ignore
            render: function Render(item) {
              const { getEtherscanAddressUrl } = useWeb3();

              return (
                <ExternalLink href={getEtherscanAddressUrl(item.userAddress)} variation="link">
                  {shortenAddr(item.userAddress, 6, 4)}
                </ExternalLink>
              );
            },
          } as ColumnType<TransactionApiType>,
        ]),
    {
      heading: 'Transaction Hash',
      render: function Render(item) {
        const { getEtherscanTxUrl } = useWeb3();

        return (
          <ExternalLink href={getEtherscanTxUrl(item.transactionHash)} variation="link">
            {shortenAddr(item.transactionHash, 6, 4)}
          </ExternalLink>
        );
      },
    },
    {
      heading: 'Date',
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
}

function checkIsIncome(transactionType: TransactionApiType['transactionType'], isUser: boolean): boolean {
  switch (transactionType) {
    case 'JUNIOR_ENTRY':
      return !isUser;
    case 'JUNIOR_REDEEM_TOKENS':
      return isUser;
    case 'JUNIOR_EXIT':
      return !isUser;
    case 'JUNIOR_REDEEM_UNDERLYING':
      return isUser;
    case 'SENIOR_ENTRY':
      return !isUser;
    case 'SENIOR_REDEEM_TOKENS':
      return isUser;
    case 'SENIOR_EXIT':
      return !isUser;
    case 'SENIOR_REDEEM_UNDERLYING':
      return isUser;
    case 'JTOKEN_SEND':
      return false;
    case 'JTOKEN_RECEIVE':
      return true;
    case 'STOKEN_SEND':
      return false;
    case 'STOKEN_RECEIVE':
      return true;
  }
}
