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
        <PortfolioBalance
          total={103478.6708}
          aggregated={20.44}
          aggregatedColor="purple"
          data={[
            ['Active balance ',  95883.4489, 'var(--theme-purple700-color)'],
            ['Locked blanace', 7595.2219, 'var(--theme-purple-color)'],
          ]}
        />
        <PortfolioValue />
      </div>
      <LockedTokensTable />
      <ActiveTokensTable />
    </>
  );
};

export default JuniorPortfolio;
