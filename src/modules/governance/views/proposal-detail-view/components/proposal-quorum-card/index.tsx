import React from 'react';

import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Hint, Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

const ProposalQuorumCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  const passed = (proposalCtx.quorum ?? 0) >= (proposalCtx.proposal?.minQuorum ?? 0);

  return (
    <Card
      title={
        <Hint
          text="Quorum is the percentage of the amount of tokens staked in the DAO that support for a proposal must be greater than for the proposal to be considered valid. For example, if the Quorum % is set to 20%, then more than 20% of the amount of tokens staked in the DAO must vote to approve a proposal for the vote to be considered valid.">
          <Paragraph type="p1" semiBold color="primary">
            Quorum
          </Paragraph>
        </Hint>
      }>
      <Grid flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Paragraph type="p1" semiBold color="primary">
            {proposalCtx.quorum?.toFixed(2)}%
          </Paragraph>
          <Paragraph type="p1" color="secondary">
            (&gt; {proposalCtx.proposal?.minQuorum}% required)
          </Paragraph>
        </Grid>
        <Progress
          percent={proposalCtx.quorum}
          acceptance={proposalCtx.proposal?.minQuorum}
          strokeColor={passed ? 'var(--theme-green-color)' : 'var(--theme-red-color)'}
          trailColor={passed ? 'rgba(var(--theme-green-color-rgb), .16)' : 'rgba(var(--theme-red-color-rgb), .16)'}
        />
      </Grid>
    </Card>
  );
};

export default ProposalQuorumCard;
