import { FC, createContext, useContext } from 'react';

import { useConfig } from 'components/providers/configProvider';
import { KnownTokens } from 'components/providers/knownTokensProvider';

import { InvariantContext } from 'utils/context';
import { UseFetchReturn, processResponse, queryfy, useFetch } from 'utils/fetch';

type PoolTokenApiType = {
  address: string;
  symbol: KnownTokens;
  decimals: number;
};

export type PoolApiType = {
  poolAddress: string;
  poolName: string;
  state: {
    blockNumber: number;
    blockTimestamp: string;
    lastRebalance: number;
    poolLiquidity: string;
    rebalancingCondition: string;
    rebalancingInterval: number;
  };
  tokenA: PoolTokenApiType;
  tokenB: PoolTokenApiType;
};

export type TranchesItemApiType = {
  poolAddress: string;
  eTokenAddress: string;
  eTokenSymbol: string;
  sFactorE: string;
  state: {
    blockNumber: number;
    blockTimestamp: string;
    eTokenPrice: string;
    tokenALiquidity: string;
    tokenBLiquidity: string;
    currentRatio: string;
    tokenACurrentRatio: string;
    tokenBCurrentRatio: string;
    lastRebalance: number;
  };
  targetRatio: string;
  tokenARatio: string;
  tokenBRatio: string;
  tokenA: TrancheTokenApiType;
  tokenB: TrancheTokenApiType;
};

type TrancheTokenApiType = {
  address: string;
  symbol: KnownTokens;
  decimals: number;
  state: {
    price: string;
    blockNumber: number;
    blockTimestamp: number;
  };
};

export type TrancheApiType = {
  eTokenAddress: string;
  eTokenSymbol: string;
  sFactorE: string;
  targetRatio: string;
  tokenARatio: string;
  tokenBRatio: string;
  tokenA: TrancheTokenApiType;
  tokenB: TrancheTokenApiType;
  rebalancingInterval: number;
  rebalancingCondition: number;
  state: {
    tokenALiquidity: string;
    tokenBLiquidity: string;
    eTokenPrice: string;
    currentRatio: string;
    tokenACurrentRatio: string;
    tokenBCurrentRatio: string;
    lastRebalance: number;
    blockNumber: number;
    blockTimestamp: string;
  };
};

export type ETokenPriceApiType = {
  point: string;
  eTokenPrice: string;
};

export type ETokenPriceType = {
  point: string;
  eTokenPrice: number;
};

export type RatioDeviationApiType = {
  point: string;
  deviation: string;
};

export type RatioDeviationType = {
  point: string;
  deviation: string;
};

export type TrancheLiquidityApiType = {
  point: string;
  tokenALiquidity: string;
  tokenBLiquidity: string;
};

export type TrancheLiquidityType = {
  point: string;
  tokenALiquidity: number;
  tokenBLiquidity: number;
};

export type TransactionApiType = {
  eTokenAddress: string;
  eTokenSymbol: string;
  accountAddress: string;
  tokenA: PoolTokenApiType;
  tokenB: PoolTokenApiType;
  amountA: string;
  amountB: string;
  tokenAPrice: string;
  tokenBPrice: string;
  amountEToken: string;
  transactionType: 'WITHDRAW' | 'DEPOSIT';
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
  sFactorE: string;
};

export type PortfolioValueApiType = {
  point: string;
  portfolioValueSE: string;
};

export type PortfolioValueType = {
  point: string;
  portfolioValueSE: number;
};

export type SeAPIType = {
  fetchPools(baseUrl?: string): Promise<PoolApiType[]>;
  fetchTranches(poolAddress?: string): Promise<TranchesItemApiType[]>;
  fetchTranche(trancheAddress: string): Promise<TrancheApiType>;
  fetchETokenPrice(trancheAddress: string, windowFilter?: string): Promise<ETokenPriceType[]>;
  fetchRatioDeviation(trancheAddress: string, windowFilter?: string): Promise<RatioDeviationType[]>;
  fetchTrancheLiquidity(trancheAddress: string, windowFilter?: string): Promise<TrancheLiquidityType[]>;
  fetchTransactions({
    page,
    limit,
    accountAddress,
    poolAddress,
    eTokenAddress,
    transactionType,
  }: {
    page: number;
    limit: number;
    accountAddress?: string;
    poolAddress?: string;
    eTokenAddress?: string;
    transactionType?: TransactionApiType['transactionType'];
  }): Promise<{
    data: TransactionApiType[];
    meta: { count: number; block: number };
  }>;
  fetchPortfolioValue({
    accountAddress,
    window,
    poolAddress,
  }: {
    accountAddress: string;
    window?: string;
    poolAddress?: string;
  }): Promise<{
    data: PortfolioValueType[];
    meta: { count: number; block: number };
  }>;
};

