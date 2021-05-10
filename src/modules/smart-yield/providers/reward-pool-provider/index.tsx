import React from 'react';
import { useLocation } from 'react-router-dom';
import BigNumber from 'bignumber.js';
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
  marketId?: string;
  tokenId?: string;
  loading: boolean;
  rewardPool?: SYRewardPool;
};

const InitialState: State = {
  marketId: undefined,
  tokenId: undefined,
  loading: false,
  rewardPool: undefined,
};

type Actions = {
  sendClaim: (gasPrice: number) => Promise<void>;
  sendDeposit: (amount: BigNumber, gasPrice: number) => Promise<void>;
  sendWithdraw: (amount: BigNumber, gasPrice: number) => Promise<void>;
  sendWithdrawAndClaim: (amount: BigNumber, gasPrice: number) => Promise<void>;
};

type ContextType = State & Actions;

const Context = React.createContext<ContextType>({
  ...InitialState,
  sendClaim: () => Promise.reject(),
  sendDeposit: () => Promise.reject(),
  sendWithdraw: () => Promise.reject(),
  sendWithdrawAndClaim: () => Promise.reject(),
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
      rewardPool: undefined,
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

        setState(prevState => ({
          ...prevState,
          loading: false,
          rewardPool: {
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
    const { rewardPool } = state;

    if (rewardPool) {
      rewardPool.rewardToken.setProvider(wallet.provider);
      rewardPool.poolToken.setProvider(wallet.provider);
      rewardPool.pool.setProvider(wallet.provider);
    }
  }, [state.rewardPool, wallet.provider]);

  React.useEffect(() => {
    const { rewardPool } = state;

    if (rewardPool) {
      rewardPool.rewardToken.setAccount(wallet.account);
      rewardPool.rewardToken.loadBalance();

      rewardPool.poolToken.setAccount(wallet.account);
      rewardPool.poolToken.loadBalance();
      rewardPool.poolToken.loadAllowance(rewardPool.poolAddress);

      rewardPool.pool.setAccount(wallet.account);
      rewardPool.pool.loadClaim();
      rewardPool.pool.loadBalance();
    }
  }, [state.rewardPool, wallet.account]);

  const sendClaim = React.useCallback(
    (gasPrice: number) => {
      if (!state.rewardPool) {
        return Promise.reject();
      }

      return state.rewardPool.pool.sendClaim(gasPrice).then(() => {
        state.rewardPool?.rewardToken.loadBalance();
      });
    },
    [state.rewardPool],
  );

  const sendDeposit = React.useCallback(
    (amount: BigNumber, gasPrice: number) => {
      if (!state.rewardPool) {
        return Promise.reject();
      }

      return state.rewardPool.pool.sendDeposit(amount, gasPrice).then(() => {
        state.rewardPool?.poolToken.loadBalance();
      });
    },
    [state.rewardPool],
  );

  const sendWithdraw = React.useCallback(
    (amount: BigNumber, gasPrice: number) => {
      if (!state.rewardPool) {
        return Promise.reject();
      }

      return state.rewardPool.pool.sendWithdraw(amount, gasPrice).then(() => {
        state.rewardPool?.poolToken.loadBalance();
      });
    },
    [state.rewardPool],
  );

  const sendWithdrawAndClaim = React.useCallback(
    (amount: BigNumber, gasPrice: number) => {
      if (!state.rewardPool) {
        return Promise.reject();
      }

      return state.rewardPool.pool.sendWithdrawAndClaim(amount, gasPrice).then(() => {
        state.rewardPool?.rewardToken.loadBalance();
        state.rewardPool?.poolToken.loadBalance();
      });
    },
    [state.rewardPool],
  );

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
      sendClaim,
      sendDeposit,
      sendWithdraw,
      sendWithdrawAndClaim,
    };
  }, [state, version]);

  return (
    <Context.Provider value={value}>
      {children}
      <ContractListener contract={state.rewardPool?.pool} />
    </Context.Provider>
  );
};

export default RewardPoolProvider;
