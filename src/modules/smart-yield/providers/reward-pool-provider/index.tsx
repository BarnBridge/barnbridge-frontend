import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContractListener from 'web3/components/contract-listener';

import { Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import { APISYRewardPool, fetchSYRewardPools } from 'modules/smart-yield/api';
import Erc20Contract from 'modules/smart-yield/contracts/erc20Contract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useWallet } from 'wallets/wallet';

export type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
};

type State = {
  marketId?: string;
  tokenId?: string;
  loading: boolean;
  rewardPool?: SYRewardPool;
};

const InitialState: State = {
  marketId: undefined,
  tokenId: undefined,
  loading: false,
  rewardPool: undefined,
};

type ContextType = State;

const Context = React.createContext<ContextType>({
  ...InitialState,
});

export function useRewardPool(): ContextType {
  return React.useContext(Context);
}

const RewardPoolProvider: React.FC = props => {
  const { children } = props;

  const location = useLocation();
  const wallet = useWallet();
  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  const [market, token] = React.useMemo(() => {
    const urlQuery = new URLSearchParams(location.search);

    let marketStr = urlQuery.get('m') ?? undefined;

    if (marketStr) {
      marketStr = decodeURIComponent(marketStr);
    }

    let tokenStr = urlQuery.get('t') ?? undefined;

    if (tokenStr) {
      tokenStr = decodeURIComponent(tokenStr);
    }

    return [marketStr, tokenStr];
  }, [location.search]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      rewardPool: undefined,
    }));

    if (!market || !token) {
      return;
    }

    (async () => {
      try {
        const pools = await fetchSYRewardPools(market, token);

        if (pools.length === 0) {
          return;
        }

        const pool = pools[0];

        const rewardTokenContract = new Erc20Contract([], pool.rewardTokenAddress);
        rewardTokenContract.setProvider(wallet.provider);
        rewardTokenContract.loadCommon().then(reload);

        const poolTokenContract = new SYSmartYieldContract(pool.poolTokenAddress);
        poolTokenContract.setProvider(wallet.provider);
        poolTokenContract.loadCommon().then(reload);

        const poolContract = new SYRewardPoolContract(pool.poolAddress);
        poolContract.setProvider(wallet.provider);
        poolContract.loadCommon().then(reload);

        setState(prevState => ({
          ...prevState,
          loading: false,
          rewardPool: {
            ...pool,
            rewardToken: rewardTokenContract,
            poolToken: poolTokenContract,
            pool: poolContract,
          },
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, [market, token]);

  React.useEffect(() => {
    const { rewardPool } = state;

    if (rewardPool) {
      rewardPool.rewardToken.setProvider(wallet.provider);
      rewardPool.poolToken.setProvider(wallet.provider);
      rewardPool.pool.setProvider(wallet.provider);
    }
  }, [state.rewardPool, wallet.provider]);

  React.useEffect(() => {
    const { rewardPool } = state;

    if (rewardPool) {
      rewardPool.rewardToken.setAccount(wallet.account);
      rewardPool.rewardToken.loadBalance().then(reload);

      rewardPool.poolToken.setAccount(wallet.account);
      rewardPool.poolToken.loadBalance().then(reload);
      rewardPool.poolToken.loadAllowance(rewardPool.poolAddress).then(reload);

      rewardPool.pool.setAccount(wallet.account);
      rewardPool.pool.loadClaim().then(reload);
      rewardPool.pool.loadBalance().then(reload);
    }
  }, [state.rewardPool, wallet.account]);

  const value = React.useMemo<ContextType>(() => {
    return {
      ...state,
    };
  }, [state, version]);

  return (
    <Context.Provider value={value}>
      {children}
      <ContractListener
        contract={state.rewardPool?.pool}
        renderSuccess={meta => (
          <>
            <Text type="small" weight="semibold" color="secondary" className="mb-64 text-center">
              You can see your new position in your portfolio
            </Text>
            <Link className="button-primary" to="/smart-yield/portfolio/senior">
              See your portfolio
            </Link>
          </>
        )}
      />
    </Context.Provider>
  );
};

export default RewardPoolProvider;
