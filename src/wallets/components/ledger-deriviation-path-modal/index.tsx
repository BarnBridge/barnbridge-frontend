import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Select, { SelectOption } from 'components/antd/select';
import Button from 'components/antd/button';

import { useWallet } from 'wallets/wallet';
import { LedgerWalletConfig } from 'wallets/connectors/ledger';

import s from './styles.module.css';

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

    try {
      wallet.connect(LedgerWalletConfig, {
        baseDerivationPath: derivationPath,
      }).catch(Error);
    } catch {
    }
  }

  return (
    <Modal className={s.component} centered {...modalProps}>
      <Select
        className={s.dropdown}
        options={WEB3_LEDGER_DERIVATION_PATHS}
        value={derivationPath}
        onSelect={handleSelect}
      />
      <Button
        type="primary"
        className={s.connectBtn}
        onClick={handleConnect}>
        Connect
      </Button>
    </Modal>
  );
};

export default LedgerDerivationPathModal;
