import React, { Suspense, lazy } from 'react';
import { NavLinkProps, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { NavTabs } from 'components/custom/tabs';
import { useWallet } from 'wallets/wallet';

import PoolProvider from './providers/pool-provider';
import PoolsProvider from './providers/pools-provider';
import RewardPoolProvider from './providers/reward-pool-provider';
import RewardPoolsProvider from './providers/reward-pools-provider';

import s from './s.module.scss';

const MarketsView = lazy(() => import('./views/markets-view'));
const StatsView = lazy(() => import('./views/stats-view'));
const PortfolioView = lazy(() => import('./views/portfolio-view'));
const DepositView = lazy(() => import('./views/deposit-view'));
const WithdrawView = lazy(() => import('./views/withdraw-view'));
const PoolsView = lazy(() => import('./views/pools-view'));
const PoolView = lazy(() => import('./views/pool-view'));

type SmartYieldViewParams = {
  vt: string;
};

const SmartYieldView: React.FC = () => {
  const {
    params: { vt = 'markets' },
  } = useRouteMatch<SmartYieldViewParams>();
  const wallet = useWallet();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  React.useEffect(() => {
    if (['stats', 'deposit'].includes(vt)) {
      setActiveTab('markets');
      return;
    }

    if (vt === 'withdraw') {
      setActiveTab('portfolio');
      return;
    }

    if (vt === 'pool') {
      setActiveTab('pools');
      return;
    }

    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  const tabs = [
    {
      children: (
        <>
          <Icon name="bar-charts-outlined" className="mr-8" /> Markets
        </>
      ),
      to: '/smart-yield/markets',
      isActive: (match, location) => {
        return (
          match ||
          location.pathname.startsWith('/smart-yield/stats') ||
          location.pathname.startsWith('/smart-yield/deposit')
        );
      },
    } as NavLinkProps,
    {
      children: (
        <>
          <Icon name="wallet-outlined" className="mr-8" /> Portfolio
        </>
      ),
      to: '/smart-yield/portfolio',
      isActive: (match, location) => {
        return match || location.pathname.startsWith('/smart-yield/withdraw');
      },
      disabled: !wallet.account,
    } as NavLinkProps,
    {
      children: (
        <>
          <Icon name="savings-outlined" className="mr-8" /> Pools
        </>
      ),
      to: '/smart-yield/pools',
    },
  ];

  return (
    <>
      <NavTabs tabs={tabs} className={s.tabs} />
      <div className="content-container-fix content-container">
        <Suspense fallback={<AntdSpin />}>
          <Switch>
            <Route
              path="/smart-yield/:path(markets|portfolio)"
              render={({ location }) => (
                <PoolsProvider>
                  <Route path="/smart-yield/markets" exact component={MarketsView} />
                  {wallet.initialized && (
                    <>
                      {wallet.isActive ? (
                        <Route path="/smart-yield/portfolio" component={PortfolioView} />
                      ) : (
                        <Redirect to={{ pathname: '/smart-yield/markets', search: location.search }} />
                      )}
                    </>
                  )}
                </PoolsProvider>
              )}
            />
            <Route
              path="/smart-yield/:path(deposit|withdraw)"
              render={() =>
                wallet.initialized && (
                  <>
                    {wallet.isActive ? (
                      <PoolProvider>
                        <Route path="/smart-yield/deposit" component={DepositView} />
                        <Route path="/smart-yield/withdraw" component={WithdrawView} />
                      </PoolProvider>
                    ) : (
                      <Redirect to="/smart-yield/markets" />
                    )}
                  </>
                )
              }
            />
            <Route path="/smart-yield/stats" exact>
              <PoolProvider>
                <StatsView />
              </PoolProvider>
            </Route>
            <Route
              path="/smart-yield/pools"
              exact
              render={() => (
                <RewardPoolsProvider>
                  <PoolsView />
                </RewardPoolsProvider>
              )}
            />
            <Route
              path="/smart-yield/pool"
              render={() => (
                <RewardPoolProvider>
                  <PoolView />
                </RewardPoolProvider>
              )}
            />
            <Redirect to="/smart-yield/markets" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartYieldView;
