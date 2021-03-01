import React from 'react';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PoolsProvider from 'modules/smart-yield/views/overview-view/pools-provider';

import ActivePositionsTable from './active-positions-table';
import LockedPositionsTable from './locked-positions-table';
import PastPositionsTable from './past-positions-table';
import PortfolioValue from './portfolio-value';

import s from './s.module.scss';

const JuniorPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('locked');

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
      <PoolsProvider>
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
              <LockedPositionsTable />
            </Tabs.Tab>
            <Tabs.Tab key="past" tab="Past positions">
              <PastPositionsTable />
            </Tabs.Tab>
          </Tabs>
        </Card>
        <Card
          noPaddingBody
          title={
            <Grid flow="col" colsTemplate="1fr max-content">
              <Text type="p1" weight="semibold" color="primary">
                Active positions
              </Text>
              <Button type="light">
                <Icons name="filter" />
                Filter
              </Button>
            </Grid>
          }>
          <ActivePositionsTable />
        </Card>
      </PoolsProvider>
    </>
  );
};

export default JuniorPortfolio;
