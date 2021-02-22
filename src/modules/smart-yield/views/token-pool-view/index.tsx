import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import TokenPoolProvider from 'modules/smart-yield/providers/token-pool-provider';
import DepositTemplateView from 'modules/smart-yield/views/deposit-view';
import Withdraw from 'modules/smart-yield/views/deposit-view/withdraw';

type TokenPoolViewParams = {
  address: string;
};

const TokenPoolView: React.FC = () => {
  const {
    params: { address },
  } = useRouteMatch<TokenPoolViewParams>();

  return (
    <TokenPoolProvider tokenAddress={address}>
      <Switch>
        <Route path={`/smart-yield/${address}/deposit`} component={DepositTemplateView} />
        <Route path={`/smart-yield/${address}/withdraw`} component={Withdraw} />
      </Switch>
    </TokenPoolProvider>
  );
};

export default TokenPoolView;
