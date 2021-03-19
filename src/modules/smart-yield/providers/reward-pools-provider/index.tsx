import React from 'react';

import { useReload } from 'hooks/useReload';
import { APISYRewardPool, fetchSYRewardPools } from 'modules/smart-yield/api';
import Erc20Contract from 'modules/smart-yield/contracts/erc20Contract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useWallet } from 'wallets/wallet';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER } from 'web3/utils';

export type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
  priceInUSD?: BigNumber;
};

type State = {
  loading: boolean;
  pools: SYRewardPool[];
  totalValueLocked?: BigNumber;
};

const InitialState: State = {
  loading: false,
  pools: [],
  totalValueLocked: undefined,
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
      totalValueLocked: undefined,
    }));

    (async () => {
      try {
        const result = await fetchSYRewardPools();

        const pools = result.map(pool => {
          const rewardTokenContract = new Erc20Contract([], pool.rewardTokenAddress);
          rewardTokenContract.setProvider(wallet.provider);
          rewardTokenContract.loadCommon().then(reload);

          const poolTokenContract = new SYSmartYieldContract(pool.poolTokenAddress);
          poolTokenContract.setProvider(wallet.provider);
          poolTokenContract.loadCommon().then(reload);

          const poolContract = new SYRewardPoolContract(pool.poolAddress);
          poolContract.setProvider(wallet.provider);
          poolContract.loadCommon().then(reload);

          return {
            ...pool,
            rewardToken: rewardTokenContract,
            poolToken: poolTokenContract,
            pool: poolContract,
            priceInUSD: poolTokenContract.price?.multipliedBy(1),
          };
        });

        setState(prevState => ({
          ...prevState,
          loading: false,
          pools,
          totalValueLocked: pools.reduce((a, c) => {
            return a.plus(c.pool.poolSize?.multipliedBy(c.poolToken.price ?? 1).multipliedBy(1) ?? ZERO_BIG_NUMBER);
          }, ZERO_BIG_NUMBER),
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
      pool.rewardToken.setProvider(wallet.provider);
      pool.poolToken.setProvider(wallet.provider);
      pool.pool.setProvider(wallet.provider);
    });
  }, [state.pools, wallet.provider]);

  React.useEffect(() => {
    state.pools.forEach(pool => {
      pool.rewardToken.setAccount(wallet.account);

      pool.poolToken.setAccount(wallet.account);
      pool.poolToken.loadBalance().then(reload);

      pool.pool.setAccount(wallet.account);
      pool.pool.loadClaim().then(reload);
      pool.pool.loadBalance().then(reload);
    });
  }, [state.pools, wallet.account]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default RewardPoolsProvider;
