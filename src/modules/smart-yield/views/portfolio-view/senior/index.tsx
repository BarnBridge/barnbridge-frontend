import React from 'react';

import Tabs from 'components/antd/tabs';

import PortfolioBalance from '../../../components/portfolio-balance';
import PoolsProvider from '../../overview-view/pools-provider';
import ActivePositionsList from './active-positions-list';
import FiltersPopup from './filters-popup';
import PastPositionsList from './past-positions-list';
import PortfolioValue from './portfolio-value';

import s from './s.module.scss';

const SeniorPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('active');

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <PoolsProvider>
        <Tabs simple activeKey={activeTab} onChange={setActiveTab} tabBarExtraContent={<FiltersPopup />}>
          <Tabs.Tab key="active" tab="Active positions">
            <ActivePositionsList />
          </Tabs.Tab>
          <Tabs.Tab key="past" tab="Past positions">
            <PastPositionsList />
          </Tabs.Tab>
        </Tabs>
      </PoolsProvider>
    </>
  );
};

export default SeniorPortfolio;
