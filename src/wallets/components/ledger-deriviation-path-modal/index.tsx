import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Select, { SelectOption } from 'components/antd/select';
import Grid from 'components/custom/grid';
import LedgerWalletConfig from 'wallets/connectors/ledger';
import { useWallet } from 'wallets/walletProvider';

const WEB3_LEDGER_DERIVATION_PATHS: SelectOption[] = [
  {
    value: `m/44'/60'/0'`,
    label: `Ethereum - m/44'/60'/0'`,
  },
  {
    value: `m/44'/60'/0'/0`,
    label: `Ethereum - Ledger Live - m/44'/60'/0'/0`,
  },
];

const LedgerDerivationPathModal: React.FC<ModalProps> = props => {
  const { ...modalProps } = props;

  const wallet = useWallet();

  const [derivationPath, setDerivationPath] = React.useState<string>(String(WEB3_LEDGER_DERIVATION_PATHS[0].value));

  function handleSelect(value: any) {
    setDerivationPath(value as string);
  }

  function handleConnect() {
    modalProps.onCancel?.();

    setTimeout(() => {
      wallet
        .connect(LedgerWalletConfig, {
          baseDerivationPath: derivationPath,
        })
        .catch(Error);
    });
  }

  return (
    <Modal width={568} {...modalProps}>
      <Grid flow="row" gap={32} align="center">
        <Select
          options={WEB3_LEDGER_DERIVATION_PATHS}
          value={derivationPath}
          onSelect={handleSelect}
          style={{ width: '352px' }}
        />
        <Button type="primary" onClick={handleConnect}>
          Connect
        </Button>
      </Grid>
    </Modal>
  );
};

export default LedgerDerivationPathModal;
