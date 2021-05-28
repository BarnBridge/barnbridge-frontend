import React, { FC, createContext, useCallback, useContext, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';

import { useKnownTokens } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { fetchSYRewardPools } from 'modules/smart-yield/api';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { useWallet } from 'wallets/wallet';

type RewardPoolsType = {
  loading: boolean;
  pools: SYRewardPoolEntity[];
  getMarketTVL: (marketId: string) => BigNumber;
  getSYTotalStakedInUSD: () => BigNumber;
};

const Context = createContext<RewardPoolsType>({
  loading: false,
  pools: [],
  getMarketTVL: () => BigNumber.ZERO,
  getSYTotalStakedInUSD: () => BigNumber.ZERO,
});

export function useRewardPools(): RewardPoolsType {
  return useContext(Context);
}

const RewardPoolsProvider: FC = props => {
  const { children } = props;

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<SYRewardPoolEntity[]>([]);

  const getMarketTVL = useCallback(
    (marketId: string) => {
      return pools
        .filter(pool => pool.meta.protocolId === marketId)
        .reduce((sum, entity) => {
          const { poolSize } = entity.rewardPool;
          const { decimals, symbol } = entity.smartYield;

          if (!poolSize || !symbol) {
            return sum;
          }

          const usdValue = knownTokensCtx.convertTokenInUSD(poolSize.unscaleBy(decimals), symbol);

          if (!usdValue) {
            return sum;
          }

          return sum.plus(usdValue);
        }, BigNumber.ZERO);
    },
    [pools],
  );

  const getSYTotalStakedInUSD = useCallback(() => {
    return pools.reduce((sum, entity) => {
      const { poolSize } = entity.rewardPool;
      const { decimals, symbol } = entity.smartYield;

      if (!poolSize || !symbol) {
        return sum;
      }

      const usdValue = knownTokensCtx.convertTokenInUSD(poolSize.unscaleBy(decimals), symbol);

      if (!usdValue) {
        return sum;
      }

      return sum.plus(usdValue);
    }, BigNumber.ZERO);
  }, [pools]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const result = await fetchSYRewardPools();
        const rewardPools = result.map(item => {
          const entity = new SYRewardPoolEntity(item);
          entity.updateProvider(walletCtx.provider);
          entity.onDataUpdate(reload);
          entity.loadCommonData();
          return entity;
        });

        setPools(rewardPools);
      } catch {}

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    pools.forEach(pool => {
      pool.updateProvider(walletCtx.provider);
    });
  }, [pools, walletCtx.provider]);

  useEffect(() => {
    pools.forEach(pool => {
      pool.updateAccount(walletCtx.account);
      if (walletCtx.account) {
        pool.loadUserData();
      }
    });
  }, [pools, walletCtx.account]);

  const value = {
    loading,
    pools,
    getMarketTVL,
    getSYTotalStakedInUSD,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {pools.map(pool => (
        <ContractListener key={pool.smartYield.address} contract={pool.smartYield} />
      ))}
    </Context.Provider>
  );
};

export default RewardPoolsProvider;
