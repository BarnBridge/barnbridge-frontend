import React from 'react';
import * as Antd from 'antd';
import { ModalProps as AntdModalProps } from 'antd/lib/modal';
import cx from 'classnames';

import Icons from 'components/custom/icon';

import s from './styles.module.scss';
import { Paragraph } from '../../custom/typography';
import Grid from '../../custom/grid';
import Button from '../button';

export type ModalProps = AntdModalProps & {
  confirmClose?: boolean;
  confirmText?: React.ReactNode;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
};

const Modal: React.FunctionComponent<ModalProps> = props => {
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
          footer={null}
          closeIcon={<></>}
          onCancel={() => showConfirm(false)}>
          <Grid flow="row" gap={32}>
            <Paragraph type="p2" semiBold color="grey500">{confirmText}</Paragraph>
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
