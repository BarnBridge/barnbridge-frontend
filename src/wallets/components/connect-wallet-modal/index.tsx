import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/generalProvider';
import useMergeState from 'hooks/useMergeState';
import LedgerDerivationPathModal from 'wallets/components/ledger-deriviation-path-modal';
import { WalletConnectors, useWallet } from 'wallets/walletProvider';

import { BaseWalletConfig } from 'wallets/types';

export type ConnectWalletModalProps = ModalProps;

type ConnectWalletModalState = {
  showLedgerModal: boolean;
};

const InitialState: ConnectWalletModalState = {
  showLedgerModal: false,
};

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = props => {
  const { ...modalProps } = props;
  const { theme } = useGeneral();

  const wallet = useWallet();
  const [state, setState] = useMergeState<ConnectWalletModalState>(InitialState);

  function handleConnectorSelect(connector: BaseWalletConfig) {
    if (wallet.isActive) {
      return;
    }

    if (connector.id === 'ledger') {
      setState({
        showLedgerModal: true,
      });
      return;
    }

    wallet.connect(connector).catch(Error);
  }

  return (
    <Modal width={568} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={4}>
          <Text type="h2" weight="bold" color="primary">
            Connect Wallet
          </Text>
          <Text type="p1" color="secondary">
            Please select the wallet of your liking
          </Text>
        </Grid>

        <Grid gap={24} colsTemplate="repeat(auto-fit, minmax(120px, 240px))">
          {WalletConnectors.map(connector => (
            <Button
              key={connector.id}
              type="select"
              style={{ height: '96px' }}
              onClick={() => handleConnectorSelect(connector)}>
              <img
                src={Array.isArray(connector.logo) ? connector.logo[theme === 'dark' ? 1 : 0] : connector.logo}
                alt={connector.name}
                height={32}
              />
            </Button>
          ))}
        </Grid>
      </Grid>

      {state.showLedgerModal && (
        <LedgerDerivationPathModal
          onCancel={() => {
            setState({ showLedgerModal: false });
          }}
        />
      )}
    </Modal>
  );
};

export default ConnectWalletModal;
