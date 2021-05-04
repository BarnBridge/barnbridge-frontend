import React from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';

import { KnownTokens, convertTokenInUSD } from 'components/providers/known-tokens-provider';
import { YFPoolMeta, useYFPools } from 'modules/yield-farming/providers/pools-provider';

export type YFPoolType = {
  poolMeta?: YFPoolMeta;
  poolBalance?: BigNumber;
  effectivePoolBalance?: BigNumber;
  apy?: BigNumber;
};

const YFPoolContext = React.createContext<YFPoolType>({});

export function useYFPool(): YFPoolType {
  return React.useContext(YFPoolContext);
}

type Props = {
  poolId: string;
};

const YFPoolProvider: React.FC<Props> = props => {
  const { poolId, children } = props;

  const yfPoolsCtx = useYFPools();

  const pool = React.useMemo(() => yfPoolsCtx.getKnownPoolByName(poolId), [poolId]);

  const poolBalance = yfPoolsCtx.getPoolBalance(poolId);
  const effectivePoolBalance = yfPoolsCtx.getPoolEffectiveBalance(poolId);

  const apy =
    poolBalance?.isGreaterThan(BigNumber.ZERO) && pool?.contract.epochReward
      ? convertTokenInUSD(pool?.contract.epochReward * 52, KnownTokens.BOND)?.dividedBy(poolBalance)
      : undefined;

  const value: YFPoolType = {
    poolMeta: pool,
    poolBalance,
    effectivePoolBalance,
    apy,
  };

  return (
    <YFPoolContext.Provider value={value}>
      {children}
      <ContractListener contract={pool?.contract} />
    </YFPoolContext.Provider>
  );
};

export default YFPoolProvider;
