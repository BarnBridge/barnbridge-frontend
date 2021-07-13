import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { MainnetHttpsWeb3Provider, useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, SYMarketMeta, SYPoolMeta, useSyAPI } from 'modules/smart-yield/api';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYAaveTokenContract from 'modules/smart-yield/contracts/syAaveTokenContract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { AaveMarket } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export type PoolsSYPool = APISYPool & {
  meta?: SYPoolMeta;
  market?: SYMarketMeta;
  contracts: {
    smartYield?: SYSmartYieldContract;
    underlying?: Erc20Contract;
    rewardPool?: SYRewardPoolContract;
  };
  apy?: BigNumber;
  apr?: BigNumber;
};

type State = {
  loading: boolean;
  pools: PoolsSYPool[];
};

const InitialState: State = {
  loading: false,
  pools: [],
};

type ContextType = State & {
  getMarketTVL: (marketId?: string) => BigNumber;
  redeemBond: (smartYieldAddress: string, sBondId: number, gasPrice: number) => Promise<void>;
  redeemJuniorBond: (smartYieldAddress: string, jBondId: number, gasPrice: number) => Promise<void>;
  transferFrom: (seniorBondAddress: string, address: string, sBondId: number, gasPrice: number) => Promise<void>;
};

const Context = React.createContext<ContextType>(InvariantContext('PoolsProvider'));

