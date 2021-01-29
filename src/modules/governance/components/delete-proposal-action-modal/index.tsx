import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';

export type DeleteProposalActionModalProps = ModalProps & {};

const DeleteProposalActionModal: React.FunctionComponent<DeleteProposalActionModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal centered width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icons name="warning-outlined" width={40} height={40} color="red500" />
          <Grid flow="row" gap={8}>
            <Heading type="h3" semiBold color="grey900">
              Are you sure you want to delete the action?
            </Heading>
            <Paragraph type="p2" semiBold color="grey500">
              Are you sure you want to delete the action? Bad things will happen if you do. Be careful :)
            </Paragraph>
          </Grid>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onCancel}>Cancel</Button>
          <Button type="primary" onClick={modalProps.onOk}>Delete Action</Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteProposalActionModal;
