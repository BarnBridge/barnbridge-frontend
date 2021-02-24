import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import InitiateWithdraw from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';
import InstantWithdraw from 'modules/smart-yield/views/withdraw-view/instant-withdraw';
import TwoStepWithdraw from 'modules/smart-yield/views/withdraw-view/two-step-withdraw';

const WithdrawView: React.FC = () => {
  const tokenPool = useTokenPool();

  return (
    <Switch>
      <Route path={`/smart-yield/${tokenPool.address}/withdraw`} exact component={InitiateWithdraw} />
      <Route path={`/smart-yield/${tokenPool.address}/withdraw/two-step`} exact component={TwoStepWithdraw} />
      <Route path={`/smart-yield/${tokenPool.address}/withdraw/instant`} exact component={InstantWithdraw} />
    </Switch>
  );
};

export default WithdrawView;
