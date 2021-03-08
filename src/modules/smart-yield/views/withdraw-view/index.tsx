import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import InitiateWithdraw from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';
import InstantWithdraw from 'modules/smart-yield/views/withdraw-view/instant-withdraw';
import TwoStepWithdraw from 'modules/smart-yield/views/withdraw-view/two-step-withdraw';
import WithdrawHeader from 'modules/smart-yield/views/withdraw-view/withdraw-header';

const WithdrawView: React.FC = () => {
  const poolCtx = useSYPool();

  if (poolCtx.loading) {
    return <AntdSpin />;
  }

  if (poolCtx.pool === null) {
    return <Redirect to="/smart-yield/portfolio/junior" />;
  }

  return (
    <div className="mh-auto" style={{ maxWidth: '640px' }}>
      <WithdrawHeader />
      <Switch>
        <Route path="/smart-yield/withdraw" exact component={InitiateWithdraw} />
        <Route path="/smart-yield/withdraw/two-step" exact component={TwoStepWithdraw} />
        <Route path="/smart-yield/withdraw/instant" exact component={InstantWithdraw} />
      </Switch>
    </div>
  );
};

export default WithdrawView;
