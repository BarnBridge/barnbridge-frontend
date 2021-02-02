import React from 'react';

import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

const ProposalApprovalCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  return (
    <Card
      title={
        <Paragraph type="p1" semiBold color="grey900">
          Approval
        </Paragraph>
      }>
      <Grid flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Paragraph type="p1" semiBold color="grey900">
            {proposalCtx.forRate?.toFixed(2)}%
          </Paragraph>
          <Paragraph type="p1" color="grey500">
            (&gt; {proposalCtx.proposal?.acceptanceThreshold}% required)
          </Paragraph>
        </Grid>
        <Progress
          percent={proposalCtx.forRate}
          acceptance={proposalCtx.proposal?.acceptanceThreshold}
          strokeColor="var(--text-color-red500)"
          trailColor="rgba(var(--text-color-red500-rgb), .16)"
        />
      </Grid>
    </Card>
  );
};

export default ProposalApprovalCard;
