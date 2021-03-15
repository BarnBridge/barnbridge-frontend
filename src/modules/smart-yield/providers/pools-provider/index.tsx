import React from 'react';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import SYUnderlyingContract from 'modules/smart-yield/contracts/syUnderlyingContract';
import { useWallet } from 'wallets/wallet';

export type PoolsSYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  contracts: {
    smartYield?: SYSmartYieldContract;
    underlying?: SYUnderlyingContract;
  };
};

type State = {
  loading: boolean;
  pools: PoolsSYPool[];
  totalLiquidity?: BigNumber;
};

const InitialState: State = {
  loading: false,
  pools: [],
  totalLiquidity: undefined,
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
    setState(prevState => ({
      ...prevState,
      loading: true,
      pools: [],
      totalLiquidity: undefined,
    }));

    (async () => {
      try {
        const pools = await fetchSYPools();
        const totalLiquidity = pools.reduce((sum, pool) => {
          return sum.plus(pool.state.seniorLiquidity).plus(pool.state.juniorLiquidity);
        }, ZERO_BIG_NUMBER);

        setState(prevState => ({
          ...prevState,
          loading: false,
          pools: pools.map(pool => {
            const smartYield = new SYSmartYieldContract(pool.smartYieldAddress);
            const underlying = new SYUnderlyingContract(pool.underlyingAddress);

            smartYield.loadCommon();
            underlying.loadCommon();

            return {
              ...pool,
              meta: Pools.get(pool.underlyingSymbol),
              market: Markets.get(pool.protocolId),
              contracts: {
                smartYield,
                underlying,
              },
            };
          }),
          totalLiquidity,
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
      pool.contracts.smartYield?.setProvider(wallet.provider);
      pool.contracts.smartYield?.setAccount(wallet.account);

      pool.contracts.underlying?.setProvider(wallet.provider);
      pool.contracts.underlying?.setAccount(wallet.account);
      pool.contracts.underlying?.loadBalance().then(reload);
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
