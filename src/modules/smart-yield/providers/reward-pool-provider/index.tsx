import React from 'react';

import { useReload } from 'hooks/useReload';
import { APISYRewardPool, APISYRewardPoolTransaction, fetchSYRewardPoolTransactions } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';

export type SYRewardPool = APISYRewardPool & {
  contracts: {
    rewardPool: SYRewardPoolContract;
  };
};

type State = {
  loading: boolean;
  pool?: SYRewardPool;
  transactions: APISYRewardPoolTransaction[];
};

const InitialState: State = {
  loading: false,
  pool: undefined,
  transactions: [],
};

type ContextType = State;

const Context = React.createContext<ContextType>({
  ...InitialState,
});

export function useRewardPool(): ContextType {
  return React.useContext(Context);
}

type Props = {
  poolAddress: string;
};

const RewardPoolProvider: React.FC<Props> = props => {
  const { children, poolAddress } = props;

  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      transactions: [],
    }));

    (async () => {
      try {
        const {
          data: transactions,
          meta: { count },
        } = await fetchSYRewardPoolTransactions(poolAddress);

        setState(prevState => ({
          ...prevState,
          loading: false,
          transactions,
          totalTransactions: count,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, [poolAddress]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default RewardPoolProvider;
