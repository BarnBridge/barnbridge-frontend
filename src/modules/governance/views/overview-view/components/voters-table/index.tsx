import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import ExternalLink from 'components/custom/externalLink';
import { Paragraph, Small } from 'components/custom/typography';

import { APIVoterEntity, fetchVoters } from 'modules/governance/api';
import { formatBigValue, getEtherscanAddressUrl } from 'web3/utils';

const Columns: ColumnsType<APIVoterEntity> = [
  {
    dataIndex: 'address',
    title: () => (
      <Small semiBold>
        Address
      </Small>
    ),
    render: (value: string) => (
      <Grid flow="col" gap={16} align="center">
        <Identicon address={value} width={32} height={32} />
        <ExternalLink href={getEtherscanAddressUrl(value)}>
          <Paragraph type="p1" semiBold color="blue" ellipsis>
            {value}
          </Paragraph>
        </ExternalLink>
      </Grid>
    ),
  },
  {
    dataIndex: 'bondStaked',
    title: () => (
      <Small semiBold>
        Staked Balance
      </Small>
    ),
    width: 200,
    align: 'right',
    render: (value: BigNumber) => (
      <Paragraph type="p1" semiBold color="primary" className="ml-auto">
        {formatBigValue(value, 2, '-', 2)}
      </Paragraph>
    ),
  },
  {
    dataIndex: 'votingPower',
    title: () => (
      <Small semiBold>
        Voting Power
      </Small>
    ),
    width: 200,
    align: 'right',
    render: (value: BigNumber) => (
      <Paragraph type="p1" semiBold color="primary" className="ml-auto">
        {formatBigValue(value, 2, '-', 2)}
      </Paragraph>
    ),
  },
  {
    dataIndex: 'votes',
    title: () => (
      <Small semiBold>
        Votes
      </Small>
    ),
    width: 150,
    align: 'right',
    render: (value: number) => (
      <Paragraph type="p1" semiBold color="primary" className="ml-auto">
        {value}
      </Paragraph>
    ),
  },
  {
    dataIndex: 'proposals',
    title: () => (
      <Small semiBold>
        Proposals
      </Small>
    ),
    width: 150,
    align: 'right',
    render: (value: number) => (
      <Paragraph type="p1" semiBold color="primary" className="ml-auto">
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
    <Card
      title={
        <Paragraph type="p1" semiBold color="primary">
          Voter weights
        </Paragraph>
      }
      noPaddingBody>
      <Table<APIVoterEntity>
        className={className}
        bordered={false}
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
            <Paragraph type="p2" semiBold color="secondary">
              Showing {from} to {to} out of {total} stakers
            </Paragraph>
          ),
          onChange: setPage,
        }}
      />
    </Card>
  );
};

export default VotersTable;
