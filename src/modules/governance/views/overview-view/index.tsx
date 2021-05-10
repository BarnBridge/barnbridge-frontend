import React from 'react';

import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from './components/activation-threshold';
import VotersTable from './components/voters-table';
import VotingStatList from './components/voting-stat-list';

const OverviewView: React.FC = () => {
  const daoCtx = useDAO();

  return (
    <>
      {daoCtx.isActive === false && <ActivationThreshold className="full-width mb-32" />}
      <VotingStatList className="mb-32" />
      <VotersTable />
    </>
  );
};

export default OverviewView;
