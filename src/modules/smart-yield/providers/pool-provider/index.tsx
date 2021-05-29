import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { getEtherscanTxUrl } from 'web3/utils';

import { MainnetHttpsWeb3Provider } from 'components/providers/eth-web3-provider';
import {
  DaiToken,
  EthToken,
  GusdToken,
  StkAaveToken,
  UsdcToken,
  UsdtToken,
  convertTokenIn,
} from 'components/providers/known-tokens-provider';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, fetchSYPool } from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYAaveTokenContract from 'modules/smart-yield/contracts/syAaveTokenContract';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { AaveMarket } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/wallet';

export type SYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  contracts: {
    smartYield: SYSmartYieldContract;
    underlying: Erc20Contract;
    controller: SYControllerContract;
  };
  apy?: BigNumber;
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

async function getAaveIncentivesAPY(cTokenAddress: string, uDecimals: number, uSymbol: string): Promise<BigNumber | undefined> {
  let aTokenAddress = '';
  let aTokenDecimals = 0;

  if (config.isProd) {
    aTokenAddress = cTokenAddress;
    aTokenDecimals = uDecimals;
  } else {
    switch (uSymbol) {
      case UsdcToken.symbol:
        aTokenAddress = config.tokens.aUsdc;
        aTokenDecimals = UsdcToken.decimals;
        break;
      case DaiToken.symbol:
        aTokenAddress = config.tokens.aDai;
        aTokenDecimals = DaiToken.decimals;
        break;
      case UsdtToken.symbol:
        aTokenAddress = config.tokens.aUsdt;
        aTokenDecimals = UsdtToken.decimals;
        break;
      case GusdToken.symbol:
        aTokenAddress = config.tokens.aGusd;
        aTokenDecimals = GusdToken.decimals;
        break;
    }
  }

  const aToken = new SYAaveTokenContract(aTokenAddress);
  aToken.setCallProvider(MainnetHttpsWeb3Provider);
  await aToken.loadCommon();

  const aTokenPriceInEth = convertTokenIn(BigNumber.from(1), StkAaveToken.symbol, EthToken.symbol);
  const uTokenPriceInEth = convertTokenIn(BigNumber.from(1), uSymbol, EthToken.symbol);

  return aToken.calculateIncentivesAPY(aTokenPriceInEth!, uTokenPriceInEth!, aTokenDecimals);
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
    if (!market || !token) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      marketId: market,
      tokenId: token,
      loading: true,
      pool: undefined,
    }));

    (async () => {
      try {
        const pool = await fetchSYPool(market, token);

        if (!pool) {
          return await Promise.reject();
        }

        const smartYield = new SYSmartYieldContract(pool.smartYieldAddress);
        smartYield.setProvider(wallet.provider);

        const underlying = new Erc20Contract([], pool.underlyingAddress);
        underlying.setProvider(wallet.provider);

        const controller = new SYControllerContract(pool.controllerAddress);
        controller.setProvider(wallet.provider);

        let apy;

        if (pool.protocolId === AaveMarket.id) {
          apy = await getAaveIncentivesAPY(pool.cTokenAddress, pool.underlyingDecimals, pool.underlyingSymbol);
        }

        await Promise.all([smartYield.loadCommon(), underlying.loadCommon()]);

        const extPool: SYPool = {
          ...pool,
          meta: Pools.get(pool.underlyingSymbol),
          market: Markets.get(pool.protocolId),
          contracts: {
            smartYield,
            underlying,
            controller,
          },
          apy,
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

    pool.contracts.smartYield.setProvider(wallet.provider);
    pool.contracts.underlying.setProvider(wallet.provider);
    pool.contracts.controller.setProvider(wallet.provider);
  }, [state.pool, wallet.provider]);

  React.useEffect(() => {
    const { pool } = state;

    if (!pool) {
      return;
    }

    pool.contracts.smartYield.setAccount(wallet.account);
    pool.contracts.smartYield.loadBalance().then(reload);

    pool.contracts.underlying.setAccount(wallet.account);
    pool.contracts.underlying.loadBalance().then(reload);
    pool.contracts.underlying.loadAllowance(pool.providerAddress).then(reload);
  }, [state.pool, wallet.account]);

  const getForfeitsFor = React.useCallback(
    async (amount: BigNumber): Promise<BigNumber | undefined> => {
      const { pool } = state;

      if (!pool) {
        return undefined;
      }

      const { decimals, totalSupply } = pool.contracts.smartYield;

      if (!totalSupply || !decimals) {
        return undefined;
      }

      const abondDebt = await pool.contracts.smartYield.getAbondDebt();

      return abondDebt
        .dividedBy(10 ** decimals)
        .multipliedBy(amount)
        .dividedBy(totalSupply.dividedBy(10 ** decimals));
    },
    [state.pool],
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
        .on('tx:hash', (txHash: string) => {
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
        .on('tx:success', () => {
          setState(prevState => ({
            ...prevState,
            statusModal: {
              ...prevState.statusModal,
              state: 'success',
            },
          }));
        })
        .on('tx:fail', () => {
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
      });
    } else if (isJuniorDeposit || isJuniorWithdraw) {
      history.push({
        pathname: `/smart-yield/portfolio/junior`,
      });
    }
  }

  const approveUnderlying = React.useCallback(
    (enable: boolean) => {
      const { pool } = state;

      if (!pool || !wallet.account) {
        return Promise.reject();
      }

      return pool.contracts.underlying.approve(pool.providerAddress, enable).then(reload);
    },
    [state.pool],
  );

  const seniorDeposit = React.useCallback(
    (principalAmount: BigNumber, minGain: BigNumber, deadline: number, forDays: number, gasPrice: number) => {
      const contract = createSmartYieldContract('deposit');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyBondSend(principalAmount, minGain, deadline, forDays, gasPrice).then(() => {
        state.pool?.contracts.underlying.loadBalance().then(reload);
      });
    },
    [createSmartYieldContract],
  );

  const juniorDeposit = React.useCallback(
    (underlyingAmount: BigNumber, minTokens: BigNumber, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('deposit');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyTokensSend(underlyingAmount, minTokens, deadline, gasPrice).then(() => {
        state.pool?.contracts.smartYield.loadBalance().then(reload);
        state.pool?.contracts.underlying.loadBalance().then(reload);
      });
    },
    [createSmartYieldContract],
  );

  const twoStepWithdraw = React.useCallback(
    (tokenAmount: BigNumber, maxMaturesAt: number, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('withdraw');

      if (!contract) {
        return Promise.reject();
      }

      return contract.buyJuniorBondSend(tokenAmount, maxMaturesAt, deadline, gasPrice).then(() => {
        state.pool?.contracts.smartYield.loadBalance().then(reload);
        state.pool?.contracts.underlying.loadBalance().then(reload);
      });
    },
    [createSmartYieldContract],
  );

  const instantWithdraw = React.useCallback(
    (tokenAmount: BigNumber, minUnderlying: BigNumber, deadline: number, gasPrice: number) => {
      const contract = createSmartYieldContract('withdraw');

      if (!contract) {
        return Promise.reject();
      }

      return contract.sellTokensSend(tokenAmount, minUnderlying, deadline, gasPrice).then(() => {
        state.pool?.contracts.smartYield.loadBalance().then(reload);
        state.pool?.contracts.underlying.loadBalance().then(reload);
      });
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
