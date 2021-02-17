import React from 'react';

import { useEthWeb3 } from 'components/providers/eth-web3-provider';
import useMergeState from 'hooks/useMergeState';

export type PoolTxChartSummary = {
  deposits: number;
  withdrawals: number;
};

export type PoolTxChartState = {
  summaries: PoolTxChartSummary[];
  loading: boolean;
  poolFilter?: string;
  periodFilter?: string;
  typeFilter?: string;
};

const InitialState: PoolTxChartState = {
  summaries: [],
  loading: false,
  poolFilter: undefined,
  periodFilter: undefined,
  typeFilter: undefined,
};

export type PoolTxChartType = PoolTxChartState & {
  changePoolFilter(poolFilter?: string): void;
  changePeriodFilter(periodFilter?: string): void;
  changeTypeFilter(typeFilter?: string): void;
};

const PoolTxChartContext = React.createContext<PoolTxChartType>({
  ...InitialState,
  changePoolFilter: () => undefined,
  changePeriodFilter: () => undefined,
  changeTypeFilter: () => undefined,
});

export function usePoolTxChart(): PoolTxChartType {
  return React.useContext(PoolTxChartContext);
}

async function fetchPoolTransactions(
  poolFilter?: string,
  periodFilter?: string,
  typeFilter?: string,
): Promise<PoolTxChartSummary[]> {
  const url = new URL('/staking-actions/chart', String(process.env.REACT_APP_TOKEN_API_URL));

  if (poolFilter) {
    url.searchParams.append('pool', poolFilter);
  }

  if (periodFilter) {
    url.searchParams.append('period', periodFilter);
  }

  if (typeFilter) {
    url.searchParams.append('type', typeFilter);
  }

  return fetch(url.toString())
    .then(result => result.json())
    .then((stakingActions: any[]) => {
      const summaries: PoolTxChartSummary[] = [];

      if (!stakingActions) {
        return summaries;
      }

      Object.entries(stakingActions).forEach(([k, v]) => {
        summaries.push({
          deposits: Number(v.sumDeposits),
          withdrawals: Number(v.sumWithdrawals),
        });
      });

      return summaries;
    });
}

const PoolTxChartProvider: React.FC = props => {
  const { children } = props;

  const ethWeb3 = useEthWeb3();

  const [state, setState] = useMergeState<PoolTxChartState>(InitialState);

  React.useEffect(() => {
    setState({
      loading: true,
    });

    fetchPoolTransactions(state.poolFilter, state.periodFilter, state.typeFilter)
      .then(summaries => {
        setState({
          loading: false,
          summaries,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          summaries: [],
        });
      });
  }, [state.poolFilter, state.periodFilter, state.typeFilter]);

  React.useEffect(() => {}, [ethWeb3.blockNumber]);

  function changePoolFilter(poolFilter?: string) {
    setState({ poolFilter });
  }

  function changePeriodFilter(periodFilter?: string) {
    setState({ periodFilter });
  }

  function changeTypeFilter(typeFilter?: string) {
    setState({ typeFilter });
  }

  return (
    <PoolTxChartContext.Provider
      value={{
        ...state,
        changePoolFilter,
        changePeriodFilter,
        changeTypeFilter,
      }}>
      {children}
    </PoolTxChartContext.Provider>
  );
};

export default PoolTxChartProvider;
