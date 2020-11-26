import React from 'react';

import { PoolTypes } from 'web3/utils';

type StakingAction = {
  sumDeposits: string;
  sumWithdrawals: string;
};

export type PoolTxChartSummary = {
  timestamp: string;
  deposits: number;
  withdrawals: number;
};

export type PoolTxChartQuery = {
  pool?: PoolTypes;
  period?: string;
  type?: string;
};

export type PoolTxChartType = {
  summaries: PoolTxChartSummary[];
  loading: boolean;
  loaded: boolean;
  load: (query?: PoolTxChartQuery) => Promise<void>;
  startPooling: () => void;
  stopPooling: () => void;
};

const PoolTxChartContext = React.createContext<PoolTxChartType>({
  summaries: [],
  loading: false,
  loaded: false,
  load: () => Promise.reject(),
  startPooling: () => undefined,
  stopPooling: () => undefined,
});

export function usePoolTxChart(): PoolTxChartType {
  return React.useContext(PoolTxChartContext);
}

const TX_API_URL = String(process.env.REACT_APP_TOKEN_API_URL);
const TX_POOL_INTERVAL = Number(process.env.REACT_APP_TOKEN_API_POOL_INTERVAL);

const PoolTxChartProvider: React.FunctionComponent = props => {
  const [, forceRender] = React.useState<{}>({});
  const summariesRef = React.useRef<PoolTxChartSummary[]>([]);
  const loadingRef = React.useRef<boolean>(false);
  const loadedRef = React.useRef<boolean>(false);

  const poolFilterRef = React.useRef<PoolTypes | undefined>();
  const periodFilterRef = React.useRef<string | undefined>();
  const typeFilterRef = React.useRef<string | undefined>();

  const poolingIntervalID = React.useRef<any | undefined>();

  const fetchData = React.useCallback(async () => {
    loadingRef.current = true;
    forceRender({});

    const url = new URL('/staking-actions/chart', TX_API_URL);

    if (poolFilterRef.current) {
      url.searchParams.append('pool', poolFilterRef.current);
    }

    if (periodFilterRef.current) {
      url.searchParams.append('period', periodFilterRef.current);
    }

    if (typeFilterRef.current) {
      url.searchParams.append('type', typeFilterRef.current);
    }

    try {
      const result = await fetch(url.toString());
      const stakingActions: {
        [period: string]: StakingAction,
      } = await result.json();

      const summaries: PoolTxChartSummary[] = [];

      Object.entries(stakingActions).forEach(([k, v]) => {
        let timestamp: string = k;

        if (!periodFilterRef.current) {
          timestamp = `Epoch ${k}`;
        }

        summaries.push({
          timestamp,
          deposits: Number(v.sumDeposits),
          withdrawals: Number(v.sumWithdrawals),
        });
      });

      summariesRef.current = summaries;
    } catch (e) {
      console.error(e);
    }

    loadingRef.current = false;
    loadedRef.current = true;
    forceRender({});
  }, []);

  const load = React.useCallback((query?: PoolTxChartQuery) => {
    summariesRef.current = [];
    loadedRef.current = false;
    poolFilterRef.current = query?.pool;
    periodFilterRef.current = query?.period;
    typeFilterRef.current = query?.type;
    forceRender({});

    return fetchData();
  }, [fetchData]);

  const startPooling = React.useCallback(() => {
    if (!poolingIntervalID.current) {
      poolingIntervalID.current = setInterval(() => {
        fetchData()
          .catch(x => x);
      }, TX_POOL_INTERVAL);
    }
  }, [load]);

  const stopPooling = React.useCallback(() => {
    if (poolingIntervalID.current) {
      clearInterval(poolingIntervalID.current);
      poolingIntervalID.current = undefined;
    }
  }, []);

  const value = React.useMemo(() => ({
    summaries: summariesRef.current,
    loading: loadingRef.current,
    loaded: loadedRef.current,
    load,
    startPooling,
    stopPooling,
  }), [ // eslint-disable-line react-hooks/exhaustive-deps
    summariesRef.current,
    loadingRef.current,
    loadedRef.current,
    load,
    startPooling,
    stopPooling,
  ]);

  return (
    <PoolTxChartContext.Provider value={value}>
      {props.children}
    </PoolTxChartContext.Provider>
  );
};

export default PoolTxChartProvider;
