import React from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getEtherscanTxUrl } from 'web3/utils';

import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import SYUnderlyingContract from 'modules/smart-yield/contracts/syUnderlyingContract';
import { useWallet } from 'wallets/wallet';

export type SYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
};

type State = {
  loading: boolean;
  marketId?: string;
  tokenId?: string;
  pool?:
    | (SYPool & {
        underlyingBalance?: BigNumber;
        smartYieldBalance?: BigNumber;
        underlyingAllowance?: BigNumber;
        underlyingMaxAllowed?: BigNumber;
        underlyingIsAllowed?: boolean;
      })
    | null;

  statusModalVisible: boolean;
  txType?: 'deposit' | 'withdraw';
  txState?: 'progress' | 'success' | 'failure';
  txHash?: string;
};

const InitialState: State = {
  loading: false,
  marketId: undefined,
  tokenId: undefined,
  pool: undefined,
  statusModalVisible: false,
  txType: undefined,
  txState: undefined,
  txHash: undefined,
};

type ContextType = State & {
  actions: {
    approveUnderlying: (enable: boolean) => Promise<void>;
    seniorDeposit: (
      principalAmount: BigNumber,
      minGain: BigNumber,
      deadline: number,
      forDays: number,
      gasPrice: number,
    ) => Promise<void>;
    juniorDeposit: (
      underlyingAmount: BigNumber,
      minTokens: BigNumber,
      deadline: number,
      gasPrice: number,
    ) => Promise<void>;
    twoStepWithdraw: (
      tokenAmount: BigNumber,
      maxMaturesAt: number,
      deadline: number,
      gasPrice: number,
    ) => Promise<void>;
    instantWithdraw: (
      tokenAmount: BigNumber,
      minUnderlying: BigNumber,
      deadline: number,
      gasPrice: number,
    ) => Promise<void>;
  };
};

const Context = React.createContext<ContextType>({
  ...InitialState,
  actions: {
    approveUnderlying: () => Promise.reject(),
    seniorDeposit: () => Promise.reject(),
    juniorDeposit: () => Promise.reject(),
    twoStepWithdraw: () => Promise.reject(),
    instantWithdraw: () => Promise.reject(),
  },
});

export function useSYPool(): ContextType {
  return React.useContext(Context);
}

const PoolProvider: React.FC = props => {
  const { children } = props;

  const history = useHistory();
  const location = useLocation();
  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  const [market, token] = React.useMemo<string[]>(() => {
    const urlQuery = new URLSearchParams(location.search);
    const market = decodeURIComponent(urlQuery.get('m') ?? '');
    const token = decodeURIComponent(urlQuery.get('t') ?? '');

    return [market, token];
  }, [location.search]);

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

  const createSmartYieldContract = React.useCallback(
    (txType: 'deposit' | 'withdraw'): SYSmartYieldContract | undefined => {
      const { pool } = state;

      if (!pool || !wallet.account) {
        return undefined;
      }

      const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
      smartYieldContract.setProvider(wallet.provider);
      smartYieldContract.setAccount(wallet.account);

      smartYieldContract
        .on('tx:transactionHash', (txHash: string) => {
          setState(
            mergeState<State>({
              statusModalVisible: true,
              txType,
              txState: 'progress',
              txHash,
            }),
          );
        })
        .on('tx:complete', () => {
          setState(
            mergeState<State>({
              txState: 'success',
            }),
          );
        })
        .on('tx:failure', () => {
          setState(
            mergeState<State>({
              txState: 'failure',
            }),
          );
        });

      return smartYieldContract;
    },
    [state.pool, wallet.provider, wallet.account],
  );

  function handleStatusModalCancel() {
    setState(
      mergeState<State>({
        statusModalVisible: false,
        txType: undefined,
        txState: undefined,
        txHash: undefined,
      }),
    );
  }

  function handleTxSuccess() {
    history.push({
      pathname: `/smart-yield/portfolio/junior`,
      search: `?m=${market}&t=${token}`,
    });
  }

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

  const seniorDeposit = React.useCallback(
    (principalAmount: BigNumber, minGain: BigNumber, deadline: number, forDays: number, gasPrice: number) => {
      const contract = createSmartYieldContract('deposit');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyBondSend(principalAmount, minGain, deadline, forDays, gasPrice);
    },
    [createSmartYieldContract],
  );

  const juniorDeposit = React.useCallback(
    (underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('deposit');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyTokensSend(underlyingAmount, minTokens, deadline, gasPrice);
    },
    [createSmartYieldContract],
  );

  const twoStepWithdraw = React.useCallback(
    (tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('withdraw');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyJuniorBondSend(tokenAmount, maxMaturesAt, deadline, gasPrice);
    },
    [createSmartYieldContract],
  );

  const instantWithdraw = React.useCallback(
    (tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('withdraw');

      if (!contract) {
        return Promise.reject();
      }

      return contract.sellTokensSend(tokenAmount, minUnderlying, deadline, gasPrice);
    },
    [createSmartYieldContract],
  );

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
      actions: {
        approveUnderlying,
        seniorDeposit,
        juniorDeposit,
        twoStepWithdraw,
        instantWithdraw,
      },
    };
  }, [state, approveUnderlying, version]);

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
      {state.statusModalVisible && (
        <TxStatusModal
          visible
          type={state.txType}
          state={state.txState}
          txLink={state.txHash && getEtherscanTxUrl(state.txHash)}
          onSuccessClick={handleTxSuccess}
          onCancel={handleStatusModalCancel}
        />
      )}
    </>
  );
};

export default PoolProvider;
