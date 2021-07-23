import React, { FC, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useContract } from 'web3/components/contractManagerProvider';

import { useConfig } from 'components/providers/configProvider';
import { TokenMeta, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { YfPoolContract } from 'modules/yield-farming/contracts/yfPool';
import { YfStakingContract } from 'modules/yield-farming/contracts/yfStaking';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export enum YFPoolID {
  STABLE = 'stable',
  UNILP = 'unilp',
  BOND = 'bond',
}

export type YfPoolMeta = {
  name: YFPoolID;
  label: string;
  tokens: TokenMeta[];
  contract: YfPoolContract;
};

export type YfPoolsType = {
  yfPools: YfPoolMeta[];
  getYFKnownPoolByName: (name: string) => YfPoolMeta | undefined;
  stakingContract?: YfStakingContract;
  getPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolBalanceInUSD: (name: string) => BigNumber | undefined;
  getMyPoolEffectiveBalanceInUSD: (name: string) => BigNumber | undefined;
  getYFTotalStakedInUSD: () => BigNumber | undefined;
  getYFTotalEffectiveStakedInUSD: () => BigNumber | undefined;
  getYFDistributedRewards: () => BigNumber | undefined;
  getYFTotalSupply: () => BigNumber | undefined;
};

const Context = createContext<YfPoolsType>(InvariantContext('YfPoolsProvider'));

export function useYFPools(): YfPoolsType {
  return useContext(Context);
}

function useYfStakingContract(address: string): YfStakingContract {
  return useContract<YfStakingContract>(address, () => {
    return new YfStakingContract(address);
  });
}

function useYfContract(address: string): YfPoolContract {
  return useContract<YfPoolContract>(address, () => {
    return new YfPoolContract(address);
  });
}

const YfPoolsProvider: FC = props => {
  const { children } = props;

  const config = useConfig();
  const walletCtx = useWallet();
  const web3Ctx = useWeb3();
  const { usdcToken, daiToken, susdToken, univ2Token, bondToken, convertTokenInUSD } = useKnownTokens();

  const stakingContract = useYfStakingContract(config.contracts.yf?.staking!);
  const yfStableContract = useYfContract(config.contracts.yf?.stable!);
  const yfUnilpContract = useYfContract(config.contracts.yf?.unilp!);
  const yfBondContract = useYfContract(config.contracts.yf?.bond!);

  const yfPools = useMemo<YfPoolMeta[]>(
    () => [
      {
        name: YFPoolID.STABLE,
        label: 'USDC/DAI/sUSD',
        tokens: [usdcToken, daiToken, susdToken],
        contract: yfStableContract,
      },
      {
        name: YFPoolID.UNILP,
        label: 'USDC_BOND_UNI_LP',
        tokens: [univ2Token],
        contract: yfUnilpContract,
      },
      {
        name: YFPoolID.BOND,
        label: 'BOND',
        tokens: [bondToken],
        contract: yfBondContract,
      },
    ],
    [yfBondContract, yfStableContract, yfUnilpContract],
  );

  useEffect(() => {
    yfPools.forEach(yfPool => {
      yfPool.contract.loadCommon().catch(Error);
      yfPool.tokens.forEach(tokenMeta => {
        stakingContract.loadCommonFor(tokenMeta.address).catch(Error);
      });
    });
  }, [yfPools, stakingContract]);

  useEffect(() => {
    if (walletCtx.account) {
      yfPools.forEach(yfPool => {
        yfPool.contract.loadUserData().catch(Error);

        yfPool.tokens.forEach(tokenMeta => {
          stakingContract.loadUserDataFor(tokenMeta.address).catch(Error);
        });
      });
    }
  }, [walletCtx.account, yfPools, stakingContract]);

  const getYFKnownPoolByName = useCallback(
    (poolId: string): YfPoolMeta | undefined => {
      return yfPools.find(pool => pool.name === poolId);
    },
    [yfPools],
  );

  const getPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochPoolSize === undefined) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.nextEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [getYFKnownPoolByName, stakingContract.stakedTokens],
  );

  const getPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochPoolSize === undefined) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.currentEpochPoolSize.unscaleBy(token.decimals), token.symbol);
      });
    },
    [getYFKnownPoolByName, stakingContract.stakedTokens],
  );

  const getMyPoolBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.nextEpochUserBalance === undefined) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.nextEpochUserBalance.unscaleBy(token.decimals), token.symbol);
      });
    },
    [getYFKnownPoolByName, stakingContract.stakedTokens],
  );

  const getMyPoolEffectiveBalanceInUSD = useCallback(
    (poolId: string): BigNumber | undefined => {
      const pool = getYFKnownPoolByName(poolId);

      if (!pool) {
        return undefined;
      }

      return BigNumber.sumEach(pool.tokens, token => {
        const stakedToken = stakingContract.stakedTokens.get(token.address);

        if (!stakedToken || stakedToken.currentEpochUserBalance === undefined) {
          return undefined;
        }

        return convertTokenInUSD(stakedToken.currentEpochUserBalance.unscaleBy(token.decimals), token.symbol);
      });
    },
    [getYFKnownPoolByName, stakingContract.stakedTokens],
  );

  const getYFTotalStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(yfPools, yfPool => {
      return getPoolBalanceInUSD(yfPool.name);
    });
  }, [yfPools, getPoolBalanceInUSD]);

  const getYFTotalEffectiveStakedInUSD = useCallback(() => {
    return BigNumber.sumEach(yfPools, yfPool => {
      return getPoolEffectiveBalanceInUSD(yfPool.name);
    });
  }, [yfPools, getPoolEffectiveBalanceInUSD]);

  const getYFDistributedRewards = useCallback(() => {
    return BigNumber.sumEach(yfPools, yfPool => {
      const { distributedReward } = yfPool.contract;

      if (distributedReward === undefined) {
        return undefined;
      }

      return BigNumber.from(distributedReward);
    });
  }, [yfPools]);

  const getYFTotalSupply = useCallback(() => {
    return BigNumber.sumEach(yfPools, yfPool => {
      const { totalSupply } = yfPool.contract;

      if (totalSupply === undefined) {
        return undefined;
      }

      return BigNumber.from(totalSupply);
    });
  }, [yfPools]);

  const value: YfPoolsType = {
    yfPools,
    getYFKnownPoolByName,
    stakingContract,
    getYFTotalStakedInUSD,
    getYFTotalEffectiveStakedInUSD,
    getPoolBalanceInUSD,
    getPoolEffectiveBalanceInUSD,
    getMyPoolBalanceInUSD,
    getMyPoolEffectiveBalanceInUSD,
    getYFDistributedRewards,
    getYFTotalSupply,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default YfPoolsProvider;
