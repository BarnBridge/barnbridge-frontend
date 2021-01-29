import React from 'react';

import Grid from 'components/custom/grid';
import ActivationThreshold from './components/activation-threshold';
import VotingStatList from './components/voting-stat-list';
import VotersTable from './components/voters-table';
import { useDAO } from '../../components/dao-provider';

const OverviewView: React.FunctionComponent = () => {
  const dao = useDAO();

  return (
    <Grid flow="row" gap={32}>
      {dao.activationRate! < 100 && <ActivationThreshold />}
      <VotingStatList />
      <VotersTable />
    </Grid>
  );
};

export default OverviewView;
