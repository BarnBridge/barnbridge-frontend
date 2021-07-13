import React from 'react';
import AntdSpin from 'antd/lib/spin';

import Button from 'components/antd/button';
import Popover from 'components/antd/popover';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { APIProposalState } from 'modules/governance/api';

import { useDAO } from '../../../../components/dao-provider';
import { useProposal } from '../../providers/ProposalProvider';
import AbrogationProposalModal from '../abrogation-proposal-modal';
import AbrogationVoteModal, { VoteAbrogationState } from '../abrogation-vote-modal';

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

const ProposalAbrogationCard: React.FC = () => {
  const daoCtx = useDAO();
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<ProposalAbrogationCardState>(InitialState);

  const hasThreshold = !!daoCtx.thresholdRate && daoCtx.thresholdRate >= daoCtx.minThreshold;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <Text type="p1" weight="semibold" color="primary">
            Abrogation proposal
          </Text>
        </div>
        <div className="p-24">
          {proposalCtx.isCanceled === undefined && (
            <Grid flow="col" justify="center">
              <AntdSpin spinning />
            </Grid>
          )}
          {proposalCtx.isCanceled === false && (
            <Grid flow="row" gap={24}>
              <Text type="p1" color="primary">
                This is a special type of proposal, with the following thresholds:
              </Text>
              <ul>
                <li>
                  <Text type="p1" color="primary">
                    Acceptance criteria: 50% of staked BOND
                  </Text>
                </li>
                <li>
                  <Text type="p1" color="primary">
                    A proposal can only have one associated abrogation proposal at any given time
                  </Text>
                </li>
                <li>
                  <Text type="p1" color="primary">
                    Anyone can vote on these proposals
                  </Text>
                </li>
                <li>
                  <Text type="p1" color="primary">
                    There is a new snapshot for voter balances - taken at Abrogation Proposal’s start time
                  </Text>
                </li>
                <li>
                  <Text type="p1" color="primary">
                    Abrogation Proposal’s duration is never greater than the Initial Proposal’s queue period
                  </Text>
                </li>
                <li>
                  <Text type="p1" color="primary">
                    When someone goes to execute the Initial Proposal - there is a check if an Abrogation Proposal that
                    met its acceptance criteria exists
                  </Text>
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
                    <Text type="small" weight="semibold" color="secondary">
                      You are not able to abrogate proposal.
                    </Text>
                    <Popover
                      title="Why you can’t abrogate proposal"
                      placement="bottomLeft"
                      overlayStyle={{ width: 520 }}
                      content={
                        <Text type="p2" weight="semibold">
                          You don’t have enough voting power to create an abrogation proposal. The creator of an
                          abrogation proposal needs to have a voting power of at least {daoCtx.minThreshold}% of the
                          amount of $BOND staked in the DAO.
                        </Text>
                      }
                      visible={state.showWhyReason}
                      onVisibleChange={visible => setState({ showWhyReason: visible })}>
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
                <Text type="p1" color="primary">
                  Abrogation proposal currently in progress.
                </Text>
              )}
              <Button type="primary" onClick={() => setState({ abrogationViewModal: true })}>
                View abrogation proposal
              </Button>
            </Grid>
          )}
        </div>
      </div>

      {state.abrogationVoteModal && (
        <AbrogationVoteModal
          voteState={VoteAbrogationState.VoteInitiate}
          onCancel={() => setState({ abrogationVoteModal: false })}
        />
      )}
      {state.abrogationViewModal && (
        <AbrogationProposalModal onCancel={() => setState({ abrogationViewModal: false })} />
      )}
    </>
  );
};

export default ProposalAbrogationCard;
