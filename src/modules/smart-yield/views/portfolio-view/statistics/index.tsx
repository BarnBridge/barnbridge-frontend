import React from 'react';
import { shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

const dataMock = [
  {
    address: 'asdqwe123',
    token: ['USDC', 'Compound'],
    transactionHash: '0x3633dfac138a54ada26b83f73b3acce40c657ba3',
    date: new Date(),
    amount: '25381.32',
    tranch: 'Senior',
    transactionType: 'Withdraw',
  },
];

const columns = [
  {
    dataIndex: 'token',
    title: () => (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name="usdc-token" bubbleName="compound" />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {value[0]}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {value[1]}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    dataIndex: 'transactionHash',
    title: () => (
      <Text type="small" weight="semibold">
        Transaction Hash
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="blue">
          {shortenAddr(value, 8, 8)}
        </Text>
      </Grid>
    ),
  },
  {
    dataIndex: 'date',
    title: () => (
      <Text type="small" weight="semibold">
        Date
      </Text>
    ),
    render: (value: Date) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {value.toLocaleDateString()}
        </Text>
        <Text type="small" weight="semibold">
          {value.toLocaleTimeString()}
        </Text>
      </>
    ),
  },
  {
    dataIndex: 'amount',
    title: () => (
      <Text type="small" weight="semibold">
        Amount
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {value}
        </Text>
        <Text type="small" weight="semibold">
          ${value}
        </Text>
      </Grid>
    ),
  },
  {
    dataIndex: 'tranch',
    title: () => (
      <Text type="small" weight="semibold">
        Tranch
      </Text>
    ),
    render: (value: string) => (
      <Text type="p1" weight="semibold" color="primary">
        {value}
      </Text>
    ),
  },
  {
    dataIndex: 'transactionType',
    title: () => (
      <Text type="small" weight="semibold">
        Transaction type
      </Text>
    ),
    render: (value: string) => (
      <Text type="p1" weight="semibold" color="primary">
        {value}
      </Text>
    ),
  },
];

export default function PortfolioStatistics() {
  return (
    <>
      <div className="grid mb-32" style={{ gridTemplateColumns: '40% 1fr', columnGap: 32 }}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <Card
        noPaddingBody
        title={
          <Grid flow="col" colsTemplate="1fr max-content">
            <Text type="p1" weight="semibold" color="primary">
              Transaction history
            </Text>
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
    </>
  );
}
