import React, { FC, Suspense, lazy, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import { useWarning } from 'components/providers/warning-provider';
import YfAPIProvider from 'modules/yield-farming/api';

import YfPoolsProvider from './providers/pools-provider';

const PoolsView = lazy(() => import('./views/pools-view'));
const PoolView = lazy(() => import('./views/pool-view'));

const YieldFarmingView: FC = () => {
  const warning = useWarning();

  useEffect(() => {
    let warningDestructor: () => void;

    if (isMobile) {
      warningDestructor = warning.addWarn({
        text: 'Transactions can only be made from the desktop version using Metamask',
        closable: true,
        storageIdentity: 'bb_desktop_metamask_tx_warn',
      });
    } else {
      warningDestructor = warning.addWarn({
        text: 'Do not send funds directly to the contract!',
        closable: true,
        storageIdentity: 'bb_send_funds_warn',
      });
    }

    return () => {
      warningDestructor?.();
    };
  }, [isMobile]);

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
