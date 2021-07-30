import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatToken, formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';

import { useYFPools } from '../../providers/pools-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const PoolStats: React.FC<Props> = ({ className }) => {
  const { links } = useConfig();
  const yfPoolsCtx = useYFPools();
  const rewardPoolsCtx = useRewardPools();
  const { projectToken } = useKnownTokens();

  const yfTotalStakedInUSD = yfPoolsCtx.getYFTotalStakedInUSD();
  const yfTotalEffectiveStakedInUSD = yfPoolsCtx.getYFTotalEffectiveStakedInUSD();
  const syTotalStakedInUSD = rewardPoolsCtx.getSYTotalStakedInUSD();
  const totalStakedInUSD = BigNumber.sumEach([yfTotalStakedInUSD, syTotalStakedInUSD], bn => bn);
  const totalEffectiveStakedInUSD = BigNumber.sumEach([yfTotalEffectiveStakedInUSD, syTotalStakedInUSD], bn => bn);
  const yfTotalSupply = yfPoolsCtx.getYFTotalSupply();
  const yfDistributedRewards = yfPoolsCtx.getYFDistributedRewards();

  const [, epochEndDate, epochProgress] = yfPoolsCtx.stakingContract?.epochDates ?? [];

  return (
    <div className={cn(s.component, className)}>
      <div className="card p-24">
        <div className="flex flow-row">
          <div className="flex align-center justify-space-between mb-48">
            <Hint
              text={
                <>
                  This number shows the Total Value Locked across the staking pool(s), and the effective Total Value
                  Locked.
                  <br />
                  <br />
                  When staking tokens during an epoch that is currently running, your effective deposit amount will be
                  proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked
                  balance and effective staked balance will be the equal, therefore TVL and effective TVL will differ in
                  most cases.
                </>
              }>
              <Text type="lb2" weight="semibold" color="red">
                Total Value Locked
              </Text>
            </Hint>
          </div>
          <div className="flex flow-row">
            <div className="flex align-center">
              <Text type="h2" weight="bold" color="primary" className="mb-4 mr-8">
                {formatUSD(totalStakedInUSD, {
                  decimals: 0,
                }) ?? '-'}
              </Text>
              <Tooltip
                title={
                  <>
                    The BarnBridge Yield Farming contracts are covered by: <br />- Bridge Mutual,{' '}
                    <a
                      href="https://app.bridgemutual.io/user/cover/0xdb9A242cfD588507106919051818e771778202e9"
                      rel="noopener noreferrer"
                      target="_blank">
                      click here
                    </a>{' '}
                    to purchase coverage
                  </>
                }>
                <Icon name="insured" color="green" width={32} height={32} />
              </Tooltip>
            </div>
            <Text type="p1" color="secondary">
              {formatUSD(totalEffectiveStakedInUSD, {
                decimals: 0,
              }) ?? '-'}{' '}
              effective locked
            </Text>
          </div>
        </div>
      </div>

      <div className="card p-24">
        <div className="flex flow-row">
          <div className="flex align-center justify-space-between mb-48">
            <Hint
              text={
                <>
                  This number shows the $BOND token rewards distributed so far out of the total of{' '}
                  {formatToken(yfTotalSupply) ?? '-'} that are going to be available for Yield Farming.
                </>
              }>
              <Text type="lb2" weight="semibold" color="red">
                Bond Rewards
              </Text>
            </Hint>
          </div>
          <div className="flex flow-row">
            <Text type="h2" weight="bold" color="primary" className="mb-4">
              {formatToken(yfDistributedRewards) ?? '-'}
            </Text>
            <Text type="p1" color="secondary">
              out of {formatToken(yfTotalSupply) ?? '-'}
            </Text>
          </div>
        </div>
      </div>

      <div className="card p-24">
        <div className="flex flow-row">
          <div className="flex align-center justify-space-between mb-48">
            <Text type="lb2" weight="semibold" color="red">
              Bond Price
            </Text>
          </div>
          <div className="flex flow-row">
            <Text type="h2" weight="bold" color="primary" className="mb-4">
              {formatUSD(projectToken.price) ?? '-'}
            </Text>
            <ExternalLink href={links.uniswapSwap}>
              <Text type="p1" weight="semibold" color="blue">
                Uniswap market
              </Text>
            </ExternalLink>
          </div>
        </div>
      </div>

      <div className="card p-24 relative">
        <div className="flex flow-row">
          <div className="flex align-center justify-space-between mb-48">
            <Hint
              text="This counter shows the time left in the current epoch. The pool(s) below are synchronized and have
                  epochs that last a week. You can deposit to the pool(s) during the duration of an epoch and receive
                  rewards proportional to the time they are staked, but the funds must stay staked until the clock runs
                  out and the epoch ends in order to be able to harvest the rewards.">
              <Text type="lb2" weight="semibold" color="red">
                Time Left
              </Text>
            </Hint>
          </div>
          <div className="flex flow-row">
            {epochEndDate ? (
              <UseLeftTime end={epochEndDate} delay={1_000}>
                {leftTime => (
                  <Text type="h2" weight="bold" color="primary" className="mb-4">
                    {leftTime > 0 ? getFormattedDuration(0, epochEndDate) : '0s'}
                  </Text>
                )}
              </UseLeftTime>
            ) : (
              '-'
            )}
            <Text type="p1" color="secondary">
              until next epoch
            </Text>
          </div>
        </div>
        {epochProgress && <div className={s.epochProgress} style={{ width: `${100 - epochProgress}%` }} />}
      </div>
    </div>
  );
};

export default PoolStats;
