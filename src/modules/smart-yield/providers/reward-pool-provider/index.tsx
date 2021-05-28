import React, { FC, createContext, useContext, useEffect, useMemo, useState } from 'react';
import ContractListener from 'web3/components/contract-listener';

import { TokenMeta, getTokenBySymbol } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import useRouteQuery from 'hooks/useRouteQuery';
import { fetchSYRewardPools } from 'modules/smart-yield/api';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/wallet';

type RewardPoolType = {
  market?: MarketMeta;
  uToken?: TokenMeta;
  loading: boolean;
  pool?: SYRewardPoolEntity;
};

const Context = createContext<RewardPoolType>({
  market: undefined,
  uToken: undefined,
  loading: false,
  pool: undefined,
});

export function useRewardPool(): RewardPoolType {
  return useContext(Context);
}

const RewardPoolProvider: FC = props => {
  const { children } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();
  const rqCtx = useRouteQuery();

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
        const pools = await fetchSYRewardPools(market.id, uToken.symbol);

        if (pools.length === 0) {
          return;
        }

        const entity = new SYRewardPoolEntity(pools[0]);
        entity.updateProvider(walletCtx.provider);
        entity.onDataUpdate(reload);
        entity.loadCommonData();
        setPool(entity);
      } catch {}

      setLoading(false);
    })();
  }, [market, uToken]);

  useEffect(() => {
    pool?.updateProvider(walletCtx.provider);
  }, [pool, walletCtx.provider]);

  useEffect(() => {
    pool?.updateAccount(walletCtx.account);

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

  return (
    <Context.Provider value={value}>
      {children}
      <ContractListener contract={pool?.rewardPool} />
    </Context.Provider>
  );
};

export default RewardPoolProvider;
