import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import LayoutHeader from 'layout/components/layout-header';
import TokenPoolView from 'modules/smart-yield/views/token-pool-view';

import OverviewView from './views/markets-view';
import PortfolioView from './views/portfolio-view';

import { isValidAddress } from 'utils';

import s from './s.module.scss';

type SmartYieldViewParams = {
  vt: string;
};

const SmartYieldView: React.FunctionComponent = () => {
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
      setActiveTab('overview');
      return;
    }

    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  return (
    <Grid flow="row">
      <LayoutHeader title="Smart Yield" />

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
      <div className={s.view}>
        <Switch>
          <Route path="/smart-yield/overview" exact component={OverviewView} />
          <Route path="/smart-yield/portfolio" component={PortfolioView} />
          <Route path="/smart-yield/:address" component={TokenPoolView} />
          <Redirect to="/smart-yield/overview" />
        </Switch>
      </div>
    </Grid>
  );
};

export default SmartYieldView;
