import React from 'react';
import { useQuery } from 'react-apollo';
import { DocumentNode, gql } from 'apollo-boost';
import { ApolloQueryResult } from 'apollo-client/core/types';
import { QueryHookOptions, QueryLazyOptions, QueryTuple } from '@apollo/react-hooks/lib/types';
import { format, formatDistance } from 'date-fns';
import BigNumber from 'bignumber.js';

import { useWeb3Contracts, Web3ContractsType } from 'web3/contracts';
import { formatBigValue, shortenAddr } from 'web3/utils';

// where: {
//   token_in: $token
//   blockTimestamp_gte: $gt
//   blockTimestamp_lte: $lt
// }

export type StakingAction = {
  id: string;
  type: string;
  user: string;
  token: string;
  amount: string;
  blockNumber: number;
  blockTimestamp: string;
  txHash: string;
};

type QueryData = {
  stakingActions: StakingAction[];
};

type QueryVars = {};

export type UseTransactionsOptions = {
  token?: string;
  type?: string;
  limit?: number;
};

const useImperativeQuery = <T, V>(query: DocumentNode, options?: QueryHookOptions<T, V>): QueryTuple<T, V> => {
  const q = useQuery<T, V>(query, {
    ...options,
    skip: true,
  });

  const imperativelyCallQuery = (opts: QueryLazyOptions<V> | undefined): Promise<ApolloQueryResult<T>> => {
    return q.refetch(opts?.variables);
  };

  return [imperativelyCallQuery, q];
};

export function useTransactions(opts?: UseTransactionsOptions) {
  const firstRef = React.useRef<number>(opts?.limit ?? 10);
  const skipRef = React.useRef<number>(0);
  const endRef = React.useRef<boolean>(false);
  const web3cRef = React.useRef<Web3ContractsType>(null as any);
  web3cRef.current = useWeb3Contracts();

  const query = React.useMemo(() => gql(`
		query ($first: Int, $skip: Int) {
			stakingActions (
				orderBy: blockNumber,
				orderDirection: desc,
				first: $first,
				skip: $skip,
				where: {
				  ${opts?.token ? `token: "${opts.token}"` : ''}
				  ${opts?.type ? `type: "${opts.type}"` : ''}
				}
			) {
				id
				type
				user
				token
				amount
				blockNumber
				blockTimestamp
				txHash
			}
		}
  `), [opts]);

  const [fetch, { loading }] = useImperativeQuery<QueryData, QueryVars>(query);
  const fetchRef = React.useRef(fetch);
  fetchRef.current = fetch;

  const [data, setData] = React.useState<any[]>([]);

  const parseData = React.useCallback((data: QueryData) => {
    return (data?.stakingActions || []).map((item: StakingAction) => {
      const time = Number(item.blockTimestamp) * 1000;

      return {
        ...item,
        userShort: shortenAddr(item.user),
        txHashShort: shortenAddr(item.txHash),
        timestamp: format(time, 'MM/dd/yyyy'),
        timeCode: format(time, 'yyyyMMdd'),
        get timeDistance(): string {
          return formatDistance(new Date(time), new Date(), {
            addSuffix: true,
          });
        },
        get amount() {
          return web3cRef.current.getTokenHumanValue(item.token, new BigNumber(item.amount));
        },
        get amountFormat() {
          const amountValue = web3cRef.current.getTokenHumanValue(item.token, new BigNumber(item.amount));

          return amountValue ? `$ ${formatBigValue(amountValue)}` : '-';
        },
      };
    });
  }, []);

  const fetchWrap = React.useCallback(async () => {
    skipRef.current = 0;
    endRef.current = false;
    setData([]);

    const { data: rawData } = await fetchRef.current({
      variables: {
        first: firstRef.current,
        skip: skipRef.current,
      },
    }) as any;

    if (rawData) {
      const rows = parseData(rawData);

      skipRef.current += firstRef.current;
      endRef.current = rows.length < firstRef.current;
      setData(prevState => [
        ...prevState,
        ...rows,
      ]);
    }
  }, [parseData]);

  const fetchMore = React.useCallback(async () => {
    const { data: rawData } = await fetchRef.current({
      variables: {
        first: firstRef.current,
        skip: skipRef.current,
      },
    }) as any;

    if (rawData) {
      const rows = parseData(rawData);

      skipRef.current += firstRef.current;
      endRef.current = rows.length < firstRef.current;
      setData(prevState => [
        ...prevState,
        ...rows,
      ]);
    }
  }, [parseData]);

  // const token = opts?.token;
  // const type = opts?.type;

  // React.useEffect(() => {
  //   console.log('REQ');
  //   fetchWrap().catch(x => x);
  // }, [token, type]);

  return {
    loading,
    data,
    isEnd: endRef.current,
    fetch: fetchWrap,
    fetchMore,
  };
}
