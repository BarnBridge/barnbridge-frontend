import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import { Heading, Paragraph } from 'components/custom/typography';
import Button from 'components/antd/button';

import { ReactComponent as ErrorTriangle } from 'resources/svg/icons/error-triangle.svg';

import s from './styles.module.scss';

export type ProposalDeleteModalProps = ModalProps & {};

const ProposalDeleteModal: React.FunctionComponent<ProposalDeleteModalProps> = props => {

  return (
    <Modal className={s.component} centered width={560} {...props}>
      <Heading type="h3" semiBold className={s.header}>
        <ErrorTriangle />Are you sure you want to delete the action?
      </Heading>
      <Paragraph type="p2" semiBold className={s.hint}>
        Are you sure you want to delete the action? Bad things will happen if you do. Be careful :)
      </Paragraph>

      <div className={s.actions}>
        <Button type="default" onClick={props.onCancel}>Cancel</Button>
        <Button type="primary" onClick={props.onOk}>Delete Action</Button>
      </div>
    </Modal>
  );
};

export default ProposalDeleteModal;
