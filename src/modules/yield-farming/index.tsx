import { FC, Suspense, lazy, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { useNotifications } from 'components/providers/notificationsProvider';
import YfAPIProvider from 'modules/yield-farming/api';

import YfPoolsProvider from './providers/pools-provider';

const PoolsView = lazy(() => import('./views/pools-view'));
const PoolView = lazy(() => import('./views/pool-view'));

const YieldFarmingView: FC = () => {
  const { addWarn } = useNotifications();

  useEffect(() => {
    let warningDestructor;

    warningDestructor = addWarn({
      text: 'Do not send funds directly to the contract!',
      closable: true,
      storageIdentity: 'bb_send_funds_warn',
    });

    return () => {
      warningDestructor?.();
    };
  }, []);

  return (
    <YfAPIProvider>
      <YfPoolsProvider>
        <Suspense fallback={<AntdSpin />}>
          <Switch>
            <Route path="/yield-farming" exact component={PoolsView} />
            <Route path="/yield-farming/:poolId" exact component={PoolView} />
            <Redirect to="/yield-farming" />
          </Switch>
        </Suspense>
      </YfPoolsProvider>
    </YfAPIProvider>
  );
};

export default YieldFarmingView;
