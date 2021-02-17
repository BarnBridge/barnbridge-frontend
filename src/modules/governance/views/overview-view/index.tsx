import React from 'react';

import Grid from 'components/custom/grid';

import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from './components/activation-threshold';
import VotersTable from './components/voters-table';
import VotingStatList from './components/voting-stat-list';

const OverviewView: React.FC = () => {
  const dao = useDAO();

  return (
    <Grid flow="row" gap={32}>
      {dao.isActive === false && <ActivationThreshold />}
      <VotingStatList />
      <VotersTable />
    </Grid>
  );
};

export default OverviewView;
