import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import AbrogationVoteModal, { VoteAbrogationState } from '../abrogation-vote-modal';
import AbrogationVotersModal from '../abrogation-voters-modal';
import { useAbrogation } from '../../providers/AbrogationProvider';

import { formatBigValue } from 'web3/utils';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

type AbrogationVotesCardState = {
  showVotersModal: boolean;
  showVoteModal: boolean;
  voteState: VoteAbrogationState;
};

const InitialState: AbrogationVotesCardState = {
  showVotersModal: false,
  showVoteModal: false,
  voteState: VoteAbrogationState.None,
};

const AbrogationVotesCard: React.FunctionComponent = () => {
  const abrogationCtx = useAbrogation();

  const [state, setState] = useMergeState<AbrogationVotesCardState>(InitialState);

  function handleShowVotersModal() {
    setState({ showVotersModal: true });
  }

  function handleHideVotersModal() {
    setState({ showVotersModal: false });
  }

  function handleVoteForModal() {
    setState({
      showVoteModal: true,
      voteState: VoteAbrogationState.VoteFor,
    });
  }

  function handleVoteAgainstModal() {
    setState({
      showVoteModal: true,
      voteState: VoteAbrogationState.VoteAgainst,
    });
  }

  function handleVoteChangeModal() {
    setState({
      showVoteModal: true,
      voteState: VoteAbrogationState.VoteChange,
    });
  }

  function handleVoteCancelModal() {
    setState({
      showVoteModal: true,
      voteState: VoteAbrogationState.VoteCancel,
    });
  }

  function handleHideVoteModal() {
    setState({
      showVoteModal: false,
      voteState: VoteAbrogationState.None,
    });
  }

  return (
    <Card
      className={s.component}
      title={(
        <Paragraph type="p1" semiBold color="grey900">Abrogation proposal votes</Paragraph>
      )}
      extra={(
        <Button
          type="link"
          onClick={handleShowVotersModal}>View voters</Button>
      )}>
      <Grid flow="row" gap={32} className={s.row}>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Paragraph type="p1" semiBold color="grey900">For</Paragraph>
            <Grid flow="col" gap={8}>
              <Paragraph type="p1" semiBold color="grey900">
                {abrogationCtx.abrogation?.forVotes.toFormat(2)}
              </Paragraph>
              <Paragraph type="p1" color="grey500">
                ({abrogationCtx.forRate?.toFixed(2)}%)
              </Paragraph>
            </Grid>
          </Grid>
          <Progress
            percent={abrogationCtx.forRate}
            strokeColor="var(--text-color-green500)"
            trailColor="rgba(var(--text-color-green500-rgb), .16)" />
        </Grid>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Paragraph type="p1" semiBold color="grey900">Against</Paragraph>
            <Grid flow="col" gap={8}>
              <Paragraph type="p1" semiBold color="grey900">
                {abrogationCtx.abrogation?.againstVotes.toFormat(2)}
              </Paragraph>
              <Paragraph type="p1" color="grey500">
                ({abrogationCtx.againstRate?.toFixed(2)}%)
              </Paragraph>
            </Grid>
          </Grid>
          <Progress
            percent={abrogationCtx.againstRate}
            strokeColor="var(--text-color-red500)"
            trailColor="rgba(var(--text-color-red500-rgb), .16)" />
        </Grid>
      </Grid>
      <Grid flow="row" gap={24} className={s.row}>
        <Grid flow="row" gap={8}>
          <Paragraph type="p1" color="grey500">Your voting power for this proposal</Paragraph>
          <Paragraph type="p1" semiBold color="grey900">
            {formatBigValue(abrogationCtx.votingPower, 2)}
          </Paragraph>
        </Grid>
        <Grid flow="row" gap={24}>
          {!abrogationCtx.receipt?.hasVoted ? (
            <Grid gap={24} colsTemplate="1fr 1fr">
              <Button type="primary" className={s.actionBtn} onClick={handleVoteForModal}>Vote for</Button>
              <Button type="default" className={s.actionBtn} onClick={handleVoteAgainstModal}>Vote against</Button>
            </Grid>
          ) : (
            <>
              <Alert message={`You already voted ${abrogationCtx.receipt?.support ? 'FOR' : 'AGAINST'} the proposal abrogation`} />
              <Grid flow="col" gap={24} colsTemplate="1fr 1fr">
                <Button type="primary" className={s.actionBtn} onClick={handleVoteChangeModal}>Change vote</Button>
                <Button type="default" className={s.actionBtn} onClick={handleVoteCancelModal}>Cancel vote</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      {state.showVotersModal && (
        <AbrogationVotersModal
          visible
          onCancel={handleHideVotersModal} />
      )}

      {state.showVoteModal && (
        <AbrogationVoteModal
          visible
          voteState={state.voteState}
          onCancel={handleHideVoteModal} />
      )}
    </Card>
  );
};

export default AbrogationVotesCard;
