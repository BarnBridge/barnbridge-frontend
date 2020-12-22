import React from 'react';

import VotingStatList from 'views/voting/components/voting-stat-list';
import VoterWeightsTable from 'views/voting/components/voters-table';

import s from './styles.module.scss';

const OverviewView: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <VotingStatList />
      <VoterWeightsTable />
    </div>
  );
};

export default OverviewView;
