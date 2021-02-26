import React from 'react';

import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { Markets, Pools, SYMarketMeta, SYPool, SYPoolMeta, fetchSYPool } from 'modules/smart-yield/api';
import UnderlyingContract from 'modules/smart-yield/contracts/underlyingContract';
import { useWallet } from 'wallets/wallet';

export type SYTokenPool = SYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  underlyingContract?: UnderlyingContract;
};

type State = {
  loading: boolean;
  pool?: SYTokenPool;
};

const InitialState: State = {
  loading: false,
  pool: undefined,
};

type ContextType = State & {
  actions: {
    approveUnderlying: (enable: boolean) => Promise<void>;
  };
};

const Context = React.createContext<ContextType>({
  ...InitialState,
  actions: {
    approveUnderlying: () => Promise.reject(),
  },
});

export function useTokenPool(): ContextType {
  return React.useContext(Context);
}

type Props = {
  poolAddress: string;
};

const TokenPoolProvider: React.FC<Props> = props => {
  const { poolAddress, children } = props;

  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(
      mergeState<State>({
        loading: true,
      }),
    );

    (async () => {
      try {
        const pool = await fetchSYPool(poolAddress);

        setState(
          mergeState<State>({
            loading: false,
            pool: {
              ...pool,
              meta: Pools.get(pool.underlyingSymbol),
              market: Markets.get(pool.protocolId),
              underlyingContract: new UnderlyingContract(pool.underlyingAddress, pool.underlyingSymbol),
            },
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            pool: undefined,
          }),
        );
      }
    })();
  }, [poolAddress]);

  React.useEffect(() => {
    state.pool?.underlyingContract?.setProvider(wallet.provider);
  }, [state.pool, wallet.provider]);

  React.useEffect(() => {
    const { pool } = state;

    if (pool) {
      const { underlyingContract } = pool;

      if (underlyingContract) {
        underlyingContract.setAccount(wallet.account);
        underlyingContract.loadBalance().then(reload);
        underlyingContract.loadAllowance(pool.smartYieldAddress).then(reload);
      }
    }
  }, [state.pool, wallet.account]);

  const approveUnderlying = React.useCallback(
    (enable: boolean) => {
      return (
        state.pool?.underlyingContract?.approve(enable, state.pool?.smartYieldAddress).then(reload) ?? Promise.reject()
      );
    },
    [state.pool?.underlyingContract, wallet.account],
  );

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
      actions: {
        approveUnderlying,
      },
    };
  }, [state, approveUnderlying, version]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default TokenPoolProvider;
