import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import Dropdown from 'components/dropdown';

import s from './styles.module.css';

const WEB3_LEDGER_DERIVATIVE_PATHS = [
  { value: 'm/44\'/60\'/0\'', label: 'Ethereum - m/44\'/60\'/0\'' },
  { value: 'm/44\'/60\'', label: 'Ethereum - Ledger Live - m/44\'/60\'' },
];

export type LedgerDerivationPathModalProps = ModalProps & {
  onConnect: (derivativePath: string) => void;
};

const LedgerDerivationPathModal: React.FunctionComponent<LedgerDerivationPathModalProps> = props => {
  const { onConnect, ...modalProps } = props;

  const [derivativePath, setDerivativePath] = React.useState<string>(WEB3_LEDGER_DERIVATIVE_PATHS[0].value);

  function handleSelect(value: string | number) {
    setDerivativePath(String(value));
  }

  function handleConnect() {
    onConnect(derivativePath);
  }

  return (
    <Antd.Modal
      className={s.component}
      centered
      footer={[]}
      {...modalProps}
    >
      <Dropdown
        className={s.dropdown}
        items={WEB3_LEDGER_DERIVATIVE_PATHS}
        selected={derivativePath}
        onSelect={handleSelect}
      />
      <Antd.Button
        type="primary"
        className={s.connectBtn}
        onClick={handleConnect}
      >Connect</Antd.Button>
    </Antd.Modal>
  );
};

export default LedgerDerivationPathModal;
