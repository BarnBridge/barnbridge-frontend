import { useEffect, useState } from 'react';

import { PeriodTabsKey, PortfolioPeriodTabsKey } from 'components/custom/tabs';
import { useConfig } from 'components/providers/configProvider';
import { Tokens } from 'components/providers/tokensProvider';
import { useWallet } from 'wallets/walletProvider';

import { PaginatedResult, UseFetchReturn, executeFetch, useFetch } from 'utils/fetch';

export type PoolApiType = {
  epoch1Start: number;
  epochDuration: number;
  juniorTokenAddress: string;
  oracleAddress: string;
  oracleAssetSymbol: string; // "USD"
  poolAddress: string;
  poolName: string;
  poolToken: {
    address: string;
    decimals: number;
    symbol: Tokens;
  };
  seniorTokenAddress: string;
  seniorRateModelAddress: string;
  accountingModelAddress: string;
  state: {
    downsideProtectionRate: string;
    epoch: number;
    juniorLiquidity: string;
    seniorLiquidity: string;
    upsideExposureRate: string;
  };
  tvl: {
    epochJuniorTVL: string;
    epochSeniorTVL: string;
    juniorEntryQueueTVL: string;
    seniorEntryQueueTVL: string;
    juniorExitQueueTVL: string;
    seniorExitQueueTVL: string;
    juniorExitedTVL: string;
    seniorExitedTVL: string;
  };
  userHasActivePosition?: boolean;
};

export function useFetchSaPools({
  userAddress,
  baseUrl,
}: {
  userAddress?: string;
  baseUrl?: string;
} = {}): UseFetchReturn<PoolApiType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools`, baseUrl ?? config.api.baseUrl);

  if (userAddress) {
    url.searchParams.set('userAddress', userAddress);
  }

  return useFetch(url, {
    transform: ({ data }) => data,
  });
}

export function useFetchPool(poolAddress: string): UseFetchReturn<PoolApiType | null> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools`, config.api.baseUrl);
  url.searchParams.set('poolAddress', poolAddress);

  return useFetch(url, {
    transform: ({ data }) => data?.[0] ?? null,
  });
}

type TokenPriceApiType = {
  point: string;
  juniorTokenPrice: string;
  seniorTokenPrice: string;
};

type TokenPriceType = {
  point: string;
  juniorTokenPrice: number;
  seniorTokenPrice: number;
};

export function useFetchTokenPrice(
  poolAddress: string,
  periodFilter?: PeriodTabsKey,
): UseFetchReturn<TokenPriceType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools/${poolAddress}/tokens-price-chart`, config.api.baseUrl);

  if (periodFilter) {
    url.searchParams.set('window', periodFilter);
  }

  return useFetch(url, {
    transform: ({ data }: { data: TokenPriceApiType[] }) =>
      data.map(({ juniorTokenPrice, seniorTokenPrice, ...rest }) => ({
        ...rest,
        juniorTokenPrice: Number(juniorTokenPrice),
        seniorTokenPrice: Number(seniorTokenPrice),
      })),
  });
}

export enum EpochFilterTypeKey {
  current = 'current',
  last = 'last',
}

type PoolPerformanceApiType = {
  point: string;
  seniorWithSA: string;
  seniorWithoutSA: string;
  juniorWithSA: string;
  juniorWithoutSA: string;
  underlyingPrice: string;
};

type PoolPerformanceType = {
  point: string;
  seniorWithSA: number;
  seniorWithoutSA: number;
  juniorWithSA: number;
  juniorWithoutSA: number;
  underlyingPrice: number;
};

export function useFetchPoolPerformance(
  poolAddress: string,
  periodFilter?: EpochFilterTypeKey,
): UseFetchReturn<PoolPerformanceType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools/${poolAddress}/pool-performance-chart`, config.api.baseUrl);

  if (periodFilter) {
    url.searchParams.set('window', periodFilter);
  }

  return useFetch(url, {
    transform: ({ data }: { data: PoolPerformanceApiType[] }) =>
      data.map(({ seniorWithSA, seniorWithoutSA, juniorWithSA, juniorWithoutSA, underlyingPrice, ...rest }) => ({
        ...rest,
        seniorWithSA: Number(seniorWithSA),
        seniorWithoutSA: Number(seniorWithoutSA),
        juniorWithSA: Number(juniorWithSA),
        juniorWithoutSA: Number(juniorWithoutSA),
        underlyingPrice: Number(underlyingPrice),
      })),
  });
}

