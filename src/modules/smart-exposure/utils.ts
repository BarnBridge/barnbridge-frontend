type TokenTypeApi = {
  address: string;
  symbol: string;
  decimals: number;
};

export type PoolType = {
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
  tokenA: TokenTypeApi;
  tokenB: TokenTypeApi;
};

export function calcTokensRatio(targetRatio: string): [number, number] {
  return [100 / (1 + Number(targetRatio) / 10 ** 18), 100 - 100 / (1 + Number(targetRatio) / 10 ** 18)];
}
