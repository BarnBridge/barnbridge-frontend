import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import s from './styles.module.css';

import { ReactComponent as ErrorTriangle } from 'resources/svg/icons/error-triangle.svg';

export type UserRejectedModalProps = ModalProps & {};

const UserRejectedModal: React.FunctionComponent<UserRejectedModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Antd.Modal
      className={s.component}
      centered
      footer={[]}
      {...modalProps}
    >
      <ErrorTriangle className={s.errorIcon} />
      <div className={s.headerLabel}>Error</div>
      <div className={s.text}>Transaction rejected</div>
      <Antd.Button
        type="primary"
        className={s.dismissBtn}
        onClick={props.onCancel}
      >Dismiss</Antd.Button>
    </Antd.Modal>
  );
};

export default UserRejectedModal;
