import React from 'react';

import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { Markets, Pools, SYMarketMeta, SYPool, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import UnderlyingContract from 'modules/smart-yield/contracts/underlyingContract';
import { useWallet } from 'wallets/wallet';

export type PoolsSYPool = SYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  underlyingContract?: UnderlyingContract;
};

type State = {
  loading: boolean;
  pools: PoolsSYPool[];
};

const InitialState: State = {
  loading: false,
  pools: [],
};

type ContextType = State;

const Context = React.createContext<ContextType>({
  ...InitialState,
});

export function usePools(): ContextType {
  return React.useContext(Context);
}

const PoolsProvider: React.FC = props => {
  const { children } = props;

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
        const pools = await fetchSYPools();

        setState(
          mergeState<State>({
            loading: false,
            pools: pools.map(pool => ({
              ...pool,
              meta: Pools.get(pool.underlyingSymbol),
              market: Markets.get(pool.protocolId),
              underlyingContract: new UnderlyingContract(pool.underlyingAddress, pool.underlyingSymbol),
            })),
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            pools: [],
          }),
        );
      }
    })();
  }, []);

  React.useEffect(() => {
    state.pools.forEach(pool => {
      pool.underlyingContract?.setProvider(wallet.provider);
    });
  }, [state.pools, wallet.provider]);

  React.useEffect(() => {
    state.pools.forEach(pool => {
      if (pool.underlyingContract) {
        pool.underlyingContract.setAccount(wallet.account);
        pool.underlyingContract.loadBalance().then(reload);
      }
    });
  }, [state.pools, wallet.account]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default PoolsProvider;
