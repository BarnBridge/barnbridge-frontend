import React from 'react';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { useReload } from 'hooks/useReload';
import { APISYRewardPool, fetchSYRewardPools } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useWallet } from 'wallets/wallet';

export type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
};

type State = {
  loading: boolean;
  rewardPools: SYRewardPool[];
};

const InitialState: State = {
  loading: false,
  rewardPools: [],
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
      rewardPools: [],
    }));

    (async () => {
      try {
        const result = await fetchSYRewardPools();

        const pools = result.map(pool => {
          const rewardTokenContract = new Erc20Contract([], pool.rewardTokenAddress);
          rewardTokenContract.setProvider(wallet.provider);
          rewardTokenContract.on(Web3Contract.UPDATE_DATA, reload);
          rewardTokenContract.loadCommon();

          const poolTokenContract = new SYSmartYieldContract(pool.poolTokenAddress);
          poolTokenContract.setProvider(wallet.provider);
          poolTokenContract.on(Web3Contract.UPDATE_DATA, reload);
          poolTokenContract.loadCommon();

          const poolContract = new SYRewardPoolContract(pool.poolAddress);
          poolContract.setProvider(wallet.provider);
          poolContract.on(Web3Contract.UPDATE_DATA, reload);
          poolContract.loadCommon();

          return {
            ...pool,
            rewardToken: rewardTokenContract,
            poolToken: poolTokenContract,
            pool: poolContract,
          };
        });

        setState(prevState => ({
          ...prevState,
          loading: false,
          rewardPools: pools,
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
    state.rewardPools.forEach(pool => {
      pool.rewardToken.setProvider(wallet.provider);
      pool.poolToken.setProvider(wallet.provider);
      pool.pool.setProvider(wallet.provider);
    });
  }, [state.rewardPools, wallet.provider]);

  React.useEffect(() => {
    state.rewardPools.forEach(pool => {
      pool.rewardToken.setAccount(wallet.account);

      pool.poolToken.setAccount(wallet.account);
      pool.poolToken.loadBalance();

      pool.pool.setAccount(wallet.account);
      pool.pool.loadClaim();
      pool.pool.loadBalance();
    });
  }, [state.rewardPools, wallet.account]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return (
    <Context.Provider value={value}>
      {children}
      {state.rewardPools.map(pool => (
        <ContractListener key={pool.poolAddress} contract={pool.pool} />
      ))}
    </Context.Provider>
  );
};

export default RewardPoolsProvider;
