import React from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';

import { KnownTokens, convertTokenInUSD, useKnownTokens } from 'components/providers/known-tokens-provider';
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
  poolName: string;
};

const YFPoolProvider: React.FC<Props> = props => {
  const { poolName, children } = props;

  const knownTokensCtx = useKnownTokens();
  const yfPoolsCtx = useYFPools();

  const pool = React.useMemo(() => yfPoolsCtx.getKnownPoolByName(poolName), [poolName]);

  const poolBalance = pool?.tokens.reduce((a, c) => {
    const token = knownTokensCtx.getTokenBySymbol(c);

    if (!token) {
      return a;
    }

    const stakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(token.address);

    if (!stakedToken) {
      return a;
    }

    const tokenValue = convertTokenInUSD(stakedToken.nextEpochPoolSize?.unscaleBy(token.decimals), c);
    return a.plus(tokenValue ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const effectivePoolBalance = pool?.tokens.reduce((a, c) => {
    if (pool.contract.poolEndDate) {
      return BigNumber.ZERO;
    }

    const token = knownTokensCtx.getTokenBySymbol(c);

    if (!token) {
      return a;
    }

    const stakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(token.address);

    if (!stakedToken) {
      return a;
    }

    const tokenValue = convertTokenInUSD(stakedToken.currentEpochPoolSize?.unscaleBy(18), c);
    return a.plus(tokenValue ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const apy = poolBalance?.isGreaterThan(BigNumber.ZERO)
    ? convertTokenInUSD(pool?.contract.epochReward?.multipliedBy(52), KnownTokens.BOND)?.dividedBy(poolBalance)
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
