import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Icons from 'components/custom/icon';

import PoolsProvider from './providers/pools-provider';
import PoolProvider from './providers/pool-provider';
import DepositView from './views/deposit-view';
import OverviewView from './views/overview-view';
import PortfolioView from './views/portfolio-view';
import WithdrawView from './views/withdraw-view';

import s from './s.module.scss';
import { useWallet } from 'wallets/wallet';

type SmartYieldViewParams = {
  vt: string;
};

const SmartYieldView: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const {
    params: { vt = 'overview' },
  } = useRouteMatch<SmartYieldViewParams>();
  const wallet = useWallet();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/smart-yield/${tabKey}`);
  }

  React.useEffect(() => {
    if (vt === 'deposit') {
      setActiveTab('overview');
      return;
    } else if (vt === 'withdraw') {
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
          key="overview"
          tab={
            <>
              <Icons name="bar-charts-outlined" /> Overview
            </>
          }
        />
        <Tabs.Tab
          key="portfolio"
          disabled={!wallet.account}
          tab={
            <>
              <Icons name="wallet-outlined" /> Portfolio
            </>
          }
        />
      </Tabs>
      <div className="content-container">
        <Switch>
          <Route
            path="/smart-yield/:path(overview|portfolio)"
            render={() => (
              <PoolsProvider>
                <Route path="/smart-yield/overview" exact component={OverviewView} />
                <Route path="/smart-yield/portfolio" component={PortfolioView} />
              </PoolsProvider>
            )}
          />
          <Route
            path="/smart-yield/:path(deposit|withdraw)"
            render={() => {
              const urlQuery = new URLSearchParams(location.search);
              const market = decodeURIComponent(urlQuery.get('m') ?? '');
              const token = decodeURIComponent(urlQuery.get('t') ?? '');

              return (
                <PoolProvider market={market} token={token}>
                  <Route path="/smart-yield/deposit" component={DepositView} />
                  <Route path="/smart-yield/withdraw" component={WithdrawView} />
                </PoolProvider>
              );
            }}
          />
          <Redirect to="/smart-yield/overview" />
        </Switch>
      </div>
    </>
  );
};

export default SmartYieldView;
