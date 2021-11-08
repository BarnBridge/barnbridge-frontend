import { Redirect, Route, Switch } from 'react-router-dom';

import { NavTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import PortfolioDelegate from 'modules/governance/views/portfolio-view/portfolio-delegate';
import PortfolioDeposit from 'modules/governance/views/portfolio-view/portfolio-deposit';
import PortfolioLock from 'modules/governance/views/portfolio-view/portfolio-lock';
import PortfolioWithdraw from 'modules/governance/views/portfolio-view/portfolio-withdraw';
import { useWallet } from 'wallets/walletProvider';

const PortfolioView: React.FC = () => {
  const wallet = useWallet();
  if (!wallet.initialized) {
    return null;
  }

  if (!wallet.isActive) {
    return <Redirect to="/governance/overview" />;
  }

  return (
    <div className="container-fit">
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Portfolio
      </Text>
      <div className="card">
        <div className="card-header pv-0">
          <NavTabs
            tabs={[
              {
                id: 'deposit',
                children: 'Deposit',
                to: '/governance/portfolio/deposit',
              },
              {
                id: 'lock',
                children: 'Lock',
                to: '/governance/portfolio/lock',
              },
              {
                id: 'delegate',
                children: 'Delegate',
                to: '/governance/portfolio/delegate',
              },
              {
                id: 'withdraw',
                children: 'Withdraw',
                to: '/governance/portfolio/withdraw',
              },
            ]}
          />
        </div>
        <Switch>
          <Route path="/governance/portfolio/deposit" component={PortfolioDeposit} />
          <Route path="/governance/portfolio/lock" component={PortfolioLock} />
          <Route path="/governance/portfolio/delegate" component={PortfolioDelegate} />
          <Route path="/governance/portfolio/withdraw" component={PortfolioWithdraw} />
        </Switch>
      </div>
    </div>
  );
};

export default PortfolioView;
