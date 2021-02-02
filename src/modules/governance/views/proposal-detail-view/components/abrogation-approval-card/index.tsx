import React from 'react';

import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import { useAbrogation } from '../../providers/AbrogationProvider';

const AbrogationApprovalCard: React.FunctionComponent = () => {
  const abrogationCtx = useAbrogation();

  return (
    <Card
      title={
        <Paragraph type="p1" semiBold color="grey900"
                   hint="Approval is the percentage of votes on a proposal that the total support must be greater than for the proposal to be approved. For example, if “Approval” is set to 51%, then more than 51% of the votes on a proposal must vote “Yes” for the proposal to pass.">
          Abrogation proposal approval
        </Paragraph>
      }>
      <Grid flow="row" gap={16}>
        <Grid flow="col" gap={8}>
          <Paragraph type="p1" semiBold color="grey900">
            {abrogationCtx.approvalRate?.toFixed(2)}%
          </Paragraph>
          <Paragraph type="p1" color="grey500">
            (&gt; {abrogationCtx.acceptanceThreshold}% required)
          </Paragraph>
        </Grid>
        <Progress
          percent={abrogationCtx.approvalRate}
          acceptance={abrogationCtx.acceptanceThreshold}
          strokeColor="var(--text-color-red500)"
          trailColor="rgba(var(--text-color-red500-rgb), .16)"
        />
      </Grid>
    </Card>
  );
};

export default AbrogationApprovalCard;
