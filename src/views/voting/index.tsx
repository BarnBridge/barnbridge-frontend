import React from 'react';

import Tabs from 'components/tabs';
import VotingHeader from 'views/voting/components/voting-header';
import OverviewView from 'views/voting/components/overview-view';
import WalletView from 'views/voting/components/wallets-view';
import ProposalsView from 'views/voting/components/proposals-view';

import { ReactComponent as OverviewSvg } from 'resources/svg/overview.svg';
import { ReactComponent as WalletSvg } from 'resources/svg/wallet.svg';
import { ReactComponent as ProposalsSvg } from 'resources/svg/proposals.svg';

import s from './styles.module.scss';

const VotingView: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState<string>('overview');

  return (
    <div className={s.container}>
      <VotingHeader />
      <Tabs
        className={s.tabs}
        defaultActiveKey={activeTab}
        destroyInactiveTabPane
        onChange={setActiveTab}
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
          <ProposalsView />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default VotingView;
