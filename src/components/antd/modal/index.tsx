import React from 'react';
import AntdModal, { ModalProps as AntdModalProps } from 'antd/lib/modal';
import cn from 'classnames';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';

import s from './s.module.scss';

export type ModalProps = AntdModalProps & {
  confirmClose?: boolean;
  confirmText?: React.ReactNode;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
};

const Modal: React.FC<ModalProps> = props => {
  const { className, children, confirmClose = false, confirmText, onCancel, ...modalProps } = props;

  const [confirmVisible, showConfirm] = React.useState<boolean>(false);

  function handleCancel() {
    if (confirmClose) {
      showConfirm(true);
    } else {
      onCancel?.();
    }
  }

  return (
    <AntdModal
      zIndex={1000}
      className={cn(s.component, className)}
      visible
      centered
      footer={null}
      closeIcon={<Icon name="close" />}
      onCancel={handleCancel}
      {...modalProps}>
      {children}

      {confirmVisible && (
        <AntdModal
          zIndex={1001}
          className={s.component}
          visible
          centered
          footer={null}
          closeIcon={<></>}
          onCancel={() => showConfirm(false)}>
          <Grid flow="row" gap={32}>
            <Text type="p2" weight="semibold" color="secondary">
              {confirmText}
            </Text>
            <Grid flow="col" justify="space-between">
              <Button type="ghost" onClick={() => showConfirm(false)}>
                No
              </Button>
              <Button type="primary" onClick={onCancel}>
                Yes
              </Button>
            </Grid>
          </Grid>
        </AntdModal>
      )}
    </AntdModal>
  );
};

export default Modal;
