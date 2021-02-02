import React from 'react';
import { useHistory } from 'react-router';
import { ColumnsType } from 'antd/lib/table/interface';

import Grid from 'components/custom/grid';
import Table from 'components/antd/table';
import Progress from 'components/antd/progress';
import { Paragraph, Small } from 'components/custom/typography';
import ProposalStatusTag from '../proposal-status-tag';
import { useProposals } from '../../providers/ProposalsProvider';

import { APILiteProposalEntity } from 'modules/governance/api';
import { getFormattedDuration } from 'utils';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import s from './styles.module.scss';

const Columns: ColumnsType<APILiteProposalEntity> = [
  {
    title: () => (
      <Small semiBold color="grey300">
        Proposal
      </Small>
    ),
    width: '70%',
    render: (_, data: APILiteProposalEntity) => (
      <Grid flow="row" gap={8}>
        <Paragraph type="p1" semiBold color="grey900">
          PID-{data.proposalId}: {data.title}
        </Paragraph>
        <Grid flow="col" gap={16} align="center">
          <ProposalStatusTag state={data.state} />
          <Paragraph type="p2" semiBold color="grey500">
            {data.stateTimeLeft ? getFormattedDuration(data.stateTimeLeft) : ''}
          </Paragraph>
        </Grid>
      </Grid>
    ),
  },
  {
    title: () => (
      <Small semiBold color="grey300">
        Votes
      </Small>
    ),
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
              strokeColor="var(--text-color-green500)"
              trailColor="rgba(var(--text-color-green500-rgb), .16)"
            />
            <Paragraph type="p2" semiBold color="grey500" align="right">
              {forRate.toFormat(2)}%
            </Paragraph>
          </Grid>
          <Grid gap={24} colsTemplate="minmax(0, 196px) 65px">
            <Progress
              percent={againstRate.toNumber()}
              strokeColor="var(--text-color-red500)"
              trailColor="rgba(var(--text-color-red500-rgb), .16)"
            />
            <Paragraph type="p2" semiBold color="grey500" align="right">
              {againstRate.toFormat(2)}%
            </Paragraph>
          </Grid>
        </Grid>
      );
    },
  },
];

const ProposalsTable: React.FunctionComponent = () => {
  const history = useHistory();
  const proposalsCtx = useProposals();

  function handlePaginationChange(page: number) {
    proposalsCtx.changePage(page);
  }

  function handleOnRow(data: APILiteProposalEntity) {
    return {
      onClick: () => {
        history.push(`proposals/${data.proposalId}`);
      },
    };
  }

  return (
    <Table<APILiteProposalEntity>
      className={s.table}
      title={() => ''}
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
          <Paragraph type="p2" semiBold color="grey500">
            Showing {from} to {to} out of {total} proposals
          </Paragraph>
        ),
        onChange: handlePaginationChange,
      }}
      onRow={handleOnRow}
    />
  );
};

export default ProposalsTable;
