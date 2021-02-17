import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

const UserRejectedModal: React.FC<ModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal width={315} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16} align="center">
          <Icons name="warning-outlined" width={40} height={40} color="red" />
          <Grid flow="row" gap={8} align="center">
            <Text type="h3" weight="semibold" color="primary">
              Error
            </Text>
            <Text type="p2" weight="semibold" color="secondary">
              Transaction rejected
            </Text>
          </Grid>
        </Grid>
        <Button type="primary" onClick={modalProps.onCancel}>
          Dismiss
        </Button>
      </Grid>
    </Modal>
  );
};

export default UserRejectedModal;
