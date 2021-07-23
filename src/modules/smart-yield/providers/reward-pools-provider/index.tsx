import React, { FC, createContext, useCallback, useContext, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';

import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useReload } from 'hooks/useReload';
import { useSyAPI } from 'modules/smart-yield/api';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

type RewardPoolsType = {
  loading: boolean;
  pools: SYRewardPoolEntity[];
  getMarketTVL: (marketId?: string) => BigNumber;
  getSYTotalStakedInUSD: () => BigNumber;
};

const Context = createContext<RewardPoolsType>(InvariantContext('RewardPoolsProvider'));

export function useRewardPools(): RewardPoolsType {
  return useContext(Context);
}

const RewardPoolsProvider: FC = props => {
  const { children } = props;

  const knownTokensCtx = useKnownTokens();
  const contractManagerCtx = useContractManager();
  const walletCtx = useWallet();
  const [reload] = useReload();
  const syAPI = useSyAPI();

  const [loading, setLoading] = useState(false);
  const [pools, setPools] = useState<SYRewardPoolEntity[]>([]);

  const getMarketTVL = useCallback(
    (marketId?: string) => {
      return pools
        .filter(pool => pool.meta.protocolId === (marketId ?? pool.meta.protocolId))
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
        const result = await syAPI.fetchSYRewardPools();
        const rewardPools = result.map(item => {
          const entity = new SYRewardPoolEntity(item, knownTokensCtx, contractManagerCtx);
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

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default RewardPoolsProvider;
