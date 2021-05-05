import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { ZERO_BIG_NUMBER, formatPercent, formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Hint, Text } from 'components/custom/typography';
import { BondToken } from 'components/providers/known-tokens-provider';
import { Markets, Pools } from 'modules/smart-yield/api';
import { SYRewardPool } from 'modules/smart-yield/providers/reward-pools-provider';
import { useWallet } from 'wallets/wallet';

import s from 'modules/smart-yield/views/pools-view/pool-card/s.module.scss';

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
    rewardPool.pool.loadClaim();
    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await rewardPool.pool.sendClaim(args.gasPrice);
    } catch {}

    setClaiming(false);
  };

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  const apr = React.useMemo(() => {
    const { poolSize, dailyReward } = rewardPool.pool;

    if (!poolSize || !dailyReward) {
      return undefined;
    }

    const jTokenPrice = rewardPool.poolToken.price ?? 1;

    const yearlyReward = dailyReward
      .dividedBy(10 ** BONDTokenMeta.decimals)
      .multipliedBy(BondToken.price ?? 1)
      .multipliedBy(365);
    const poolBalance = poolSize
      .dividedBy(10 ** (rewardPool.poolToken.decimals ?? 0))
      .multipliedBy(jTokenPrice)
      .multipliedBy(1);

    if (poolBalance.isEqualTo(ZERO_BIG_NUMBER)) {
      return ZERO_BIG_NUMBER;
    }

    return yearlyReward.dividedBy(poolBalance);
  }, [rewardPool.pool.poolSize, rewardPool.pool.dailyReward, BondToken.price]);

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
            <div className={cn(s.tabSelection, activeTab === 'my' && s.toggled)} />
            <button
              type="button"
              className={cn(s.tab, activeTab === 'pool' && s.active)}
              onClick={() => setActiveTab('pool')}>
              Pool statistics
            </button>
            <button
              type="button"
              className={cn(s.tab, activeTab === 'my' && s.active)}
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
              <dd>{formatPercent(apr)}</dd>
            </div>
            <div className={s.defRow}>
              <dt>
                <Hint text="This number shows the $BOND token rewards distributed per day.">Daily reward</Hint>
              </dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatToken(rewardPool.pool.dailyReward, {
                  scale: rewardPool.rewardToken.decimals,
                }) ?? '-'}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>
                <Hint text="This number shows the $BOND token rewards remaining.">Reward left</Hint>
              </dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatToken(rewardPool.pool.rewardLeft, {
                  scale: rewardPool.rewardToken.decimals,
                }) ?? '-'}
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
                {formatToken(rewardPool.pool.poolSize, {
                  scale: rewardPool.poolToken.decimals,
                }) ?? '-'}
              </dd>
            </div>
          </dl>
        )}
        {!ended && activeTab === 'my' && wallet.isActive && (
          <dl>
            <div className={s.defRow}>
              <dt>APR</dt>
              <dd>{formatPercent(apr)}</dd>
            </div>
            <div className={s.defRow}>
              <dt>
                <Hint text="This number shows the $BOND rewards you would potentially be able to harvest daily, but is subject to change - in case more users deposit, or you withdraw some of your stake.">
                  Your daily reward
                </Hint>
              </dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatToken(rewardPool.pool.myDailyReward, {
                  scale: rewardPool.rewardToken.decimals,
                }) ?? '-'}
              </dd>
            </div>
            <div className={s.defRow}>
              <dt>Your current reward</dt>
              <dd>
                <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
                {formatToken(rewardPool.pool.toClaim, {
                  scale: rewardPool.rewardToken.decimals,
                }) ?? '-'}
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
                {formatToken(rewardPool.pool.balance, {
                  scale: rewardPool.poolToken.decimals,
                }) ?? '-'}
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
                {formatToken(rewardPool.pool.toClaim, {
                  scale: rewardPool.rewardToken.decimals,
                }) ?? '-'}
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
