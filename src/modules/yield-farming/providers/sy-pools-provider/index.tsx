import React from 'react';
import BigNumber from 'bignumber.js';
import Web3Contract from 'web3/contract';
import { ZERO_BIG_NUMBER, formatUSD } from 'web3/utils';

import IconBubble from 'components/custom/icon-bubble';
import { useReload } from 'hooks/useReload';
import { APISYRewardPool, Markets, Pools, fetchSYRewardPools } from 'modules/smart-yield/api';
import Erc20Contract from 'modules/smart-yield/contracts/erc20Contract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolTokenShare } from 'modules/yield-farming/components/pool-stake-share-bar';
import { useWallet } from 'wallets/wallet';

type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
};

type State = {
  loading: boolean;
  rewardPools: SYRewardPool[];
};

export type SyPoolsType = State & {
  dailyTotalReward?: BigNumber;
  myDailyTotalReward?: BigNumber;
  totalPoolsBalance?: BigNumber;
  myTotalPoolsBalance?: BigNumber;
  shares?: any[];
  myShares?: any[];
};

const SyPoolsContext = React.createContext<SyPoolsType>({
  loading: false,
  rewardPools: [],
});

export function useSyPools(): SyPoolsType {
  return React.useContext(SyPoolsContext);
}

const SyPoolsProvider: React.FC = props => {
  const { children } = props;
  const wallet = useWallet();
  const [reload, version] = useReload();

  const [state, setState] = React.useState<State>({
    loading: false,
    rewardPools: [],
  });

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      loading: true,
      rewardPools: [],
    }));

    (async () => {
      try {
        const result = await fetchSYRewardPools();

        const pools = result.map(rewardPool => {
          const rewardToken = new Erc20Contract([], rewardPool.rewardTokenAddress);
          rewardToken.on(Web3Contract.UPDATE_DATA, reload);
          rewardToken.loadCommon();

          const poolToken = new SYSmartYieldContract(rewardPool.poolTokenAddress);
          poolToken.on(Web3Contract.UPDATE_DATA, reload);
          poolToken.loadCommon();

          const pool = new SYRewardPoolContract(rewardPool.poolAddress);
          pool.on(Web3Contract.UPDATE_DATA, reload);
          pool.loadCommon();

          return {
            ...rewardPool,
            rewardToken,
            poolToken,
            pool,
          };
        });

        setState(prevState => ({
          ...prevState,
          loading: false,
          rewardPools: pools,
        }));
      } catch {
        setState(prevState => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, []);

  React.useEffect(() => {
    state.rewardPools.forEach(rewardPool => {
      rewardPool.pool.setAccount(wallet.account);
      rewardPool.pool.loadBalance();
    });
  }, [state.rewardPools, wallet.account]);

  const [
    dailyTotalReward,
    myDailyTotalReward,
    totalPoolsBalance,
    myTotalPoolsBalance,
    shares,
    myShares,
  ] = React.useMemo(() => {
    let dailyTotalReward = ZERO_BIG_NUMBER;
    let myDailyTotalReward = ZERO_BIG_NUMBER;
    let totalPoolsBalance = ZERO_BIG_NUMBER;
    let myTotalPoolsBalance = ZERO_BIG_NUMBER;
    let shares: PoolTokenShare[] = [];
    let myShares: PoolTokenShare[] = [];

    state.rewardPools.forEach(rewardPool => {
      const { pool, poolToken, rewardToken } = rewardPool;
      const tokenDecimals = poolToken.decimals ?? 0;
      const rewardDecimals = rewardToken.decimals ?? 0;

      if (pool.dailyReward) {
        dailyTotalReward = dailyTotalReward.plus(pool.dailyReward.dividedBy(10 ** rewardDecimals) ?? 0);
      }

      if (wallet.isActive && pool.myDailyReward) {
        myDailyTotalReward = myDailyTotalReward.plus(pool.myDailyReward.dividedBy(10 ** rewardDecimals) ?? 0);
      }

      if (pool.poolSize) {
        totalPoolsBalance = totalPoolsBalance.plus(
          pool.poolSize.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? 0,
        );
      }

      if (wallet.isActive && pool.balance) {
        myTotalPoolsBalance = myTotalPoolsBalance.plus(
          pool.balance.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? 0,
        );
      }
    });

    state.rewardPools.forEach(rewardPool => {
      const market = Markets.get(rewardPool.protocolId);
      const meta = Pools.get(rewardPool.underlyingSymbol);

      if (!meta) {
        return;
      }

      const { pool, poolToken } = rewardPool;
      const tokenDecimals = poolToken.decimals ?? 0;
      const share = pool.poolSize?.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? ZERO_BIG_NUMBER;
      const shareRate = share.multipliedBy(100).dividedBy(totalPoolsBalance);
      const myShare =
        pool.balance?.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? ZERO_BIG_NUMBER;
      const myShareRate = myShare.multipliedBy(100).dividedBy(myTotalPoolsBalance);

      shares.push({
        icon: <IconBubble name={meta?.icon} bubbleName="bond-circle-token" secondBubbleName={market?.icon} />,
        name: poolToken.name,
        color: meta?.color ?? '',
        value: formatUSD(share),
        share: shareRate.toNumber(),
      });

      if (wallet.isActive) {
        myShares.push({
          icon: <IconBubble name={meta?.icon} bubbleName="bond-circle-token" secondBubbleName={market?.icon} />,
          name: poolToken.name,
          color: meta?.color ?? '',
          value: formatUSD(myShare),
          share: myShareRate.toNumber(),
        });
      }
    });

    return [dailyTotalReward, myDailyTotalReward, totalPoolsBalance, myTotalPoolsBalance, shares, myShares];
  }, [state.rewardPools, wallet.account, version]);

  return (
    <SyPoolsContext.Provider
      value={{
        ...state,
        dailyTotalReward,
        myDailyTotalReward,
        totalPoolsBalance,
        myTotalPoolsBalance,
        shares,
        myShares,
      }}>
      {children}
    </SyPoolsContext.Provider>
  );
};

export default SyPoolsProvider;