const Context = createContext<SeAPIType>(InvariantContext('SeAPIProvider'));

export function useSeAPI(): SeAPIType {
  return useContext(Context);
}

const SeAPIProvider: FC = props => {
  const config = useConfig();

  function fetchPools(baseUrl?: string): Promise<PoolApiType[]> {
    const url = new URL(`/api/smartexposure/pools`, baseUrl ?? config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result => result.data);
  }

  function fetchTranches(poolAddress?: string): Promise<TranchesItemApiType[]> {
    const query = queryfy({
      poolAddress,
    });

    const url = new URL(`/api/smartexposure/tranches?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result => result.data);
  }

  function fetchTranche(trancheAddress: string): Promise<TrancheApiType> {
    const url = new URL(`/api/smartexposure/tranches/${trancheAddress}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result => result.data);
  }

  function fetchETokenPrice(trancheAddress: string, windowFilter?: string): Promise<ETokenPriceType[]> {
    const query = queryfy({
      window: windowFilter,
    });

    const url = new URL(`/api/smartexposure/tranches/${trancheAddress}/etoken-price?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result =>
        result.data.map((item: ETokenPriceApiType) => ({
          ...item,
          eTokenPrice: Number(item.eTokenPrice),
        })),
      );
  }

  function fetchRatioDeviation(trancheAddress: string, windowFilter?: string): Promise<RatioDeviationType[]> {
    const query = queryfy({
      window: windowFilter,
    });

    const url = new URL(`/api/smartexposure/tranches/${trancheAddress}/ratio-deviation?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result =>
        result.data.map((item: RatioDeviationApiType) => ({
          ...item,
          deviation: Number(item.deviation),
        })),
      );
  }

  function fetchTrancheLiquidity(trancheAddress: string, windowFilter?: string): Promise<TrancheLiquidityType[]> {
    const query = queryfy({
      window: windowFilter,
    });

    const url = new URL(`/api/smartexposure/tranches/${trancheAddress}/liquidity?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(result =>
        result.data.map((item: TrancheLiquidityApiType) => ({
          ...item,
          tokenALiquidity: Number(item.tokenALiquidity),
          tokenBLiquidity: Number(item.tokenBLiquidity),
        })),
      );
  }

  function fetchTransactions({
    page,
    limit,
    accountAddress,
    poolAddress,
    eTokenAddress,
    transactionType,
  }: {
    page: number;
    limit: number;
    accountAddress?: string;
    poolAddress?: string;
    eTokenAddress?: string;
    transactionType?: TransactionApiType['transactionType'];
  }): Promise<{
    data: TransactionApiType[];
    meta: { count: number; block: number };
  }> {
    const query = queryfy({
      page,
      limit,
      accountAddress,
      poolAddress,
      eTokenAddress,
      transactionType,
    });

    const url = new URL(`/api/smartexposure/transactions?${query}`, config.api.baseUrl);

    return fetch(url.toString()).then(processResponse);
  }

  function fetchPortfolioValue({
    accountAddress,
    window,
    poolAddress,
  }: {
    accountAddress: string;
    window?: string;
    poolAddress?: string;
  }): Promise<{
    data: PortfolioValueType[];
    meta: { count: number; block: number };
  }> {
    const query = queryfy({
      window,
      poolAddress,
    });

    const url = new URL(`/api/smartexposure/users/${accountAddress}/portfolio-value?${query}`, config.api.baseUrl);

    return fetch(url.toString())
      .then(processResponse)
      .then(response => ({
        ...response,
        data: response.data.map((item: PortfolioValueApiType) => ({
          ...item,
          portfolioValueSE: Number(item.portfolioValueSE),
        })),
      }));
  }

  const value = {
    fetchPools,
    fetchTranches,
    fetchTranche,
    fetchETokenPrice,
    fetchRatioDeviation,
    fetchTrancheLiquidity,
    fetchTransactions,
    fetchPortfolioValue,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default SeAPIProvider;

export function useFetchSePools(baseUrl?: string): UseFetchReturn<PoolApiType[]> {
  const config = useConfig();
  const url = new URL('/api/smartexposure/pools', baseUrl ?? config.api.baseUrl);

  return useFetch(url, {
    transform: ({ data }) => data,
  });
}
