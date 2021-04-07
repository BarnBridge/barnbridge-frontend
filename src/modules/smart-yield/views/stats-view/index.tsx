import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Icon from 'components/custom/icon';
import { useWallet } from 'wallets/wallet';

import DepositHeader from '../deposit-view/deposit-header';
import ApyTrend from './apy';
import Liquidity from './liquidity';
import MarketDetails from './market';
import StatsTables from './tables';

import s from './s.module.scss';

const StatsView: React.FC = () => {
  const location = useLocation();
  const wallet = useWallet();

  const [market, token] = React.useMemo(() => {
    const urlQuery = new URLSearchParams(location.search);

    let marketStr = urlQuery.get('m') ?? undefined;

    if (marketStr) {
      marketStr = decodeURIComponent(marketStr);
    }

    let tokenStr = urlQuery.get('t') ?? undefined;

    if (tokenStr) {
      tokenStr = decodeURIComponent(tokenStr);
    }

    return [marketStr, tokenStr];
  }, [location.search]);

  return (
    <div className="container-limit">
      <div className="mb-16">
        <Link to="/smart-yield/markets" className="button-text">
          <Icon name="arrow-back" className="mr-8" color="inherit" />
          Markets
        </Link>
      </div>
      <div className="flex align-start mb-40">
        <DepositHeader />
        <Link
          to={{
            pathname: `/smart-yield/deposit`,
            search: `?m=${market}&t=${token}`,
          }}
          className="button-primary ml-auto"
          {...{ disabled: !wallet.isActive }}>
          Deposit
        </Link>
      </div>

      <div className={cn(s.apyMarketRow, 'mb-32')}>
        <ApyTrend />
        <MarketDetails />
      </div>
      <Liquidity className="mb-32" />
      <StatsTables />
    </div>
  );
};

export default StatsView;
