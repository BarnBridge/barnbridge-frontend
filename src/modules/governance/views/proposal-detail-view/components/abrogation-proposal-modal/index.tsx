import React from 'react';

import Modal, { ModalProps } from 'components/antd/modal';
import { Heading, Paragraph } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import AbrogationDetailsCard from '../abrogation-details-card';
import AbrogationVotesCard from '../abrogation-votes-card';
import AbrogationApprovalCard from '../abrogation-approval-card';
import AbrogationVoteResultsCard from '../abrogation-vote-results-card';
import AbrogationProvider from '../../providers/AbrogationProvider';
import { useProposal } from '../../providers/ProposalProvider';
import { APIProposalState } from '../../../../api';

import s from './styles.module.scss';

export type AbrogationProposalModalProps = ModalProps;

const AbrogationProposalModalInner: React.FunctionComponent<AbrogationProposalModalProps> = props => {
  const proposalCtx = useProposal();

  return (
    <Modal className={s.component} {...props}>
      <Grid flow="row" gap={16} align="center">
        <Grid flow="col" gap={8} align="start" width={1070}>
          <Icons name="warning-outlined" />
          <Paragraph type="p1" semiBold color="red">
            Abrogation proposal
          </Paragraph>
        </Grid>

        <Grid flow="row" gap={64} align="center">
          <Grid flow="col" gap={32} colsTemplate="1fr 1fr" width={1070}>
            <Heading type="h2" semiBold color="primary">
              PID-{proposalCtx.proposal?.proposalId}:{' '}
              {proposalCtx.proposal?.title}
            </Heading>
          </Grid>

          <Grid
            flow="col"
            gap={32}
            colsTemplate="minmax(0, 610px) minmax(0px, 428px)"
            width={1070}>
            <Grid flow="row" gap={32}>
              {proposalCtx.proposal?.state !== APIProposalState.QUEUED && (
                <AbrogationVoteResultsCard />
              )}
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

const AbrogationProposalModal: React.FunctionComponent<AbrogationProposalModalProps> = props => {
  return (
    <AbrogationProvider>
      <AbrogationProposalModalInner {...props} />
    </AbrogationProvider>
  );
};

export default AbrogationProposalModal;
