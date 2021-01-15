import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import { useWallet } from 'wallets/wallet';
import { useWarnings } from 'components/custom/warnings';
import LayoutHeader from 'layout/components/layout-header';
import PoolRewards from './components/pool-rewards';
import PoolStats from './components/pool-stats';
import PoolOverview from './components/pool-overview';
import PoolStak from './components/pool-stak';

import s from './styles.module.scss';

const YieldFarmingView: React.FunctionComponent = () => {
  const wallet = useWallet();
  const warnings = useWarnings();

  React.useEffect(() => {
    let warningDestructor: Function;

    if (isMobile) {
      warningDestructor = warnings.addWarn({
        text: 'Transactions can only be made from the desktop version using Metamask',
        closable: true,
        storageIdentity: 'bb_desktop_metamask_tx_warn',
      });
    } else {
      warningDestructor = warnings.addWarn({
        text: 'Do not send funds directly to the contract!',
        closable: true,
        storageIdentity: 'bb_send_funds_warn',
      });
    }

    return () => {
      warningDestructor?.();
    };
  }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.component}>
      <LayoutHeader title="Yield Farming" />
      {!isMobile && wallet.isActive && <PoolRewards />}

      <div className={s.body}>
        <PoolStats />
        <div className={s.content}>
          <Switch>
            <Route path="/yield-farming" exact render={() => (
              <PoolOverview />
            )} />
            {wallet.isActive && (
              <>
                <Route path="/yield-farming/stable" exact render={() => (
                  <PoolStak stableToken />
                )} />
                <Route path="/yield-farming/unilp" exact render={() => (
                  <PoolStak unilpToken />
                )} />
                <Route path="/yield-farming/bond" exact render={() => (
                  <PoolStak bondToken />
                )} />
              </>
            )}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default YieldFarmingView;
