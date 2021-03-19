import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

export type PoolsCardProps = {
  pool: {
    apy: string;
    daily: string;
    current: string;
    balance: string;
  };
  my: {
    apy: string;
    daily: string;
    current: string;
    balance: string;
  };
  ended?: boolean;
  className?: string;
};

export const PoolsCard: React.FC<PoolsCardProps> = ({ pool, my, ended = false, className }) => {
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
          <dt>APY</dt>
          <dd>{pool.apy}</dd>
        </div>
        <div className={s.defRow}>
          <dt>Daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {pool.daily}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Reward left</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {pool.current}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Pool balance</dt>
          <dd>{pool.balance}</dd>
        </div>
      </dl>
    );
  } else if (activeTab === 'my') {
    body = (
      <dl>
        <div className={s.defRow}>
          <dt>APY</dt>
          <dd>{my.apy}</dd>
        </div>
        <div className={s.defRow}>
          <dt>Daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {my.daily}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Reward left</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {my.current}
          </dd>
        </div>
        <div className={s.defRow}>
          <dt>Pool balance</dt>
          <dd>{my.balance}</dd>
        </div>
      </dl>
    );
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
          bbcUSDC
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
        <Link className="button-primary" to="/smart-yield/pools/1">
          View pool
        </Link>
        <button className="button-ghost" type="button">
          Claim
        </button>
      </footer>
    </section>
  );
};
