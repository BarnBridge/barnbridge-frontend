import React from 'react';

import ActivationThreshold from './components/activation-threshold';
import VotingStatList from './components/voting-stat-list';
import VotersTable from './components/voters-table';

import s from './styles.module.scss';

const OverviewView: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <ActivationThreshold className="mb-32" />
      <VotingStatList className="mb-32" />
      <VotersTable className="mb-32" />
    </div>
  );
};

export default OverviewView;
