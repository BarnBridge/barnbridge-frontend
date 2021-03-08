import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Card from 'components/antd/card';

import { useSYPool } from '../../providers/pool-provider';
import DepositHeader from './deposit-header';
import JuniorTranche from './junior-tranche';
import PoolAPYTrend from './pool-apy-trend';
import PoolDetails from './pool-details';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';

import s from './s.module.scss';

const DepositView: React.FC = () => {
  const poolCtx = useSYPool();

  if (poolCtx.loading) {
    return <AntdSpin />;
  }

  if (poolCtx.pool === null) {
    return <Redirect to="/smart-yield" />;
  }

  return (
    <div className="mh-auto">
      <DepositHeader />
      <div className={s.container}>
        <Card style={{ maxWidth: '640px', width: '640px' }}>
          <Switch>
            <Route path="/smart-yield/deposit" exact component={SelectTranche} />
            <Route path="/smart-yield/deposit/senior" exact component={SeniorTranche} />
            <Route path="/smart-yield/deposit/junior" exact component={JuniorTranche} />
          </Switch>
        </Card>
        <div className="grid flow-row row-gap-32" style={{ maxWidth: '480px', width: '480px' }}>
          <PoolDetails />
          <PoolAPYTrend />
        </div>
      </div>
    </div>
  );
};

export default DepositView;
