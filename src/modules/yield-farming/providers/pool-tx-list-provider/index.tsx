import React from 'react';
import BigNumber from 'bignumber.js';

import { useEthWeb3 } from 'components/providers/eth-web3-provider';
import useMergeState from 'hooks/useMergeState';

export type PoolTxListItem = {
  id: string;
  type: string;
  amount: BigNumber;
  blockTimestamp: number;
  blockNumber: number;
  token: string;
  txHash: string;
  user: string;
};

export type PoolTxListState = {
  transactions: PoolTxListItem[];
  limit: number;
  loading: boolean;
  loaded: boolean;
  isEnd: boolean;
  userFilter?: string;
  tokenFilter?: string;
  typeFilter?: string;
};

const InitialState: PoolTxListState = {
  transactions: [],
  limit: 10,
  loading: false,
  loaded: false,
  isEnd: false,
  userFilter: undefined,
  tokenFilter: undefined,
  typeFilter: undefined,
};

export type PoolTxListType = PoolTxListState & {
  loadNext: () => void;
  changeUserFilter(userFilter?: string): void;
  changeTokenFilter(tokenFilter?: string): void;
  changeTypeFilter(typeFilter?: string): void;
};

const PoolTxListContext = React.createContext<PoolTxListType>({
  ...InitialState,
  loadNext: () => undefined,
  changeUserFilter: () => undefined,
  changeTokenFilter: () => undefined,
  changeTypeFilter: () => undefined,
});

export function usePoolTxList(): PoolTxListType {
  return React.useContext(PoolTxListContext);
}

async function fetchPoolTransactions(
  timestamp?: number,
  direction: 'asc' | 'desc' = 'desc',
  limit: number = 10,
  userFilter?: string,
  tokenFilter?: string,
  typeFilter?: string,
): Promise<PoolTxListItem[]> {
  const url = new URL('/staking-actions/list', String(process.env.REACT_APP_TOKEN_API_URL));
  url.searchParams.append('count', String(limit));

  if (timestamp) {
    url.searchParams.append('timestamp', String(timestamp));
  }

  url.searchParams.append('direction', direction);

  if (userFilter) {
    url.searchParams.append('user', userFilter);
  }

  if (tokenFilter) {
    url.searchParams.append('token', tokenFilter);
  }

  if (typeFilter) {
    url.searchParams.append('type', typeFilter);
  }

  return fetch(url.toString())
    .then(result => result.json())
    .then((stakingActions: any[]) => {
      if (!stakingActions) {
        return [];
      }

      return stakingActions.map(stakingAction => ({
        ...stakingAction,
        amount: new BigNumber(stakingAction.amount),
      }));
    });
}

const PoolTxListProvider: React.FC = props => {
  const { children } = props;

  const ethWeb3 = useEthWeb3();
  const [state, setState] = useMergeState<PoolTxListState>(InitialState);
  const stateRef = React.useRef<PoolTxListState>(state);
  stateRef.current = state;

  const load = React.useCallback(() => {
    const { limit, userFilter, tokenFilter, typeFilter } = stateRef.current;

    setState({
      loading: true,
      loaded: false,
    });

    fetchPoolTransactions(undefined, 'desc', limit, userFilter, tokenFilter, typeFilter)
      .then(transactions => {
        setState({
          loading: false,
          loaded: true,
          isEnd: transactions.length < limit,
          transactions,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          transactions: [],
        });
      });
  }, [setState]);

  const loadNew = React.useCallback(() => {
    const { transactions, userFilter, tokenFilter, typeFilter } = stateRef.current;

    const lastTimestamp = transactions.length > 0
      ? transactions[0].blockTimestamp
      : (Date.now() / 1_000);

    setState({
      loading: true,
    });

    fetchPoolTransactions(lastTimestamp, 'asc', 100, userFilter, tokenFilter, typeFilter)
      .then(transactions => {
        setState(prevState => ({
          loading: false,
          transactions: [...transactions, ...prevState.transactions],
        }));
      })
      .catch(() => {
        setState({
          loading: false,
        });
      });
  }, [setState]);

  const loadNext = React.useCallback(() => {
    const { transactions, limit, userFilter, tokenFilter, typeFilter } = stateRef.current;

    if (transactions.length > 0) {
      const { blockTimestamp } = transactions[transactions.length - 1];

      setState({
        loading: true,
      });

      fetchPoolTransactions(blockTimestamp, 'desc', limit, userFilter, tokenFilter, typeFilter)
        .then(transactions => {
          setState(prevState => ({
            loading: false,
            isEnd: transactions.length < limit,
            transactions: [...prevState.transactions, ...transactions],
          }));
        })
        .catch(() => {
          setState({
            loading: false,
          });
        });
    }
  }, [setState]);

  const changeUserFilter = React.useCallback((userFilter?: string) => {
    setState({ userFilter });
  }, [setState]);

  const changeTokenFilter = React.useCallback((tokenFilter?: string) => {
    setState({ tokenFilter });
  }, [setState]);

  const changeTypeFilter = React.useCallback((typeFilter?: string) => {
    setState({ typeFilter });
  }, [setState]);

  React.useEffect(() => {
    load();
  }, [load, state.limit, state.userFilter, state.tokenFilter, state.typeFilter]);

  React.useEffect(() => {
    if (!stateRef.current.loaded) {
      return;
    }

    loadNew();
  }, [ethWeb3.blockNumber, loadNew]);

  const value = React.useMemo(() => ({
    ...state,
    loadNext,
    changeUserFilter,
    changeTokenFilter,
    changeTypeFilter,
  }), [
    state,
    loadNext,
    changeUserFilter,
    changeTokenFilter,
    changeTypeFilter,
  ]);

  return (
    <PoolTxListContext.Provider value={value}>
      {children}
    </PoolTxListContext.Provider>
  );
};

export default PoolTxListProvider;
