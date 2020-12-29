import React from 'react';
import * as Antd from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import Button from 'components/antd/button';
import Tabs from 'components/antd/tabs';

import ProposalsTable from './components/proposals-table';

import s from './styles.module.scss';

const ProposalsView: React.FunctionComponent = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = React.useState<string>('all-proposals');

  function handleCreate() {
    history.push('proposals/create');
  }

  return (
    <div className={s.component}>
      <div className={s.viewHeader}>
        <div className={s.viewHeaderLabel}>Proposals</div>
        <Button type="primary" onClick={handleCreate}>
          Create proposal
        </Button>
      </div>
      <Tabs
        className={s.tabs}
        tabBarExtraContent={(
          <Antd.Input
            className={s.search}
            prefix={<SearchOutlined />}
            placeholder="Search proposal" />
        )}
        defaultActiveKey={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.Tab key="all-proposals" tab="All proposals">
          <ProposalsTable />
        </Tabs.Tab>
        <Tabs.Tab key="active" tab="Active">
          <ProposalsTable />
        </Tabs.Tab>
        <Tabs.Tab key="executed" tab="Executed">
          <ProposalsTable />
        </Tabs.Tab>
        <Tabs.Tab key="failed" tab="Failed">
          <ProposalsTable />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default ProposalsView;
