import React from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useWarning } from 'components/providers/warning-provider';
import { useWallet } from 'wallets/wallet';

import PoolRewards from './components/pool-rewards';
import PoolStats from './components/pool-stats';
import PoolDetailsView from './views/pool-details-view';
import PoolsOverviewView from './views/pools-overview-view';

import { PoolActions, PoolTypes } from './utils';

const PATH_POOLS_OPTS = [PoolTypes.STABLE, PoolTypes.UNILP, PoolTypes.BOND].join('|');
const PATH_ACTIONS_OPTS = [PoolActions.DEPOSIT, PoolActions.WITHDRAW].join('|');

const YieldFarmingView: React.FC = () => {
  const wallet = useWallet();
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
    <>
      {!isMobile && wallet.isActive && <PoolRewards />}

      <div className="content-container-fix content-container">
        <PoolStats className="mb-64" />
        <Switch>
          <Route path="/yield-farming" exact component={PoolsOverviewView} />
          <Route
            path={`/yield-farming/:pool(${PATH_POOLS_OPTS})/:action(${PATH_ACTIONS_OPTS})`}
            exact
            component={PoolDetailsView}
          />
          <Redirect
            from={`/yield-farming/:pool(${PATH_POOLS_OPTS})`}
            to={`/yield-farming/:pool/${PoolActions.DEPOSIT}`}
          />
          <Redirect to="/yield-farming" />
        </Switch>
      </div>
    </>
  );
};

export default YieldFarmingView;
