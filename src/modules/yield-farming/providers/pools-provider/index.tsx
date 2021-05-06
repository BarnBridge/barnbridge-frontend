import React, { FC, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import { NewStakingContract } from 'web3/contracts/staking';
import Web3Contract from 'web3/contracts/web3Contract';
import { YFContract } from 'web3/contracts/yieldFarming';

import {
  BondToken,
  DaiToken,
  SusdToken,
  TokenMeta,
  UniV2Token,
  UsdcToken,
  convertTokenInUSD,
  useKnownTokens,
} from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { fetchSYRewardPools } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useWallet } from 'wallets/wallet';

export enum YFPoolID {
  STABLE = 'stable',
  UNILP = 'unilp',
  BOND = 'bond',
}

export type YFPoolMeta = {
  name: YFPoolID;
  label: string;
  icons: string[];
  colors: string[];
  tokens: TokenMeta[];
  contract: YFContract;
};

export const StableYfPool: YFPoolMeta = {
  name: YFPoolID.STABLE,
  label: 'USDC/DAI/sUSD',
  icons: ['token-usdc', 'token-dai', 'token-susd'],
  colors: ['#4f6ae5', '#ffd160', '#1e1a31'],
  tokens: [UsdcToken, DaiToken, SusdToken],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR).toLowerCase()),
};

export const UnilpYfPool: YFPoolMeta = {
  name: YFPoolID.UNILP,
  label: 'USDC_BOND_UNI_LP',
  icons: ['static/token-uniswap'],
  colors: ['var(--theme-red-color)'],
  tokens: [UniV2Token],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR).toLowerCase()),
};

export const BondYfPool: YFPoolMeta = {
  name: YFPoolID.BOND,
  label: 'BOND',
  icons: ['static/token-bond'],
  colors: ['var(--theme-red-color)'],
  tokens: [BondToken],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_BOND_ADDR).toLowerCase()),
};

const KNOWN_POOLS: YFPoolMeta[] = [StableYfPool, UnilpYfPool, BondYfPool];

export function getYFKnownPoolByName(name: string): YFPoolMeta | undefined {
  return KNOWN_POOLS.find(pool => pool.name === name);
}

export type SYPoolMeta = {
  poolContract: SYSmartYieldContract;
  rewardContract: SYRewardPoolContract;
};

export type YFPoolsType = {
  yfPools: YFPoolMeta[];
  syPools: SYPoolMeta[];
  getYFKnownPoolByName: (name: string) => YFPoolMeta | undefined;
  stakingContract?: NewStakingContract;
  getPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getYFTotalStakedInUSD: () => BigNumber | undefined;
  getYFTotalEffectiveStakedInUSD: () => BigNumber | undefined;
  getYFDistributedRewards: () => BigNumber | undefined;
  getYFTotalSupply: () => BigNumber | undefined;
  getSYTotalStakedInUSD: () => BigNumber | undefined;
};

const YFPoolsContext = createContext<YFPoolsType>({
  yfPools: KNOWN_POOLS,
  syPools: [],
  getYFKnownPoolByName: getYFKnownPoolByName,
  stakingContract: undefined,
  getPoolBalanceInUSD: () => undefined,
  getPoolEffectiveBalanceInUSD: () => undefined,
  getMyPoolBalanceInUSD: () => undefined,
  getMyPoolEffectiveBalanceInUSD: () => undefined,
  getYFTotalStakedInUSD: () => undefined,
  getYFTotalEffectiveStakedInUSD: () => undefined,
  getYFDistributedRewards: () => undefined,
  getYFTotalSupply: () => undefined,
  getSYTotalStakedInUSD: () => undefined,
});

export function useYFPools(): YFPoolsType {
  return useContext(YFPoolsContext);
}

