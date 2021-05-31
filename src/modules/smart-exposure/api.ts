import config from 'config';

export type TrancheApiType = {
  eTokenAddress: string;
  sFactorE: string;
  targetRatio: string;
  tokenARatio: string;
  tokenBRatio: string;
  tokenA: {
    address: string;
    symbol: string;
    decimals: number;
    state: {
      price: string;
      blockNumber: number;
      blockTimestamp: number;
    };
  };
  tokenB: {
    address: string;
    symbol: string;
    decimals: number;
    state: {
      price: string;
      blockNumber: number;
      blockTimestamp: number;
    };
  };
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
    .then(result => result.json())
    .then(result => result.data);
}
