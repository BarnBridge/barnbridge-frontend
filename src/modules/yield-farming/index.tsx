import React from 'react';
import { isMobile } from 'react-device-detect';
import { Redirect, Route, Switch } from 'react-router-dom';

import Grid from 'components/custom/grid';
import { useWarning } from 'components/providers/warning-provider';
import LayoutHeader from 'layout/components/layout-header';
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
    let warningDestructor: Function;

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
    <Grid flow="row">
      <LayoutHeader title="Yield Farming" />
      {!isMobile && wallet.isActive && <PoolRewards />}

      <div className="grid flow-row row-gap-64 p-64 sm-pv-24 sm-ph-8">
        <PoolStats />
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
    </Grid>
  );
};

export default YieldFarmingView;
