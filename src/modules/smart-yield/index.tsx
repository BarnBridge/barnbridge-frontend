import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Icons from 'components/custom/icon';
import SYPoolsProvider from 'modules/smart-yield/providers/sy-pools-provider';
import TokenPoolView from 'modules/smart-yield/views/token-pool-view';

import OverviewView from './views/overview-view';
import PortfolioView from './views/portfolio-view';

import { isValidAddress } from 'utils';

import s from './s.module.scss';

type SmartYieldViewParams = {
  vt: string;
};

const SmartYieldView: React.FC = () => {
  const history = useHistory();
  const {
    params: { vt = 'overview' },
  } = useRouteMatch<SmartYieldViewParams>();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/smart-yield/${tabKey}`);
  }

  React.useEffect(() => {
    if (isValidAddress(vt)) {
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
          tab={
            <>
              <Icons name="wallet-outlined" /> Portfolio
            </>
          }
        />
      </Tabs>
      <div className="content-container">
        <SYPoolsProvider>
          <Switch>
            <Route path="/smart-yield/overview" exact component={OverviewView} />
            <Route path="/smart-yield/portfolio" component={PortfolioView} />
            <Route path="/smart-yield/:address" component={TokenPoolView} />
            <Redirect to="/smart-yield/overview" />
          </Switch>
        </SYPoolsProvider>
      </div>
    </>
  );
};

export default SmartYieldView;
