import React from 'react';

import Tabs from 'components/antd/tabs';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import FiltersPopup from 'modules/smart-yield/views/portfolio-view/senior/filters-popup';

import ActivePositionsList from './active-positions-list';

import s from './s.module.scss';

const SeniorPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('active');

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance
          total={55813.4487}
          aggregated={6.37}
          aggregatedColor="green"
          data={[
            ['Deposited ',  50883.4489, 'var(--theme-green700-color)'],
            ['Redeemable', 55813.4487, 'var(--theme-green-color)'],
          ]}
        />
        <PortfolioValue />
      </div>
      <Tabs simple activeKey={activeTab} onChange={setActiveTab} tabBarExtraContent={<FiltersPopup />}>
        <Tabs.Tab key="active" tab="Active positions">
          <ActivePositionsList />
        </Tabs.Tab>
        <Tabs.Tab key="past" tab="Past positions" />
      </Tabs>
    </>
  );
};

export default SeniorPortfolio;
