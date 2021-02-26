import React from 'react';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Tabs from 'components/antd/tabs';
import Icons from 'components/custom/icon';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

import ActiveTokensTable from './active-tokens-table';
import LockedTokensTable from './locked-tokens-table';

import s from './s.module.scss';

const JuniorPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('locked');

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <Card className="mb-32" noPaddingBody>
        <Tabs
          simple
          className={s.tabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button type="light">
              <Icons name="filter" />
              Filter
            </Button>
          }>
          <Tabs.Tab key="locked" tab="Locked positions">
            <LockedTokensTable />
          </Tabs.Tab>
          <Tabs.Tab key="past" tab="Past positions" />
        </Tabs>
      </Card>
      <ActiveTokensTable />
    </>
  );
};

export default JuniorPortfolio;
