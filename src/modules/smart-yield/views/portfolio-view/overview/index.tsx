import React from 'react';

import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';

import HistoryTable from './history-table';
import PortfolioValue from './portfolio-value';

import s from './s.module.scss';

const PortfolioOverview: React.FC = () => {
  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <HistoryTable />
    </>
  );
};

export default PortfolioOverview;
