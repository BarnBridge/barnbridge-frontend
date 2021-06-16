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
  eTokenAddress: string;
  eTokenSymbol: string;
  sFactorE: string;
  state: {
    blockNumber: number;
    blockTimestamp: string;
    eTokenPrice: string;
    tokenALiquidity: string;
    tokenBLiquidity: string;
  };
  targetRatio: string;
  tokenARatio: string;
  tokenBRatio: string;
};

export function fetchTranches(poolAddress: string): Promise<TranchesItemApiType[]> {
  const url = new URL(`/api/smartexposure/pools/${poolAddress}/tranches`, config.api.baseUrl);

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

export function fetchTranche(poolAddress: string, trancheAddress: string): Promise<TrancheApiType> {
  const url = new URL(`/api/smartexposure/pools/${poolAddress}/tranches/${trancheAddress}`, config.api.baseUrl);

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

type EtokenPriceApiType = {
  point: string;
  eTokenPrice: string;
};

export function fetchEtokenPrice(
  poolAddress: string,
  trancheAddress: string,
  windowFilter?: string,
): Promise<EtokenPriceApiType[]> {
  const query = queryfy({
    window: windowFilter,
  });

  const url = new URL(
    `/api/smartexposure/pools/${poolAddress}/tranches/${trancheAddress}/etoken-price?${query}`,
    config.api.baseUrl,
  );

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

export type RatioDeviationApiType = {
  point: string;
  deviation: string;
};

export function fetchRatioDeviation(
  poolAddress: string,
  trancheAddress: string,
  windowFilter?: string,
): Promise<RatioDeviationApiType[]> {
  const query = queryfy({
    window: windowFilter,
  });

  const url = new URL(
    `/api/smartexposure/pools/${poolAddress}/tranches/${trancheAddress}/ratio-deviation?${query}`,
    config.api.baseUrl,
  );

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

export type TrancheLiquidityApiType = {
  point: string;
  tokenALiquidity: number;
  tokenBLiquidity: number;
};

export function fetchTrancheLiquidity(
  poolAddress: string,
  trancheAddress: string,
  windowFilter?: string,
): Promise<TrancheLiquidityApiType[]> {
  const query = queryfy({
    window: windowFilter,
  });

  const url = new URL(
    `/api/smartexposure/pools/${poolAddress}/tranches/${trancheAddress}/liquidity?${query}`,
    config.api.baseUrl,
  );

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

export type TransactionApiType = {
  eTokenAddress: string;
  accountAddress: string;
  tokenA: {
    address: string;
    symbol: KnownTokens;
    decimals: number;
  };
  tokenB: {
    address: string;
    symbol: KnownTokens;
    decimals: number;
  };
  amountA: string;
  amountB: string;
  amountEToken: string;
  transactionType: 'WITHDRAW' | 'DEPOSIT';
  transactionHash: string;
  blockTimestamp: number;
  blockNumber: number;
};

export function fetchTransactions({
  page,
  limit,
  accountAddress,
}: {
  page: number;
  limit: number;
  accountAddress?: string;
}): Promise<{
  data: TransactionApiType[];
  meta: { count: number; block: number };
}> {
  const query = queryfy({
    page,
    limit,
    accountAddress,
  });

  const url = new URL(`/api/smartexposure/transactions?${query}`, config.api.baseUrl);

  return fetch(url.toString()).then(processResponse);
}
