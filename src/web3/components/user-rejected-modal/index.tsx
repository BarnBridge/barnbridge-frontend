import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';

export type UserRejectedModalProps = ModalProps & {};

const UserRejectedModal: React.FunctionComponent<UserRejectedModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal centered width={315} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16} align="center">
          <Icons name="warning-outlined" width={40} height={40} color="red500" />
          <Grid flow="row" gap={8} align="center">
            <Heading type="h3" semiBold color="grey900">
              Error
            </Heading>
            <Paragraph type="p2" semiBold color="grey500">
              Transaction rejected
            </Paragraph>
          </Grid>
        </Grid>
        <Button
          type="primary"
          onClick={modalProps.onCancel}>
          Dismiss</Button>
      </Grid>
    </Modal>
  );
};

export default UserRejectedModal;
