import React from 'react';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';

import { useProposal } from '../../providers/ProposalProvider';
import ProposalVotersModal from '../proposal-voters-modal';

import s from './styles.module.scss';

const ProposalVoteResultsCard: React.FC = () => {
  const proposalCtx = useProposal();
  const [votersModal, showVotersModal] = React.useState<boolean>(false);

  return (
    <Card
      className={s.component}
      title={
        <Text type="p1" weight="semibold" color="primary">
          Vote results
        </Text>
      }
      extra={
        <Button type="link" onClick={() => showVotersModal(true)}>
          View voters
        </Button>
      }>
      <Grid flow="row" className={s.row}>
        <Grid flow="col" justify="space-between">
          <Grid flow="row" gap={4}>
            <Text type="small" weight="semibold" color="secondary">
              For
            </Text>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {proposalCtx.proposal?.forVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({proposalCtx.forRate?.toFixed(2)}%)
              </Text>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4} align="end">
            <Text type="small" weight="semibold" color="secondary" align="right">
              Against
            </Text>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {proposalCtx.proposal?.againstVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({proposalCtx.againstRate?.toFixed()}%)
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Progress
          percent={proposalCtx.forRate}
          strokeColor="var(--theme-green-color)"
          trailColor="var(--theme-red-color)"
        />
      </Grid>
      <Grid flow="row" className={s.row}>
        <Grid flow="col" justify="space-between">
          <Grid flow="row" gap={4}>
            <Hint text="Quorum is the percentage of the amount of tokens staked in the DAO that support for a proposal must be greater than for the proposal to be considered valid. For example, if the Quorum % is set to 20%, then more than 20% of the amount of tokens staked in the DAO must vote to approve a proposal for the vote to be considered valid.">
              <Text type="small" weight="semibold" color="secondary">
                Quorum
              </Text>
            </Hint>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {proposalCtx.quorum?.toFixed(2)}%
              </Text>
              <Text type="p1" color="secondary">
                (&gt; {proposalCtx.proposal?.minQuorum}% required)
              </Text>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4} align="end">
            <Hint text="Approval is the percentage of votes on a proposal that the total support must be greater than for the proposal to be approved. For example, if “Approval” is set to 51%, then more than 51% of the votes on a proposal must vote “Yes” for the proposal to pass.">
              <Text type="small" weight="semibold" color="secondary" align="right">
                Approval
              </Text>
            </Hint>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {proposalCtx.forRate?.toFixed(2)}%
              </Text>
              <Text type="p1" color="secondary">
                (&gt; {proposalCtx.proposal?.acceptanceThreshold}% required)
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {votersModal && <ProposalVotersModal onCancel={() => showVotersModal(false)} />}
    </Card>
  );
};

export default ProposalVoteResultsCard;
