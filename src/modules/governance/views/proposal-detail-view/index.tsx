import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';
import ProposalVoteResultsCard from './components/proposal-vote-results-card';
import ProposalDetailsCard from './components/proposal-details-card';
import ProposalStatusCard from './components/proposal-status-card';
import ProposalCancellationCard from './components/proposal-cancellation-card';
import ProposalVotesCard from './components/proposal-votes-card';
import ProposalQuorumCard from './components/proposal-quorum-card';
import ProposalApprovalCard from './components/proposal-approval-card';
import ProposalProvider, { useProposal } from './providers/ProposalProvider';

import { APIProposalState } from 'modules/governance/api';

import s from './styles.module.scss';
import Icon from '../../../../components/custom/icon';

type ProposalDetailViewInnerState = {
  executing: boolean;
};

const InitialState: ProposalDetailViewInnerState = {
  executing: false,
};

const ProposalDetailViewInner: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  const proposalState = proposalCtx.proposal?.state;

  const [state, setState] = React.useState<ProposalDetailViewInnerState>(InitialState);

  function handleQueueForExecution() {
    setState(prevState => ({
      ...prevState,
      executing: true,
    }));

    proposalCtx.queueForExecution()
      .then(() => {
        setState(prevState => ({
          ...prevState,
          executing: false,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          executing: false,
        }));
      });
  }

  function handleExecuteProposal() {
    setState(prevState => ({
      ...prevState,
      executing: true,
    }));

    proposalCtx.executeProposal()
      .then(() => {
        setState(prevState => ({
          ...prevState,
          executing: false,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          executing: false,
        }));
      });
  }

  return (
    <Grid flow="row" gap={32} className={s.component}>
      <Paragraph type="p1" semiBold color="grey500">
        <Icon type="arrow-circle-right" />
        Proposals
      </Paragraph>

      <Grid flow="col" align="center" justify="space-between">
        <Heading type="h2" semiBold className={s.header} loading={!proposalCtx.proposal}>
          {proposalCtx.proposal?.title}
        </Heading>
        {APIProposalState.ACCEPTED === proposalState && (
          <Button
            type="primary"
            loading={state.executing}
            onClick={handleQueueForExecution}>Queue for execution</Button>
        )}
        {APIProposalState.GRACE === proposalState && (
          <Button
            type="primary"
            loading={state.executing}
            onClick={handleExecuteProposal}>Execute proposal</Button>
        )}
      </Grid>

      <div className={s.content}>
        <div className={s.column}>
          {![APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(proposalState as any) && (
            <ProposalVoteResultsCard />
          )}
          <ProposalDetailsCard />
        </div>
        <div className={s.column}>
          <ProposalStatusCard />
          {APIProposalState.QUEUED === proposalState && (
            <ProposalCancellationCard />
          )}
          {APIProposalState.ACTIVE === proposalState && (
            <>
              <ProposalVotesCard />
              <ProposalQuorumCard />
              <ProposalApprovalCard />
            </>
          )}
        </div>
      </div>
    </Grid>
  );
};

const ProposalDetailView = () => {
  const { params } = useRouteMatch<{ id: string }>();

  return (
    <ProposalProvider proposalId={Number(params.id)}>
      <ProposalDetailViewInner />
    </ProposalProvider>
  );
};

export default ProposalDetailView;
