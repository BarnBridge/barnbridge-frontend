import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import * as Antd from 'antd';

import TokenPoolHeader from 'modules/smart-yield/views/token-pool-view/token-pool-header';
import TokenPoolProvider, { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import InitiateWithdraw from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';
import InstantWithdraw from 'modules/smart-yield/views/withdraw-view/instant-withdraw';
import TwoStepWithdraw from 'modules/smart-yield/views/withdraw-view/two-step-withdraw';

const WithdrawViewInner: React.FC = () => {
  const poolCtx = useTokenPool();

  if (poolCtx.loading) {
    return <Antd.Spin />;
  }

  if (poolCtx.pool === null) {
    return <Redirect to={'/smart-yield/portfolio/junior'} />;
  }

  return (
    <>
      <TokenPoolHeader />
      <Switch>
        <Route path="/smart-yield/withdraw" exact component={InitiateWithdraw} />
        <Route path="/smart-yield/withdraw/two-step" exact component={TwoStepWithdraw} />
        <Route path="/smart-yield/withdraw/instant" exact component={InstantWithdraw} />
      </Switch>
    </>
  );
};

const WithdrawView: React.FC = () => {
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search);
  const market = decodeURIComponent(urlQuery.get('m') ?? '');
  const token = decodeURIComponent(urlQuery.get('t') ?? '');

  return (
    <TokenPoolProvider market={market} token={token}>
      <WithdrawViewInner />
    </TokenPoolProvider>
  );
};

export default WithdrawView;
