import React from 'react';
import * as Antd from 'antd';

import VotingStatList from 'views/voting/components/voting-stat-list';
import VoterWeightsTable from 'views/voting/components/voters-table';

import s from './styles.module.scss';

export type OverviewViewProps = {
};

const OverviewView: React.FunctionComponent<OverviewViewProps> = props => {
  return (
    <div className={s.component}>
      <VotingStatList />
      <VoterWeightsTable />
    </div>
  );
};

export default OverviewView;
