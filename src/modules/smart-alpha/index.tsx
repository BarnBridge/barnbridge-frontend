import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Spinner } from 'components/custom/spinner';
import { HorizontalMenu } from 'components/custom/tabs';
import { Icon } from 'components/icon';
import { useWallet } from 'wallets/walletProvider';

const MarketsView = lazy(() => import(/* webpackChunkName: "sa-markets-view" */ './views/markets-view'));
const MarketView = lazy(() => import(/* webpackChunkName: "sa-market-view" */ './views/market-view'));

const SmartAlphaView: React.FC = () => {
  const wallet = useWallet();

  const tabs = [
    {
      children: (
        <>
          <Icon name="overview" className="mr-8" size={24} /> Markets
        </>
      ),
      to: '/smart-alpha',
    },
    {
      children: (
        <>
          <Icon name="pools" className="mr-8" size={24} /> Pools
        </>
      ),
      to: '/smart-alpha/pools',
    },
    {
      children: (
        <>
          <Icon name="wallet" className="mr-8" size={24} /> Portfolio
        </>
      ),
      to: '/smart-alpha/portfolio',
      disabled: !wallet.account,
    },
  ];

  return (
    <>
      <HorizontalMenu tabs={tabs} />
      <div className="content-container-fix content-container">
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/smart-alpha" exact>
              <MarketsView />
            </Route>
            <Route path="/smart-alpha/markets/:id" exact>
              <MarketView />
            </Route>
            <Route path="/smart-alpha/pools">Pools</Route>
            <Route path="/smart-alpha/portfolio" exact>
              PortfolioView
            </Route>
            <Redirect to="/smart-alpha" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartAlphaView;
