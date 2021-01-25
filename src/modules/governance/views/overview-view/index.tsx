import React from 'react';

import Grid from 'components/custom/grid';
import ActivationThreshold from './components/activation-threshold';
import VotingStatList from './components/voting-stat-list';
import VotersTable from './components/voters-table';

const OverviewView: React.FunctionComponent = () => {
  return (
    <Grid flow="row" gap={32}>
      <ActivationThreshold />
      <VotingStatList />
      <VotersTable />
    </Grid>
  );
};

export default OverviewView;
