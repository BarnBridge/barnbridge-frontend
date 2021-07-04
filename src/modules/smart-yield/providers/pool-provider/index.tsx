import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { MainnetHttpsWeb3Provider, useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import {
  APISYPool,
  Markets,
  Pools,
  SYMarketMeta,
  SYPoolMeta,
  fetchSYPool,
  fetchSYRewardPools,
} from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYAaveTokenContract from 'modules/smart-yield/contracts/syAaveTokenContract';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { AaveMarket } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/walletProvider';
import { useConfig } from 'components/providers/configProvider';

export type SYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  contracts: {
    smartYield: SYSmartYieldContract;
    underlying: Erc20Contract;
    controller: SYControllerContract;
    rewardPool?: SYRewardPoolContract;
  };
  apy?: BigNumber;
  apr?: BigNumber;
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
  const config = useConfig();
  const { getEtherscanTxUrl } = useWeb3();
  const { projectToken, convertTokenIn, getTokenBySymbol } = useKnownTokens();
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

  async function getAaveIncentivesAPY(
    cTokenAddress: string,
    uDecimals: number,
    uSymbol: string,
  ): Promise<BigNumber | undefined> {
    let aTokenAddress = '';
    let aTokenDecimals = 0;

    if (process.env.REACT_APP_ENV === 'production') {
      aTokenAddress = cTokenAddress;
      aTokenDecimals = uDecimals;
    } else {
      const uToken = getTokenBySymbol(uSymbol);

      if (uToken) {
        aTokenAddress = uToken.address;
        aTokenDecimals = uToken.decimals;
      }
      switch (uSymbol) {
        case KnownTokens.USDC:
          aTokenAddress = config.tokens.ausdc;
          aTokenDecimals = uToken.decimals;
          break;
        case KnownTokens.DAI:
          aTokenAddress = config.tokens.adai;
          aTokenDecimals = DaiToken.decimals;
          break;
        case KnownTokens.USDT:
          aTokenAddress = config.tokens.ausdt;
          aTokenDecimals = UsdtToken.decimals;
          break;
        case KnownTokens.GUSD:
          aTokenAddress = config.tokens.agusd;
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

        let extPool: SYPool;

        const smartYield = new SYSmartYieldContract(pool.smartYieldAddress);
        smartYield.setProvider(wallet.provider);
        await smartYield.loadCommon().catch(Error);

        const underlying = new Erc20Contract([], pool.underlyingAddress);
        underlying.setProvider(wallet.provider);

        const controller = new SYControllerContract(pool.controllerAddress);
        controller.setProvider(wallet.provider);

        let apy;

        if (pool.protocolId === AaveMarket.id) {
          apy = await getAaveIncentivesAPY(pool.cTokenAddress, pool.underlyingDecimals, pool.underlyingSymbol);
        }

        await Promise.all([smartYield.loadCommon(), underlying.loadCommon()]);

        let rewardPool: SYRewardPoolContract | undefined;

        extPool = {
          ...pool,
          meta: Pools.get(pool.underlyingSymbol),
          market: Markets.get(pool.protocolId),
          contracts: {
            smartYield,
            underlying,
            controller,
            rewardPool,
          },
          apr: undefined,
          apy,
        };

        const rewardPools = await fetchSYRewardPools(pool.protocolId, pool.underlyingSymbol);

        if (rewardPools.length > 0) {
          rewardPool = new SYRewardPoolContract(pool.rewardPoolAddress, rewardPools[0].poolType === 'MULTI');
          extPool.contracts.rewardPool = rewardPool;
          rewardPool.setProvider(wallet.provider);
          rewardPool.on(Web3Contract.UPDATE_DATA, reload);
          rewardPool
            .loadCommon()
            .then(() => {
              return rewardPool?.loadRewardRateFor(projectToken.address) as any;
            })
            .then(() => {
              const { poolSize } = rewardPool!;

              if (poolSize) {
                const r = rewardPool?.getDailyRewardFor(projectToken.address)?.unscaleBy(projectToken.decimals);
                const yearlyReward = convertTokenInUSD(r, projectToken.symbol!)?.multipliedBy(365);

                const p = poolSize?.dividedBy(10 ** (smartYield.decimals ?? 0));
                const poolBalance = convertTokenInUSD(p, smartYield.symbol!);

                if (yearlyReward && poolBalance && poolBalance.gt(BigNumber.ZERO)) {
                  extPool.apr = yearlyReward.dividedBy(poolBalance);
                  reload();
                }
              }
            });
        }

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
    pool.contracts.rewardPool?.setProvider(wallet.provider);
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
