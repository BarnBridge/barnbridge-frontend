import React from 'react';
import { Link } from 'react-router-dom';
import Web3Contract from 'web3/contract';
import { ZERO_BIG_NUMBER, formatToken, formatUSD } from 'web3/utils';

import IconBubble from 'components/custom/icon-bubble';
import StatusTag from 'components/custom/status-tag';
import { Hint, Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import { APISYRewardPool, Markets, Pools, fetchSYRewardPools } from 'modules/smart-yield/api';
import Erc20Contract from 'modules/smart-yield/contracts/erc20Contract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import PoolStakeShareBar, { PoolTokenShare } from 'modules/yield-farming/components/pool-stake-share-bar';
import { useWallet } from 'wallets/wallet';

export type SYRewardPool = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
};

type State = {
  loading: boolean;
  rewardPools: SYRewardPool[];
};

const SYPoolCard: React.FC = () => {
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
      const { pool, poolToken } = rewardPool;
      const tokenDecimals = poolToken.decimals ?? 0;
      const share = pool.poolSize?.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? ZERO_BIG_NUMBER;
      const shareRate = share.multipliedBy(100).dividedBy(totalPoolsBalance);
      const myShare =
        pool.balance?.dividedBy(10 ** tokenDecimals).multipliedBy(poolToken.price ?? 0) ?? ZERO_BIG_NUMBER;
      const myShareRate = myShare.multipliedBy(100).dividedBy(myTotalPoolsBalance);
      const market = Markets.get(rewardPool.protocolId);
      const meta = Pools.get(rewardPool.underlyingSymbol);

      shares.push({
        icon: <IconBubble name={meta?.icon} bubbleName={market?.icon} />,
        name: `${market?.name} ${meta?.id}`,
        color: meta?.color ?? '',
        value: formatUSD(share),
        share: shareRate.toNumber(),
      });

      if (wallet.isActive) {
        myShares.push({
          icon: <IconBubble name={meta?.icon} bubbleName={market?.icon} />,
          name: `${market?.name} ${meta?.id}`,
          color: meta?.color ?? '',
          value: formatUSD(myShare),
          share: myShareRate.toNumber(),
        });
      }
    });

    return [dailyTotalReward, myDailyTotalReward, totalPoolsBalance, myTotalPoolsBalance, shares, myShares];
  }, [state.rewardPools, wallet.account, version]);

  return (
    <div className="card">
      <div className="card-header flex flow-col align-center justify-space-between pv-20">
        <div className="flex flow-col align-center">
          <StatusTag
            text="NEW"
            color="blue"
            style={{ minWidth: 49, height: 24, padding: '4px 8px' }}
            className="mr-16"
          />
          <Text type="p1" weight="semibold" color="primary">
            SMART Yield Pools
          </Text>
        </div>
        <Link className="button-primary" to="/smart-yield/pools">
          Explore
        </Link>
      </div>
      <div className="card-row p-24">
        <Hint text="This number shows the $BOND token rewards distributed per day.">
          <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
            Total Reward
          </Text>
        </Hint>
        <div className="flex flow-col align-center">
          <Text type="p1" weight="semibold" color="primary" className="mr-4">
            {formatToken(dailyTotalReward) ?? '-'}
          </Text>
          <Text type="p2" color="secondary">
            BOND / DAY
          </Text>
        </div>
      </div>
      {wallet.isActive && (
        <div className="card-row p-24">
          <Hint text="This number shows the $BOND rewards you would potentially be able to harvest daily, but is subject to change - in case more users deposit, or you withdraw some of your stake.">
            <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
              My Potential Reward
            </Text>
          </Hint>
          <div className="flex flow-col align-center">
            <Text type="p1" weight="semibold" color="primary" className="mr-4">
              {formatToken(myDailyTotalReward) ?? '-'}
            </Text>
            <Text type="p2" color="secondary">
              BOND / DAY
            </Text>
          </div>
        </div>
      )}
      <div className="card-row p-24">
        <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
          Total Pools Balance
        </Text>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {formatUSD(totalPoolsBalance) ?? '-'}
        </Text>
        <PoolStakeShareBar shares={shares} />
      </div>
      {wallet.isActive && (
        <div className="card-row p-24">
          <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
            My Pools Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {formatUSD(myTotalPoolsBalance) ?? '-'}
          </Text>
          <PoolStakeShareBar shares={myShares} />
        </div>
      )}
    </div>
  );
};

export default SYPoolCard;
