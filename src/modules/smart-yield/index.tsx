import React from "react";
import { useHistory } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import LayoutHeader from 'layout/components/layout-header';
import MarketsView from './views/markets-view';
import SelectTrancheView from './views/select-tranche-view';
import JuniorTrancheView from './views/junior-tranche-view';
import SeniorTrancheView from './views/senior-tranche-view';
import PortfolioView from './views/portfolio-view';

import s from './s.module.scss';

type GovernanceViewParams = {
  vt: string;
};

const SmartYieldView: React.FunctionComponent = () => {
  const history = useHistory();
  const { params: { vt = 'deposit' } } = useRouteMatch<GovernanceViewParams>();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/smart-yield/${tabKey}`);
  }

  React.useEffect(() => {
    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  return (
    <Grid flow="row">
      <LayoutHeader title="Smart Yield" />

      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={handleTabChange}>
        <Tabs.Tab
          key="deposit"
          tab={<><Icons name="bar-charts-outlined" /> Overview</>} />
        <Tabs.Tab
          key="portfolio"
          tab={<><Icons name="wallet-outlined" /> Portfolio</>} />
      </Tabs>
      <div className={s.view}>
        <Switch>
          <Route path="/smart-yield/deposit" exact component={MarketsView} />
          <Route path="/smart-yield/deposit/:id" exact component={SelectTrancheView} />
          <Route path="/smart-yield/deposit/:id/senior" component={SeniorTrancheView} />
          <Route path="/smart-yield/deposit/:id/junior" component={JuniorTrancheView} />
          <Route path="/smart-yield/portfolio" component={PortfolioView} />
          <Redirect from="/smart-yield" to="/smart-yield/deposit" />
        </Switch>
      </div>
    </Grid>
  );
};

export default SmartYieldView;
