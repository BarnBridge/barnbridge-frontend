import cn from 'classnames';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const Statistics: React.FC<Props> = ({ className }) => {
  const { pool } = useRewardPool();

  function handleClaim() {
    return pool?.pool.sentClaim(1);
  }

  return (
    <section className={cn('card', s.statistics, className)}>
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          My statistics
        </Text>
      </header>
      <dl className={s.defs}>
        <div className={s.def}>
          <dt>Portfolio balance</dt>
          <dd>{formatBigValue(getHumanValue(pool?.poolToken.balance, pool?.poolToken.decimals))}</dd>
        </div>
        <div className={s.def}>
          <dt>Staked balance</dt>
          <dd>{formatBigValue(getHumanValue(pool?.pool.balance, pool?.poolToken.decimals))}</dd>
        </div>
        <div className={s.def}>
          <dt>My daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            {formatBigValue(getHumanValue(pool?.pool.myDailyReward, pool?.rewardToken.decimals))}
          </dd>
        </div>
      </dl>
      <footer className={s.footer}>
        <div>
          <div className={s.footerReward}>
            <Text type="h2" weight="bold" color="primary">
              {formatBigValue(getHumanValue(pool?.pool.toClaim, pool?.rewardToken.decimals))}
            </Text>
            <Icon name="bond-circle-token" width="24" height="24" style={{ marginLeft: 8 }} />
          </div>
          <Text type="small" weight="semibold" color="secondary">
            My current reward
          </Text>
        </div>
        <button type="button" className="button-primary ml-auto" onClick={handleClaim}>
          Claim reward
        </button>
      </footer>
    </section>
  );
};

export default Statistics;
