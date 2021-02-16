import React from 'react';

import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Hint, Paragraph } from 'components/custom/typography';
import { useAbrogation } from '../../providers/AbrogationProvider';

const AbrogationApprovalCard: React.FunctionComponent = () => {
  const abrogationCtx = useAbrogation();

  const passed = (abrogationCtx.approvalRate ?? 0) >= (abrogationCtx.acceptanceThreshold ?? 0);

  return (
    <Card
      title={
        <Hint
          text="Approval is the percentage of votes on a proposal that the total support must be greater than for the proposal to be approved. For example, if “Approval” is set to 51%, then more than 51% of the votes on a proposal must vote “Yes” for the proposal to pass.">
          <Paragraph type="p1" semiBold color="primary">
            Abrogation proposal approval
          </Paragraph>
        </Hint>
      }>
      <Grid flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Paragraph type="p1" semiBold color="primary">
            {abrogationCtx.approvalRate?.toFixed(2)}%
          </Paragraph>
          <Paragraph type="p1" color="secondary">
            (&gt; {abrogationCtx.acceptanceThreshold}% required)
          </Paragraph>
        </Grid>
        <Progress
          percent={abrogationCtx.approvalRate}
          acceptance={abrogationCtx.acceptanceThreshold}
          strokeColor={passed ? 'var(--theme-green-color)' : 'var(--theme-red-color)'}
          trailColor={passed ? 'rgba(var(--theme-green-color-rgb), .16)' : 'rgba(var(--theme-red-color-rgb), .16)'}
        />
      </Grid>
    </Card>
  );
};

export default AbrogationApprovalCard;
