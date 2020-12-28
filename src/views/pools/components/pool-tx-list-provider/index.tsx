import React from 'react';
import BigNumber from 'bignumber.js';
import first from 'lodash/first';
import last from 'lodash/last';

type StakingAction = {
  id: string;
  type: string;
  amount: string;
  blockTimestamp: number;
  blockNumber: number;
  token: string;
  txHash: string;
  user: string;
};

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

export type PoolTxListQuery = {
  user?: string;
  token?: string;
  type?: string;
};

export type PoolTxListType = {
  transactions: PoolTxListItem[];
  loading: boolean;
  loaded: boolean;
  isEnd: boolean;
  load: (query?: PoolTxListQuery) => Promise<void>;
  loadNext: () => Promise<void>;
  loadNewer: () => Promise<void>;
  startPooling: () => void;
  stopPooling: () => void;
};

const PoolTxListContext = React.createContext<PoolTxListType>({
  transactions: [],
  loading: false,
  loaded: false,
  isEnd: false,
  load: () => Promise.reject(),
  loadNext: () => Promise.reject(),
  loadNewer: () => Promise.reject(),
  startPooling: () => undefined,
  stopPooling: () => undefined,
});

export function usePoolTxList(): PoolTxListType {
  return React.useContext(PoolTxListContext);
}

const API_URL = String(process.env.REACT_APP_TOKEN_API_URL);
const API_POOL_INTERVAL = Number(process.env.REACT_APP_TOKEN_API_POOL_INTERVAL);
const TX_LIMIT = 10;

const PoolTxListProvider: React.FunctionComponent = props => {
  const [, forceRender] = React.useState<{}>({});
  const txRef = React.useRef<PoolTxListItem[]>([]);
  const firstTimestampRef = React.useRef<number | undefined>();
  const lastTimestampRef = React.useRef<number | undefined>();
  const loadingRef = React.useRef<boolean>(false);
  const loadedRef = React.useRef<boolean>(false);
  const endRef = React.useRef<boolean>(false);

  const userFilterRef = React.useRef<string | undefined>();
  const tokenFilterRef = React.useRef<string | undefined>();
  const typeFilterRef = React.useRef<string | undefined>();

  const poolingIntervalID = React.useRef<any | undefined>();

  const fetchData = React.useCallback(async (timestamp?: number, direction: 'asc' | 'desc' = 'desc') => {
    loadingRef.current = true;
    forceRender({});

    const url = new URL('/staking-actions/list', API_URL);
    url.searchParams.append('count', String(TX_LIMIT));

    if (timestamp) {
      url.searchParams.append('timestamp', String(timestamp));
    }

    url.searchParams.append('direction', direction);

    if (userFilterRef.current) {
      url.searchParams.append('user', userFilterRef.current);
    }

    if (tokenFilterRef.current) {
      url.searchParams.append('token', tokenFilterRef.current);
    }

    if (typeFilterRef.current) {
      url.searchParams.append('type', typeFilterRef.current);
    }

    try {
      const result = await fetch(url.toString());
      const stakingActions: StakingAction[] = await result.json();

      if (stakingActions) {
        const transactions: PoolTxListItem[] = stakingActions.map(stakingAction => ({
          ...stakingAction,
          blockTimestamp: stakingAction.blockTimestamp * 1000,
          type: stakingAction.type.toUpperCase(),
          get amount() {
            return new BigNumber(stakingAction.amount);
          },
        }));

        txRef.current = [
          ...(direction === 'asc') ? transactions.reverse() : [],
          ...txRef.current,
          ...(direction === 'desc') ? transactions : [],
        ];

        const firstItem = first(txRef.current);

        if (firstItem) {
          firstTimestampRef.current = firstItem.blockTimestamp / 1000;
        }

        const lastItem = last(txRef.current);

        if (lastItem) {
          lastTimestampRef.current = lastItem.blockTimestamp / 1000;
        }

        if (direction === 'desc' && transactions.length === 0) {
          endRef.current = true;
        }
      }

      if (stakingActions === null && direction === 'desc') {
        endRef.current = true;
      }
    } catch (e) {
      console.error(e);
    }

    loadingRef.current = false;
    loadedRef.current = true;
    forceRender({});
  }, []);

  const load = React.useCallback((query?: PoolTxListQuery) => {
    txRef.current = [];
    loadedRef.current = false;
    endRef.current = false;
    firstTimestampRef.current = undefined;
    lastTimestampRef.current = undefined;
    userFilterRef.current = query?.user;
    tokenFilterRef.current = query?.token;
    typeFilterRef.current = query?.type;
    forceRender({});

    return fetchData();
  }, [fetchData]);

  const loadNext = React.useCallback(async () => {
    return fetchData(lastTimestampRef.current, 'desc');
  }, [fetchData]);

  const loadNewer = React.useCallback(async () => {
    if (loadingRef.current) {
      return Promise.resolve();
    }

    return fetchData(firstTimestampRef.current, 'asc');
  }, [fetchData]);

  const startPooling = React.useCallback(() => {
    if (!poolingIntervalID.current) {
      poolingIntervalID.current = setInterval(() => {
        loadNewer()
          .catch(x => x);
      }, API_POOL_INTERVAL);
    }
  }, [loadNewer]);

  const stopPooling = React.useCallback(() => {
    if (poolingIntervalID.current) {
      clearInterval(poolingIntervalID.current);
      poolingIntervalID.current = undefined;
    }
  }, []);

  const value = React.useMemo(() => ({
    transactions: txRef.current,
    loading: loadingRef.current,
    loaded: loadedRef.current,
    isEnd: endRef.current,
    load,
    loadNext,
    loadNewer,
    startPooling,
    stopPooling,
  }), [ // eslint-disable-line react-hooks/exhaustive-deps
    txRef.current,
    loadingRef.current,
    loadedRef.current,
    endRef.current,
    load,
    loadNext,
    loadNewer,
    startPooling,
    stopPooling,
  ]);

  return (
    <PoolTxListContext.Provider value={value}>
      {props.children}
    </PoolTxListContext.Provider>
  );
};

export default PoolTxListProvider;
