import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { APIProposalState } from 'modules/governance/api';
import { useWallet } from 'wallets/wallet';

import ProposalAbrogationCard from './components/proposal-abrogation-card';
import ProposalApprovalCard from './components/proposal-approval-card';
import ProposalDetailsCard from './components/proposal-details-card';
import ProposalQuorumCard from './components/proposal-quorum-card';
import ProposalStatusCard from './components/proposal-status-card';
import ProposalVoteResultsCard from './components/proposal-vote-results-card';
import ProposalVotesCard from './components/proposal-votes-card';
import QueueForExecutionModal from './components/queue-for-execution-modal';
import ProposalProvider, { useProposal } from './providers/ProposalProvider';

import s from './s.module.scss';

type ProposalDetailViewInnerState = {
  showQueueForExecution: boolean;
  executing: boolean;
};

const InitialState: ProposalDetailViewInnerState = {
  showQueueForExecution: false,
  executing: false,
};

const ProposalDetailViewInner: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const proposalCtx = useProposal();

  const proposalState = proposalCtx.proposal?.state;
  const [state, setState] = useMergeState<ProposalDetailViewInnerState>(InitialState);

  function handleBackClick() {
    history.push('/governance/proposals');
  }

  function handleExecuteProposal() {
    setState(prevState => ({
      ...prevState,
      executing: true,
    }));

    proposalCtx
      .executeProposal()
      .catch(Error)
      .then(() => {
        proposalCtx.reload();
        setState(prevState => ({
          ...prevState,
          executing: false,
        }));
      });
  }

  return (
    <div className="mh-auto" style={{ maxWidth: 1070, width: '100%' }}>
      <div className="mb-32">
        <Button type="link" icon={<Icon name="left-arrow" />} onClick={handleBackClick}>
          Proposals
        </Button>
      </div>

      <Grid flow="col" gap={32} colsTemplate="1fr 1fr" className="mb-32">
        <Text type="h2" weight="semibold" color="primary">
          PID-{proposalCtx.proposal?.proposalId}: {proposalCtx.proposal?.title}
        </Text>

        <Grid flow="col" justify="end">
          {wallet.account && (
            <>
              {APIProposalState.ACCEPTED === proposalState && (
                <Button
                  type="primary"
                  loading={state.executing}
                  onClick={() => setState({ showQueueForExecution: true })}>
                  Queue for execution
                </Button>
              )}
              {APIProposalState.GRACE === proposalState && (
                <Button type="primary" loading={state.executing} onClick={handleExecuteProposal}>
                  Execute proposal
                </Button>
              )}
            </>
          )}
        </Grid>
      </Grid>

      <div className={s.cardsAndSidebarContainer}>
        <Grid flow="row" gap={32} className={s.cardsContainer}>
          {![APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(proposalState as any) && (
            <ProposalVoteResultsCard />
          )}
          <ProposalDetailsCard />
        </Grid>
        <Grid flow="row" gap={32} className={s.sidebarContainer}>
          <ProposalStatusCard />
          {(APIProposalState.QUEUED === proposalState || proposalCtx.isCanceled) && <ProposalAbrogationCard />}
          {[APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(proposalState!) && (
            <ProposalVotesCard />
          )}
          {APIProposalState.ACTIVE === proposalState && (
            <>
              <ProposalQuorumCard />
              <ProposalApprovalCard />
            </>
          )}
        </Grid>
      </div>

      {state.showQueueForExecution && (
        <QueueForExecutionModal onCancel={() => setState({ showQueueForExecution: false })} />
      )}
    </div>
  );
};

const ProposalDetailView: React.FC = () => {
  const { params } = useRouteMatch<{ id: string }>();

  return (
    <ProposalProvider proposalId={Number(params.id)}>
      <ProposalDetailViewInner />
    </ProposalProvider>
  );
};

export default ProposalDetailView;
