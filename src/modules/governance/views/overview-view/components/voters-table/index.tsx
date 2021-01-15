import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';

import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Paragraph, Small } from 'components/custom/typography';

import { APIVoterEntity, fetchVoters } from 'modules/governance/api';
import { formatBigValue } from 'web3/utils';

import s from './styles.module.scss';

const Columns: ColumnsType<APIVoterEntity> = [
  {
    dataIndex: 'address',
    title: () => (
      <Small semiBold color="grey300">Address</Small>
    ),
    render: (value: string) => (
      <Grid flow="col" gap={16} align="center">
        <Identicon className={s.identicon} address={value} />
        <Paragraph type="p1" semiBold color="grey900" className="ml-auto">
          {value}
        </Paragraph>
      </Grid>
    ),
  },
  {
    dataIndex: 'votingPower',
    title: () => (
      <Small semiBold color="grey300">Voting Power</Small>
    ),
    width: 160,
    align: 'right',
    render: (value: BigNumber) => (
      <Paragraph type="p1" semiBold color="grey900" className="ml-auto">
        {formatBigValue(value, 4)}
      </Paragraph>
    ),
  },
  {
    dataIndex: 'votes',
    title: () => (
      <Small semiBold color="grey300">Votes</Small>
    ),
    width: 160,
    align: 'right',
    render: (value: number) => (
      <Paragraph type="p1" semiBold color="grey900" className="ml-auto">
        {value}
      </Paragraph>
    ),
  },
  {
    dataIndex: 'proposals',
    title: () => (
      <Small semiBold color="grey300">Proposals</Small>
    ),
    width: 160,
    align: 'right',
    render: (value: number) => (
      <Paragraph type="p1" semiBold color="grey900" className="ml-auto">
        {value}
      </Paragraph>
    ),
  },
];

export type VotersTableProps = {
  className?: string;
};

const VotersTable: React.FunctionComponent<VotersTableProps> = props => {
  const { className } = props;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [voters, setVoters] = React.useState<APIVoterEntity[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const pageSize = 10;

  React.useEffect(() => {
    setLoading(true);

    fetchVoters(page, pageSize)
      .then(data => {
        setVoters(data.data);
        setTotal(data.meta.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page, pageSize]);

  return (
    <Table<APIVoterEntity>
      className={className}
      title={() => (
        <Paragraph type="p1" semiBold color="grey900">Voter weights</Paragraph>
      )}
      columns={Columns}
      dataSource={voters}
      rowKey="address"
      loading={loading}
      pagination={{
        total,
        pageSize,
        current: page,
        position: ['bottomRight'],
        showTotal: (total: number, [from, to]: [number, number]) => (
          <Paragraph type="p2" semiBold color="grey500">
            Showing {from} to {to} out of {total} voters
          </Paragraph>
        ),
        onChange: setPage,
      }}
    />
  );
};

export default VotersTable;
