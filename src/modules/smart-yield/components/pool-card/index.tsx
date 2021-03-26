import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { ZERO_BIG_NUMBER, formatBigValue, formatPercent, formatToken, getHumanValue } from 'web3/utils';

import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { Markets, Pools } from 'modules/smart-yield/api';
import { SYRewardPool } from 'modules/smart-yield/providers/reward-pools-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

export type PoolsCardProps = {
  rewardPool: SYRewardPool;
  className?: string;
};

export const PoolsCard: FC<PoolsCardProps> = props => {
  const { rewardPool, className } = props;

  const wallet = useWallet();
  const [activeTab, setActiveTab] = useState<'pool' | 'my'>('pool');
  const [confirmClaimVisible, setConfirmClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const ended = false;

  function handleClaim() {
    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await rewardPool.pool.sentClaim(args.gasPrice);
    } catch {}

    setClaiming(false);
  };

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  return (
    <>
      <section className={cn(s.card, className)}>
        <header className={s.header}>
          <IconBubble
            name={meta?.icon}
            bubbleName="bond-circle-token"
            secondBubbleName={market?.icon}
            width={36}
            height={36}
            className="mr-16"
          />
          <Text type="p1" weight="semibold">
            {rewardPool.poolToken.symbol}
          </Text>
          {ended && <div className={s.endedLabel}>ENDED</div>}
        </header>
        {!ended && (
          <div className={s.tabs}>
            <button
              type="button"
              className={cn(s.tab, { [s.active]: activeTab === 'pool' })}
              onClick={() => setActiveTab('pool')}>
              Pool statistics
            </button>
            <button
              type="button"
              className={cn(s.tab, { [s.active]: activeTab === 'my' })}
              disabled={!wallet.isActive}
              onClick={() => setActiveTab('my')}>
              My statistics
            </button>
          </div>
        )}
        {ended && (
          <div>
            <p>
              The $BOND staking pool ended after 12 epochs on Feb 08, 00:00 UTC. Deposits are now disabled, but you can
              still withdraw your tokens and collect any unclaimed rewards. To continue to stake $BOND
            </p>
            <a href="/">Go to governance staking</a>
          </div>
        )}
        {!ended && activeTab === 'pool' && (
          <dl>
            <div className={s.defRow}>
              <dt>APR</dt>
              <dd>{formatPercent(getHumanValue(rewardPool.pool.apr, rewardPool.rewardToken.decimals))}</dd>
            </div>
            <div className={s.defRow}>
              <dt>Daily reward</dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatBigValue(getHumanValue(rewardPool.pool.dailyReward, rewardPool.rewardToken.decimals))}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>Reward left</dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatBigValue(getHumanValue(rewardPool.pool.rewardLeft, rewardPool.rewardToken.decimals))}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>Pool balance</dt>
              <dd>
                <IconBubble
                  name={meta?.icon}
                  bubbleName="bond-circle-token"
                  secondBubbleName={market?.icon}
                  width={16}
                  height={16}
                  className="mr-8"
                />
                {formatBigValue(
                  getHumanValue(rewardPool.pool.poolSize, rewardPool.poolToken.decimals)?.multipliedBy(1),
                )}
              </dd>
            </div>
          </dl>
        )}
        {!ended && activeTab === 'my' && wallet.isActive && (
          <dl>
            <div className={s.defRow}>
              <dt>APR</dt>
              <dd>{formatPercent(getHumanValue(rewardPool.pool.apr, rewardPool.rewardToken.decimals))}</dd>
            </div>
            <div className={s.defRow}>
              <dt>Your daily reward</dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatBigValue(getHumanValue(rewardPool.pool.myDailyReward, rewardPool.rewardToken.decimals))}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>Your current reward</dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatBigValue(getHumanValue(rewardPool.pool.toClaim, rewardPool.rewardToken.decimals))}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>Staked balance</dt>
              <dd>
                <IconBubble
                  name={meta?.icon}
                  bubbleName="bond-circle-token"
                  secondBubbleName={market?.icon}
                  width={16}
                  height={16}
                  className="mr-8"
                />
                {formatToken(getHumanValue(rewardPool.pool.balance, rewardPool.poolToken.decimals), {
                  decimals: 4,
                })}
              </dd>
            </div>
          </dl>
        )}
        <footer className={s.footer}>
          <Link
            className="button-primary full-width"
            to={`/smart-yield/pool?m=${rewardPool.protocolId}&t=${rewardPool.underlyingSymbol}`}>
            View pool
          </Link>
          {wallet.isActive && activeTab === 'my' && (
            <button
              type="button"
              className="button-ghost"
              disabled={!rewardPool.pool.toClaim?.gt(ZERO_BIG_NUMBER)}
              onClick={handleClaim}>
              {claiming && <Spin type="circle" />}
              Claim
            </button>
          )}
        </footer>
      </section>
      {confirmClaimVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                {formatBigValue(getHumanValue(rewardPool.pool.toClaim, rewardPool.rewardToken.decimals))}
              </Text>
              <Icon name="bond-circle-token" width={32} height={32} />
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirmClaim(false)}
          onConfirm={confirmClaimPoolReward}
        />
      )}
    </>
  );
};
