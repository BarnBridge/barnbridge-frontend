import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import EthGasPriceProvider from 'context/useEthGas';
import { useWeb3 } from 'web3/provider';
import { useWarnings } from 'components/warnings';
import ConnectedWallet from 'components/connected-wallet';
import PoolRewards from 'components/pool-rewards';
import PoolStats from 'components/pool-stats';
import PoolStak from 'components/pool-stak';
import PoolOverview from 'components/pool-overview';
import PoolTransactionsProvider from 'components/pool-transactions-provider';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent = () => {
  const web3 = useWeb3();
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
            {web3.isActive && <PoolRewards />}
          </Antd.Col>
          <Antd.Col className={s.wallet}>
            <ConnectedWallet />
          </Antd.Col>
        </Antd.Row>
      )}

      <PoolStats className={s.stats} />

      <EthGasPriceProvider>
        <PoolTransactionsProvider>
          <Switch>
            <Route path="/pools" exact render={() => (
              <PoolOverview />
            )} />
            {web3.isActive && (
              <>
                <Route path="/pools/stable-token" exact render={() => (
                  <PoolStak stableToken />
                )} />
                <Route path="/pools/lp-token" exact render={() => (
                  <PoolStak lpToken />
                )} />
              </>
            )}
          </Switch>
        </PoolTransactionsProvider>
      </EthGasPriceProvider>
    </div>
  );
};

export default PoolsView;
