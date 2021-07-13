import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Grid from 'components/custom/grid';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import PortfolioDelegate from 'modules/governance/views/portfolio-view/portfolio-delegate';
import PortfolioDeposit from 'modules/governance/views/portfolio-view/portfolio-deposit';
import PortfolioLock from 'modules/governance/views/portfolio-view/portfolio-lock';
import PortfolioWithdraw from 'modules/governance/views/portfolio-view/portfolio-withdraw';
import { useWallet } from 'wallets/walletProvider';

type PortfolioViewRouteParams = {
  action: string;
};

const PortfolioView: FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const {
    params: { action = 'deposit' },
  } = useRouteMatch<PortfolioViewRouteParams>();
  const [activeTab, setActiveTab] = useState<string>(action);

  useEffect(() => {
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

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/portfolio/${tabKey}`);
  }

  return (
    <Grid flow="row" gap={32} className="container-fit">
      <Text type="h1" weight="bold" color="primary">
        Portfolio
      </Text>
      <div className="card">
        <div className="card-header pv-0">
          <Tabs
            tabs={[
              {
                id: 'deposit',
                children: 'Deposit',
                onClick: () => {
                  handleTabChange('deposit');
                },
              },
              {
                id: 'lock',
                children: 'Lock',
                onClick: () => {
                  handleTabChange('lock');
                },
              },
              {
                id: 'delegate',
                children: 'Delegate',
                onClick: () => {
                  handleTabChange('delegate');
                },
              },
              {
                id: 'withdraw',
                children: 'Withdraw',
                onClick: () => {
                  handleTabChange('withdraw');
                },
              },
            ]}
            size="small"
            activeKey={activeTab}
            onClick={setActiveTab}
          />
        </div>
        <Switch>
          <Route path="/governance/portfolio/deposit" component={PortfolioDeposit} />
          <Route path="/governance/portfolio/lock" component={PortfolioLock} />
          <Route path="/governance/portfolio/delegate" component={PortfolioDelegate} />
          <Route path="/governance/portfolio/withdraw" component={PortfolioWithdraw} />
        </Switch>
      </div>
    </Grid>
  );
};

export default PortfolioView;
