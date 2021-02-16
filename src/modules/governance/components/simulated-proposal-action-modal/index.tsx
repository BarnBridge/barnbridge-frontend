import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { CreateProposalActionForm } from '../create-proposal-action-modal';
import ProposalActionCard from '../proposal-action-card';

export type SimulatedProposalActionModalProps = ModalProps & {
  proposalAction: CreateProposalActionForm;
};

const SimulatedProposalActionModal: React.FC<SimulatedProposalActionModalProps> = props => {
  const { proposalAction, ...modalProps } = props;

  return (
    <Modal width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={24}>
          <Icons
            name="warning-outlined"
            width={40}
            height={40}
            color="red"
          />
          <Grid flow="row" gap={8}>
            <Text type="h3" weight="semibold" color="primary">
              Action could not be simulated
            </Text>
            <Text type="p2" weight="semibold" color="secondary">
              We run a simulation for every action before adding it to the
              proposal. The following action failed to simulate:
            </Text>
          </Grid>
          <ProposalActionCard
            title=""
            style={{ width: '496px' }}
            target={proposalAction.targetAddress}
            signature={proposalAction.functionSignature!}
            callData={proposalAction.functionEncodedParams}
          />
          <Text type="p2" weight="semibold" color="secondary">
            If you think this is a mistake, you can still add this action to the
            proposal.
          </Text>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onOk}>
            Continue anyway
          </Button>
          <Button type="primary" onClick={modalProps.onCancel}>
            Go back
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default SimulatedProposalActionModal;
