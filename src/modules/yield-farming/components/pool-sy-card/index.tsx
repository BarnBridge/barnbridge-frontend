import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Icon from 'components/custom/icon';
import StatusTag from 'components/custom/status-tag';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { BondToken, convertTokenInUSD, useKnownTokens } from 'components/providers/known-tokens-provider';
import { useWallet } from 'wallets/wallet';

import { useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolSYCard: React.FC = () => {
  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();

  const [activeTab, setActiveTab] = useState('pool');

  const totalDailyReward = BigNumber.sumEach(yfPoolsCtx.syPools, ({ rewardContract, poolContract }) => {
    return rewardContract.dailyReward;
  });

  const totalPoolSizeInUSD = BigNumber.sumEach(yfPoolsCtx.syPools, ({ rewardContract, poolContract }) => {
    const tokenMeta = knownTokensCtx.getTokenByAddress(poolContract.address);
    return tokenMeta
      ? convertTokenInUSD(rewardContract.poolSize?.unscaleBy(tokenMeta.decimals), tokenMeta.symbol)
      : undefined;
  });

  const totalPotentialReward = BigNumber.sumEach(yfPoolsCtx.syPools, ({ rewardContract }) => {
    return rewardContract.myDailyReward;
  });

  const totalStakedInUSD = BigNumber.sumEach(yfPoolsCtx.syPools, ({ rewardContract, poolContract }) => {
    const tokenMeta = knownTokensCtx.getTokenByAddress(poolContract.address);
    return tokenMeta
      ? knownTokensCtx.convertTokenInUSD(rewardContract.balance?.unscaleBy(tokenMeta.decimals), tokenMeta.symbol)
      : undefined;
  });

  const aggregatedAPR = BigNumber.sumEach(yfPoolsCtx.syPools, ({ rewardContract, poolContract }) => {
    if (!rewardContract.dailyReward || !BondToken.price) {
      return undefined;
    }

    const yearlyReward = rewardContract.dailyReward
      .unscaleBy(BondToken.decimals)
      ?.multipliedBy(BondToken.price)
      .multipliedBy(365);

    if (!yearlyReward) {
      return undefined;
    }

    const tokenMeta = knownTokensCtx.getTokenByAddress(poolContract.address);

    if (!tokenMeta || !rewardContract.poolSize) {
      return undefined;
    }

    const poolBalance = knownTokensCtx.convertTokenInUSD(
      rewardContract.poolSize.unscaleBy(poolContract.decimals),
      tokenMeta.symbol,
    );

    if (!poolBalance) {
      return undefined;
    }

    return yearlyReward.dividedBy(poolBalance);
  });

  return (
    <div className="card flex flow-row">
      <div className={cn(s.cardHeader, 'flex align-center justify-space-between p-24')}>
        <div className="flex align-center">
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
      </div>
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
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                APR
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatPercent(aggregatedAPR) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Hint text="This number shows the $BOND token rewards distributed per day.">
                <Text type="small" weight="semibold" color="secondary">
                  Daily reward
                </Text>
              </Hint>
              <div className="flex align-center">
                <Icon name="static/token-bond" width={16} height={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(totalDailyReward?.unscaleBy(BondToken.decimals)) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(totalPoolSizeInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Effective pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(totalPoolSizeInUSD) ?? '-'}
              </Text>
            </div>
          </div>
        )}

        {activeTab === 'my' && walletCtx.isActive && (
          <div className="flex flow-row">
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                APR
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatPercent(aggregatedAPR) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                My potential reward
              </Text>
              <div className="flex align-center">
                <Icon name="static/token-bond" width={16} height={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(totalPotentialReward?.unscaleBy(BondToken.decimals)) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                My pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(totalStakedInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                My effective pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
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
    </div>
  );
};

export default PoolSYCard;
