import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { WalletConnector } from 'wallets/types';
import { useWallet, WalletConnectors } from 'wallets/wallet';

import LedgerDerivationPathModal from 'wallets/components/ledger-deriviation-path-modal';

import s from './styles.module.css';

export type ConnectWalletModalProps = ModalProps & {};

const ConnectWalletModal: React.FunctionComponent<ConnectWalletModalProps> = props => {
  const { ...modalProps } = props;

  const wallet = useWallet();

  const [ledgerModal, setLedgerModal] = React.useState<boolean>(false);

  function handleConnectorSelect(connector: WalletConnector) {
    if (wallet.isActive) {
      return;
    }

    if (connector.id === 'ledger') {
      return setLedgerModal(true);
    }

    return wallet.connect(connector);
  }

  return (
    <>
      <Antd.Modal
        className={s.component}
        centered
        closable
        footer={[]}
        {...modalProps}
      >
        <p className={s.headerLabel}>Connect Wallet</p>
        <p className={s.headerNote}>Please select the wallet of your liking</p>
        <div className={s.connectorList}>
          {WalletConnectors.map(connector => (
            <Antd.Button
              key={connector.id}
              type="ghost"
              className={s.connectorBtn}
              onClick={() => handleConnectorSelect(connector)}
            >
              <img src={connector.logo} alt={connector.name} className={s.connectorLogo} />
              <span className={s.connectorName}>{connector.name}</span>
            </Antd.Button>
          ))}
        </div>
      </Antd.Modal>
      <LedgerDerivationPathModal
        visible={ledgerModal}
        onCancel={() => setLedgerModal(false)} />
    </>
  );
};

export default ConnectWalletModal;
