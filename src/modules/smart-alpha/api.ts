import { useConfig } from 'components/providers/configProvider';
import { Tokens } from 'components/providers/tokensProvider';

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

export function useFetchTokenPrice(poolAddress: string): UseFetchReturn<TokenPriceType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools/${poolAddress}/tokens-price-chart`, config.api.baseUrl);

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

export function useFetchPoolPerformance(poolAddress: string): UseFetchReturn<PoolPerformanceType[]> {
  const config = useConfig();
  const url = new URL(`/api/smartalpha/pools/${poolAddress}/pool-performance-chart`, config.api.baseUrl);

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
