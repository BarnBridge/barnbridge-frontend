import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getEtherscanTxUrl } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYSmartYieldContract, { SYAbond } from 'modules/smart-yield/contracts/sySmartYieldContract';
import SYUnderlyingContract from 'modules/smart-yield/contracts/syUnderlyingContract';
import { useWallet } from 'wallets/wallet';

export type SYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  underlyingBalance?: BigNumber;
  smartYieldBalance?: BigNumber;
  underlyingAllowance?: BigNumber;
  underlyingMaxAllowed?: BigNumber;
  underlyingIsAllowed?: boolean;
  abond?: SYAbond;
};

type StatusModal = {
  visible: boolean;
  type?: 'deposit' | 'withdraw';
  state?: 'progress' | 'success' | 'failure';
  txHash?: string;
};

type State = {
  marketId?: string;
  tokenId?: string;
  loading: boolean;
  pool?: SYPool | null;
  statusModal: StatusModal;
};

const InitialState: State = {
  marketId: undefined,
  tokenId: undefined,
  loading: false,
  pool: undefined,
  statusModal: {
    visible: false,
    type: undefined,
    state: undefined,
    txHash: undefined,
  },
};

type Actions = {
  getForfeitsFor: (amount: BigNumber) => Promise<BigNumber | undefined>;
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
  twoStepWithdraw: (tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number) => Promise<void>;
  instantWithdraw: (
    tokenAmount: BigNumber,
    minUnderlying: BigNumber,
    deadline: number,
    gasPrice: number,
  ) => Promise<void>;
};

type ContextType = State & {
  actions: Actions;
};

