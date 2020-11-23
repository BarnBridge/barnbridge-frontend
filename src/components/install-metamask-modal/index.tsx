import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import s from './styles.module.css';

export type InstallMetaMaskModalProps = ModalProps & {};

const InstallMetaMaskModal: React.FunctionComponent<InstallMetaMaskModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Antd.Modal
      className={s.component}
      centered
      closable={false}
      footer={[]}
      {...modalProps}
    >
      <div className={s.headerLabel}>Install MetaMask</div>
      <div className={s.text}>
        You need to have MetaMask installed to continue. Once you have installed it, please refresh the page
      </div>
      <div className={s.footer}>
        <Antd.Button
          type="primary"
          className={s.switchBtn}
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
        >Install MetaMask</Antd.Button>

        <Antd.Button
          type="ghost"
          className={s.backBtn}
          onClick={props.onCancel}
        >Go Back</Antd.Button>
      </div>
    </Antd.Modal>
  );
};

export default InstallMetaMaskModal;
