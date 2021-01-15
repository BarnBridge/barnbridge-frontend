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

import s from './styles.module.scss';

const Columns: ColumnsType<APILiteProposalEntity> = [
  {
    title: () => (
      <Small semiBold color="grey300">Proposal</Small>
    ),
    width: '70%',
    render: (_, data: APILiteProposalEntity) => (
      <Grid flow="row" gap={8}>
        <Paragraph type="p1" semiBold color="grey900">{data.title}</Paragraph>
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
      <Small semiBold color="grey300">Votes</Small>
    ),
    width: '30%',
    render: (_, data: APILiteProposalEntity) => {
      const total = data.forVotes + data.againstVotes;

      let forRate = 0;
      let againstRate = 0;

      if (total > 0) {
        forRate = data.forVotes * 100 / total;
        againstRate = data.againstVotes * 100 / total;
      }

      return (
        <Grid flow="row" gap={8}>
          <Progress
            percent={forRate}
            showInfo
            format={() => (
              <Paragraph type="p2" semiBold color="red900">
                {forRate}
              </Paragraph>
            )}
          />
          <Progress
            percent={againstRate}
            showInfo
            format={() => (
              <Paragraph type="p2" semiBold color="red900">
                {againstRate}
              </Paragraph>
            )}
          />
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
