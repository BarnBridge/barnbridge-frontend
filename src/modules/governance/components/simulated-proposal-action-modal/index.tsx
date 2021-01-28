import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';
import { CreateProposalActionForm } from '../create-proposal-action-modal';
import ProposalActionCard from '../proposal-action-card';

export type SimulatedProposalActionModalProps = ModalProps & {
  proposalAction: CreateProposalActionForm;
};

const SimulatedProposalActionModal: React.FunctionComponent<SimulatedProposalActionModalProps> = props => {
  const { proposalAction, ...modalProps } = props;

  return (
    <Modal centered width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={24}>
          <Icons name="warning-outlined" width={40} height={40} color="red500" />
          <Grid flow="row" gap={8}>
            <Heading type="h3" semiBold color="grey900">
              Action could not be simulated
            </Heading>
            <Paragraph type="p2" semiBold color="grey500">
              We run a simulation for every action before adding it to the proposal. The following action failed to
              simulate:
            </Paragraph>
          </Grid>
          <ProposalActionCard
            title=""
            style={{ width: '496px' }}
            target={proposalAction.targetAddress}
            signature={proposalAction.functionSignature!}
            callData={proposalAction.functionEncodedParams}
          />
          <Paragraph type="p2" semiBold color="grey500">
            If you think this is a mistake, you can still add this action to the proposal.
          </Paragraph>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onOk}>Continue anyway</Button>
          <Button type="primary" onClick={modalProps.onCancel}>Go back</Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SimulatedProposalActionModal;