type PortfolioValueApiType = {
  point: string;
  juniorValue: string;
  seniorValue: string;
  entryQueueValue: string;
  exitQueueValue: string;
};

type PortfolioValueType = {
  point: string;
  juniorValue: number;
  seniorValue: number;
  entryQueueValue: number;
  exitQueueValue: number;
};

export function useFetchPortfolioValue(periodFilter?: PortfolioPeriodTabsKey): UseFetchReturn<PortfolioValueType[]> {
  const config = useConfig();
  const { account } = useWallet();
  const url = new URL(`/api/smartalpha/users/${account}/portfolio-value`, config.api.baseUrl);

  if (periodFilter) {
    url.searchParams.set('window', periodFilter);
  }

  return useFetch(url, {
    transform: ({ data }: { data: PortfolioValueApiType[] }) =>
      data.map(({ juniorValue, seniorValue, entryQueueValue, exitQueueValue, ...rest }) => ({
        ...rest,
        juniorValue: Number(juniorValue),
        seniorValue: Number(seniorValue),
        entryQueueValue: Number(entryQueueValue),
        exitQueueValue: Number(exitQueueValue),
      })),
  });
}

export type TransactionApiType = {
  poolAddress: string;
  userAddress: string;
  tranche: 'SENIOR' | 'JUNIOR';
  transactionType:
    | 'JUNIOR_ENTRY'
    | 'JUNIOR_REDEEM_TOKENS'
    | 'JUNIOR_EXIT'
    | 'JUNIOR_REDEEM_UNDERLYING'
    | 'SENIOR_ENTRY'
    | 'SENIOR_REDEEM_TOKENS'
    | 'SENIOR_EXIT'
    | 'SENIOR_REDEEM_UNDERLYING'
    | 'JTOKEN_SEND'
    | 'JTOKEN_RECEIVE'
    | 'STOKEN_SEND'
    | 'STOKEN_RECEIVE';
  amount: string;
  amountInQuoteAsset: string;
  amountInUSD: string;
  transactionHash: string;
  blockTimestamp: number;
  tokenSymbol: string;
  poolTokenSymbol: string;
  oracleAssetSymbol: string;
};

