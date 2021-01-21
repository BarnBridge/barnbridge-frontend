import React from 'react';

import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

const ProposalQuorumCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card
      title={(
        <Paragraph type="p1" semiBold color="grey900">Quorum</Paragraph>
      )}>
      <Grid flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Paragraph type="p1" semiBold color="grey900">
            {proposalCtx.quorum?.toFixed(2)}%
          </Paragraph>
          <Paragraph type="p1" color="grey500">
            (&gt; {proposalCtx.proposal?.minQuorum}% required)
          </Paragraph>
        </Grid>
        <Progress
          percent={proposalCtx.quorum}
          acceptance={proposalCtx.proposal?.minQuorum}
          strokeColor="var(--text-color-green500)"
          trailColor="rgba(var(--text-color-green500-rgb), .16)" />
      </Grid>
    </Card>
  );
};

export default ProposalQuorumCard;
