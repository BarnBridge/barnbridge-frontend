import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Popover from 'components/antd/popover';
import Grid from 'components/custom/grid';
import { Paragraph, Small } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';
import { useDAO } from '../../../../components/dao-provider';

import useMergeState from 'hooks/useMergeState';
import AbrogationProposalModal from '../abrogation-proposal-modal';
import AbrogationVoteModal, {
  VoteAbrogationState,
} from '../abrogation-vote-modal';
import { APIProposalState } from '../../../../api';

type ProposalAbrogationCardState = {
  abrogationVoteModal: boolean;
  abrogationViewModal: boolean;
  showWhyReason: boolean;
  cancelling: boolean;
};

const InitialState: ProposalAbrogationCardState = {
  abrogationVoteModal: false,
  abrogationViewModal: false,
  showWhyReason: false,
  cancelling: false,
};

const ProposalAbrogationCard: React.FunctionComponent = () => {
  const daoCtx = useDAO();
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<ProposalAbrogationCardState>(
    InitialState,
  );

  const hasThreshold = !!daoCtx.thresholdRate && daoCtx.thresholdRate >= daoCtx.minThreshold;

  return (
    <>
      <Card
        title={
          <Paragraph type="p1" semiBold color="grey900">
            Abrogation proposal
          </Paragraph>
        }>
        {proposalCtx.isCanceled === undefined && (
          <Grid flow="col" justify="center">
            <Antd.Spin spinning />
          </Grid>
        )}
        {proposalCtx.isCanceled === false && (
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
                  A proposal can only have one associated abrogation proposal at
                  any given time
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  Anyone can vote on these proposals
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  There is a new snapshot for voter balances - taken at
                  Abrogation Proposal’s start time
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  Abrogation Proposal’s duration is never greater than the
                  Initial Proposal’s queue period
                </Paragraph>
              </li>
              <li>
                <Paragraph type="p1" color="grey900">
                  When someone goes to execute the Initial Proposal - there is a
                  check if an Abrogation Proposal that met its acceptance
                  criteria exists
                </Paragraph>
              </li>
            </ul>

            <Grid flow="row" gap={8} align="center" justify="end">
              <Button
                type="default"
                loading={state.cancelling}
                disabled={!hasThreshold}
                onClick={() => setState({ abrogationVoteModal: true })}>
                Initiate abrogation proposal
              </Button>

              {!hasThreshold && (
                <Grid flow="col" gap={8} align="center">
                  <Small semiBold color="grey500">
                    You are not able to abrogate proposal.
                  </Small>
                  <Popover
                    title="Why you can’t abrogate proposal"
                    placement="bottomLeft"
                    overlayStyle={{ width: 520 }}
                    content={
                      <Paragraph type="p2" semiBold>
                        You don’t have enough voting power to create an abrogation proposal. The creator of an
                        abrogation proposal needs to have a voting power of at least {daoCtx.minThreshold}% of the
                        amount of $BOND staked in the DAO.
                      </Paragraph>
                    }
                    visible={state.showWhyReason}
                    onVisibleChange={visible =>
                      setState({ showWhyReason: visible })
                    }>
                    <Button type="link">See why</Button>
                  </Popover>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        {proposalCtx.isCanceled === true && (
          <Grid flow="row" gap={24}>
            {proposalCtx.proposal?.state === APIProposalState.QUEUED && (
              <Paragraph type="p1" color="grey900">
                Abrogation proposal currently in progress.
              </Paragraph>
            )}
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
          onCancel={() => setState({ abrogationVoteModal: false })}
        />
      )}
      {state.abrogationViewModal && (
        <AbrogationProposalModal
          visible
          onCancel={() => setState({ abrogationViewModal: false })}
        />
      )}
    </>
  );
};

export default ProposalAbrogationCard;
