import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Spinner } from 'components/custom/spinner';
import { HorizontalMenu } from 'components/custom/tabs';
import { Icon } from 'components/icon';
import { useWallet } from 'wallets/walletProvider';

const PoolsView = lazy(() => import(/* webpackChunkName: "sa-markets-view" */ './views/pools-view'));
const MarketView = lazy(() => import(/* webpackChunkName: "sa-market-view" */ './views/pool-view'));
const DepositView = lazy(() => import(/* webpackChunkName: "sa-deposit-view" */ './views/deposit-view'));
const WithdrawView = lazy(() => import(/* webpackChunkName: "sa-withdraw-view" */ './views/withdraw-view'));

const SmartAlphaView: React.FC = () => {
  const wallet = useWallet();

  const tabs = [
    {
      children: (
        <>
          <Icon name="overview" className="mr-8" size={24} /> Pools
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
            <Route path="/smart-alpha/pools" exact>
              <PoolsView />
            </Route>
            <Route path="/smart-alpha/pools/:id" exact>
              <MarketView />
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit">
              <DepositView />
            </Route>
            <Route path="/smart-alpha/pools/:id/withdraw">
              <WithdrawView />
            </Route>
            <Route path="/smart-alpha/portfolio" exact>
              PortfolioView
            </Route>
            <Redirect to="/smart-alpha/pools" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartAlphaView;
