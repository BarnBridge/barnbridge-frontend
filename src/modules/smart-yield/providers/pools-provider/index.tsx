import React from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getEtherscanTxUrl } from 'web3/utils';

import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, fetchSYPools } from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
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

type ContextType = State & {
  redeemBond: (smartYieldAddress: string, sBondId: number, gasPrice: number) => Promise<void>;
  transferFrom: (seniorBondAddress: string, address: string, sBondId: number, gasPrice: number) => Promise<void>;
};

const Context = React.createContext<ContextType>({
  ...InitialState,
  redeemBond: () => Promise.reject(),
  transferFrom: () => Promise.reject(),
});

type StatusModal = {
  visible: boolean;
  type?: 'redeem' | 'transfer';
  state?: 'progress' | 'success' | 'failure';
  txHash?: string;
};

export function usePools(): ContextType {
  return React.useContext(Context);
}

const PoolsProvider: React.FC = props => {
  const { children } = props;

  const history = useHistory();
  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  const [statusModal, setStatusModal] = React.useState<StatusModal>({
    visible: false,
    type: undefined,
    state: undefined,
    txHash: undefined,
  });

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

  const redeemBond = React.useCallback(
    (smartYieldAddress: string, sBondId: number, gasPrice: number) => {
      const smartYieldContract = new SYSmartYieldContract(smartYieldAddress);
      smartYieldContract.setProvider(wallet.provider);
      smartYieldContract.setAccount(wallet.account);

      smartYieldContract
        .on('tx:transactionHash', (txHash: string) => {
          setStatusModal(prevState => ({
            ...prevState,
            visible: true,
            type: 'redeem',
            state: 'progress',
            txHash,
          }));
        })
        .on('tx:complete', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'success',
          }));
        })
        .on('tx:failure', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'failure',
          }));
        });

      return smartYieldContract.redeemBondSend(sBondId, gasPrice);
    },
    [wallet.account, wallet.provider],
  );

  const transferFrom = React.useCallback(
    (seniorBondAddress: string, address: string, sBondId: number, gasPrice: number) => {
      const seniorBondContract = new SYSeniorBondContract(seniorBondAddress);
      seniorBondContract.setProvider(wallet.provider);
      seniorBondContract.setAccount(wallet.account);

      seniorBondContract
        .on('tx:transactionHash', (txHash: string) => {
          setStatusModal(prevState => ({
            ...prevState,
            visible: true,
            type: 'transfer',
            state: 'progress',
            txHash,
          }));
        })
        .on('tx:complete', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'success',
          }));
        })
        .on('tx:failure', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'failure',
          }));
        });

      return seniorBondContract.transferFromSend(wallet.account!, address, sBondId, gasPrice);
    },
    [wallet.account, wallet.provider],
  );

  function handleStatusModalCancel() {
    setStatusModal(prevState => ({
      ...prevState,
      visible: false,
      type: undefined,
      state: undefined,
      txHash: undefined,
    }));
  }

  function handleTxSuccess() {
    setStatusModal(prevState => ({
      ...prevState,
      visible: false,
      type: undefined,
      state: undefined,
      txHash: undefined,
    }));

    history.push({
      pathname: `/smart-yield/portfolio/senior`,
    });
  }

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
      redeemBond,
      transferFrom,
    };
  }, [state, version]);

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
      {statusModal.visible && (
        <TxStatusModal
          visible
          type={statusModal.type}
          state={statusModal.state}
          txLink={statusModal.txHash && getEtherscanTxUrl(statusModal.txHash)}
          onCancel={handleStatusModalCancel}
          onSuccessClick={handleTxSuccess}
        />
      )}
    </>
  );
};

export default PoolsProvider;
