import React from 'react';
import { useHistory } from 'react-router';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

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

  return (
    <div className={s.container}>
      <LayoutHeader title="Governance" />
      <VotingHeader />
      <Tabs
        className={s.tabs}
        defaultActiveKey={activeTab}
        destroyInactiveTabPane
        onChange={handleTabChange}
      >
        <Tabs.Tab
          key="overview"
          className={s.tab}
          tab={<><OverviewSvg /> Overview</>}>
          <OverviewView />
        </Tabs.Tab>
        <Tabs.Tab
          key="wallet"
          className={s.tab}
          tab={<><WalletSvg /> Wallet</>}>
          <WalletView />
        </Tabs.Tab>
        <Tabs.Tab
          key="proposals"
          className={s.tab}
          tab={<><ProposalsSvg /> Proposals</>}>
          <Switch>
            <Route path="/governance/proposals" exact component={ProposalsView} />
            <Route path="/governance/proposals/create" exact component={ProposalCreateView} />
            <Route path="/governance/proposals/:id(\d+)" exact component={ProposalDetailView} />
          </Switch>
        </Tabs.Tab>
        <Tabs.Tab
          key="discussions"
          className={s.tab}
          tab={<><DiscussionsSvg /> Discussions</>}>
          <ProposalsView />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default GovernanceView;
