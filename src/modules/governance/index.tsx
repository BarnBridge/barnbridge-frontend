import { useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Grid from 'components/custom/grid';
import { HorizontalMenu } from 'components/custom/tabs';
import { Icon } from 'components/icon';
import { useConfig } from 'components/providers/configProvider';
import DaoAPIProvider from 'modules/governance/api';
import { useWallet } from 'wallets/walletProvider';

import DAOProvider from './components/dao-provider';
import VotingHeader from './components/voting-header';
import OverviewView from './views/overview-view';
import PortfolioView from './views/portfolio-view';
import ProposalCreateView from './views/proposal-create-view';
import ProposalDetailView from './views/proposal-detail-view';
import ProposalsView from './views/proposals-view';
import TreasuryView from './views/treasury-view';

const GovernanceViewInternal: React.FC = () => {
  const wallet = useWallet();
  const { links } = useConfig();

  const tabs = useMemo(
    () => [
      {
        children: (
          <>
            <Icon name="overview" className="mr-8" size={24} /> Overview
          </>
        ),
        to: '/governance/overview',
      },
      {
        children: (
          <>
            <Icon name="wallet" className="mr-8" size={24} /> Portfolio
          </>
        ),
        to: '/governance/portfolio',
        disabled: !wallet.account,
      },
      {
        children: (
          <>
            <Icon name="proposals" className="mr-8" size={24} /> Proposals
          </>
        ),
        to: '/governance/proposals',
      },
      {
        children: (
          <>
            <Icon name="treasury" className="mr-8" size={24} /> Treasury
          </>
        ),
        to: '/governance/treasury',
      },
      {
        children: (
          <>
            <Icon name="signal" className="mr-8" size={24} /> Signal
          </>
        ),
        href: links.signal,
      },
      {
        children: (
          <>
            <Icon name="forum" className="mr-8" size={24} /> Forum
          </>
        ),
        href: links.forum,
      },
    ],
    [wallet.account],
  );

  return (
    <Grid flow="row">
      {wallet.account && <VotingHeader />}
      <HorizontalMenu tabs={tabs} />
      <div className="content-container-fix content-container">
        <Switch>
          <Route path="/governance/overview" exact component={OverviewView} />
          <Redirect exact from="/governance/portfolio" to="/governance/portfolio/deposit" />
          <Route path="/governance/portfolio/:action(\w+)" component={PortfolioView} />
          <Redirect exact from="/governance/treasury" to="/governance/treasury/holdings" />
          <Route path="/governance/treasury/:tab(\w+)" exact component={TreasuryView} />
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
    <DaoAPIProvider>
      <DAOProvider>
        <GovernanceViewInternal>{props.children}</GovernanceViewInternal>
      </DAOProvider>
    </DaoAPIProvider>
  );
};

export default GovernanceView;
