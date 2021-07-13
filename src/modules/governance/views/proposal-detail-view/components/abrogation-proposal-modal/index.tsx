import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { APIProposalState } from 'modules/governance/api';

import AbrogationProvider from '../../providers/AbrogationProvider';
import { useProposal } from '../../providers/ProposalProvider';
import AbrogationApprovalCard from '../abrogation-approval-card';
import AbrogationDetailsCard from '../abrogation-details-card';
import AbrogationVoteResultsCard from '../abrogation-vote-results-card';
import AbrogationVotesCard from '../abrogation-votes-card';

import s from './s.module.scss';

export type AbrogationProposalModalProps = ModalProps;

const AbrogationProposalModalInner: React.FC<AbrogationProposalModalProps> = props => {
  const proposalCtx = useProposal();

  return (
    <Modal className={s.component} {...props}>
      <Grid flow="row" gap={16} align="center">
        <Grid flow="col" gap={8} align="start" width={1070}>
          <Icon name="warning-outlined" />
          <Text type="p1" weight="semibold" color="red">
            Abrogation proposal
          </Text>
        </Grid>

        <Grid flow="row" gap={64} align="center">
          <Grid flow="col" gap={32} colsTemplate="1fr 1fr" width={1070}>
            <Text type="h2" weight="semibold" color="primary">
              PID-{proposalCtx.proposal?.proposalId}: {proposalCtx.proposal?.title}
            </Text>
          </Grid>

          <Grid flow="col" gap={32} colsTemplate="minmax(0, 610px) minmax(0, 428px)" width={1070}>
            <Grid flow="row" gap={32}>
              {proposalCtx.proposal?.state !== APIProposalState.QUEUED && <AbrogationVoteResultsCard />}
              <AbrogationDetailsCard />
            </Grid>
            <Grid flow="row" gap={32}>
              {proposalCtx.proposal?.state === APIProposalState.QUEUED && (
                <>
                  <AbrogationVotesCard />
                  <AbrogationApprovalCard />
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

const AbrogationProposalModal: React.FC<AbrogationProposalModalProps> = props => {
  return (
    <AbrogationProvider>
      <AbrogationProposalModalInner {...props} />
    </AbrogationProvider>
  );
};

export default AbrogationProposalModal;
