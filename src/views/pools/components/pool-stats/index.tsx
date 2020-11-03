import React from 'react';
import cx from 'classnames';

import { formatBONDValue, formatUSDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { useWeekCountdown } from 'hooks/useCountdown';

import StatWidget from 'components/stat-widget';
import ExternalLink from 'components/externalLink';

import s from 'views/pools/components/pool-stats/styles.module.css';

export type PoolStatsProps = {
  className?: string;
};

const PoolStats: React.FunctionComponent<PoolStatsProps> = props => {
  const { aggregated, staking } = useWeb3Contracts();
  const epochEnd = React.useMemo<number | undefined>(() => {
    const [, end] = staking.getEpochPeriod(staking.currentEpoch!);
    return end;
  }, [staking]);
  const [untilNextEpoch] = useWeekCountdown(epochEnd);

  return (
    <div className={cx(s.component, props.className)}>
      <StatWidget
        label="Total Value Locked"
        value={formatUSDValue(aggregated.totalStaked)}
        hint={`${formatUSDValue(aggregated.totalEffectiveStaked)} effective locked`}
        help={
          <span>
            This number shows the Total Value Locked across the staking pool(s), and the effective Total Value Locked.
            <br /><br />
            When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in most cases.
          </span>
        }
      />
      <StatWidget
        label="Bond Rewards"
        value={formatBONDValue(aggregated.bondReward)}
        hint={`out of ${formatBONDValue(aggregated.totalBondReward)}`}
        help="This number shows the $BOND token rewards distributed so far out of the total of 2,800,000 that are going to be available for Yield Farming."
      />
      <StatWidget
        label="Bond Price"
        value={formatUSDValue(aggregated.bondPrice)}
        hint={(
          <ExternalLink
            href={`https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`}
            className={s.link}>Uniswap market</ExternalLink>
        )} />
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
