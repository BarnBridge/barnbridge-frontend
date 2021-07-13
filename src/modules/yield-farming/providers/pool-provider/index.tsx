import React, { useEffect } from 'react';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';

import { useConfig } from 'components/providers/configProvider';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/walletProvider';

import { YfPoolMeta, useYFPools } from '../../providers/pools-provider';

import { InvariantContext } from 'utils/context';

export type YfPoolType = {
  poolMeta?: YfPoolMeta;
  poolBalance?: BigNumber;
  effectivePoolBalance?: BigNumber;
  apy?: BigNumber;
};

const Context = React.createContext<YfPoolType>(InvariantContext('YfPoolProvider'));

export function useYfPool(): YfPoolType {
  return React.useContext(Context);
}

type Props = {
  poolId: string;
};

const YfPoolProvider: React.FC<Props> = props => {
  const { poolId, children } = props;

  const [reload] = useReload();
  const config = useConfig();
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();
  const { convertTokenInUSD } = useKnownTokens();

  const pool = React.useMemo(() => yfPoolsCtx.getYFKnownPoolByName(poolId), [poolId]);

  const poolBalance = yfPoolsCtx.getPoolBalanceInUSD(poolId);
  const effectivePoolBalance = yfPoolsCtx.getPoolEffectiveBalanceInUSD(poolId);

  const apy =
    poolBalance?.isGreaterThan(BigNumber.ZERO) && pool?.contract.epochReward
      ? convertTokenInUSD(pool?.contract.epochReward * 52, KnownTokens.BOND)?.dividedBy(poolBalance)
      : undefined;

  const value: YfPoolType = {
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

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default YfPoolProvider;
