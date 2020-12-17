import React from 'react';

import Tabs from 'components/tabs';
import WalletDepositView from 'views/voting/components/wallet-deposit-view';
import WalletLockView from 'views/voting/components/wallet-lock-view';
import WalletDelegateView from 'views/voting/components/wallet-delegate-view';
import WalletWithdrawView from 'views/voting/components/wallet-withdraw-view';

import s from './styles.module.scss';

export type WalletViewProps = {};

const WalletView: React.FunctionComponent<WalletViewProps> = props => {
  const [activeTab, setActiveTab] = React.useState<string>('deposit');

  return (
    <div className={s.component}>
      <div className={s.header}>Wallet</div>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={setActiveTab}
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
