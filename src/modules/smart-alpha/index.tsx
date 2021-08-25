import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Spinner } from 'components/custom/spinner';
import { HorizontalMenu } from 'components/custom/tabs';
import { Icon } from 'components/icon';
import { useWallet } from 'wallets/walletProvider';

// import { isDevelopmentMode, isProductionMode } from 'utils';

const PoolsView = lazy(() => import(/* webpackChunkName: "sa-pools-view" */ './views/pools-view'));
const PoolView = lazy(() => import(/* webpackChunkName: "sa-pool-view" */ './views/pool-view'));
const DepositView = lazy(() => import(/* webpackChunkName: "sa-deposit-view" */ './views/deposit-view'));
const WithdrawView = lazy(() => import(/* webpackChunkName: "sa-withdraw-view" */ './views/withdraw-view'));
const PortfolioView = lazy(() => import(/* webpackChunkName: "sa-portfolio-view" */ './views/portfolio-view'));
const SimulateEpoch = lazy(() => import(/* webpackChunkName: "sa-simulate-epoch-view" */ './views/simulate-epoch'));
const Launch = lazy(() => import(/* webpackChunkName: "sa-simulate-epoch-view" */ './views/launch'));

const launchDate = new Date('2021-09-01');

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

  // if (new Date() < launchDate) {
  //   return (
  //     <div className="content-container-fix content-container">
  //       <Launch launchDate={launchDate} />
  //     </div>
  //   );
  // }

  return (
    <>
      <HorizontalMenu tabs={tabs} />
      <div className="content-container-fix content-container">
        <Suspense fallback={<Spinner />}>
          <Switch>
            {/* {isDevelopmentMode && ( */}
            <Route path="/smart-alpha" exact>
              <Launch launchDate={launchDate} />
            </Route>
            {/* )} */}
            <Route path="/smart-alpha/pools" exact>
              <PoolsView />
            </Route>
            <Route path="/smart-alpha/pools/:id" exact>
              <PoolView />
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit">
              <DepositView />
            </Route>
            <Route path="/smart-alpha/pools/:id/withdraw">
              <WithdrawView />
            </Route>
            <Route path="/smart-alpha/portfolio">
              <PortfolioView />
            </Route>
            <Route path="/smart-alpha/simulate-epoch">
              <SimulateEpoch />
            </Route>
            <Redirect to="/smart-alpha/pools" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartAlphaView;
