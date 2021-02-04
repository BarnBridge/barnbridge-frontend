import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Select, { SelectOption } from 'components/antd/select';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';

import { useWallet } from 'wallets/wallet';
import { LedgerWalletConfig } from 'wallets/connectors/ledger';

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

export type LedgerDerivationPathModalProps = ModalProps & {};

const LedgerDerivationPathModal: React.FunctionComponent<LedgerDerivationPathModalProps> = props => {
  const { ...modalProps } = props;

  const wallet = useWallet();

  const [derivationPath, setDerivationPath] = React.useState<string>(
    String(WEB3_LEDGER_DERIVATION_PATHS[0].value),
  );

  function handleSelect(value: string | number) {
    setDerivationPath(String(value));
  }

  function handleConnect(ev: React.MouseEvent<HTMLElement>) {
    modalProps.onCancel?.(ev);

    wallet.connect(LedgerWalletConfig, {
      baseDerivationPath: derivationPath,
    }).catch(Error);
  }

  return (
    <Modal centered {...modalProps}>
      <Grid flow="row" gap={32} align="center">
        <Select
          options={WEB3_LEDGER_DERIVATION_PATHS}
          value={derivationPath}
          onSelect={handleSelect}
          style={{ width: '352px' }}
        />
        <Button
          type="primary"
          onClick={handleConnect}>
          Connect
        </Button>
      </Grid>
    </Modal>
  );
};

export default LedgerDerivationPathModal;
