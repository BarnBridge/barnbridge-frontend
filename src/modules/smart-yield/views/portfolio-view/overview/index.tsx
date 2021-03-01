import React from 'react';

import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

import HistoryTable from './history-table';

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
            ['Senior balance', 55813.4487, 'var(--theme-purple-color)'],
            ['Junior balance', 103478.6708, 'var(--theme-green-color)'],
          ]}
        />
        <PortfolioValue />
      </div>
      <HistoryTable />
    </>
  );
};

export default PortfolioOverview;
