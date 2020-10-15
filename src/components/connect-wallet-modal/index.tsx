import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { Web3Connector } from 'web3/provider';

import s from './styles.module.css';

export type ConnectWalletModalProps = ModalProps & {
  connectors: Web3Connector[];
  onConnectorSelect: (connector: Web3Connector) => void;
};

const ConnectWalletModal: React.FunctionComponent<ConnectWalletModalProps> = props => {
  const { connectors, onConnectorSelect, ...modalProps } = props;

  return (
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
        {connectors.map(connector => (
          <Antd.Button
            key={connector.id}
            type="ghost"
            className={s.connectorBtn}
            disabled={connector.name !== 'MetaMask'}
            onClick={() => props.onConnectorSelect(connector)}
          >
            <img src={connector.logo} alt={connector.name} className={s.connectorLogo} />
            <span className={s.connectorName}>{connector.name}</span>
          </Antd.Button>
        ))}
      </div>
    </Antd.Modal>
  );
};

export default ConnectWalletModal;
