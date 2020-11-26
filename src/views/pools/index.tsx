import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import EthGasPriceProvider from 'context/useEthGas';
import { useWallet } from 'wallets/wallet';
import { useWarnings } from 'components/warnings';
import ConnectedWallet from 'components/connected-wallet';
import PoolRewards from 'views/pools/components/pool-rewards';
import PoolStats from 'views/pools/components/pool-stats';
import PoolStak from 'views/pools/components/pool-stak';
import PoolOverview from 'views/pools/components/pool-overview';
import PoolTxListProvider from 'views/pools/components/pool-tx-list-provider';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent = () => {
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
    <div className={s.view}>
      {!isMobile && (
        <Antd.Row className={s.walletRow}>
          <Antd.Col flex="auto">
            {wallet.isActive && <PoolRewards />}
          </Antd.Col>
          <Antd.Col className={s.wallet}>
            <ConnectedWallet />
          </Antd.Col>
        </Antd.Row>
      )}

      <PoolStats className={s.stats} />

      <EthGasPriceProvider>
        <PoolTxListProvider>
          <Switch>
            <Route path="/pools" exact render={() => (
              <PoolOverview />
            )} />
            {wallet.isActive && (
              <>
                <Route path="/pools/stable" exact render={() => (
                  <PoolStak stableToken />
                )} />
                <Route path="/pools/unilp" exact render={() => (
                  <PoolStak unilpToken />
                )} />
                <Route path="/pools/bond" exact render={() => (
                  <PoolStak bondToken />
                )} />
              </>
            )}
          </Switch>
        </PoolTxListProvider>
      </EthGasPriceProvider>
    </div>
  );
};

export default PoolsView;
