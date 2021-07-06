import { lazy } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { useWallet } from 'wallets/walletProvider';

const DepositView = lazy(() => import('../deposit-view'));
const WithdrawView = lazy(() => import('../withdraw-view'));
const ChangeTrancheView = lazy(() => import('../change-tranche-view'));

export const PoolActionsView: React.FC = () => {
  const { pool } = useParams<{ pool: string }>();
  const wallet = useWallet();

  if (!wallet.initialized) {
    return null;
  }

  if (!wallet.isActive) {
    return <Redirect to={`/smart-exposure/pools/${pool}`} />;
  }

  return (
    <Switch>
      <Route path="/smart-exposure/pools/:pool/:tranche/deposit" exact>
        <DepositView />
      </Route>
      <Route path="/smart-exposure/pools/:pool/:tranche/withdraw" exact>
        <WithdrawView />
      </Route>
      <Route path="/smart-exposure/pools/:pool/:tranche/change-tranche" exact>
        <ChangeTrancheView />
      </Route>
      <Redirect to={`/smart-exposure/pools/${pool}`} />
    </Switch>
  );
};
