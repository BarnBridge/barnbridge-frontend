import React from 'react';
import { formatDistance } from 'date-fns';

import { formatBigValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { useWeekCountdown } from 'hooks/useCountdown';

import StatWidget from 'components/stat-widget';

import s from './styles.module.css';

export type PoolStatsProps = {};

const PoolStats: React.FunctionComponent<PoolStatsProps> = props => {
  const { aggregated, staking, uniswapV2 } = useWeb3Contracts();
  const [untilNextEpoch] = useWeekCountdown(staking?.epochEnd);

  const totalValueLocked = formatBigValue(aggregated.totalStaked, 2);
  const totalEffectiveStaked = formatBigValue(aggregated.totalEffectiveStaked, 2);
  const bondRewards = formatBigValue(aggregated.bondReward);
  const totalBondRewards = formatBigValue(aggregated.totalBondReward, 0);
  const bondPrice = formatBigValue(aggregated.bondPrice, 2);
  const bondPriceTimestamp = uniswapV2?.lastBlockTime ? formatDistance(new Date(uniswapV2.lastBlockTime), new Date(), {
    addSuffix: true,
  }) : '-';

  return (
    <div className={s.component}>
      <StatWidget
        label="Total Value Locked"
        value={`$ ${totalValueLocked}`}
        hint={`$ ${totalEffectiveStaked} effective locked`}
        help="This number shows the Total Value Locked across the staking pool(s). It is the USD and ETH conversion of the amounts in the pool balance(s)."
      />
      <StatWidget
        label="Bond Rewards"
        value={bondRewards}
        hint={`out of ${totalBondRewards}`}
        help="This number shows the $BOND token rewards distributed so far out of the total of 2,800,000 that are going to be available for Yield Farming."
      />
      <StatWidget
        label="Bond Price"
        value={`$ ${bondPrice}`}
        hint={bondPriceTimestamp} />
      <StatWidget
        label="Time Left"
        value={untilNextEpoch}
        hint="until next epoch"
        help="This counter shows the time left in the current epoch. The pool(s) below are synchronized and have epochs that last a week. You can deposit to the pool(s) during the duration of an epoch and receive rewards proportional to the time they are staked, but the funds must stay staked until the clock runs out and the epoch ends in order to be able to harvest the rewards."
      />
    </div>
  );
};

export default PoolStats;
