import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { formatBigValue, formatPercent, getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { SYRewardPool } from 'modules/smart-yield/providers/reward-pools-provider';

import s from './s.module.scss';

export type PoolsCardProps = {
  pool: SYRewardPool;
  ended?: boolean;
  className?: string;
};

export const PoolsCard: React.FC<PoolsCardProps> = ({ pool, ended = false, className }) => {
  const [activeTab, setActiveTab] = useState<'pool' | 'my'>('pool');

  let body;

  if (ended) {
    body = (
      <div>
        <p>
          The $BOND staking pool ended after 12 epochs on Feb 08, 00:00 UTC. Deposits are now disabled, but you can
          still withdraw your tokens and collect any unclaimed rewards. To continue to stake $BOND
        </p>
        <a href="/">Go to governance staking</a>
      </div>
    );
  } else if (activeTab === 'pool') {
    body = (
      <dl>
        <div className={s.defRow}>
          <dt>APR</dt>
          <dd>{formatPercent(getHumanValue(pool.pool.apr, pool.rewardToken.decimals))}</dd>
        </div>
        <div className={s.defRow}>
          <dt>Daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {formatBigValue(getHumanValue(pool.pool.dailyReward, pool.rewardToken.decimals))}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Reward left</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {formatBigValue(getHumanValue(pool.pool.rewardLeft, pool.rewardToken.decimals))}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Pool balance</dt>
          <dd>{formatBigValue(getHumanValue(pool.pool.poolSize, pool.poolToken.decimals)?.multipliedBy(1))}</dd>
        </div>
      </dl>
    );
  } else if (activeTab === 'my') {
    body = (
      <dl>
        <div className={s.defRow}>
          <dt>APR</dt>
          <dd>{formatPercent(getHumanValue(pool.pool.apr, pool.rewardToken.decimals))}</dd>
        </div>
        <div className={s.defRow}>
          <dt>Your daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {formatBigValue(getHumanValue(pool.pool.myDailyReward, pool.rewardToken.decimals))}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Your current reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {formatBigValue(getHumanValue(pool.pool.toClaim, pool.rewardToken.decimals))}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Your balance</dt>
          <dd>{formatBigValue(getHumanValue(pool.pool.balance, pool.rewardToken.decimals))}</dd>
        </div>
      </dl>
    );
  }

  function handleClaim() {
    return pool.pool.sentClaim(1);
  }

  return (
    <section className={cn(s.card, className)}>
      <header className={s.header}>
        <IconBubble
          name="usdc-token"
          bubbleName="bond-circle-token"
          secondBubbleName="compound"
          width={36}
          height={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold">
          {pool.poolToken.symbol}
        </Text>
        {ended && <div className={s.endedLabel}>ENDED</div>}
      </header>
      {!ended && (
        <div className={s.tabs}>
          <button
            className={cn(s.tab, { [s.active]: activeTab === 'pool' })}
            type="button"
            onClick={() => setActiveTab('pool')}>
            Pool statistics
          </button>
          <button
            className={cn(s.tab, { [s.active]: activeTab === 'my' })}
            type="button"
            onClick={() => setActiveTab('my')}>
            My statistics
          </button>
        </div>
      )}
      {body}
      <footer className={s.footer}>
        <Link className="button-primary" to={`/smart-yield/pool?m=${pool.protocolId}&t=${pool.underlyingSymbol}`}>
          View pool
        </Link>
        <button className="button-ghost" type="button" onClick={handleClaim}>
          Claim
        </button>
      </footer>
    </section>
  );
};