type StatusModal = {
  visible: boolean;
  type?: 'redeem' | 'transfer' | 'redeemJunior';
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
  const { getEtherscanTxUrl } = useWeb3();
  const { getContract } = useContractManager();
  const { getTokenBySymbol, convertTokenIn, convertTokenInUSD, stkAaveToken, ethToken, bondToken } = useKnownTokens();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);
  const syAPI = useSyAPI();

  const [statusModal, setStatusModal] = React.useState<StatusModal>({
    visible: false,
    type: undefined,
    state: undefined,
    txHash: undefined,
  });

  const getAaveIncentivesAPY = useCallback(
    async (cTokenAddress: string, uDecimals: number, uSymbol: string): Promise<BigNumber | undefined> => {
      const aTokenAddress = cTokenAddress;
      const aTokenDecimals = uDecimals;

      const aToken = new SYAaveTokenContract(aTokenAddress); // TODO: re-think
      aToken.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider
      await aToken.loadCommon();

      const aTokenPriceInEth = convertTokenIn(1, stkAaveToken.symbol, ethToken.symbol);
      const uTokenPriceInEth = convertTokenIn(1, uSymbol, ethToken.symbol);

      return aToken.calculateIncentivesAPY(aTokenPriceInEth!, uTokenPriceInEth!, aTokenDecimals);
    },
    [convertTokenIn, ethToken, getTokenBySymbol, stkAaveToken],
  );

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      pools: [],
    }));

    (async () => {
      try {
        const pools = await syAPI.fetchSYPools();

        setState(prevState => ({
          ...prevState,
          loading: false,
          pools: (pools ?? []).map(pool => {
            const smartYield = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
              return new SYSmartYieldContract(pool.smartYieldAddress);
            });
            smartYield.on(Web3Contract.UPDATE_DATA, reload);
            const underlying = getContract<Erc20Contract>(pool.underlyingAddress, () => {
              return new Erc20Contract([], pool.underlyingAddress);
            });
            underlying.on(Web3Contract.UPDATE_DATA, reload);

            smartYield.loadCommon();
            underlying.loadCommon();

            const result: PoolsSYPool = {
              ...pool,
              meta: Pools.get(pool.underlyingSymbol),
              market: Markets.get(pool.protocolId),
              contracts: {
                smartYield,
                underlying,
                rewardPool: undefined,
              },
              apy: undefined,
              apr: undefined,
            };

            if (pool.rewardPoolAddress) {
              const rewardPool = getContract<SYRewardPoolContract>(pool.rewardPoolAddress, () => {
                return new SYRewardPoolContract(pool.rewardPoolAddress, pool.protocolId === AaveMarket.id);
              });
              rewardPool.on(Web3Contract.UPDATE_DATA, reload);
              rewardPool
                .loadCommon()
                .then(() => {
                  return rewardPool.loadRewardRateFor(bondToken.address) as any;
                })
                .then(() => {
                  const { poolSize } = rewardPool;

                  if (poolSize) {
                    const r = rewardPool.getDailyRewardFor(bondToken.address)?.unscaleBy(bondToken.decimals);
                    const yearlyReward = convertTokenInUSD(r, bondToken.symbol!)?.multipliedBy(365);

                    const p = poolSize.dividedBy(10 ** (smartYield.decimals ?? 0));
                    const poolBalance = convertTokenInUSD(p, smartYield.symbol!);

                    if (yearlyReward && poolBalance && poolBalance.gt(BigNumber.ZERO)) {
                      result.apr = yearlyReward.dividedBy(poolBalance);
                      reload();
                    }
                  }
                });
              result.contracts.rewardPool = rewardPool;
            }

            if (pool.protocolId === AaveMarket.id) {
              getAaveIncentivesAPY(pool.cTokenAddress, pool.underlyingDecimals, pool.underlyingSymbol).then(apy => {
                result.apy = apy;
                reload();
              });
            }

            return result;
          }),
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
      if (wallet.account) {
        pool.contracts.underlying?.loadBalance();
      }

      pool.contracts.rewardPool?.setProvider(wallet.provider);
      pool.contracts.rewardPool?.setAccount(wallet.account);
    });
  }, [state.pools, wallet.account]);

  // React.useEffect(() => { /// ???
  //   state.pools.forEach(pool => {
  //     const { smartYield, rewardPool } = pool.contracts;
  //
  //     if (!smartYield || !rewardPool) {
  //       return;
  //     }
  //
  //     const { poolSize, dailyReward } = rewardPool;
  //
  //     if (poolSize && dailyReward) {
  //       const bondPrice = BondToken.price ?? 1;
  //       const jTokenPrice = smartYield.price ?? 1;
  //
  //       const yearlyReward = dailyReward
  //         .dividedBy(10 ** BondToken.decimals)
  //         .multipliedBy(bondPrice)
  //         .multipliedBy(365);
  //       const poolBalance = poolSize
  //         .dividedBy(10 ** (smartYield.decimals ?? 0))
  //         .multipliedBy(jTokenPrice)
  //         .multipliedBy(1);
  //
  //       if (poolBalance.isEqualTo(BigNumber.ZERO)) {
  //         return BigNumber.ZERO;
  //       }
  //
  //       pool.rewardAPR = yearlyReward.dividedBy(poolBalance);
  //       reload();
  //     }
  //   });
  // }, [state.pools, BondToken.price, version]);

  const getMarketTVL = React.useCallback(
    (marketId?: string) => {
      return state.pools
        .filter(pool => pool.protocolId === (marketId ?? pool.protocolId))
        .reduce((sum, entity) => {
          return sum.plus(entity.state.seniorLiquidity).plus(entity.state.juniorLiquidity);
        }, BigNumber.ZERO);
    },
    [state.pools],
  );

  const redeemBond = React.useCallback(
    (smartYieldAddress: string, sBondId: number, gasPrice: number) => {
      const smartYieldContract = getContract<SYSmartYieldContract>(smartYieldAddress, () => {
        return new SYSmartYieldContract(smartYieldAddress);
      });

      smartYieldContract
        .on('tx:hash', (txHash: string) => {
          setStatusModal(prevState => ({
            ...prevState,
            visible: true,
            type: 'redeem',
            state: 'progress',
            txHash,
          }));
        })
        .on('tx:success', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'success',
          }));
        })
        .on('tx:fail', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'failure',
          }));
        });

      return smartYieldContract.redeemBondSend(sBondId, gasPrice);
    },
    [wallet.account, wallet.provider],
  );

  const redeemJuniorBond = React.useCallback(
    (smartYieldAddress: string, jBondId: number, gasPrice: number) => {
      const smartYieldContract = getContract<SYSmartYieldContract>(smartYieldAddress, () => {
        return new SYSmartYieldContract(smartYieldAddress);
      });

      smartYieldContract
        .on('tx:hash', (txHash: string) => {
          setStatusModal(prevState => ({
            ...prevState,
            visible: true,
            type: 'redeemJunior',
            state: 'progress',
            txHash,
          }));
        })
        .on('tx:success', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'success',
          }));
        })
        .on('tx:fail', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'failure',
          }));
        });

      return smartYieldContract.redeemJuniorBondSend(jBondId, gasPrice);
    },
    [wallet.account, wallet.provider],
  );

  const transferFrom = React.useCallback(
    (seniorBondAddress: string, address: string, sBondId: number, gasPrice: number) => {
      const seniorBondContract = getContract<SYSeniorBondContract>(seniorBondAddress, () => {
        return new SYSeniorBondContract(seniorBondAddress);
      });

      seniorBondContract
        .on('tx:hash', (txHash: string) => {
          setStatusModal(prevState => ({
            ...prevState,
            visible: true,
            type: 'transfer',
            state: 'progress',
            txHash,
          }));
        })
        .on('tx:success', () => {
          setStatusModal(prevState => ({
            ...prevState,
            state: 'success',
          }));
        })
        .on('tx:fail', () => {
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
      getMarketTVL,
      redeemBond,
      transferFrom,
      redeemJuniorBond,
    };
  }, [state, version]);

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
      {statusModal.visible && (
        <TxStatusModal
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
