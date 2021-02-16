import React from 'react';
import * as Antd from 'antd';
import { ModalProps as AntdModalProps } from 'antd/lib/modal';
import cx from 'classnames';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import s from './styles.module.scss';

export type ModalProps = AntdModalProps & {
  confirmClose?: boolean;
  confirmText?: React.ReactNode;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
};

const Modal: React.FC<ModalProps> = props => {
  const {
    className,
    children,
    confirmClose = false,
    confirmText,
    onCancel,
    ...modalProps
  } = props;

  const [confirmVisible, showConfirm] = React.useState<boolean>(false);

  function handleCancel() {
    if (confirmClose) {
      showConfirm(true);
    } else {
      onCancel?.();
    }
  }

  return (
    <Antd.Modal
      zIndex={1}
      className={cx(s.component, className)}
      visible
      centered
      footer={null}
      closeIcon={<Icons name="close-circle-outlined" />}
      onCancel={handleCancel}
      {...modalProps}>
      {children}

      {confirmVisible && (
        <Antd.Modal
          zIndex={2}
          className={s.component}
          visible
          centered
          footer={null}
          closeIcon={<></>}
          onCancel={() => showConfirm(false)}>
          <Grid flow="row" gap={32}>
            <Text type="p2" weight="semibold" color="secondary">{confirmText}</Text>
            <Grid flow="col" justify="space-between">
              <Button type="ghost" onClick={() => showConfirm(false)}>No</Button>
              <Button type="primary" onClick={onCancel}>Yes</Button>
            </Grid>
          </Grid>
        </Antd.Modal>
      )}
    </Antd.Modal>
  );
};

export default Modal;
