import React from 'react';

import VotingStatList from './components/voting-stat-list';
import VotersTable from './components/voters-table';

import s from './styles.module.scss';

const OverviewView: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <VotingStatList />
      <VotersTable />
    </div>
  );
};

export default OverviewView;
