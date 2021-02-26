import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import DepositView from 'modules/smart-yield/views/deposit-view';
import WithdrawView from 'modules/smart-yield/views/withdraw-view';

import TokenPoolProvider from './token-pool-provider';
import TokenPoolHeader from './token-pool-header';

type TokenPoolViewParams = {
  address: string;
};

const TokenPoolView: React.FC = () => {
  const {
    params: { address },
  } = useRouteMatch<TokenPoolViewParams>();

  return (
    <TokenPoolProvider poolAddress={address}>
      <TokenPoolHeader />
      <Switch>
        <Route path={`/smart-yield/${address}/deposit`} component={DepositView} />
        <Route path={`/smart-yield/${address}/withdraw`} component={WithdrawView} />
      </Switch>
    </TokenPoolProvider>
  );
};

export default TokenPoolView;
