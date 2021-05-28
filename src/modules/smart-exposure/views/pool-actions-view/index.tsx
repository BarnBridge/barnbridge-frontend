import { lazy } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';

import { useWallet } from 'wallets/wallet';

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
    return <Redirect to={`/smart-exposure/pairs/${pool}`} />;
  }

  return (
    <Switch>
      <Route path="/smart-exposure/pairs/:pool/deposit" exact>
        <DepositView />
      </Route>
      <Route path="/smart-exposure/pairs/:pool/withdraw" exact>
        <WithdrawView />
      </Route>
      <Route path="/smart-exposure/pairs/:pool/change-tranche" exact>
        <ChangeTrancheView />
      </Route>
      <Redirect to={`/smart-exposure/pairs/${pool}`} />
    </Switch>
  );
};
