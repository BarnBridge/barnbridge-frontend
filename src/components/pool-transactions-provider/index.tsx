import React from 'react';
import { useLazyQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useSessionStorage } from 'react-use-storage';
import BigNumber from 'bignumber.js';
import first from 'lodash/first';

import { useWeb3Contracts, Web3ContractsType } from 'web3/contracts';

export type StakingAction = {
  id: string;
  type: string;
  user: string;
  token: string;
  amount: string;
  blockNumber: number;
  blockTimestamp: number;
  txHash: string;
};

type QueryData = {
  stakingActions: StakingAction[];
};

type QueryVars = {
  first: number;
  lastBlockNumber: number;
};

export type PoolTransaction = {
  id: string;
  txHash: string;
  blockNumber: number;
  blockTimestamp: number;
  token: string;
  user: string;
  type: string;
  amount: BigNumber;
  usdAmount: BigNumber | undefined;
  tokenAmount: BigNumber | undefined;
};

export type PoolTransactionsType = {
  transactions: PoolTransaction[];
  loading: boolean;
};

const PoolTransactionsContext = React.createContext<PoolTransactionsType>({
  transactions: [],
  loading: false,
});

export function usePoolTransactions(): PoolTransactionsType {
  return React.useContext(PoolTransactionsContext);
}

const POOL_TRANSACTIONS_QUERY = gql(`
  query ($first: Int, $lastBlockNumber: Int) {
    stakingActions (
      orderBy: blockTimestamp,
      orderDirection: asc,
      first: $first,
      where: {
        blockNumber_gte: $lastBlockNumber
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
`);

const TRANSACTIONS_LIMIT = 1000;
const STORAGE_KEY_LAST_BLOCK_NUMBER = 'pool_transactions_lastBlockNumber';
const STORAGE_KEY_DATA = 'pool_transactions_data';

const PoolTransactionsProvider: React.FunctionComponent = props => {
  const web3cRef = React.useRef<Web3ContractsType>(null as any);
  web3cRef.current = useWeb3Contracts();

  const [lastBlockNumber, setLastBlockNumber] = useSessionStorage<number>(STORAGE_KEY_LAST_BLOCK_NUMBER);
  const [data, setData] = useSessionStorage<string>(STORAGE_KEY_DATA);

  const [transactions, setTransactions] = React.useState<PoolTransaction[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const idsRef = React.useRef<Set<string>>(new Set());

  function readFromStorage() {
    try {
      const parsedData = data ? JSON.parse(data) as PoolTransaction[] : [];

      setTransactions(parsedData.map(item => {
        idsRef.current.add(item.id);

        return {
          ...item,
          amount: new BigNumber(item.amount),
          get usdAmount() {
            return web3cRef.current.getTokenUsdValue(item.token, this.amount);
          },
          get tokenAmount() {
            return web3cRef.current.getTokenHumanValue(item.token, this.amount);
          },
        };
      }));
    } catch (e) {
      console.error(e);
    }
  }

  function writeToStorage() {
    const lastTransaction = first(transactions);

    if (lastTransaction) {
      setLastBlockNumber(lastTransaction.blockNumber);
      setData(JSON.stringify(transactions.map(t => {
        const { amount, usdAmount, tokenAmount, ...rest } = t;

        return {
          ...rest,
          amount: amount.toFixed(),
        };
      })));
    }
  }

  function onCompleted(data: QueryData) {
    const { stakingActions } = data;

    const items: PoolTransaction[] = stakingActions
      .reduce<PoolTransaction[]>((ac, item) => {
        if (!idsRef.current.has(item.id)) {
          idsRef.current.add(item.id);

          const transaction = {
            id: item.id,
            txHash: item.txHash,
            blockNumber: item.blockNumber,
            blockTimestamp: Number(item.blockTimestamp) * 1000,
            token: item.token,
            user: item.user,
            type: item.type.toUpperCase(),
            amount: new BigNumber(item.amount),
            get usdAmount() {
              return web3cRef.current.getTokenUsdValue(item.token, this.amount);
            },
            get tokenAmount() {
              return web3cRef.current.getTokenHumanValue(item.token, this.amount);
            },
          };

          ac.push(transaction);
        }

        return ac;
      }, []);

    if (items.length === 0) {
      setLoading(false);
      return;
    }

    setTransactions(prevState => ([
      ...items.reverse(),
      ...prevState,
    ]));
  }

  const [fetch] = useLazyQuery<QueryData, QueryVars>(POOL_TRANSACTIONS_QUERY, {
    variables: {
      first: TRANSACTIONS_LIMIT,
      lastBlockNumber: lastBlockNumber ?? 0,
    },
    onCompleted,
  });

  React.useEffect(() => {
    readFromStorage();
    fetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    writeToStorage();
  }, [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = React.useMemo(() => ({
    transactions,
    loading,
  }), [transactions, loading]);

  return (
    <PoolTransactionsContext.Provider value={value}>
      {props.children}
    </PoolTransactionsContext.Provider>
  );
};

export default PoolTransactionsProvider;
