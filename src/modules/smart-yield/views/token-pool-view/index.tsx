import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import DepositView from 'modules/smart-yield/views/deposit-view';
import WithdrawView from 'modules/smart-yield/views/withdraw-view';

import TokenPoolHeader from './token-pool-header';
import TokenPoolProvider from './token-pool-provider';

type TokenPoolViewParams = {
  address: string;
};

const TokenPoolView: React.FC = () => {
  const {
    params: { address },
  } = useRouteMatch<TokenPoolViewParams>();

  return (
    <TokenPoolProvider tokenAddress={address}>
      <TokenPoolHeader />
      <Switch>
        <Route path={`/smart-yield/${address}/deposit`} component={DepositView} />
        <Route path={`/smart-yield/${address}/withdraw`} component={WithdrawView} />
      </Switch>
    </TokenPoolProvider>
  );
};

export default TokenPoolView;
