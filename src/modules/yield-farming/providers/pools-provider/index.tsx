import React from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import { NewStakingContract } from 'web3/contracts/staking';
import Web3Contract from 'web3/contracts/web3Contract';
import { YFContract } from 'web3/contracts/yieldFarming';

import { KnownTokens, convertTokenInUSD, useKnownTokens } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
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
  tokens: KnownTokens[];
  contract: YFContract;
};

export const StableYfPool: YFPoolMeta = {
  name: YFPoolID.STABLE,
  label: 'USDC/DAI/sUSD',
  icons: ['token-usdc', 'token-dai', 'token-susd'],
  colors: ['#4f6ae5', '#ffd160', '#1e1a31'],
  tokens: [KnownTokens.USDC, KnownTokens.DAI, KnownTokens.SUSD],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR).toLowerCase()),
};

export const UnilpYfPool: YFPoolMeta = {
  name: YFPoolID.UNILP,
  label: 'USDC_BOND_UNI_LP',
  icons: ['token-uniswap'],
  colors: ['var(--theme-red-color)'],
  tokens: [KnownTokens.UNIV2],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR).toLowerCase()),
};

export const BondYfPool: YFPoolMeta = {
  name: YFPoolID.BOND,
  label: 'BOND',
  icons: ['token-bond'],
  colors: ['var(--theme-red-color)'],
  tokens: [KnownTokens.BOND],
  contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_BOND_ADDR).toLowerCase()),
};

const KNOWN_POOLS: YFPoolMeta[] = [StableYfPool, UnilpYfPool, BondYfPool];

export function getKnownPoolByName(name: string): YFPoolMeta | undefined {
  return KNOWN_POOLS.find(pool => pool.name === name);
}

export type YFPoolsType = {
  pools: YFPoolMeta[];
  getKnownPoolByName: (name: string) => YFPoolMeta | undefined;
  stakingContract?: NewStakingContract;
  getPoolBalance: (name: string) => BigNumber | undefined;
  getPoolEffectiveBalance: (name: string) => BigNumber | undefined;
};

const YFPoolsContext = React.createContext<YFPoolsType>({
  pools: KNOWN_POOLS,
  getKnownPoolByName,
  stakingContract: undefined,
  getPoolBalance: () => undefined,
  getPoolEffectiveBalance: () => undefined,
});

export function useYFPools(): YFPoolsType {
  return React.useContext(YFPoolsContext);
}

const YFPoolsProvider: React.FC = props => {
  const { children } = props;
  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const stakingContract = React.useMemo(() => {
    const staking = new NewStakingContract();
    staking.on(Web3Contract.UPDATE_DATA, reload);

    return staking;
  }, []);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.on(Web3Contract.UPDATE_DATA, reload);
      pool.contract.loadCommon();
    });

    stakingContract.loadCommon();
  }, []);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setProvider(walletCtx.provider);
    });

    stakingContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setAccount(walletCtx.account);

      if (walletCtx.account) {
        pool.contract.loadUserData();
      }
    });

    stakingContract.setAccount(walletCtx.account);
    if (walletCtx.account) {
      stakingContract.loadUserData();
    }
  }, [walletCtx.account]);

  const getPoolBalance = React.useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return pool.tokens.reduce((sum, token) => {
        const knownToken = knownTokensCtx.getTokenBySymbol(token);

        if (!knownToken) {
          return sum;
        }

        const stakedToken = stakingContract?.stakedTokens.get(knownToken.address);

        if (!stakedToken) {
          return sum;
        }

        const tokenValue = convertTokenInUSD(stakedToken.nextEpochPoolSize?.unscaleBy(knownToken.decimals), token);

        return sum.plus(tokenValue ?? BigNumber.ZERO);
      }, BigNumber.ZERO);
    },
    [stakingContract],
  );

  const getPoolEffectiveBalance = React.useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return pool.tokens.reduce((sum, token) => {
        const knownToken = knownTokensCtx.getTokenBySymbol(token);

        if (!knownToken) {
          return sum;
        }

        const stakedToken = stakingContract?.stakedTokens.get(knownToken.address);

        if (!stakedToken) {
          return sum;
        }

        const tokenValue = convertTokenInUSD(stakedToken.currentEpochPoolSize?.unscaleBy(knownToken.decimals), token);

        return sum.plus(tokenValue ?? BigNumber.ZERO);
      }, BigNumber.ZERO);
    },
    [stakingContract],
  );

  const value: YFPoolsType = {
    pools: KNOWN_POOLS,
    getKnownPoolByName,
    stakingContract,
    getPoolBalance,
    getPoolEffectiveBalance,
  };

  return (
    <YFPoolsContext.Provider value={value}>
      {children}
      <ContractListener contract={stakingContract} />
    </YFPoolsContext.Provider>
  );
};

export default YFPoolsProvider;
