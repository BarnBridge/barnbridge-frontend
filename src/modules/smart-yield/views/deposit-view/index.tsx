import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

import { useSYPool } from '../../providers/pool-provider';
import DepositHeader from './deposit-header';
import PoolAPYTrend from './pool-apy-trend';
import PoolDetails from './pool-details';

import s from './s.module.scss';

const SelectTranche = lazy(() => import('./select-tranche'));
const SeniorTranche = lazy(() => import('./senior-tranche'));
const JuniorTranche = lazy(() => import('./junior-tranche'));

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
        <div className={cn('card p-32', s.content)}>
          <Suspense fallback={<AntdSpin />}>
            <Switch>
              <Route path="/smart-yield/deposit" exact component={SelectTranche} />
              <Route path="/smart-yield/deposit/senior" exact component={SeniorTranche} />
              <Route path="/smart-yield/deposit/junior" exact component={JuniorTranche} />
            </Switch>
          </Suspense>
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
