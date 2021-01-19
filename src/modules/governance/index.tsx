import React from 'react';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Grid from 'components/custom/grid';
import LayoutHeader from 'layout/components/layout-header';
import VotingHeader from './components/voting-header';
import OverviewView from './views/overview-view';
import WalletView from './views/wallets-view';
import ProposalsView from './views/proposals-view';
import ProposalCreateView from './views/proposal-create-view';
import ProposalDetailView from './views/proposal-detail-view';

import Tabs from 'components/antd/tabs';

import { ReactComponent as OverviewSvg } from 'resources/svg/icons/nav-overview.svg';
import { ReactComponent as WalletSvg } from 'resources/svg/icons/nav-wallet.svg';
import { ReactComponent as ProposalsSvg } from 'resources/svg/icons/nav-proposals.svg';
import { ReactComponent as DiscussionsSvg } from 'resources/svg/icons/nav-discussions.svg';

import s from './styles.module.scss';

type GovernanceViewParams = {
  vt: string;
};

const GovernanceView: React.FunctionComponent = () => {
  const history = useHistory();
  const { params: { vt = 'overview' } } = useRouteMatch<GovernanceViewParams>();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/${tabKey}`);
  }

  React.useEffect(() => {
    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt])

  return (
    <Grid flow="row">
      <LayoutHeader title="Governance" />
      <VotingHeader />
      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={handleTabChange}>
        <Tabs.Tab
          key="overview"
          tab={<><OverviewSvg /> Overview</>} />
        <Tabs.Tab
          key="wallet"
          tab={<><WalletSvg /> Wallet</>} />
        <Tabs.Tab
          key="proposals"
          tab={<><ProposalsSvg /> Proposals</>} />
        <Tabs.Tab
          key="discussions"
          disabled
          tab={<><DiscussionsSvg /> Discussions</>}>
        </Tabs.Tab>
      </Tabs>
      <div className={s.content}>
        <Switch>
          <Route path="/governance/overview" exact component={OverviewView} />
          <Route path="/governance/wallet" exact component={WalletView} />
          <Route path="/governance/proposals" exact component={ProposalsView} />
          <Route path="/governance/proposals/create" exact component={ProposalCreateView} />
          <Route path="/governance/proposals/:id(\d+)" exact component={ProposalDetailView} />
          <Redirect from="/governance" to="/governance/overview" />
        </Switch>
      </div>
    </Grid>
  );
};

export default GovernanceView;
