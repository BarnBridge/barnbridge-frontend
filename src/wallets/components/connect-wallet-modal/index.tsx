import React from 'react';

import { WalletConnector } from 'wallets/types';
import { useWallet, WalletConnectors } from 'wallets/wallet';
import LedgerDerivationPathModal from 'wallets/components/ledger-deriviation-path-modal';

import Modal, { ModalProps } from 'components/antd/modal';
import { Heading, Paragraph } from 'components/custom/typography';
import Button from 'components/antd/button';

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
    <Modal className={s.component} width={568} {...modalProps}>
      <Heading type="h2" bold className={s.headerLabel}>
        Connect Wallet
      </Heading>
      <Paragraph type="p1" className={s.headerNote}>
        Please select the wallet of your liking
      </Paragraph>
      <div className={s.list}>
        {WalletConnectors.map(connector => (
          <Button
            key={connector.id}
            type="link"
            className={s.btn}
            onClick={() => handleConnectorSelect(connector)}>
            <img src={connector.logo} alt={connector.name} className={s.logo} />
          </Button>
        ))}
      </div>
      <LedgerDerivationPathModal
        visible={ledgerModal}
        onCancel={() => setLedgerModal(false)}
      />
    </Modal>
  );
};

export default ConnectWalletModal;
