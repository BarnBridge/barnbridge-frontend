import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

import useMergeState from 'hooks/useMergeState';
import AbrogationProposalModal from '../abrogation-proposal-modal';
import AbrogationVoteModal, { VoteAbrogationState } from '../abrogation-vote-modal';

type ProposalAbrogationCardState = {
  abrogationVoteModal: boolean;
  abrogationViewModal: boolean;
  cancelling: boolean;
};

const InitialState: ProposalAbrogationCardState = {
  abrogationVoteModal: false,
  abrogationViewModal: false,
  cancelling: false,
};

const ProposalAbrogationCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<ProposalAbrogationCardState>(InitialState);

  function handleAbrogation() {
    setState(prevState => ({
      ...prevState,
      cancelling: true,
    }));

    proposalCtx.startAbrogationProposal()
      .then(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
      });
  }

  return (
    <>
      <Card
        title={(
          <Paragraph type="p1" semiBold color="grey900">Abrogation proposal</Paragraph>
        )}>
        {proposalCtx.canceled === undefined && (
          <Grid flow="col" justify="center">
            <Antd.Spin spinning />
          </Grid>
        )}
        {proposalCtx.canceled === false && (
          <Grid flow="row" gap={24}>
            <Paragraph type="p1" color="grey900">
              This is a special type of proposal, with the following thresholds:
            </Paragraph>
            <ul>
              <li>
                <Paragraph type="p1" color="grey900">
                  Acceptance criteria: 50% of staked BOND
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  A proposal can only have one associated abrogation proposal at any given time
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  Anyone can vote on these proposals
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  There is a new snapshot for voter balances - taken at Abrogation Proposal’s start time
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  Abrogation Proposal’s duration is never greater than the Initial Proposal’s queue period
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  When someone goes to execute the Initial Proposal - there is a check if an Abrogation Proposal that
                  met its acceptance criteria exists
                </Paragraph>
              </li>
            </ul>

            <Button
              type="default"
              loading={state.cancelling}
              onClick={() => setState({ abrogationVoteModal: true })}>
              Initiate abrogation proposal
            </Button>
          </Grid>
        )}
        {proposalCtx.canceled === true && (
          <Grid flow="row" gap={24}>
            <Paragraph type="p1" color="grey900">
              Abrogation proposal currently in progress.
            </Paragraph>
            <Button
              type="primary"
              onClick={() => setState({ abrogationViewModal: true })}>
              View abrogation proposal
            </Button>
          </Grid>
        )}
      </Card>
      {state.abrogationVoteModal && (
        <AbrogationVoteModal
          visible
          voteState={VoteAbrogationState.VoteInitiate}
          onCancel={() => setState({ abrogationVoteModal: false })} />
      )}
      {state.abrogationViewModal && (
        <AbrogationProposalModal
          visible
          onCancel={() => setState({ abrogationViewModal: false })} />
      )}
    </>
  );
};

export default ProposalAbrogationCard;
