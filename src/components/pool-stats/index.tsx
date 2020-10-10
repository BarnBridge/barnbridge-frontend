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
  const totalValueLockedInETH = formatBigValue(aggregated.totalStakedInETH);
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
        hint={`${totalValueLockedInETH} ETH`} />
      <StatWidget
        label="Bond Rewards"
        value={bondRewards}
        hint={`out of ${totalBondRewards}`} />
      <StatWidget
        label="Bond Price"
        value={`$ ${bondPrice}`}
        hint={bondPriceTimestamp} />
      <StatWidget
        label="Time Left"
        value={untilNextEpoch}
        hint="until next epoch" />
    </div>
  );
};

export default PoolStats;
