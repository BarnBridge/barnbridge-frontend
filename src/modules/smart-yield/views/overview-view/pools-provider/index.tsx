import React from 'react';
import BigNumber from 'bignumber.js';

import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { Markets, Pools, SYMarketMeta, SYPool, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import SYUnderlyingContract from 'modules/smart-yield/contracts/syUnderlyingContract';
import { useWallet } from 'wallets/wallet';

export type PoolsSYPool = SYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  underlyingBalance?: BigNumber;
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
    if (!wallet.account) {
      return;
    }

    state.pools.forEach(pool => {
      const underlyingContract = new SYUnderlyingContract(pool.underlyingAddress);
      underlyingContract.setAccount(wallet.account);
      underlyingContract.getBalance().then(balance => {
        pool.underlyingBalance = balance;
        reload();
      });
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