const YFPoolsProvider: FC = props => {
  const { children } = props;

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const [syPools, setSYPools] = useState<SYPoolMeta[]>([]);

  const stakingContract = useMemo(() => {
    const staking = new NewStakingContract();
    staking.on(Web3Contract.UPDATE_DATA, reload);

    return staking;
  }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.on(Web3Contract.UPDATE_DATA, reload);
      pool.contract.loadCommon().catch(Error);

      pool.tokens.forEach(tokenMeta => {
        stakingContract.loadCommonFor(tokenMeta).catch(Error);
      });
    });
  }, []);

  useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setProvider(walletCtx.provider);
    });

    stakingContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  useEffect(() => {
    stakingContract.setAccount(walletCtx.account);

    KNOWN_POOLS.forEach(pool => {
      pool.contract.setAccount(walletCtx.account);

      if (walletCtx.isActive) {
        pool.contract.loadUserData().catch(Error);

        pool.tokens.forEach(tokenMeta => {
          stakingContract.loadUserDataFor(tokenMeta).catch(Error);
        });
      }
    });
  }, [walletCtx.account]);

  useEffect(() => {
    (async () => {
      const result = await fetchSYRewardPools();

      const pools = result.map(rewardPool => {
        const poolContract = new SYSmartYieldContract(rewardPool.poolTokenAddress);
        poolContract.on(Web3Contract.UPDATE_DATA, reload);
        poolContract.loadCommon().catch(Error);

        const rewardContract = new SYRewardPoolContract(rewardPool.poolAddress);
        rewardContract.on(Web3Contract.UPDATE_DATA, reload);
        rewardContract.loadCommon().catch(Error);

        return {
          poolContract,
          rewardContract,
        };
      });

      setSYPools(pools);
    })();
  }, []);

  useEffect(() => {
    syPools.forEach(syPool => {
      syPool.rewardContract.setAccount(walletCtx.account);

      if (walletCtx.account) {
        syPool.rewardContract.loadBalance().catch(Error);
      }
    });
  }, [syPools, walletCtx.account]);

  const getPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || !stakedToken.nextEpochPoolSize) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.nextEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract],
  );

  const getPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || !stakedToken.currentEpochPoolSize) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.currentEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract],
  );

  const getMyPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || !stakedToken.nextEpochUserBalance) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.nextEpochUserBalance.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract],
  );

  const getMyPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || !stakedToken.currentEpochUserBalance) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.currentEpochUserBalance.unscaleBy(token.decimals), token.symbol);
      });
    },
    [stakingContract],
  );

  const getYFTotalStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolBalanceInUSD(yfPool.name);
    });
  }, [getPoolBalanceInUSD]);

  const getYFTotalEffectiveStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      return getPoolEffectiveBalanceInUSD(yfPool.name);
    });
  }, [getPoolEffectiveBalanceInUSD]);

  const getYFDistributedRewards = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      const { distributedReward } = yfPool.contract;

      if (!distributedReward) {
        return undefined;
      }

      return new BigNumber(distributedReward);
    });
  }, []);

  const getYFTotalSupply = useCallback(() => {
    return BigNumber.sumEach(KNOWN_POOLS, yfPool => {
      const { totalSupply } = yfPool.contract;

      if (!totalSupply) {
        return undefined;
      }

      return new BigNumber(totalSupply);
    });
  }, []);

  const getSYTotalStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(syPools, syPool => {
      const { poolSize } = syPool.rewardContract;

      if (!poolSize) {
        return undefined;
      }

      const tokenMeta = knownTokensCtx.getTokenByAddress(syPool.poolContract.address);

      if (!tokenMeta) {
        return undefined;
      }

      return knownTokensCtx.convertTokenInUSD(poolSize.unscaleBy(tokenMeta.decimals), tokenMeta.symbol);
    });
  }, [syPools]);

  const value: YFPoolsType = {
    yfPools: KNOWN_POOLS,
    syPools,
    getYFKnownPoolByName,
    stakingContract,
    getYFTotalStakedInUSD,
    getYFTotalEffectiveStakedInUSD,
    getSYTotalStakedInUSD,
    getPoolBalanceInUSD,
    getPoolEffectiveBalanceInUSD,
    getMyPoolBalanceInUSD,
    getMyPoolEffectiveBalanceInUSD,
    getYFDistributedRewards,
    getYFTotalSupply,
  };

  return (
    <YFPoolsContext.Provider value={value}>
      {children}
      <ContractListener contract={stakingContract} />
      <ContractListener contract={StableYfPool.contract} />
      <ContractListener contract={UnilpYfPool.contract} />
      <ContractListener contract={BondYfPool.contract} />
    </YFPoolsContext.Provider>
  );
};

export default YFPoolsProvider;
