import React from 'react';

import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';

import HistoryTable from './history-table';
import PortfolioValue from './portfolio-value';

import s from './s.module.scss';

const PortfolioOverview: React.FC = () => {
  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance
          total={103478.6708}
          aggregated={12.37}
          aggregatedColor="red"
          data={[
            ['Senior balance', 55813.4487, 'var(--theme-green-color)'],
            ['Junior balance', 103478.6708, 'var(--theme-purple-color)'],
          ]}
        />
        <PortfolioValue />
      </div>
      <HistoryTable />
    </>
  );
};

export default PortfolioOverview;
