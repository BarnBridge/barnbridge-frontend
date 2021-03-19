import React from 'react';
import { useLocation } from 'react-router-dom';

import { useReload } from 'hooks/useReload';
import {
  APISYRewardPool,
  APISYRewardPoolTransaction,
  fetchSYRewardPoolTransactions,
  fetchSYRewardPools,
} from 'modules/smart-yield/api';
import Erc20Contract from 'modules/smart-yield/contracts/erc20Contract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useWallet } from 'wallets/wallet';

export type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
};

type State = {
  marketId?: string;
  tokenId?: string;
  loading: boolean;
  pool?: SYRewardPool;
  transactions: APISYRewardPoolTransaction[];
};

const InitialState: State = {
  marketId: undefined,
  tokenId: undefined,
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

const RewardPoolProvider: React.FC = props => {
  const { children } = props;

  const location = useLocation();
  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  const [market, token] = React.useMemo(() => {
    const urlQuery = new URLSearchParams(location.search);

    let marketStr = urlQuery.get('m') ?? undefined;

    if (marketStr) {
      marketStr = decodeURIComponent(marketStr);
    }

    let tokenStr = urlQuery.get('t') ?? undefined;

    if (tokenStr) {
      tokenStr = decodeURIComponent(tokenStr);
    }

    return [marketStr, tokenStr];
  }, [location.search]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      pool: undefined,
    }));

    if (!market || !token) {
      return;
    }

    (async () => {
      try {
        const pools = await fetchSYRewardPools(market, token);

        if (pools.length === 0) {
          return;
        }

        const pool = pools[0];

        const rewardTokenContract = new Erc20Contract([], pool.rewardTokenAddress);
        rewardTokenContract.setProvider(wallet.provider);
        rewardTokenContract.loadCommon().then(reload);

        const poolTokenContract = new SYSmartYieldContract(pool.poolTokenAddress);
        poolTokenContract.setProvider(wallet.provider);
        poolTokenContract.loadCommon().then(reload);

        const poolContract = new SYRewardPoolContract(pool.poolAddress);
        poolContract.setProvider(wallet.provider);
        poolContract.loadCommon().then(reload);

        setState(prevState => ({
          ...prevState,
          loading: false,
          pool: {
            ...pool,
            rewardToken: rewardTokenContract,
            poolToken: poolTokenContract,
            pool: poolContract,
          },
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, [market, token]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      transactions: [],
    }));

    const { pool } = state;

    if (!pool) {
      return;
    }

    (async () => {
      try {
        const {
          data: transactions,
          meta: { count },
        } = await fetchSYRewardPoolTransactions(pool.poolAddress);

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
  }, [state.pool]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default RewardPoolProvider;
