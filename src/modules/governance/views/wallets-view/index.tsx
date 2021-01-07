import React from 'react';
import { useHistory } from 'react-router';
import { useRouteMatch } from 'react-router-dom';

import WalletDepositView from 'modules/governance/views/wallet-deposit-view';
import WalletLockView from 'modules/governance/views/wallet-lock-view';
import WalletDelegateView from 'modules/governance/views/wallet-delegate-view';
import WalletWithdrawView from 'modules/governance/views/wallet-withdraw-view';

import Tabs from 'components/antd/tabs';

import s from './styles.module.scss';

type WalletViewParams = {
  wt: string;
};

const WalletView: React.FunctionComponent = () => {
  const history = useHistory();
  const { params: { wt = 'deposit' } } = useRouteMatch<WalletViewParams>();
  const [activeTab, setActiveTab] = React.useState<string>(wt);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/wallet/${tabKey}`);
  }

  return (
    <div className={s.component}>
      <div className={s.header}>Wallet</div>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={handleTabChange}
      >
        <Tabs.Tab key="deposit" tab="Deposit">
          <WalletDepositView />
        </Tabs.Tab>
        <Tabs.Tab key="lock" tab="Lock">
          <WalletLockView />
        </Tabs.Tab>
        <Tabs.Tab key="delegate" tab="Delegate">
          <WalletDelegateView />
        </Tabs.Tab>
        <Tabs.Tab key="withdraw" tab="Withdraw">
          <WalletWithdrawView />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default WalletView;
