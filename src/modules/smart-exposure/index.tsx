import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { NavTabs } from 'components/custom/tabs';
import SeAPIProvider from 'modules/smart-exposure/api';
import { SEPoolsProvider } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { PoolActionsView } from './views/pool-actions-view';

import s from './s.module.scss';

const PoolsView = lazy(() => import(/* webpackChunkName: "pools-view" */ './views/pools-view'));
const TrancheView = lazy(() => import(/* webpackChunkName: "tranche-view" */ './views/tranche-view'));

const PortfolioView = lazy(() => import(/* webpackChunkName: "portfolio-view" */ './views/portfolio-view'));

const SmartExposureView: React.FC = () => {
  const wallet = useWallet();

  const tabs = [
    {
      children: (
        <>
          <Icon name="finance" className="mr-8" /> Pools
        </>
      ),
      to: '/smart-exposure/pools',
    },
    {
      children: (
        <>
          <Icon name="wallet-outlined" className="mr-8" /> Portfolio
        </>
      ),
      to: '/smart-exposure/portfolio',
      disabled: !wallet.account,
    },
  ];

  return (
    <>
      <NavTabs tabs={tabs} className={s.tabs} />
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
