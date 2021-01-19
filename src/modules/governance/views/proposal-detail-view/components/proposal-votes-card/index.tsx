import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import ProposalVotesModal from '../proposal-voters-modal';
import ProposalVoteModal, { VoteState } from '../proposal-vote-modal';
import { useProposal } from '../../providers/ProposalProvider';

import { formatBigValue } from 'web3/utils';

import s from './styles.module.scss';

type ProposalVotesCardState = {
  showVotersModal: boolean;
  showVoteModal: boolean;
  voteState: VoteState;
};

const InitialState: ProposalVotesCardState = {
  showVotersModal: false,
  showVoteModal: false,
  voteState: VoteState.None,
};

const ProposalVotesCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  const [state, setState] = React.useState<ProposalVotesCardState>(InitialState);

  function handleShowVotersModal() {
    setState(prevState => ({
      ...prevState,
      showVotersModal: true,
    }));
  }

  function handleHideVotersModal() {
    setState(prevState => ({
      ...prevState,
      showVotersModal: false,
    }));
  }

  function handleVoteForModal() {
    setState(prevState => ({
      ...prevState,
      showVoteModal: true,
      voteState: VoteState.VoteFor,
    }));
  }

  function handleVoteAgainstModal() {
    setState(prevState => ({
      ...prevState,
      showVoteModal: true,
      voteState: VoteState.VoteAgainst,
    }));
  }

  function handleVoteChangeModal() {
    setState(prevState => ({
      ...prevState,
      showVoteModal: true,
      voteState: VoteState.VoteChange,
    }));
  }

  function handleVoteCancelModal() {
    setState(prevState => ({
      ...prevState,
      showVoteModal: true,
      voteState: VoteState.VoteCancel,
    }));
  }

  function handleHideVoteModal() {
    setState(prevState => ({
      ...prevState,
      showVoteModal: false,
      voteState: VoteState.None,
    }));
  }

  return (
    <Card
      className={s.component}
      title="Votes"
      extra={(
        <Button type="link" onClick={handleShowVotersModal}>View voters</Button>
      )}>
      <Grid flow="row" gap={32} className={s.row}>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Paragraph type="p1" semiBold color="grey900">For</Paragraph>
            <Grid flow="col" gap={8}>
              <Paragraph type="p1" semiBold color="grey900">
                {proposalCtx.proposal?.forVotes}
              </Paragraph>
              <Paragraph type="p1" color="grey500">({proposalCtx.forRate}%)</Paragraph>
            </Grid>
          </Grid>
          <Progress
            percent={proposalCtx.forRate}
            strokeColor="#00D395"
            trailColor="rgba(0, 211, 149, 0.16)" />
        </Grid>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Paragraph type="p1" semiBold color="grey900">Against</Paragraph>
            <Grid flow="col" gap={8}>
              <Paragraph type="p1" semiBold color="grey900">
                {proposalCtx.proposal?.againstVotes}
              </Paragraph>
              <Paragraph type="p1" color="grey500">({proposalCtx.againstRate}%)</Paragraph>
            </Grid>
          </Grid>
          <Progress
            percent={proposalCtx.againstRate}
            strokeColor="#FF4339"
            trailColor="rgba(255, 67, 57, 0.16)" />
        </Grid>
      </Grid>
      <Grid flow="row" gap={24} className={s.row}>
        <Grid flow="row" gap={8}>
          <Paragraph type="p1" color="grey500">Your voting power for this proposal</Paragraph>
          <Paragraph type="p1" semiBold color="grey900">
            {formatBigValue(proposalCtx.votingPower, 2)}
          </Paragraph>
        </Grid>
        <Grid flow="row">
          {!proposalCtx.receipt?.hasVoted ? (
            <Grid gap={24} colsTemplate="1fr 1fr">
              <Button type="primary" className={s.actionBtn} onClick={handleVoteForModal}>Vote for</Button>
              <Button type="default" className={s.actionBtn} onClick={handleVoteAgainstModal}>Vote against</Button>
            </Grid>
          ) : (
            <>
              <Alert message="You already voted FOR the proposal" />
              <Grid gap={24} colsTemplate="repeat(auto-fit, 1fr)">
                <Button type="primary" className={s.actionBtn} onClick={handleVoteChangeModal}>Change vote</Button>
                <Button type="default" className={s.actionBtn} onClick={handleVoteCancelModal}>Cancel vote</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      <ProposalVotesModal
        visible={state.showVotersModal}
        onCancel={handleHideVotersModal} />
      <ProposalVoteModal
        visible={state.showVoteModal}
        voteState={state.voteState}
        onCancel={handleHideVoteModal} />
    </Card>
  );
};

export default ProposalVotesCard;
