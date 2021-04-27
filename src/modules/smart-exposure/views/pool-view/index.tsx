import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';

import { TrancheDetails } from './details';
import { PriceTrend } from './trend';

import s from './s.module.scss';

const PoolView: React.FC = () => {
  const { pool } = useParams<{ pool: string }>();
  const location = useLocation();
  console.log({ pool });
  return (
    <>
      <div className="flex mb-16">
        <Link to="/smart-exposure/pairs" className="button-text">
          <Icon name="arrow-back" color="inherit" className="mr-8" />
          Tranches
        </Link>
      </div>
      <div className="flex mb-40">
        <div className="flex">
          <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" />
          <div>
            <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
            <div className="text-sm fw-semibold color-secondary">Wrapped Bitcoin / Ethereum</div>
          </div>
        </div>

        <div className="flex col-gap-24 ml-auto">
          <Link to={`${location.pathname}/deposit`} className="button-primary">
            Deposit
          </Link>
          <Link to={`${location.pathname}/withdraw`} className="button-ghost">
            Withdraw
          </Link>
          <button type="button" className="button-ghost-alt button-icon">
            <Icon name="vertical-dots" />
          </button>
        </div>
      </div>
      <div className={cn(s.trendDetailsRow, 'mb-32')}>
        <PriceTrend />
        <TrancheDetails />
      </div>
    </>
  );
};

export default PoolView;
