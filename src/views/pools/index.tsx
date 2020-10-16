import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EthGasPriceProvider from 'context/useEthGas';

import ConnectedWallet from 'components/connected-wallet';
import PoolRewards from 'components/pool-rewards';
import PoolStats from 'components/pool-stats';
import PoolStak from 'components/pool-stak';
import PoolOverview from 'components/pool-overview';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent = () => {
  return (
    <div className={s.view}>
      <ConnectedWallet />
      <PoolRewards />
      <PoolStats />

      <EthGasPriceProvider>
        <Switch>
          <Route path="/pools" exact render={() => (
            <PoolOverview />
          )} />
          <Route path="/pools/stable-token" exact render={() => (
            <PoolStak stableToken />
          )} />
          <Route path="/pools/lp-token" exact render={() => (
            <PoolStak lpToken />
          )} />
        </Switch>
      </EthGasPriceProvider>
    </div>
  );
};

export default PoolsView;
