import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useWallet } from 'wallets/walletProvider';

import DAOProvider from './components/dao-provider';
import VotingHeader from './components/voting-header';
import OverviewView from './views/overview-view';
import ProposalCreateView from './views/proposal-create-view';
import ProposalDetailView from './views/proposal-detail-view';
import ProposalsView from './views/proposals-view';
import TreasuryView from './views/treasury-view';
import WalletView from './views/wallets-view';

import s from './s.module.scss';

type GovernanceViewParams = {
  vt: string;
};

const GovernanceViewInternal: React.FC = () => {
  const history = useHistory();
  const {
    params: { vt = 'overview' },
  } = useRouteMatch<GovernanceViewParams>();

  const wallet = useWallet();

  const [activeTab, setActiveTab] = React.useState<string>(vt);

  function handleTabChange(tabKey: string) {
    if (tabKey) {
      setActiveTab(tabKey);
      history.push(`/governance/${tabKey}`);
    }
  }

  React.useEffect(() => {
    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  return (
    <Grid flow="row">
      {wallet.account && <VotingHeader />}

      <Tabs className={s.tabs} activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.Tab
          key="overview"
          tab={
            <>
              <Icon name="bar-charts-outlined" /> Overview
            </>
          }
        />
        <Tabs.Tab
          key="wallet"
          disabled={!wallet.account}
          tab={
            <>
              <Icon name="wallet-outlined" /> Wallet
            </>
          }
        />
        <Tabs.Tab
          key="proposals"
          tab={
            <>
              <Icon name="proposal-outlined" /> Proposals
            </>
          }
        />
        <Tabs.Tab
          key="treasury"
          tab={
            <>
              <Icon name="treasury-outlined" /> Treasury
            </>
          }
        />
        <Tabs.Tab
          key="signal"
          tab={
            <ExternalLink href="https://signal.barnbridge.com/" style={{ color: 'inherit' }}>
              <Grid flow="col" gap={8} align="center">
                <Icon name="chats-outlined" />
                <Text type="p1" weight="semibold">
                  Signal
                </Text>
                <Icon name="arrow-top-right" width={8} height={8} style={{ alignSelf: 'start', color: 'inherit' }} />
              </Grid>
            </ExternalLink>
          }
        />
        <Tabs.Tab
          key="forum"
          tab={
            <ExternalLink href="https://forum.barnbridge.com/" style={{ color: 'inherit' }}>
              <Grid flow="col" gap={8} align="center">
                <Icon name="forum-outlined" />
                <Text type="p1" weight="semibold">
                  Forum
                </Text>
                <Icon name="arrow-top-right" width={8} height={8} style={{ alignSelf: 'start', color: 'inherit' }} />
              </Grid>
            </ExternalLink>
          }
        />
      </Tabs>
      <div className="content-container-fix content-container">
        <Switch>
          <Route path="/governance/overview" exact component={OverviewView} />
          <Route path="/governance/wallet/:action(\w+)" component={WalletView} />
          <Redirect from="/governance/wallet" to="/governance/wallet/deposit" />
          <Route path="/governance/treasury/:tab(\w+)" exact component={TreasuryView} />
          <Redirect from="/governance/treasury" to="/governance/treasury/holdings" />
          <Route path="/governance/proposals/create" exact component={ProposalCreateView} />
          <Route path="/governance/proposals/:id(\d+)" exact component={ProposalDetailView} />
          <Route path="/governance/proposals" exact component={ProposalsView} />
          <Redirect from="/governance" to="/governance/overview" />
        </Switch>
      </div>
    </Grid>
  );
};

const GovernanceView: React.FC = props => {
  return (
    <DAOProvider>
      <GovernanceViewInternal>{props.children}</GovernanceViewInternal>
    </DAOProvider>
  );
};

export default GovernanceView;