const Context = React.createContext<ContextType>({
  ...InitialState,
  actions: {
    getForfeitsFor: () => Promise.reject(),
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
  const [state, setState] = React.useState(InitialState);

  const isSeniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/senior'));
  const isJuniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/junior'));
  const isJuniorWithdraw = Boolean(useRouteMatch('/smart-yield/withdraw'));

  const [market, token] = React.useMemo(() => {
    const urlQuery = new URLSearchParams(location.search);
    const marketStr = decodeURIComponent(urlQuery.get('m') ?? '');
    const tokenStr = decodeURIComponent(urlQuery.get('t') ?? '');

    return [marketStr, tokenStr];
  }, [location.search]);

  const underlyingContract = React.useMemo(() => {
    const { pool } = state;

    if (!pool) {
      return undefined;
    }

    const contract = new SYUnderlyingContract(pool.underlyingAddress);
    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract;
  }, [state.pool, wallet.provider, wallet.account]);

  const smartYieldContract = React.useMemo(() => {
    const { pool } = state;

    if (!pool) {
      return undefined;
    }

    const contract = new SYSmartYieldContract(pool.smartYieldAddress);
    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract;
  }, [state.pool, wallet.provider, wallet.account]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      marketId: market,
      tokenId: token,
      loading: true,
      pool: undefined,
    }));

    (async () => {
      try {
        const pools = await fetchSYPools(market);
        const pool = pools.find(poolItem => poolItem.underlyingSymbol === token);

        if (!pool) {
          return await Promise.reject();
        }

        const extPool: SYPool = {
          ...pool,
          meta: Pools.get(pool.underlyingSymbol),
          market: Markets.get(pool.protocolId),
          get underlyingMaxAllowed(): BigNumber {
            return BigNumber.min(
              extPool.underlyingAllowance ?? ZERO_BIG_NUMBER,
              extPool.underlyingBalance ?? ZERO_BIG_NUMBER,
            );
          },
          get underlyingIsAllowed(): boolean | undefined {
            return extPool.underlyingAllowance?.gt(ZERO_BIG_NUMBER);
          },
        };

        setState(prevState => ({
          ...prevState,
          loading: false,
          pool: extPool,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
          pool: null,
        }));
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

    if (wallet.isActive) {
      underlyingContract?.getBalance().then(value => {
        pool.underlyingBalance = value;
        reload();
      });

      underlyingContract?.getAllowance(pool.providerAddress).then(allowance => {
        pool.underlyingAllowance = allowance;
        reload();
      });
    }
  }, [state.pool, wallet.isActive, underlyingContract]);

  React.useEffect(() => {
    const { pool } = state;

    if (!pool) {
      return;
    }

    pool.smartYieldBalance = undefined;

    if (wallet.isActive) {
      smartYieldContract?.getBalance().then(value => {
        pool.smartYieldBalance = value;
        reload();
      });

      smartYieldContract?.getAbond().then(value => {
        pool.abond = value;
        reload();
      });
    }
  }, [state.pool, wallet.isActive, smartYieldContract]);

  const getForfeitsFor = React.useCallback(
    async (amount: BigNumber): Promise<BigNumber | undefined> => {
      if (!smartYieldContract) {
        return undefined;
      }

      const totalSupply = await smartYieldContract.getTotalSupply();
      const abondDebt = await smartYieldContract.getAbondDebt();

      return abondDebt.multipliedBy(amount).dividedBy(totalSupply);
    },
    [smartYieldContract],
  );

  const createSmartYieldContract = React.useCallback(
    (txType: 'deposit' | 'withdraw'): SYSmartYieldContract | undefined => {
      const { pool } = state;

      if (!pool || !wallet.account) {
        return undefined;
      }

      const contract = new SYSmartYieldContract(pool.smartYieldAddress);
      contract.setProvider(wallet.provider);
      contract.setAccount(wallet.account);

      contract
        .on('tx:transactionHash', (txHash: string) => {
          setState(prevState => ({
            ...prevState,
            statusModal: {
              visible: true,
              type: txType,
              state: 'progress',
              txHash,
            },
          }));
        })
        .on('tx:complete', () => {
          setState(prevState => ({
            ...prevState,
            statusModal: {
              ...prevState.statusModal,
              state: 'success',
            },
          }));
        })
        .on('tx:failure', () => {
          setState(prevState => ({
            ...prevState,
            statusModal: {
              ...prevState.statusModal,
              state: 'failure',
            },
          }));
        });

      return contract;
    },
    [state.pool, wallet.provider, wallet.account],
  );

  function handleStatusModalCancel() {
    setState(prevState => ({
      ...prevState,
      statusModal: {
        visible: false,
        type: undefined,
        state: undefined,
        txHash: undefined,
      },
    }));
  }

  function handleTxSuccess() {
    if (isSeniorDeposit) {
      history.push({
        pathname: `/smart-yield/portfolio/senior`,
        search: `?m=${market}&t=${token}`,
      });
    } else if (isJuniorDeposit || isJuniorWithdraw) {
      history.push({
        pathname: `/smart-yield/portfolio/junior`,
        search: `?m=${market}&t=${token}`,
      });
    }
  }

  const approveUnderlying = React.useCallback(
    (enable: boolean) => {
      const { pool } = state;

      if (!pool || !wallet.account) {
        return Promise.reject();
      }

      const contract = new SYUnderlyingContract(pool.underlyingAddress);
      contract.setProvider(wallet.provider);
      contract.setAccount(wallet.account);

      return contract
        .approve(enable, pool.providerAddress)
        .then(() => {
          return contract.getAllowance(pool.providerAddress).then(allowance => {
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

  const actions = React.useMemo<Actions>(
    () => ({
      getForfeitsFor,
      approveUnderlying,
      seniorDeposit,
      juniorDeposit,
      twoStepWithdraw,
      instantWithdraw,
    }),
    [getForfeitsFor, approveUnderlying, seniorDeposit, juniorDeposit, twoStepWithdraw, instantWithdraw],
  );

  const value = React.useMemo<ContextType>(
    () => ({
      ...state,
      actions,
    }),
    [state, actions, version],
  );

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
      {state.statusModal.visible && (
        <TxStatusModal
          visible
          type={state.statusModal.type}
          state={state.statusModal.state}
          txLink={state.statusModal.txHash && getEtherscanTxUrl(state.statusModal.txHash)}
          onCancel={handleStatusModalCancel}
          onSuccessClick={handleTxSuccess}
        />
      )}
    </>
  );
};

export default PoolProvider;
