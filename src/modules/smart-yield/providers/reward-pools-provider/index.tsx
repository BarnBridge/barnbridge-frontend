import React from 'react';

import { useReload } from 'hooks/useReload';
import { APISYRewardPool, fetchSYRewardPools } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import { useWallet } from 'wallets/wallet';

export type SYRewardPool = APISYRewardPool & {
  contracts: {
    rewardPool: SYRewardPoolContract;
  };
};

type State = {
  loading: boolean;
  pools: SYRewardPool[];
};

const InitialState: State = {
  loading: false,
  pools: [],
};

type ContextType = State;

const Context = React.createContext<ContextType>({
  ...InitialState,
});

export function useRewardPools(): ContextType {
  return React.useContext(Context);
}

const RewardPoolsProvider: React.FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      pools: [],
    }));

    (async () => {
      try {
        const pools = await fetchSYRewardPools();

        setState(prevState => ({
          ...prevState,
          loading: false,
          pools: pools.map(pool => {
            const rewardPoolContract = new SYRewardPoolContract(pool.poolAddress);
            rewardPoolContract.setProvider(wallet.provider);
            rewardPoolContract.loadCommon().then(reload);

            return {
              ...pool,
              contracts: {
                rewardPool: rewardPoolContract,
              },
            };
          }),
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, []);

  React.useEffect(() => {
    state.pools.forEach(pool => {
      pool.contracts.rewardPool.setProvider(wallet.provider);
    });
  }, [state.pools, wallet.provider]);

  React.useEffect(() => {
    state.pools.forEach(pool => {
      pool.contracts.rewardPool.setAccount(wallet.account);
      pool.contracts.rewardPool.loadClaim().then(reload);
    });
  }, [state.pools, wallet.account]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
};

export default RewardPoolsProvider;
