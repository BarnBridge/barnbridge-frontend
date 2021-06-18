import { useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { formatToken, formatUSD, getEtherscanAddressUrl, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Icon from 'components/custom/icon';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { getTokenIconBySymbol } from 'components/providers/known-tokens-provider';
import { TransactionApiType, fetchTransactions } from 'modules/smart-exposure/api';

export const TransactionsTable = ({
  accountAddress,
  poolAddress,
}: {
  accountAddress?: string;
  poolAddress?: string;
}) => {
  const [dataList, setDataList] = useState<TransactionApiType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    pageSize: number;
  }>({
    total: 0,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    setLoading(true);
    fetchTransactions({ page: pagination.page, limit: pagination.pageSize, accountAddress, poolAddress })
      .then(result => {
        if (Array.isArray(result.data)) {
          setDataList(result.data);
          setPagination(prevPagination => ({
            ...prevPagination,
            total: result.meta.count,
          }));
        } else {
          setDataList([]);
          setPagination(prevPagination => ({
            ...prevPagination,
            total: 0,
          }));
        }
      })
      .catch(err => {
        setDataList([]);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [pagination.page, pagination.pageSize, accountAddress, poolAddress]);

  const columns: ColumnType<TransactionApiType>[] = useMemo(
    () => [
      {
        heading: 'Transaction type',
        render: item => (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {item.transactionType === 'WITHDRAW' ? 'Withdraw' : 'Deposit'}
            </Text>
            {/* <Text type="small" weight="semibold" color="secondary">
            Multiple tokens
          </Text> */}
          </div>
        ),
      },
      {
        heading: `Token 1 amount`,
        render: item => (
          <div style={{ whiteSpace: 'nowrap' }}>
            <div className="flex align-center mb-4">
              <Icon name={getTokenIconBySymbol(item.tokenA.symbol)} width={16} height={16} className="mr-4" />
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
              <Icon name={getTokenIconBySymbol(item.tokenB.symbol)} width={16} height={16} className="mr-4" />
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
            {formatToken(BigNumber.from(item.amountEToken)?.unscaleBy(item.tokenB.decimals))}
          </Text>
        ),
      },
      ...(accountAddress
        ? []
        : [
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
            } as ColumnType<TransactionApiType>,
          ]),
      {
        heading: 'Transaction Hash',
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
        total={pagination.total}
        current={pagination.page}
        pageSize={pagination.pageSize}
        onChange={page =>
          setPagination(prevPagination => ({
            ...prevPagination,
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