export function useFetchTransactions({
  page,
  limit,
  userAddress,
  poolAddress,
  transactionType,
}: {
  page: number;
  limit: number;
  userAddress?: string;
  poolAddress?: string;
  transactionType: TransactionApiType['transactionType'] | '';
}): UseFetchReturn<{ data: TransactionApiType[] | null; meta: { count: number } }> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/transactions`, config.api.baseUrl);

  if (userAddress) {
    url.searchParams.set('userAddress', userAddress);
  }

  if (poolAddress) {
    url.searchParams.set('poolAddress', poolAddress);
  }

  if (transactionType) {
    url.searchParams.set('transactionType', transactionType);
  }

  if (page) {
    url.searchParams.set('page', String(page));
  }

  if (limit) {
    url.searchParams.set('limit', String(limit));
  }

  return useFetch(url);
}

type QueuePositionApiType = {
  blockTimestamp: number;
  oracleAssetSymbol: string;
  poolAddress: string;
  poolName: string;
  poolToken: {
    address: string;
    symbol: string;
    decimals: number;
  };
  address: string;
  decimals: number;
  symbol: string;
  queueType: string;
  tranche: 'SENIOR' | 'JUNIOR';
};

export function useFetchQueuePositions(): UseFetchReturn<QueuePositionApiType[]> {
  const config = useConfig();
  const { account } = useWallet();

  const fetchReturn = useFetch('', {
    lazy: true,
    transform: ({ data }) => data,
  });

  useEffect(() => {
    if (account) {
      const url = new URL(`/api/smartalpha/users/${account}/queue-positions`, config.api.baseUrl);
      fetchReturn.load(url);
    } else {
      fetchReturn.reset();
    }
  }, [account]);

  return fetchReturn;
}

export type EpochApiType = {
  id: number;
  seniorLiquidity: string;
  juniorLiquidity: string;
  upsideExposureRate: string;
  downsideProtectionRate: string;
  startDate: number;
  endDate: number;
  entryPrice: string;
  juniorProfits: string;
  seniorProfits: string;
  juniorTokenPriceStart: string;
  seniorTokenPriceStart: string;
};

// export type PreviousEpochsApiType = {
//   poolAddress: string;
//   poolName: string;
//   poolToken: {
//     address: string;
//     symbol: Tokens;
//     decimals: 18;
//   };
//   oracleAssetSymbol: Tokens;
//   epochs: EpochApiType[];
// };

export function useFetchPreviousEpochs({
  // page,
  limit,
  poolAddress,
}: {
  // page: number;
  limit: number;
  poolAddress?: string;
}): {
  data: EpochApiType[] | undefined;
  loading: boolean;
  loaded: boolean;
  error: Error | undefined;
  load: (cursor: string) => void;
  loadNewer: Function;
  loadOlder: Function;
  hasNewer: boolean;
  hasOlder: boolean;
} {
  // : UseFetchReturn<{ data: PreviousEpochsApiType; meta: { count: number } }>

  const config = useConfig();
  // const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<EpochApiType[] | undefined>();
  const [hasNewer, setHasNewer] = useState<boolean>(true);
  const [hasOlder, setHasOlder] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchData = async ({ direction, cursor }: { direction?: 'up' | 'down'; cursor: string | undefined }) => {
    setLoading(true);

    const url = new URL(`/api/smartalpha/pools/${poolAddress}/previous-epochs`, config.api.baseUrl);

    if (poolAddress) {
      url.searchParams.set('poolAddress', poolAddress);
    }

    if (direction) {
      url.searchParams.set('direction', direction);
    }

    if (cursor) {
      url.searchParams.set('cursor', cursor);
    }

    if (limit) {
      url.searchParams.set('limit', String(limit));
    }

    try {
      const fetchedData = await executeFetch(String(url));

      setLoaded(true);

      if (direction) {
        setData(prevData => [
          ...(direction === 'up' ? fetchedData.data : []),
          ...(prevData ?? []),
          ...(direction === 'down' ? fetchedData.data : []),
        ]);
        if (!fetchedData.meta.hasNewer) {
          setHasNewer(fetchedData.meta.hasNewer);
        }

        if (!fetchedData.meta.hasOlder) {
          setHasOlder(fetchedData.meta.hasOlder);
        }
      } else {
        setData(fetchedData.data);
        setHasNewer(fetchedData.meta.hasNewer);
        setHasOlder(fetchedData.meta.hasOlder);
      }
    } catch (e) {
      setError(e as Error);
      setData(undefined);
    }

    setLoading(false);
  };

  const loadNewer = () => {
    const cursor = data?.[0]?.id;
    fetchData({ direction: 'up', cursor: typeof cursor === 'number' ? String(cursor + 1) : cursor });
  };

  const loadOlder = () => {
    const cursor = data?.[data?.length - 1]?.id;
    fetchData({ direction: 'down', cursor: typeof cursor === 'number' ? String(cursor - 1) : cursor });
  };

  const load = (cursor: string) => {
    fetchData({ cursor });
  };

  return {
    data,
    hasNewer,
    hasOlder,
    loaded,
    loading,
    error,
    load,
    loadNewer,
    loadOlder,
  };
}

export type KpiOptionType = {
  poolType: string;
  poolAddress: string;
  poolToken: {
    address: string;
    symbol: string;
    decimals: number;
  };
  rewardTokens: {
    address: string;
    symbol: string;
    decimals: number;
  }[];
};

export function useFetchKpiOptions(): UseFetchReturn<KpiOptionType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/rewards/pools`, config.api.baseUrl);

  return useFetch(url, {
    transform: ({ data }: { data: KpiOptionType[] }) => data,
  });
}

export function useFetchKpiOption(poolAddress: string): UseFetchReturn<KpiOptionType | undefined> {
  const config = useConfig();
  const url = new URL('/api/smartalpha/rewards/pools', config.api.baseUrl);

  if (poolAddress) {
    url.searchParams.set('poolAddress', poolAddress);
  }

  return useFetch(url, {
    transform: ({ data }: { data: KpiOptionType[] }) => (Array.isArray(data) ? data[0] : undefined),
  });
}

export type KpiTransactionType = {
  userAddress: string;
  transactionType: string;
  amount: string;
  blockTimestamp: number;
  blockNumber: number;
  transactionHash: string;
};

export function useFetchKpiOptionTransactions(
  poolAddress: string,
  page = 1,
  limit = 10,
  userAddress: string = 'all',
  transactionType: string = 'all',
): UseFetchReturn<PaginatedResult<KpiTransactionType>> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/rewards/pools/${poolAddress}/transactions`, config.api.baseUrl);

  if (page) {
    url.searchParams.set('page', String(page));
  }

  if (limit) {
    url.searchParams.set('limit', String(limit));
  }

  if (userAddress) {
    url.searchParams.set('userAddress', userAddress);
  }

  if (transactionType) {
    url.searchParams.set('transactionType', transactionType);
  }

  return useFetch(url);
}
