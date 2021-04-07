import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { formatToken, formatUSD } from 'web3/utils';

import StatusTag from 'components/custom/status-tag';
import { Hint, Text } from 'components/custom/typography';
import PoolStakeShareBar from 'modules/yield-farming/components/pool-stake-share-bar';
import { useSyPools } from 'modules/yield-farming/providers/sy-pools-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const SYPoolCard: React.FC = () => {
  const wallet = useWallet();
  const syPoolsCtx = useSyPools();

  return (
    <div className="card">
      <div className={cn('card-header', s.cardTitleContainer)}>
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
            {formatToken(syPoolsCtx.dailyTotalReward) ?? '-'}
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
              {formatToken(syPoolsCtx.myDailyTotalReward) ?? '-'}
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
        <Text type="p1" weight="semibold" color="primary" style={{ marginBottom: '20px' }}>
          {formatUSD(syPoolsCtx.totalPoolsBalance) ?? '-'}
        </Text>
        <PoolStakeShareBar shares={syPoolsCtx.shares} />
      </div>
      {wallet.isActive && (
        <div className="card-row p-24">
          <Text type="lb2" weight="semibold" color="secondary" className="mb-4">
            My Pools Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary" style={{ marginBottom: '24px' }}>
            {formatUSD(syPoolsCtx.myTotalPoolsBalance) ?? '-'}
          </Text>
          <PoolStakeShareBar shares={syPoolsCtx.myShares} />
        </div>
      )}
    </div>
  );
};

export default SYPoolCard;
