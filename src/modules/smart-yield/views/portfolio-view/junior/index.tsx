import React from 'react';

import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

import ActiveTokensTable from './active-tokens-table';
import LockedTokensTable from './locked-tokens-table';

import s from './s.module.scss';

const JuniorPortfolio: React.FC = () => {
  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <LockedTokensTable />
      <ActiveTokensTable />
    </>
  );
};

export default JuniorPortfolio;
