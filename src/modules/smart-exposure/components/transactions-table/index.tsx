import { useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { formatToken, formatUSD, shortenAddr } from 'web3/utils';

import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TransactionApiType, useSeAPI } from 'modules/smart-exposure/api';

export const TransactionsTable = ({
  transactionType,
  accountAddress,
  poolAddress,
}: {
  transactionType?: TransactionApiType['transactionType'];
  accountAddress?: string;
  poolAddress?: string;
}) => {
  const { getTokenIconBySymbol } = useKnownTokens();
  const seAPI = useSeAPI();
  const [dataList, setDataList] = useState<TransactionApiType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    total: number;
    page: number;
    pageSize: number;
    accountAddress?: string;
    poolAddress?: string;
    transactionType?: TransactionApiType['transactionType'];
  }>({
    total: 0,
    page: 1,
    pageSize: 10,
    accountAddress,
    poolAddress,
    transactionType,
  });

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      accountAddress,
      poolAddress,
      transactionType,
    }));
  }, [accountAddress, poolAddress, transactionType]);

  useEffect(() => {
    setLoading(true);

    seAPI
      .fetchTransactions({
        page: filters.page,
        limit: filters.pageSize,
        accountAddress: filters.accountAddress,
        poolAddress: filters.poolAddress,
        transactionType: filters.transactionType,
      })
      .then(result => {
        if (Array.isArray(result.data)) {
          setDataList(result.data);
          setFilters(prevFilters => ({
            ...prevFilters,
            total: result.meta.count,
          }));
        } else {
          setDataList([]);
          setFilters(prevFilters => ({
            ...prevFilters,
            total: 0,
          }));
        }
      })
      .catch(err => {
        setDataList([]);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [filters.page, filters.pageSize, filters.accountAddress, filters.poolAddress, filters.transactionType]);

  const columns: ColumnType<TransactionApiType>[] = useMemo(
    () => [
      {
        heading: 'Tranche / Transaction',
        render: item => (
          <div className="flex align-center" style={{ whiteSpace: 'nowrap' }}>
            <IconsPair
              icon1={getTokenIconBySymbol(item.tokenA.symbol)}
              icon2={getTokenIconBySymbol(item.tokenB.symbol)}
              size={32}
              className="mr-16"
            />
            <div>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {item.eTokenSymbol}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {item.transactionType === 'WITHDRAW' ? 'Withdraw' : 'Deposit'} – multiple tokens
              </Text>
            </div>
          </div>
        ),
      },
      {
        heading: `Token 1 amount`,
        render: item => (
          <div style={{ whiteSpace: 'nowrap' }}>
            <div className="flex align-center mb-4">
              <Icon
                name={getTokenIconBySymbol(item.tokenA.symbol) as IconNames}
                width={16}
                height={16}
                className="mr-4"
              />
              <Text type="p1" weight="semibold" color={item.transactionType === 'DEPOSIT' ? 'red' : 'green'}>
                {item.transactionType === 'DEPOSIT' ? '-' : '+'}{' '}
                {formatToken(BigNumber.from(item.amountA)?.unscaleBy(item.tokenA.decimals))}
              </Text>
            </div>
            <Text type="small" weight="semibold" color="secondary">
              {formatUSD(BigNumber.from(item.amountA)?.unscaleBy(item.tokenA.decimals)?.multipliedBy(item.tokenAPrice))}
            </Text>
          </div>
        ),
      },
      {
        heading: `Token 2 amount`,

        render: item => (
          <div style={{ whiteSpace: 'nowrap' }}>
            <div className="flex align-center mb-4">
              <Icon
                name={getTokenIconBySymbol(item.tokenB.symbol) as IconNames}
                width={16}
                height={16}
                className="mr-4"
              />
              <Text type="p1" weight="semibold" color={item.transactionType === 'DEPOSIT' ? 'red' : 'green'}>
                {item.transactionType === 'DEPOSIT' ? '-' : '+'}{' '}
                {formatToken(BigNumber.from(item.amountB)?.unscaleBy(item.tokenB.decimals))}
              </Text>
            </div>
            <Text type="small" weight="semibold" color="secondary">
              {formatUSD(BigNumber.from(item.amountB)?.unscaleBy(item.tokenB.decimals)?.multipliedBy(item.tokenBPrice))}
            </Text>
          </div>
        ),
      },
      {
        heading: 'Pool token amount',
        render: item => (
          <Text type="p1" weight="semibold" color={item.transactionType === 'DEPOSIT' ? 'green' : 'red'}>
            {item.transactionType === 'DEPOSIT' ? '+' : '-'}{' '}
            {formatToken(BigNumber.from(item.amountEToken)?.dividedBy(item.sFactorE))}
          </Text>
        ),
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
                  <a
                    href={getEtherscanAddressUrl(item.accountAddress)}
                    className="link-blue"
                    target="_blank"
                    rel="noreferrer noopener">
                    {shortenAddr(item.accountAddress, 6, 4)}
                  </a>
                );
              },
            } as ColumnType<TransactionApiType>,
          ]),
      {
        heading: 'Transaction Hash',
        render: function Render(item) {
          const { getEtherscanTxUrl } = useWeb3();

          return (
            <a
              href={getEtherscanTxUrl(item.transactionHash)}
              className="link-blue"
              target="_blank"
              rel="noreferrer noopener">
              {shortenAddr(item.transactionHash, 6, 4)}
            </a>
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
    ],
    [accountAddress],
  );

  return (
    <>
      <Table<TransactionApiType> columns={columns} data={dataList} loading={loading} />
      <TableFooter
        total={filters.total}
        current={filters.page}
        pageSize={filters.pageSize}
        onChange={page =>
          setFilters(prevFilters => ({
            ...prevFilters,
            page,
          }))
        }>
        {({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} entries
          </>
        )}
      </TableFooter>
    </>
  );
};
