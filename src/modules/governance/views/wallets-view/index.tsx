import React from 'react';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import WalletDepositView from 'modules/governance/views/wallet-deposit-view';
import WalletLockView from 'modules/governance/views/wallet-lock-view';
import WalletDelegateView from 'modules/governance/views/wallet-delegate-view';
import WalletWithdrawView from 'modules/governance/views/wallet-withdraw-view';

import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import { Heading } from 'components/custom/typography';
import { useWallet } from 'wallets/wallet';

type WalletViewRouteParams = {
  action: string;
};

const WalletView: React.FunctionComponent = () => {
  const history = useHistory();
  const wallet = useWallet();
  const {
    params: { action = 'deposit' },
  } = useRouteMatch<WalletViewRouteParams>();
  const [activeTab, setActiveTab] = React.useState<string>(action);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/wallet/${tabKey}`);
  }

  React.useEffect(() => {
    if (action !== activeTab) {
      setActiveTab(action);
    }
  }, [action]);

  if (!wallet.initialized) {
    return null;
  }

  if (!wallet.isActive) {
    return (
      <Redirect to="/governance/overview" />
    );
  }

  return (
    <Grid flow="row" gap={32}>
      <Heading type="h1" bold color="grey900">
        Wallet
      </Heading>
      <Tabs activeKey={activeTab} simple onChange={handleTabChange}>
        <Tabs.Tab key="deposit" tab="Deposit" />
        <Tabs.Tab key="lock" tab="Lock" />
        <Tabs.Tab key="delegate" tab="Delegate" />
        <Tabs.Tab key="withdraw" tab="Withdraw" />
      </Tabs>
      <Switch>
        <Route path="/governance/wallet/deposit" exact component={WalletDepositView} />
        <Route path="/governance/wallet/lock" exact component={WalletLockView} />
        <Route path="/governance/wallet/delegate" exact component={WalletDelegateView} />
        <Route path="/governance/wallet/withdraw" exact component={WalletWithdrawView} />
        <Redirect from="/governance/wallet" to="/governance/wallet/deposit" />
      </Switch>
    </Grid>
  );
};

export default WalletView;
