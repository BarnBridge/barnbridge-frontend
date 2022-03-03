import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { formatToken, formatUSD } from 'web3/utils';

import StatusTag from 'components/custom/status-tag';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { TokenMeta, useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { FCx } from 'components/types.tx';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import { useWallet } from 'wallets/walletProvider';

const AggregatedPoolCard: FCx = props => {
  const { getTokenByAddress, convertTokenInUSD, bondToken } = useKnownTokens();
  const walletCtx = useWallet();
  const rewardPoolsCtx = useRewardPools();

  const [activeTab, setActiveTab] = useState('pool');

  const { pools: rewardPools } = rewardPoolsCtx;

  const rewardTokens = rewardPools.reduce((set, pool) => {
    Array.from(pool.rewardTokens.values()).forEach(rewardToken => {
      set.add(rewardToken);
    });
    return set;
  }, new Set<TokenMeta>());

  const totalDailyRewards = rewardPools.reduce((map, pool) => {
    Array.from(pool.rewardTokens).forEach(([rewardTokenAddress, rewardToken]) => {
      const prevDailyReward = map.get(rewardTokenAddress) ?? BigNumber.ZERO;
      const dailyReward = pool.rewardPool.getDailyRewardFor(rewardTokenAddress)?.unscaleBy(rewardToken.decimals);

      map.set(rewardTokenAddress, prevDailyReward.plus(dailyReward ?? BigNumber.ZERO));
    });

    return map;
  }, new Map<string, BigNumber>());

  const totalPoolSizeInUSD = BigNumber.sumEach(rewardPools, ({ rewardPool, smartYield }) => {
    const tokenMeta = getTokenByAddress(smartYield.address);
    return tokenMeta
      ? convertTokenInUSD(rewardPool.poolSize?.unscaleBy(tokenMeta.decimals), tokenMeta.symbol)
      : undefined;
  });

  const totalPotentialRewards = rewardPools.reduce((map, pool) => {
    Array.from(pool.rewardTokens).forEach(([rewardTokenAddress, rewardToken]) => {
      const prevReward = map.get(rewardTokenAddress) ?? BigNumber.ZERO;
      const dailyReward = pool.rewardPool.getMyDailyRewardFor(rewardTokenAddress)?.unscaleBy(rewardToken.decimals);

      map.set(rewardTokenAddress, prevReward.plus(dailyReward ?? BigNumber.ZERO));
    });

    return map;
  }, new Map<string, BigNumber>());

  const totalStakedInUSD = BigNumber.sumEach(rewardPools, ({ rewardPool, smartYield }) => {
    const value = rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(smartYield.decimals);
    return convertTokenInUSD(value, smartYield.symbol!);
  });

  return (
    <article className="card flex flow-row p-24">
      <header className="flex align-center  col-gap-24 row-gap-12 mb-24">
        <div className="flex align-center">
          <Icon name="sy-circle" size={40} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-space-between align-center wrap mb-4">
            <Text type="body1" weight="semibold" color="primary">
              SMART Yield Pools
            </Text>
            <StatusTag
              text={
                <Text type="caption" weight="bold" color="green">
                  ACTIVE
                </Text>
              }
              color="green"
            />
          </div>
        </div>
      </header>
      <div className="flex flow-row flex-grow ph-24 pb-24">
        <ElasticTabs
          tabs={[
            { id: 'pool', children: 'Pool statistics' },
            { id: 'my', children: 'My statistics', disabled: !walletCtx.isActive },
          ]}
          activeKey={activeTab}
          onClick={setActiveTab}
          variation="elastic"
          className="mb-24"
          style={{
            width: '100%',
            height: 40,
          }}
        />

        {activeTab === 'pool' && (
          <div className="flex flow-row">
            <div key={bondToken.symbol} className="flex align-center justify-space-between mb-24">
              <Hint text={`This number shows the $${bondToken.symbol} token rewards distributed per day.`}>
                <Text type="caption" weight="semibold" color="secondary">
                  {bondToken.symbol} daily reward
                </Text>
              </Hint>
              <div className="flex align-center">
                <TokenIcon name={bondToken.icon} size={16} className="mr-8" />
                <Text type="body1" weight="semibold" color="primary">
                  {formatToken(totalDailyRewards.get(bondToken.address)) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="caption" weight="semibold" color="secondary">
                Pool balance
              </Text>
              <Text type="body1" weight="semibold" color="primary">
                {formatUSD(totalPoolSizeInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="caption" weight="semibold" color="secondary">
                Effective pool balance
              </Text>
              <Text type="body1" weight="semibold" color="primary">
                {formatUSD(totalPoolSizeInUSD) ?? '-'}
              </Text>
            </div>
          </div>
        )}

        {activeTab === 'my' && walletCtx.isActive && (
          <div className="flex flow-row">
            {Array.from(rewardTokens.values()).map(rewardToken => (
              <div key={rewardToken.symbol} className="flex align-center justify-space-between mb-24">
                <Text type="caption" weight="semibold" color="secondary">
                  My potential {rewardToken.symbol} reward
                </Text>
                <div className="flex align-center">
                  <TokenIcon name={rewardToken.icon} size={16} className="mr-8" />
                  <Text type="body1" weight="semibold" color="primary">
                    {formatToken(totalPotentialRewards.get(rewardToken.address)) ?? '-'}
                  </Text>
                </div>
              </div>
            ))}
            <div className="flex align-center justify-space-between mb-24">
              <Text type="caption" weight="semibold" color="secondary">
                My pool balance
              </Text>
              <Text type="body1" weight="semibold" color="primary">
                {formatUSD(totalStakedInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="caption" weight="semibold" color="secondary">
                My effective pool balance
              </Text>
              <Text type="body1" weight="semibold" color="primary">
                {formatUSD(totalStakedInUSD) ?? '-'}
              </Text>
            </div>
          </div>
        )}

        <div className="flex align-center justify-space-between col-gap-16 mt-auto">
          <Link to={`/smart-yield/pools`} className="button-primary flex-grow">
            View pools
          </Link>
        </div>
      </div>
    </article>
  );
};

export default AggregatedPoolCard;
