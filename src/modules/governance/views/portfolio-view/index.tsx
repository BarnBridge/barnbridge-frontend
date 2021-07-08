import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PortfolioDelegate from 'modules/governance/views/portfolio-view/portfolio-delegate';
import PortfolioDeposit from 'modules/governance/views/portfolio-view/portfolio-deposit';
import PortfolioLock from 'modules/governance/views/portfolio-view/portfolio-lock';
import PortfolioWithdraw from 'modules/governance/views/portfolio-view/portfolio-withdraw';
import { useWallet } from 'wallets/walletProvider';

type PortfolioViewRouteParams = {
  action: string;
};

const PortfolioView: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const {
    params: { action = 'deposit' },
  } = useRouteMatch<PortfolioViewRouteParams>();
  const [activeTab, setActiveTab] = React.useState<string>(action);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/portfolio/${tabKey}`);
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
    return <Redirect to="/governance/overview" />;
  }

  return (
    <Grid flow="row" gap={32} className="container-fit">
      <Text type="h1" weight="bold" color="primary">
        Wallet
      </Text>
      <Tabs activeKey={activeTab} simple onChange={handleTabChange}>
        <Tabs.Tab key="deposit" tab="Deposit" />
        <Tabs.Tab key="lock" tab="Lock" />
        <Tabs.Tab key="delegate" tab="Delegate" />
        <Tabs.Tab key="withdraw" tab="Withdraw" />
      </Tabs>
      <Switch>
        <Route path="/governance/portfolio/deposit" exact component={PortfolioDeposit} />
        <Route path="/governance/portfolio/lock" exact component={PortfolioLock} />
        <Route path="/governance/portfolio/delegate" exact component={PortfolioDelegate} />
        <Route path="/governance/portfolio/withdraw" exact component={PortfolioWithdraw} />
        <Redirect from="/governance/portfolio" to="/governance/portfolio/deposit" />
      </Switch>
    </Grid>
  );
};

export default PortfolioView;
