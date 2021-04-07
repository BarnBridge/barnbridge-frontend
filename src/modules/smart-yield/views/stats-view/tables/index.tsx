import React from 'react';
import cn from 'classnames';

import { Tabs } from 'components/custom/tabs';

import HistoryTable from './history-table';
import SeniorBondsTable from './senior-bonds-table';

const tabs = [
  {
    children: 'Transaction history',
    id: 'th',
  },
  {
    children: 'Senior bonds',
    id: 'sb',
  },
];

type Props = {
  className?: string;
};

const StatsTables: React.FC<Props> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState('th');

  const tabsComponent = <Tabs tabs={tabs} active={activeTab} onClick={setActiveTab} variation="normal" size="small" />;

  return (
    <section className={cn('card', className)}>
      {activeTab === 'th' ? <HistoryTable tabs={tabsComponent} /> : <SeniorBondsTable tabs={tabsComponent} />}
    </section>
  );
};

export default StatsTables;
