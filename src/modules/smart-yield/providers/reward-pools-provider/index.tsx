import React from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/contracts/erc20Contract';
import Web3Contract from 'web3/contracts/web3Contract';
import { ZERO_BIG_NUMBER } from 'web3/utils';

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
  totalValueLocked?: BigNumber;
};

const InitialState: State = {
  loading: false,
  rewardPools: [],
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

  const convertInUSD = React.useCallback((value: BigNumber | number): BigNumber | undefined => {
    return new BigNumber(value).multipliedBy(1);
  }, []);

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

  const totalValueLocked = React.useMemo(() => {
    return state.rewardPools.reduce((a, c) => {
      if (!c.pool.poolSize) {
        return a;
      }

      const tokenValue = c.poolToken.convertInUnderlying(c.pool.poolSize.dividedBy(10 ** (c.poolToken.decimals ?? 0)));

      if (!tokenValue) {
        return a;
      }

      const usdValue = convertInUSD(tokenValue);

      if (!usdValue) {
        return a;
      }

      return a.plus(usdValue);
    }, ZERO_BIG_NUMBER);
  }, [state.rewardPools, version]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
      totalValueLocked,
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
