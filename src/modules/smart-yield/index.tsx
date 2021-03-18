import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Tabs from 'components/antd/tabs';
import Icon from 'components/custom/icon';
import { useWallet } from 'wallets/wallet';

import PoolProvider from './providers/pool-provider';
import PoolsProvider from './providers/pools-provider';
import RewardPoolProvider from './providers/reward-pool-provider';
import RewardPoolsProvider from './providers/reward-pools-provider';

import s from './s.module.scss';

const MarketsView = lazy(() => import('./views/markets-view'));
const PortfolioView = lazy(() => import('./views/portfolio-view'));
const DepositView = lazy(() => import('./views/deposit-view'));
const WithdrawView = lazy(() => import('./views/withdraw-view'));
const RewardPoolsView = lazy(() => import('./views/reward-pools-view'));
const RewardPoolView = lazy(() => import('./views/reward-pool-view'));

type SmartYieldViewParams = {
  vt: string;
};

const SmartYieldView: React.FC = () => {
  const history = useHistory();
  const {
    params: { vt = 'markets' },
  } = useRouteMatch<SmartYieldViewParams>();
  const wallet = useWallet();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/smart-yield/${tabKey}`);
  }

  React.useEffect(() => {
    if (vt === 'deposit') {
      setActiveTab('markets');
      return;
    }
    if (vt === 'withdraw') {
      setActiveTab('portfolio');
      return;
    }

    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  return (
    <>
      <Tabs className={s.tabs} activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.Tab
          key="markets"
          tab={
            <>
              <Icon name="bar-charts-outlined" /> Markets
            </>
          }
        />
        <Tabs.Tab
          key="pools"
          disabled={!wallet.account}
          tab={
            <>
              <Icon name="savings-outlined" /> Pools
            </>
          }
        />
        <Tabs.Tab
          key="portfolio"
          disabled={!wallet.account}
          tab={
            <>
              <Icon name="wallet-outlined" /> Portfolio
            </>
          }
        />
      </Tabs>
      <div className="content-container">
        <Suspense fallback={<AntdSpin />}>
          <Switch>
            <Route
              path="/smart-yield/:path(markets|portfolio)"
              render={() => (
                <PoolsProvider>
                  <Route path="/smart-yield/markets" exact component={MarketsView} />
                  {wallet.initialized && (
                    <>
                      {wallet.isActive ? (
                        <Route path="/smart-yield/portfolio" component={PortfolioView} />
                      ) : (
                        <Redirect to="/smart-yield/markets" />
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
            <Route
              path="/smart-yield/pools"
              exact
              render={() => (
                <RewardPoolsProvider>
                  <RewardPoolsView />
                </RewardPoolsProvider>
              )}
            />
            <Route
              path="/smart-yield/pools/:poolAddress"
              render={({ match: { params } }: RouteComponentProps<{ poolAddress: string }>) => (
                <RewardPoolProvider poolAddress={params.poolAddress}>
                  <RewardPoolView />
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
