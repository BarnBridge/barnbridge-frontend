import React from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tabs from 'components/antd/tabs';
import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/known-tokens-provider';
import YFPoolProvider, { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useYFPools } from 'modules/yield-farming/providers/pools-provider';
import PoolTransactions from 'modules/yield-farming/views/pool-transactions';

import PoolStake from '../pool-stake';

import { PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolViewInner: React.FC = () => {
  const knownTokensCtx = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();

  const { poolMeta, poolBalance, effectivePoolBalance, apy } = yfPoolCtx;

  const [claiming, setClaiming] = React.useState(false);
  const [activeTokenTab, setActiveTokenTab] = React.useState<string>(poolMeta?.tokens[0]!);

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokensBySymbol.get(activeTokenTab);
  const tokenMeta = knownTokensCtx.getTokenBySymbol(activeTokenTab);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!poolMeta) {
    return <Redirect to="/yield-farming" />;
  }

  async function handleClaim() {
    setClaiming(true);

    try {
      const result = await poolMeta?.contract.claim();
      console.log('--- CLAIM RESULT', result);
    } catch (e) {
      //
    }

    setClaiming(false);
  }

  return (
    <div className="content-container-fix content-container">
      <div className="container-limit">
        <Link to="/yield-farming" className="flex inline align-center mb-16">
          <Icon name="arrow-back" width={14} height={14} className="mr-8" />
          <Text type="p1" weight="semibold" color="secondary">
            Pools
          </Text>
        </Link>
        <div className="flex align-center mb-40">
          <IconsSet
            icons={poolMeta.icons.map(icon => (
              <Icon key={icon} name={icon as IconNames} />
            ))}
            className="mr-16"
          />
          <div>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {poolMeta.label}
            </Text>
            <Text type="small" weight="semibold" color="red">
              Epoch {poolMeta.contract.lastActiveEpoch} / {poolMeta.contract.totalEpochs}
            </Text>
          </div>
        </div>

        <div className="card p-24 flexbox-grid mb-24">
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Pool balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatUSD(poolBalance) ?? '-'}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Effective pool balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatUSD(effectivePoolBalance) ?? '-'}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              APY
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatPercent(apy) ?? '-'}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Weekly rewards
            </Text>
            <div className="flex align-center">
              <Icon name="bond-circle-token" width={16} height={16} className="mr-8" />
              <Text type="p1" weight="semibold" color="primary">
                {formatNumber(poolMeta.contract.epochReward) ?? '-'}
              </Text>
            </div>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Pool distribution
            </Text>
          </div>
        </div>

        <div className="flexbox-grid mb-32">
          <div className={cn('card', s.stake)}>
            <Tabs defaultActiveKey="stake">
              {poolMeta.contract.isPoolEnded === false && (
                <Tabs.Tab key="stake" tab="Stake" className="p-24">
                  <PoolStake type="stake" token={tokenMeta} />
                </Tabs.Tab>
              )}
              <Tabs.Tab key="unstake" tab="Unstake" className="p-24">
                <PoolStake type="unstake" token={tokenMeta} />
              </Tabs.Tab>
            </Tabs>
          </div>

          <div className={s.statistics}>
            <div className="card mb-32">
              <div className="card-header">
                <Text type="p1" weight="semibold" color="primary">
                  My rewards
                </Text>
              </div>
              <div className="flex align-center justify-space-between p-24">
                <Text type="small" weight="semibold" color="secondary">
                  Potential reward this epoch
                </Text>
                {poolMeta.contract.potentialReward ? (
                  <div className="flex align-center">
                    <Icon name="bond-circle-token" width={16} height={16} className="mr-8" />
                    <Text type="p1" weight="semibold" color="primary">
                      {formatToken(poolMeta.contract.potentialReward)}
                    </Text>
                  </div>
                ) : (
                  '-'
                )}
              </div>
              <div className="p-4">
                <div className={cn('flex align-center justify-space-between', s.claimBlock)}>
                  <div className="flex flow-row">
                    <div className="flex align-center mb-4">
                      <Text type="h2" weight="semibold" color="primary" className="mr-8">
                        {formatToken(poolMeta.contract.potentialReward) ?? '-'}
                      </Text>
                      <Icon name="bond-circle-token" />
                    </div>
                    <Text type="small" weight="semibold" color="secondary">
                      Current reward
                    </Text>
                  </div>
                  <button
                    type="button"
                    className="button-primary"
                    disabled={poolMeta.contract.potentialReward?.isGreaterThan(BigNumber.ZERO) || claiming}
                    onClick={handleClaim}>
                    {claiming && <Spin spinning />}
                    Claim reward
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <Text type="p1" weight="semibold" color="primary">
                  My stake
                </Text>
              </div>
              <div className="p-24">
                {poolMeta.tokens.length > 1 && (
                  <ElasticTabs
                    tabs={poolMeta.tokens.map(token => ({
                      id: token,
                      children: token,
                    }))}
                    active={activeTokenTab}
                    onClick={setActiveTokenTab}
                    variation="elastic"
                    className="mb-32"
                    style={{
                      width: '100%',
                      height: 40,
                    }}
                  />
                )}
                <div className="flex flow-row">
                  <div className="flex align-center justify-space-between mb-24">
                    <Text type="small" weight="semibold" color="secondary">
                      Staked balance
                    </Text>
                    <Text type="p1" weight="semibold" color="primary">
                      {formatToken(selectedStakedToken?.nextEpochUserBalance) ?? '-'}
                    </Text>
                  </div>

                  <div className="flex align-center justify-space-between mb-24">
                    <Text type="small" weight="semibold" color="secondary">
                      Effective Staked balance
                    </Text>
                    <Text type="p1" weight="semibold" color="primary">
                      {formatToken(selectedStakedToken?.currentEpochUserBalance) ?? '-'}
                    </Text>
                  </div>

                  <div className="flex align-center justify-space-between">
                    <Text type="small" weight="semibold" color="secondary">
                      Wallet balance
                    </Text>
                    <Text type="p1" weight="semibold" color="primary">
                      {formatToken(selectedStakedToken?.userBalance) ?? '-'}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PoolTransactions />
      </div>
    </div>
  );
};

type RouteParams = {
  poolName: PoolTypes;
};

const PoolView: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { poolName } = match.params;

  return (
    <YFPoolProvider poolName={poolName}>
      <PoolViewInner />
    </YFPoolProvider>
  );
};

export default PoolView;
