import React from 'react';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { Markets, Pools, SYMarketMeta, SYPool, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import SYUnderlyingContract from 'modules/smart-yield/contracts/syUnderlyingContract';
import { useWallet } from 'wallets/wallet';

export type SYTokenPool = SYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
};

type State = {
  loading: boolean;
  marketId?: string;
  tokenId?: string;
  pool?:
    | (SYTokenPool & {
        underlyingBalance?: BigNumber;
        smartYieldBalance?: BigNumber;
        underlyingAllowance?: BigNumber;
        underlyingMaxAllowed?: BigNumber;
        underlyingIsAllowed?: boolean;
      })
    | null;
};

const InitialState: State = {
  loading: false,
  marketId: undefined,
  tokenId: undefined,
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
  market: string;
  token: string;
};

const TokenPoolProvider: React.FC<Props> = props => {
  const { market, token, children } = props;

  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(
      mergeState<State>({
        marketId: market,
        tokenId: token,
        loading: true,
        pool: undefined,
      }),
    );

    (async () => {
      try {
        const pools = await fetchSYPools(market);
        const pool = pools.find(pool => pool.underlyingSymbol === token);

        if (!pool) {
          await Promise.reject();
          return;
        }

        setState(
          mergeState<State>({
            loading: false,
            pool: {
              ...pool,
              meta: Pools.get(pool.underlyingSymbol),
              market: Markets.get(pool.protocolId),
              get underlyingMaxAllowed(): BigNumber {
                return BigNumber.min(
                  this.underlyingAllowance ?? ZERO_BIG_NUMBER,
                  this.underlyingBalance ?? ZERO_BIG_NUMBER,
                );
              },
              get underlyingIsAllowed(): boolean | undefined {
                return this.underlyingAllowance?.gt(ZERO_BIG_NUMBER);
              },
            },
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            pool: null,
          }),
        );
      }
    })();
  }, [market, token]);

  React.useEffect(() => {
    const { pool } = state;

    if (!pool) {
      return;
    }

    pool.underlyingBalance = undefined;
    pool.underlyingAllowance = undefined;
    pool.smartYieldBalance = undefined;

    if (wallet.account) {
      const underlyingContract = new SYUnderlyingContract(pool.underlyingAddress);
      underlyingContract.setProvider(wallet.provider);
      underlyingContract.setAccount(wallet.account);
      underlyingContract.getBalance().then(balance => {
        pool.underlyingBalance = balance;
        reload();
      });
      underlyingContract.getAllowance(pool.providerAddress).then(allowance => {
        pool.underlyingAllowance = allowance;
        reload();
      });

      const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
      smartYieldContract.setAccount(wallet.account);
      smartYieldContract.getBalance().then(balance => {
        pool.smartYieldBalance = balance;
        reload();
      });
    }
  }, [state.pool, wallet.account]);

  const approveUnderlying = React.useCallback(
    (enable: boolean) => {
      const { pool } = state;

      if (!pool || !wallet.account) {
        return Promise.reject();
      }

      const underlyingContract = new SYUnderlyingContract(pool.underlyingAddress);
      underlyingContract.setProvider(wallet.provider);
      underlyingContract.setAccount(wallet.account);

      return underlyingContract
        .approve(enable, pool.providerAddress)
        .then(() => {
          return underlyingContract.getAllowance(pool.providerAddress).then(allowance => {
            pool.underlyingAllowance = allowance;
          });
        })
        .then(reload);
    },
    [state.pool, wallet.provider, wallet.account],
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
