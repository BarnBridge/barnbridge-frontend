import React, { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/contracts/erc20Contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';

import { KnownTokens, convertTokenInUSD } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { YFPoolMeta, useYFPools } from 'modules/yield-farming/providers/pools-provider';
import { useWallet } from 'wallets/wallet';

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

  const [reload] = useReload();
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();

  const pool = React.useMemo(() => yfPoolsCtx.getYFKnownPoolByName(poolId), [poolId]);

  const poolBalance = yfPoolsCtx.getPoolBalanceInUSD(poolId);
  const effectivePoolBalance = yfPoolsCtx.getPoolEffectiveBalanceInUSD(poolId);

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

  useEffect(() => {
    if (walletCtx.account) {
      pool?.tokens.forEach(token => {
        (token.contract as Erc20Contract).loadBalance().then(reload).catch(Error);
        (token.contract as Erc20Contract).loadAllowance(CONTRACT_STAKING_ADDR).then(reload).catch(Error);
      });
    }
  }, [pool, walletCtx.account]);

  return (
    <YFPoolContext.Provider value={value}>
      {children}
      <ContractListener contract={pool?.contract} />
    </YFPoolContext.Provider>
  );
};

export default YFPoolProvider;
