import React from 'react';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
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
  const [filtersVisible, setFiltersVisible] = React.useState<boolean>(false);
  const [filtersActiveVisible, setFiltersActiveVisible] = React.useState<boolean>(false);

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance
          total={103478.6708}
          aggregated={20.44}
          aggregatedColor="purple"
          data={[
            ['Active balance ', 95883.4489, 'var(--theme-purple-color)'],
            ['Locked blanace', 7595.2219, 'var(--theme-purple700-color)'],
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
              <Popover
                title="Filters"
                overlayStyle={{ width: 348 }}
                content={<Filters />}
                visible={filtersVisible}
                onVisibleChange={setFiltersVisible}
                placement="bottomRight">
                <button type="button" className="button-ghost-monochrome ml-auto mb-12">
                  <Icons name="filter" className="mr-8" color="inherit" />
                  Filter
                </button>
              </Popover>
            }>
            <Tabs.Tab key="locked" tab="Locked positions">
              <LockedPositionsTable />
            </Tabs.Tab>
            <Tabs.Tab key="past" tab="Past positions">
              <PastPositionsTable />
            </Tabs.Tab>
          </Tabs>
        </Card>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 12px 12px 24px' }}>
            <Text type="p1" weight="semibold" color="primary">
              Active positions
            </Text>
            <Popover
              title="Filters"
              overlayStyle={{ width: 348 }}
              content={<Filters />}
              visible={filtersActiveVisible}
              onVisibleChange={setFiltersActiveVisible}
              placement="bottomRight">
              <button type="button" className="button-ghost-monochrome ml-auto">
                <Icons name="filter" className="mr-8" color="inherit" />
                Filter
              </button>
            </Popover>
          </div>
          <ActivePositionsTable />
        </div>
      </PoolsProvider>
    </>
  );
};

export default JuniorPortfolio;

const originatorFilterOptions = [
  {
    label: 'All originators',
    value: 1,
  },
  {
    label: 'All originators 2',
    value: 2,
  },
];

const tokenFilterOptions = [
  {
    label: 'All tokens',
    value: 1,
  },
  {
    label: 'All tokens 2',
    value: 2,
  },
];

const transactionFilterOptions = [
  {
    label: 'All transactions',
    value: 1,
  },
  {
    label: 'All transactions 2',
    value: 2,
  },
];

type FormValues = {
  originator?: string;
  token?: string;
  transactionType?: string;
};

const Filters: React.FC = () => {
  const [form] = Antd.Form.useForm<FormValues>();

  const handleFinish = React.useCallback((values: FormData) => {
    console.log(values);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        originator: originatorFilterOptions[0].value,
        token: tokenFilterOptions[0].value,
        transactionType: transactionFilterOptions[0].value,
      }}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={originatorFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select loading={false} disabled={false} options={tokenFilterOptions} fixScroll style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Transaction type" name="transactionType" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={transactionFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div className="grid flow-col align-center justify-space-between">
        <button type="button" onClick={() => form.resetFields()} className="button-text">
          Reset filters
        </button>
        <button type="submit" className="button-primary">
          Apply filters
        </button>
      </div>
    </Form>
  );
};
