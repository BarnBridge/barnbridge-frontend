import { PeriodTabsKey, PortfolioPeriodTabsKey } from 'components/custom/tabs';
import { useConfig } from 'components/providers/configProvider';
import { Tokens } from 'components/providers/tokensProvider';
import { useWallet } from 'wallets/walletProvider';

import { UseFetchReturn, useFetch } from 'utils/fetch';

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
};

export function useFetchPools(): UseFetchReturn<PoolApiType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools`, config.api.baseUrl);

  return useFetch(url, {
    transform: ({ data }) => data,
  });
}

export function useFetchPool(poolAddress: string): UseFetchReturn<PoolApiType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools`, config.api.baseUrl);
  url.searchParams.set('poolAddress', poolAddress);

  return useFetch(url, {
    transform: ({ data }) => data,
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

type PoolPerformanceApiType = {
  point: string;
  seniorWithSA: string;
  seniorWithoutSA: string;
  juniorWithSA: string;
  juniorWithoutSA: string;
};

type PoolPerformanceType = {
  point: string;
  seniorWithSA: number;
  seniorWithoutSA: number;
  juniorWithSA: number;
  juniorWithoutSA: number;
};

export function useFetchPoolPerformance(
  poolAddress: string,
  periodFilter?: PeriodTabsKey,
): UseFetchReturn<PoolPerformanceType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools/${poolAddress}/pool-performance-chart`, config.api.baseUrl);

  if (periodFilter) {
    url.searchParams.set('window', periodFilter);
  }

  return useFetch(url, {
    transform: ({ data }: { data: PoolPerformanceApiType[] }) =>
      data.map(({ seniorWithSA, seniorWithoutSA, juniorWithSA, juniorWithoutSA, ...rest }) => ({
        ...rest,
        seniorWithSA: Number(seniorWithSA),
        seniorWithoutSA: Number(seniorWithoutSA),
        juniorWithSA: Number(juniorWithSA),
        juniorWithoutSA: Number(juniorWithoutSA),
      })),
  });
}

type PortfolioValueApiType = {
  point: string;
  juniorValue: string;
  seniorValue: string;
};

type PortfolioValueType = {
  point: string;
  juniorValue: number;
  seniorValue: number;
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
      data.map(({ juniorValue, seniorValue, ...rest }) => ({
        ...rest,
        juniorValue: Number(juniorValue),
        seniorValue: Number(seniorValue),
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
