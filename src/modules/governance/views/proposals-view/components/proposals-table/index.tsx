import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Progress from 'components/antd/progress';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { APILiteProposalEntity } from 'modules/governance/api';

import { useProposals } from '../../providers/ProposalsProvider';
import ProposalStatusTag from '../proposal-status-tag';

import { getFormattedDuration } from 'utils';

const Columns: ColumnsType<APILiteProposalEntity> = [
  {
    title: 'Proposal',
    width: '70%',
    render: (_, data: APILiteProposalEntity) => (
      <Grid flow="row" gap={8}>
        <Link to={`proposals/${data.proposalId}`}>
          <Text type="p1" weight="semibold" color="primary">
            PID-{data.proposalId}: {data.title}
          </Text>
        </Link>
        <Grid flow="col" gap={16} align="center">
          <ProposalStatusTag state={data.state} />
          <Text type="p2" weight="semibold" color="secondary">
            {data.stateTimeLeft ? `${getFormattedDuration(data.stateTimeLeft)} left` : ''}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: 'Votes',
    width: '30%',
    render: (_, data: APILiteProposalEntity) => {
      const total = data.forVotes.plus(data.againstVotes);

      let forRate = ZERO_BIG_NUMBER;
      let againstRate = ZERO_BIG_NUMBER;

      if (total.gt(ZERO_BIG_NUMBER)) {
        forRate = data.forVotes.multipliedBy(100).div(total);
        againstRate = data.againstVotes.multipliedBy(100).div(total);
      }

      return (
        <Grid flow="row" gap={8}>
          <Grid gap={24} colsTemplate="minmax(0, 196px) 65px">
            <Progress
              percent={forRate.toNumber()}
              strokeColor="var(--theme-green-color)"
              trailColor="rgba(var(--theme-green-color-rgb), .16)"
            />
            <Text type="p2" weight="semibold" color="secondary" align="right">
              {forRate.toFormat(2)}%
            </Text>
          </Grid>
          <Grid gap={24} colsTemplate="minmax(0, 196px) 65px">
            <Progress
              percent={againstRate.toNumber()}
              strokeColor="var(--theme-red-color)"
              trailColor="rgba(var(--theme-red-color-rgb), .16)"
            />
            <Text type="p2" weight="semibold" color="secondary" align="right">
              {againstRate.toFormat(2)}%
            </Text>
          </Grid>
        </Grid>
      );
    },
  },
];

const ProposalsTable: React.FC = () => {
  const proposalsCtx = useProposals();

  function handlePaginationChange(page: number) {
    proposalsCtx.changePage(page);
  }

  return (
    <Table<APILiteProposalEntity>
      inCard
      columns={Columns}
      dataSource={proposalsCtx.proposals}
      rowKey="proposalId"
      loading={proposalsCtx.loading}
      locale={{
        emptyText: 'No proposals',
      }}
      pagination={{
        total: proposalsCtx.total,
        current: proposalsCtx.page,
        pageSize: proposalsCtx.pageSize,
        position: ['bottomRight'],
        showTotal: (total: number, [from, to]: [number, number]) => (
          <Text type="p2" weight="semibold" color="secondary">
            Showing {from} to {to} out of {total} proposals
          </Text>
        ),
        onChange: handlePaginationChange,
      }}
    />
  );
};

export default ProposalsTable;
