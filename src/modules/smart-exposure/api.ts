import { KnownTokens } from 'components/providers/known-tokens-provider';
import config from 'config';

import { processResponse, queryfy } from 'utils/fetch';

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

export function fetchPools(): Promise<PoolApiType[]> {
  const url = new URL(`/api/smartexposure/pools`, config.api.baseUrl);

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

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

export function fetchTranches(poolAddress?: string): Promise<TranchesItemApiType[]> {
  const query = queryfy({
    poolAddress,
  });

  const url = new URL(`/api/smartexposure/tranches?${query}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

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

export function fetchTranche(trancheAddress: string): Promise<TrancheApiType> {
  const url = new URL(`/api/smartexposure/tranches/${trancheAddress}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

export type ETokenPriceApiType = {
  point: string;
  eTokenPrice: string;
};

export type ETokenPriceType = {
  point: string;
  eTokenPrice: number;
};

export function fetchEtokenPrice(trancheAddress: string, windowFilter?: string): Promise<ETokenPriceType[]> {
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

export type RatioDeviationApiType = {
  point: string;
  deviation: string;
};

export type RatioDeviationType = {
  point: string;
  deviation: string;
};

export function fetchRatioDeviation(trancheAddress: string, windowFilter?: string): Promise<RatioDeviationType[]> {
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

export function fetchTrancheLiquidity(trancheAddress: string, windowFilter?: string): Promise<TrancheLiquidityType[]> {
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

export function fetchTransactions({
  page,
  limit,
  accountAddress,
  poolAddress,
  transactionType,
}: {
  page: number;
  limit: number;
  accountAddress?: string;
  poolAddress?: string;
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
    transactionType,
  });

  const url = new URL(`/api/smartexposure/transactions?${query}`, config.api.baseUrl);

  return fetch(url.toString()).then(processResponse);
}

export type PortfolioValueApiType = {
  point: string;
  portfolioValueSE: string;
};

export type PortfolioValueType = {
  point: string;
  portfolioValueSE: number;
};

export function fetchPortfolioValue({
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
