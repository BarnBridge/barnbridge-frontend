import React from 'react';
import * as Antd from 'antd';

import s from './styles.module.css';

export type UnsupportedChainModalProps = {
  visible: boolean;
  onSwitchWallet: () => void;
};

const UnsupportedChainModal: React.FunctionComponent<UnsupportedChainModalProps> = props => {
  return (
    <Antd.Modal
      className={s.component}
      visible={props.visible}
      centered
      closable={false}
      footer={[]}
    >
      <div className={s.headerLabel}>Wrong network</div>
      <div className={s.text}>Please switch your wallet network
        from <b>Ropsten</b> to <b>Mainnet</b> or <b>Rinkeby</b> to use the app
      </div>
      <div className={s.text}>If you still encounter problems, you may want to switch to a different wallet</div>
      <Antd.Button
        type="ghost"
        className={s.switchBtn}
        onClick={props.onSwitchWallet}
      >Switch wallet</Antd.Button>
    </Antd.Modal>
  );
};

export default UnsupportedChainModal;
