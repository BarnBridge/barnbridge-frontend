import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { useAbrogation } from '../../providers/AbrogationProvider';
import AbrogationVotersModal from '../abrogation-voters-modal';

import s from './styles.module.scss';

const AbrogationVoteResultsCard: React.FC = () => {
  const abrogationCtx = useAbrogation();
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
                {abrogationCtx.abrogation?.forVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({abrogationCtx.forRate?.toFixed(2)}%)
              </Text>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4} align="end">
            <Text type="small" weight="semibold" color="secondary" align="right">
              Against
            </Text>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {abrogationCtx.abrogation?.againstVotes.toFormat(2)}
              </Text>
              <Text type="p1" color="secondary">
                ({abrogationCtx.againstRate?.toFixed(2)}%)
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <Progress
          percent={abrogationCtx.forRate}
          strokeColor="var(--theme-green-color)"
          trailColor="var(--theme-red-color)"
        />
      </Grid>
      <Grid flow="row" className={s.row}>
        <Grid flow="col" justify="space-between">
          <div />
          <Grid flow="row" gap={4} align="end">
            <Hint
              text="Approval is the percentage of votes on a proposal that the total support must be greater than for the proposal to be approved. For example, if “Approval” is set to 51%, then more than 51% of the votes on a proposal must vote “Yes” for the proposal to pass.">
              <Text type="small" weight="semibold" color="secondary" align="right">
                Approval
              </Text>
            </Hint>
            <Grid flow="col" gap={8}>
              <Text type="p1" weight="semibold" color="primary">
                {abrogationCtx.forRate?.toFixed(2)}%
              </Text>
              <Text type="p1" color="secondary">
                (&gt; {abrogationCtx.acceptanceThreshold}% required)
              </Text>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {votersModal && (
        <AbrogationVotersModal onCancel={() => showVotersModal(false)} />
      )}
    </Card>
  );
};

export default AbrogationVoteResultsCard;
