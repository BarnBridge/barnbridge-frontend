import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import s from './styles.module.css';

export type UnsupportedChainModalProps = ModalProps & {
  onSwitchWallet: () => void;
};

const UnsupportedChainModal: React.FunctionComponent<UnsupportedChainModalProps> = props => {
  const { onSwitchWallet, ...modalProps } = props;

  return (
    <Antd.Modal
      className={s.component}
      centered
      closable={false}
      footer={[]}
      {...modalProps}
    >
      <div className={s.headerLabel}>Wrong network</div>
      <div className={s.text}>Please switch your wallet network to <b>Mainnet</b> to use the app
      </div>
      <div className={s.text}>If you still encounter problems, you may want to switch to a different wallet</div>
      <Antd.Button
        type="ghost"
        className={s.switchBtn}
        onClick={onSwitchWallet}
      >Switch wallet</Antd.Button>
    </Antd.Modal>
  );
};

export default UnsupportedChainModal;
