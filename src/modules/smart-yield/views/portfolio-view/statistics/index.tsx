import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'components/antd/card';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import Table from 'components/antd/table';
import Button from 'components/antd/button';
import IconBubble from 'components/custom/icon-bubble';
import Icons from 'components/custom/icon';

const dataMock = [
  {
    address: 'asdqwe123',
    token: ['USDC', 'Compound'],
    transactionHash: '0x3633dfac138a54ada26b83f73b3acce40c657ba3',
    date: new Date(),
    amount: '25381.32',
    tranch: 'Senior',
    transactionType: 'Withdraw'
  },
];

export default function PortfolioStatistics() {
  const history = useHistory();

  const columns = [
    {
      dataIndex: 'token',
      title: () => (
        <Small semiBold>
          Token Name
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="col" gap={16} align="center">
          <IconBubble name="usdc-token" bubbleName="compound" />
          <Grid flow="row" gap={4} className="ml-auto">
            <Paragraph type="p1" semiBold color="primary">
              {value[0]}
            </Paragraph>
            <Small semiBold>{value[1]}</Small>
          </Grid>
        </Grid>
      ),
    },
    {
      dataIndex: 'transactionHash',
      title: () => (
        <Small semiBold>
          Transaction Hash
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value}
          </Paragraph>
        </Grid>
      ),
    },
    {
      dataIndex: 'date',
      title: () => (
        <Small semiBold>
          Date
        </Small>
      ),
      render: (value: Date) => (
        <>
          <Paragraph type="p1" semiBold color="green">
            {value.toLocaleDateString()}
          </Paragraph>
          <Small semiBold>
            {value.toLocaleTimeString()}
          </Small>
        </>
      ),
    },
    {
      dataIndex: 'amount',
      title: () => (
        <Small semiBold>
          Amount
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value[0]}
          </Paragraph>
          <Small semiBold>${value[1]}</Small>
        </Grid>
      ),
    },
    {
      dataIndex: 'tranch',
      title: () => (
        <Small semiBold>
          Tranch
        </Small>
      ),
      render: (value: string) => (
        <Paragraph type="p1" semiBold color="purple">
          {value}
        </Paragraph>
      ),
    },
    {
      dataIndex: 'transactionType',
      title: () => (
        <Small semiBold>
          Transaction type
        </Small>
      ),
      render: (value: string) => (
        <Paragraph type="p1" semiBold color="primary">
          {value}
        </Paragraph>
      ),
    },

  ];

  return (
    <Grid gap={32} rowsTemplate="auto auto" colsTemplate="40% 60%">
      <Card>
        <Paragraph type="p1" semiBold color="primary">
          Portfolio balance
        </Paragraph>
      </Card>
      <Card>
        <Grid flow="col" colsTemplate="1fr max-content">
          <Paragraph type="p1" semiBold color="primary">
            Portfolio value
          </Paragraph>
          <Small semiBold>Last month</Small>
        </Grid>
      </Card>
      <Card
        style={{ gridColumn: '1 / 3' }}
        noPaddingBody
        title={
          <Grid flow="col" colsTemplate="1fr max-content">
            <Paragraph type="p1" semiBold color="primary">
              Transaction history
            </Paragraph>
            <Button type="light" onClick={() => console.log('Le open filter modal')}>
              <Icons name="filter" />
              Filter
            </Button>
          </Grid>
        }>
        <Table
          bordered={false}
          columns={columns}
          dataSource={dataMock}
          rowKey="address"
          // loading={loading}
        />
      </Card>
    </Grid>
  );
}
