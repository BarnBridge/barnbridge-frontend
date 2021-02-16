import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
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

const AbrogationVotesCard: React.FC = () => {
  const abrogationCtx = useAbrogation();

  const [state, setState] = useMergeState<AbrogationVotesCardState>(
    InitialState,
  );

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
      title={
        <Text type="p1" weight="semibold" color="primary">
          Abrogation proposal votes
        </Text>
      }
      extra={
        <Button type="link" onClick={handleShowVotersModal}>
          View voters
        </Button>
      }>
      <Grid flow="row" gap={32} className={s.row}>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Text type="p1" weight="semibold" color="primary">
              For
            </Text>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {abrogationCtx.abrogation?.forVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({abrogationCtx.forRate?.toFixed(2)}%)
              </Text>
            </Grid>
          </Grid>
          <Progress
            percent={abrogationCtx.forRate}
            strokeColor="var(--theme-green-color)"
            trailColor="rgba(var(--theme-green-color-rgb), .16)"
          />
        </Grid>
        <Grid flow="row" gap={16}>
          <Grid flow="col" justify="space-between">
            <Text type="p1" weight="semibold" color="primary">
              Against
            </Text>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {abrogationCtx.abrogation?.againstVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({abrogationCtx.againstRate?.toFixed(2)}%)
              </Text>
            </Grid>
          </Grid>
          <Progress
            percent={abrogationCtx.againstRate}
            strokeColor="var(--theme-red-color)"
            trailColor="rgba(var(--theme-red-color-rgb), .16)"
          />
        </Grid>
      </Grid>
      <Grid flow="row" gap={24} className={s.row}>
        <Grid flow="row" gap={8}>
          <Text type="p1" color="secondary">
            Your voting power for this proposal
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(abrogationCtx.votingPower, 2)}
          </Text>
        </Grid>
        <Grid flow="row" gap={24}>
          {!abrogationCtx.receipt?.hasVoted ? (
            <Grid gap={24} colsTemplate="1fr 1fr">
              <Button
                type="primary"
                className={s.actionBtn}
                onClick={handleVoteForModal}>
                Vote for
              </Button>
              <Button
                type="default"
                className={s.actionBtn}
                onClick={handleVoteAgainstModal}>
                Vote against
              </Button>
            </Grid>
          ) : (
            <>
              <Alert
                message={`You already voted ${
                  abrogationCtx.receipt?.support ? 'FOR' : 'AGAINST'
                } the proposal abrogation`}
              />
              <Grid flow="col" gap={24} colsTemplate="1fr 1fr">
                <Button
                  type="primary"
                  className={s.actionBtn}
                  onClick={handleVoteChangeModal}>
                  Change vote
                </Button>
                <Button
                  type="default"
                  className={s.actionBtn}
                  onClick={handleVoteCancelModal}>
                  Cancel vote
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      {state.showVotersModal && (
        <AbrogationVotersModal onCancel={handleHideVotersModal} />
      )}

      {state.showVoteModal && (
        <AbrogationVoteModal
          voteState={state.voteState}
          onCancel={handleHideVoteModal}
        />
      )}
    </Card>
  );
};

export default AbrogationVotesCard;
