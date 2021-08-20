import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { HorizontalMenu } from 'components/custom/tabs';
import { Icon } from 'components/icon';
import SeAPIProvider from 'modules/smart-exposure/api';
import { SEPoolsProvider } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { PoolActionsView } from './views/pool-actions-view';

const PoolsView = lazy(() => import(/* webpackChunkName: "pools-view" */ './views/pools-view'));
const TrancheView = lazy(() => import(/* webpackChunkName: "tranche-view" */ './views/tranche-view'));

const PortfolioView = lazy(() => import(/* webpackChunkName: "portfolio-view" */ './views/portfolio-view'));

const SmartExposureView: React.FC = () => {
  const wallet = useWallet();

  const tabs = [
    {
      children: (
        <>
          <Icon name="pairs" className="mr-8" size={24} /> Pools
        </>
      ),
      to: '/smart-exposure/pools',
    },
    {
      children: (
        <>
          <Icon name="wallet" className="mr-8" size={24} /> Portfolio
        </>
      ),
      to: '/smart-exposure/portfolio',
      disabled: !wallet.account,
    },
  ];

  return (
    <>
      <HorizontalMenu tabs={tabs} />
      <div className="content-container-fix content-container">
        <SeAPIProvider>
          <SEPoolsProvider>
            <Suspense fallback={<AntdSpin />}>
              <Switch>
                <Route path="/smart-exposure/pools" exact>
                  <PoolsView />
                </Route>
                <Route path="/smart-exposure/pools/:pool/:tranche" exact>
                  <TrancheView />
                </Route>
                <Route path="/smart-exposure/pools/:pool/:tranche/:path(deposit|withdraw|change-tranche)" exact>
                  <PoolActionsView />
                </Route>
                <Route path="/smart-exposure/portfolio" exact>
                  <PortfolioView />
                </Route>
                <Redirect to="/smart-exposure/pools" />
              </Switch>
            </Suspense>
          </SEPoolsProvider>
        </SeAPIProvider>
      </div>
    </>
  );
};

export default SmartExposureView;
