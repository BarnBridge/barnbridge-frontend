import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, getEtherscanAddressUrl } from 'web3/utils';

import Card from 'components/antd/card';
import Table from 'components/antd/table';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { APIVoterEntity, fetchVoters } from 'modules/governance/api';

const Columns: ColumnsType<APIVoterEntity> = [
  {
    dataIndex: 'address',
    title: () => (
      <Text type="small" weight="semibold">
        Address
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="col" gap={16} align="center">
        <Identicon address={value} width={32} height={32} />
        <ExternalLink href={getEtherscanAddressUrl(value)}>
          <Text type="p1" weight="semibold" color="blue" ellipsis>
            {value}
          </Text>
        </ExternalLink>
      </Grid>
    ),
  },
  {
    dataIndex: 'bondStaked',
    title: () => (
      <Text type="small" weight="semibold">
        Staked Balance
      </Text>
    ),
    width: 200,
    align: 'right',
    render: (value: BigNumber) => (
      <Text type="p1" weight="semibold" color="primary" className="ml-auto">
        {formatBigValue(value, 2, '-', 2)}
      </Text>
    ),
  },
  {
    dataIndex: 'votingPower',
    title: () => (
      <Text type="small" weight="semibold">
        Voting Power
      </Text>
    ),
    width: 200,
    align: 'right',
    render: (value: BigNumber) => (
      <Text type="p1" weight="semibold" color="primary" className="ml-auto">
        {formatBigValue(value, 2, '-', 2)}
      </Text>
    ),
  },
  {
    dataIndex: 'votes',
    title: () => (
      <Text type="small" weight="semibold">
        Votes
      </Text>
    ),
    width: 150,
    align: 'right',
    render: (value: number) => (
      <Text type="p1" weight="semibold" color="primary" className="ml-auto">
        {value}
      </Text>
    ),
  },
  {
    dataIndex: 'proposals',
    title: () => (
      <Text type="small" weight="semibold">
        Proposals
      </Text>
    ),
    width: 150,
    align: 'right',
    render: (value: number) => (
      <Text type="p1" weight="semibold" color="primary" className="ml-auto">
        {value}
      </Text>
    ),
  },
];

export type VotersTableProps = {
  className?: string;
};

const VotersTable: React.FC<VotersTableProps> = props => {
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
        <Text type="p1" weight="semibold" color="primary">
          Voter weights
        </Text>
      }
      noPaddingBody>
      <Table<APIVoterEntity>
        className={className}
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
            <>
            <Text type="p2" weight="semibold" color="secondary" className="tablet-only desktop-only">
              Showing {from} to {to} out of {total} stakers
            </Text>
            <Text type="p2" weight="semibold" color="secondary" className="mobile-only">
              {from}..{to} of {total}
            </Text>
            </>
          ),
          onChange: setPage,
        }}
        scroll={{
          x: true
        }}
      />
    </Card>
  );
};

export default VotersTable;
