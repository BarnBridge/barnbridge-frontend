import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

export type DeleteProposalActionModalProps = ModalProps;

const DeleteProposalActionModal: React.FC<DeleteProposalActionModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal width={560} {...modalProps}>
      <div className="flex flow-row row-gap-32">
        <div className="flex col-gap-16 align-center">
          <Icon name="warning-outlined" width={40} height={40} color="red" />
          <Text type="h3" weight="semibold" color="primary">
            Are you sure you want to delete the action?
          </Text>
        </div>
        <div className="flex justify-space-between">
          <Button type="default" onClick={modalProps.onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={modalProps.onOk}>
            Delete Action
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProposalActionModal;
