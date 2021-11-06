import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import WithdrawHeader from 'modules/smart-yield/views/withdraw-view/withdraw-header';

const InitiateWithdraw = lazy(() => import('./initiate-withdraw'));
const InstantWithdraw = lazy(() => import('./instant-withdraw'));
const TwoStepWithdraw = lazy(() => import('./two-step-withdraw'));

const WithdrawView: React.FC = () => {
  const poolCtx = useSYPool();

  if (poolCtx.loading) {
    return <AntdSpin />;
  }

  if (poolCtx.pool === null) {
    return <Redirect to="/smart-yield/portfolio/junior" />;
  }

  return (
    <div className="container-fit">
      <WithdrawHeader />
      <Suspense fallback={<AntdSpin />}>
        <Switch>
          <Route path="/smart-yield/withdraw" exact component={InitiateWithdraw} />
          <Route path="/smart-yield/withdraw/two-step" exact component={TwoStepWithdraw} />
          <Route path="/smart-yield/withdraw/instant" exact component={InstantWithdraw} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default WithdrawView;
