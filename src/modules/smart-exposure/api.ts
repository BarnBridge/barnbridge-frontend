import config from 'config';

import { processResponse, queryfy } from 'utils/fetch';

type PoolTokenApiType = {
  address: string;
  symbol: string;
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

export type TranchesItemTypeApiType = {
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

export function fetchTranches(poolAddress: string): Promise<TranchesItemTypeApiType[]> {
  const url = new URL(`/api/smartexposure/pools/${poolAddress}/tranches`, config.api.baseUrl);

  return fetch(url.toString())
    .then(processResponse)
    .then(result => result.data);
}

type TrancheTokenApiType = {
  address: string;
  symbol: string;
  decimals: number;
  state: {
    price: string;
    blockNumber: number;
    blockTimestamp: number;
  };
};

export type TrancheApiType = {
  eTokenAddress: string;
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
