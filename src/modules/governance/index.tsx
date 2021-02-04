import React from 'react';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import LayoutHeader from 'layout/components/layout-header';
import DAOProvider, { useDAO } from './components/dao-provider';
import VotingHeader from './components/voting-header';
import OverviewView from './views/overview-view';
import WalletView from './views/wallets-view';
import ProposalsView from './views/proposals-view';
import ProposalCreateView from './views/proposal-create-view';
import ProposalDetailView from './views/proposal-detail-view';

import { useWallet } from 'wallets/wallet';

import s from './styles.module.scss';
import ExternalLink from '../../components/custom/externalLink';
import { Paragraph } from '../../components/custom/typography';

type GovernanceViewParams = {
  vt: string;
};

const GovernanceViewInternal: React.FunctionComponent = () => {
  const history = useHistory();
  const {
    params: { vt = 'overview' },
  } = useRouteMatch<GovernanceViewParams>();

  const wallet = useWallet();
  const dao = useDAO();

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
      <LayoutHeader title="Governance" />
      {wallet.account && <VotingHeader />}

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
          key="wallet"
          disabled={!wallet.account}
          tab={
            <>
              <Icons name="wallet-outlined" /> Wallet
            </>
          }
        />
        <Tabs.Tab
          key="proposals"
          tab={
            <>
              <Icons name="proposal-outlined" /> Proposals
            </>
          }
        />
        <Tabs.Tab
          key="signal"
          tab={
            <ExternalLink href="https://signal.barnbridge.com/">
              <Grid flow="col" gap={8} align="center">
                <Icons name="chats-outlined" />
                <Paragraph type="p1" semiBold color="grey500">Signal</Paragraph>
                <Icons name="arrow-top-right" width={8} height={8} style={{ alignSelf: 'start' }} />
              </Grid>
            </ExternalLink>
          }
        />
      </Tabs>
      <div className={s.view}>
        <Switch>
          <Route path="/governance/overview" exact component={OverviewView} />
          <Route path="/governance/wallet/:action(\w+)" component={WalletView} />
          <Redirect from="/governance/wallet" to="/governance/wallet/deposit" />
          <Route path="/governance/proposals/create" exact component={ProposalCreateView} />
          <Route path="/governance/proposals/:id(\d+)" exact component={ProposalDetailView} />
          <Route path="/governance/proposals" exact component={ProposalsView} />
          <Redirect from="/governance" to="/governance/overview" />
        </Switch>
      </div>
    </Grid>
  );
};

const GovernanceView: React.FunctionComponent = props => {
  return (
    <DAOProvider>
      <GovernanceViewInternal>{props.children}</GovernanceViewInternal>
    </DAOProvider>
  );
};

export default GovernanceView;
