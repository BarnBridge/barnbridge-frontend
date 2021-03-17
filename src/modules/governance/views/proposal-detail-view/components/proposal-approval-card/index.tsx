import React from 'react';

import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';

import { useProposal } from '../../providers/ProposalProvider';

const ProposalApprovalCard: React.FC = () => {
  const proposalCtx = useProposal();

  const passed = (proposalCtx.forRate ?? 0) >= (proposalCtx.proposal?.acceptanceThreshold ?? 0);

  return (
    <div className="card">
      <div className="card-header">
        <Hint text="Approval is the percentage of votes on a proposal that the total support must be greater than for the proposal to be approved. For example, if “Approval” is set to 51%, then more than 51% of the votes on a proposal must vote “Yes” for the proposal to pass.">
          <Text type="p1" weight="semibold" color="primary">
            Approval
          </Text>
        </Hint>
      </div>
      <Grid className="p-24" flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Text type="p1" weight="semibold" color="primary">
            {proposalCtx.forRate?.toFixed(2)}%
          </Text>
          <Text type="p1" color="secondary">
            (&gt; {proposalCtx.proposal?.acceptanceThreshold}% required)
          </Text>
        </Grid>
        <Progress
          percent={proposalCtx.forRate}
          acceptance={proposalCtx.proposal?.acceptanceThreshold}
          strokeColor={passed ? 'var(--theme-green-color)' : 'var(--theme-red-color)'}
          trailColor={passed ? 'rgba(var(--theme-green-color-rgb), .16)' : 'rgba(var(--theme-red-color-rgb), .16)'}
        />
      </Grid>
    </div>
  );
};

export default ProposalApprovalCard;
