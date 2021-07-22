import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useContractManager } from 'web3/components/contractManagerProvider';

import { TokenMeta, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useReload } from 'hooks/useReload';
import useRouteQuery from 'hooks/useRouteQuery';
import { useSyAPI } from 'modules/smart-yield/api';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

type RewardPoolType = {
  market?: MarketMeta;
  uToken?: TokenMeta;
  loading: boolean;
  pool?: SYRewardPoolEntity;
};

const Context = createContext<RewardPoolType>(InvariantContext('RewardPoolProvider'));

export function useRewardPool(): RewardPoolType {
  return useContext(Context);
}

const RewardPoolProvider: FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();
  const rqCtx = useRouteQuery();
  const knownTokensCtx = useKnownTokens();
  const contractManagerCtx = useContractManager();
  const { getTokenBySymbol } = knownTokensCtx;
  const syAPI = useSyAPI();

  const market = useMemo(() => {
    const marketId = rqCtx.get('m');
    return marketId ? getKnownMarketById(marketId) : undefined;
  }, [rqCtx.get]);

  const uToken = useMemo(() => {
    const tokenId = rqCtx.get('t');
    return tokenId ? getTokenBySymbol(tokenId) : undefined;
  }, [rqCtx.get]);

  const [loading, setLoading] = useState(false);
  const [pool, setPool] = useState<SYRewardPoolEntity | undefined>();

  useEffect(() => {
    if (!market || !uToken) {
      return;
    }

    (async () => {
      setLoading(true);

      try {
        const pools = await syAPI.fetchSYRewardPools(market.id, uToken.symbol);

        if (pools.length === 0) {
          return;
        }

        const entity = new SYRewardPoolEntity(pools[0], knownTokensCtx, contractManagerCtx);
        entity.onDataUpdate(reload);
        entity.loadCommonData();
        setPool(entity);
      } catch {}

      setLoading(false);
    })();
  }, [market, uToken]);

  useEffect(() => {
    if (walletCtx.account) {
      pool?.loadUserData();
      pool?.smartYield.loadAllowance(pool?.rewardPool.address);
    }
  }, [pool, walletCtx.account]);

  const value = {
    market,
    uToken,
    loading,
    pool,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default RewardPoolProvider;
