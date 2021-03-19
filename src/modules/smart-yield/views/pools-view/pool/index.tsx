import { Link } from 'react-router-dom';

import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';

import Stake from './stake';
import Statistics from './statistics';
import Transactions from './transactions';

import s from './s.module.scss';

const Pool: React.FC = () => {
  return (
    <>
      <div className="mb-16">
        <Link to="/smart-yield/pools" className="button-text" style={{ display: 'inline-flex' }}>
          <Icon name="left-arrow" width={14} height={12} className="mr-12" color="inherit" />
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-32">
        <IconBubble
          name="usdc-token"
          bubbleName="bond-circle-token"
          secondBubbleName="compound"
          width={36}
          height={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold" color="primary">
          bbcUSDC
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Pool balance</dt>
            <dd>$ 213,112.1178</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APY</dt>
            <dd>69.420%</dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Daily rewards</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              2,113
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>Rewards left</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              16,117
            </dd>
          </div>
        </dl>
      </div>
      <div className={s.stakeStatisticsContainer}>
        <Stake className={s.stake} />
        <Statistics className={s.statistics} />
      </div>
      <Transactions />
    </>
  );
};

export default Pool;
