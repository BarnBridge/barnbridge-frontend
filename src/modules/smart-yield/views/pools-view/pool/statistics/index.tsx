import cn from 'classnames';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const Statistics: React.FC<Props> = ({ className }) => {
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
          <dd>$ 2,000,000</dd>
        </div>
        <div className={s.def}>
          <dt>Staked balance</dt>
          <dd>$ 2,000,000</dd>
        </div>
        <div className={s.def}>
          <dt>My daily reward</dt>
          <dd>
            <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
            15,000.00
          </dd>
        </div>
      </dl>
      <footer className={s.footer}>
        <div>
          <div className={s.footerReward}>
            <Text type="h2" weight="bold" color="primary">
              32.0012
            </Text>
            <Icon name="bond-circle-token" width="24" height="24" style={{ marginLeft: 8 }} />
          </div>
          <Text type="small" weight="semibold" color="secondary">
            My current reward
          </Text>
        </div>
        <button type="button" className="button-primary ml-auto">
          Claim reward
        </button>
      </footer>
    </section>
  );
};

export default Statistics;
