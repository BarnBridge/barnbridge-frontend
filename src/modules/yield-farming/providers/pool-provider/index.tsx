import React, { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';

import { useConfig } from 'components/providers/configProvider';
import { KnownTokens, convertTokenInUSD } from 'components/providers/knownTokensProvider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/walletProvider';

import { YFPoolMeta, useYFPools } from '../../providers/pools-provider';

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
  const config = useConfig();
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
        (token.contract as Erc20Contract).loadAllowance(config.contracts.yf?.staking!).then(reload).catch(Error);
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
