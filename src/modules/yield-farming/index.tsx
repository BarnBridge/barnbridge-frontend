import React from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useWarning } from 'components/providers/warning-provider';
import YFPoolsProvider from 'modules/yield-farming/providers/pools-provider';

import PoolView from './views/pool-view';
import PoolsOverviewView from './views/pools-overview-view';

import { PoolTypes } from './utils';

const PATH_POOLS_OPTS = [PoolTypes.STABLE, PoolTypes.UNILP, PoolTypes.BOND].join('|');

const YieldFarmingView: React.FC = () => {
  const warning = useWarning();

  React.useEffect(() => {
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
    <YFPoolsProvider>
      <Switch>
        <Route path="/yield-farming" exact component={PoolsOverviewView} />
        <Route path={`/yield-farming/:poolName(${PATH_POOLS_OPTS})`} exact component={PoolView} />
        <Redirect to="/yield-farming" />
      </Switch>
    </YFPoolsProvider>
  );
};

export default YieldFarmingView;
