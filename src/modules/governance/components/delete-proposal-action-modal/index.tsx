import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

export type DeleteProposalActionModalProps = ModalProps;

const DeleteProposalActionModal: React.FC<DeleteProposalActionModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icon name="warning-outlined" width={40} height={40} color="red" />
          <Grid flow="row" gap={8}>
            <Text type="h3" weight="semibold" color="primary">
              Are you sure you want to delete the action?
            </Text>
            <Text type="p2" weight="semibold" color="secondary">
              Are you sure you want to delete the action? Bad things will happen if you do. Be careful :)
            </Text>
          </Grid>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={modalProps.onOk}>
            Delete Action
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteProposalActionModal;
