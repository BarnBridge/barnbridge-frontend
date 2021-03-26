import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

const UserRejectedModal: React.FC<ModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal width={315} {...modalProps}>
      <div className="flex flow-row">
        <div className="flex flow-row align-center mb-32">
          <Icon name="warning-outlined" width={40} height={40} color="red" className="mb-16" />
          <Text type="h3" weight="semibold" color="primary" className="mb-8">
            Error
          </Text>
          <Text type="p2" weight="semibold" color="secondary">
            Transaction rejected
          </Text>
        </div>
        <button className="button-primary" onClick={modalProps.onCancel}>
          Dismiss
        </button>
      </div>
    </Modal>
  );
};

export default UserRejectedModal;
