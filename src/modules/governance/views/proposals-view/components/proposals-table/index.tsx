import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import ProposalStatusTag from '../proposal-status-tag';

import { getFormattedDuration } from 'utils';
import { useWeb3Contracts } from 'web3/contracts';
import { ProposalData } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';

const Columns: ColumnsType<any> = [
  {
    title: 'PROPOSAL',
    width: '60%',
    render: (_, data: ProposalData) => (
      <Grid flow="row" gap={8}>
        <Paragraph type="p1" semiBold color="red900">{data.title}</Paragraph>
        <Grid colsTemplate="repeat(2, min-content)" gap={16}>
          <ProposalStatusTag state={data.state} />
          <Paragraph type="p2" semiBold color="red50">
            {data.time_left ? getFormattedDuration(data.time_left / 1000) : ''}
          </Paragraph>
        </Grid>
      </Grid>
    ),
  },
  {
    title: 'VOTES',
    width: '40%',
    render: (_, data: ProposalData) => {
      const { forVotesBN, againstVotesBN } = data.meta;
      const total = forVotesBN.plus(againstVotesBN);
      const forVotes = forVotesBN.multipliedBy(100).div(total);
      const againstVotes = againstVotesBN.multipliedBy(100).div(total);

      return (
        <Grid flow="row" gap={8}>
          <Antd.Progress
            className={s.progress}
            percent={forVotes.toNumber()}
            format={() => (
              <Paragraph type="p2" semiBold color="red900">{forVotesBN.toFormat()}</Paragraph>
            )} />
          <Antd.Progress
            className={s.progress}
            percent={againstVotes.toNumber()}
            format={() => (
              <Paragraph type="p2" semiBold color="red900">{againstVotesBN.toFormat()}</Paragraph>
            )} />
        </Grid>
      );
    },
  },
];

const ProposalsTable: React.FunctionComponent = () => {
  const history = useHistory();
  const web3c = useWeb3Contracts();
  const [data, setData] = React.useState<ProposalData[]>([]);

  function handleOnRow(data: ProposalData) {
    return {
      onClick: () => {
        history.push(`proposals/${data.proposal_id}`);
      },
    };
  }

  React.useEffect(() => {
    fetch(`https://bbtest.kwix.xyz/api/governance/proposals`)
      .then(result => result.json())
      .then(async result => {
        const data = await Promise.all(result.data.map(async (item: ProposalData) => {
          const [proposalState, proposalMeta] = await web3c.daoGovernance.proposalStateSend(item.proposal_id);

          return {
            ...item,
            state: proposalState,
            meta: proposalMeta,
            time_left: web3c.daoGovernance.proposalTimeLeft(proposalState, item.create_time * 1000),
          };
        }));

        setData(data as ProposalData[]);
      });
  }, []);

  return (
    <Table
      className={s.table}
      columns={Columns}
      rowKey="proposal_id"
      dataSource={data}
      title={() => ''}
      onRow={handleOnRow}
      pagination={{
        position: ['bottomRight'],
        pageSize: 10,
        total: 20,
        showTotal: (total: number, range: [number, number]) => (
          `Showing ${range[0]} to ${range[1]} out of ${total} proposals`
        ),
      }}
    />
  );
};

export default ProposalsTable;
