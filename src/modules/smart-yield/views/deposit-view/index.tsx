import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

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
    <div className="mh-auto" style={{ maxWidth: '1154px', width: '100%' }}>
      <DepositHeader />
      <div className={s.container}>
        <div className={cn('card p-32', s.content)}>
          <Switch>
            <Route path="/smart-yield/deposit" exact component={SelectTranche} />
            <Route path="/smart-yield/deposit/senior" exact component={SeniorTranche} />
            <Route path="/smart-yield/deposit/junior" exact component={JuniorTranche} />
          </Switch>
        </div>
        <div className={cn('grid flow-row row-gap-32', s.sidebar)}>
          <PoolDetails />
          <PoolAPYTrend />
        </div>
      </div>
    </div>
  );
};

export default DepositView;
