import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Tabs from 'components/antd/tabs';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Heading } from 'components/custom/typography';
import ProposalsProvider, { useProposals } from 'modules/governance/views/proposals-view/providers/ProposalsProvider';
import ProposalsTable from './components/proposals-table';

import { useDebounce } from 'hooks/useDebounce';

import s from './styles.module.scss';

const ProposalsViewInner: React.FunctionComponent = () => {
  const history = useHistory();
  const proposalsCtx = useProposals();

  function handleStateChange(stateFilter: string) {
    proposalsCtx.changeStateFilter(stateFilter);
  }

  const handleSearchChange = useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    proposalsCtx.changeSearchFilter(ev.target.value);
  }, 400);

  return (
    <Grid flow="row" gap={32}>
      <Grid flow="col" align="center" justify="space-between">
        <Heading type="h1" bold color="grey900">Proposals</Heading>
        <Button type="primary" onClick={() => history.push('proposals/create')}>
          Create proposal
        </Button>
      </Grid>

      <div>
        <Tabs
          className={s.tabs}
          tabBarExtraContent={(
            <Antd.Input
              className={s.search}
              prefix={<SearchOutlined />}
              placeholder="Search proposal"
              onChange={handleSearchChange} />
          )}
          defaultActiveKey={proposalsCtx.stateFilter}
          onChange={handleStateChange}
        >
          <Tabs.Tab key="all" tab="All proposals" />
          <Tabs.Tab key="active" tab="Active" />
          <Tabs.Tab key="executed" tab="Executed" />
          <Tabs.Tab key="failed" tab="Failed" />
        </Tabs>
        <ProposalsTable />
      </div>
    </Grid>
  );
};

const ProposalsView = () => {
  return (
    <ProposalsProvider>
      <ProposalsViewInner />
    </ProposalsProvider>
  );
};

export default ProposalsView;
