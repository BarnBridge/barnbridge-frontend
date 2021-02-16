import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'components/antd/card';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Button from 'components/antd/button';
import Icons from 'components/custom/icon';
import Select from 'components/antd/select';
import IconBubble from 'components/custom/icon-bubble';
import TabCard from 'modules/smart-yield/components/tab-card';
import s from './s.module.scss';

const dataMock = [
  {
    address: 'asdqwe123',
    originator: ['USDC', 'Compound'],
    seniorLiquidity: ['578.32', '$ 579.46 M'],
    seniorAPY: '6.42%',
    juniorLiquidity: ['831.32 M', '$ 832.46 M'],
    juniorAPY: '21.33%',
    originatorAPY: '3.47%',
    jTokenConversionRate: ['1 USDC', '= 0.9778 jUSDC'],
    walletBalance: ['25,381.32', '$ 27,812.44'],
  },
];

const originatorOptionsMock = [
  { value: '', label: 'All originators' },
  { value: 'value1', label: 'Label 1' },
  { value: 'value2', label: 'Label 2' },
];

const OverviewView: React.FunctionComponent = () => {
  const history = useHistory();
  const [originator, setOriginator] = React.useState('');

  const columns = [
    {
      dataIndex: 'originator',
      title: () => (
        <Small semiBold>
          Originator
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
      dataIndex: 'seniorLiquidity',
      title: () => (
        <Small semiBold>
          Senior Liquidity
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value[0]}
          </Paragraph>
          <Small semiBold>{value[1]}</Small>
        </Grid>
      ),
    },
    {
      dataIndex: 'seniorAPY',
      title: () => (
        <Small semiBold>
          Senior APY
        </Small>
      ),
      render: (value: string) => (
        <Paragraph type="p1" semiBold color="primary">
          {value}
        </Paragraph>
      ),
    },
    {
      dataIndex: 'juniorLiquidity',
      title: () => (
        <Small semiBold>
          Junior Liquidity
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value[0]}
          </Paragraph>
          <Small semiBold>{value[1]}</Small>
        </Grid>
      ),
    },
    {
      dataIndex: 'juniorAPY',
      title: () => (
        <Small semiBold>
          Junior APY
        </Small>
      ),
      render: (value: string) => (
        <Paragraph type="p1" semiBold color="purple">
          {value}
        </Paragraph>
      ),
    },
    {
      dataIndex: 'originatorAPY',
      title: () => (
        <Small semiBold>
          Originator APY
        </Small>
      ),
      render: (value: string) => (
        <Paragraph type="p1" semiBold color="primary">
          {value}
        </Paragraph>
      ),
    },
    {
      dataIndex: 'jTokenConversionRate',
      title: () => (
        <Small semiBold>
          jToken conversion rate
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value[0]}
          </Paragraph>
          <Small semiBold>{value[1]}</Small>
        </Grid>
      ),
    },
    {
      dataIndex: 'walletBalance',
      title: () => (
        <Small semiBold>
          Wallet balance
        </Small>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Paragraph type="p1" semiBold color="primary">
            {value[0]}
          </Paragraph>
          <Small semiBold>{value[1]}</Small>
        </Grid>
      ),
    },
    {
      dataIndex: 'address',
      title: () => null,
      render: (value: string) => (
        <Button
          type="primary"
          onClick={() => history.push(`/smart-yield/deposit/${value}`)}
          // onClick={(value) => console.log(value)}
        >
          Deposit
        </Button>
      ),
    },
  ];

  return (
    <>
      <Grid flow="col" gap={24} className="mb-64">
        <TabCard
          title="Compound"
          subtitle="Markets"
          icon={<Icons name="compound" width={40} height={40} />}
          active /* type="button" onClick={() => console.log('asd')} */
        />
        <TabCard
          title="Aave"
          subtitle="Markets"
          icon={
            <Icons name="aave" width={40} height={40} />
          } /* type="button" onClick={() => console.log('asd')} */
        />
        <TabCard
          title="Cream Finance"
          subtitle="Markets"
          icon={
            <Icons name="cream_finance" width={40} height={40} />
          } /* type="button" onClick={() => console.log('asd')} */
        />
        <TabCard
          title="Yearn Finance"
          subtitle="Markets"
          icon={
            <Icons name="yearn_finance" width={40} height={40} />
          } /* type="button" onClick={() => console.log('asd')} */
        />
      </Grid>
      <Paragraph type="p1" semiBold color="secondary" className="mb-8">
        Compound total liquidity
      </Paragraph>
      <Heading type="h2" color="primary" className="mb-40">
        $ 1,643,900,581.86
      </Heading>
      <Card
        // title={
        //   <Paragraph type="p1" semiBold color="primary">
        //     Voter weights
        //   </Paragraph>
        // }
        noPaddingBody>
        <div className={s.tableCardHeader}>
          <Select
            label=""
            options={originatorOptionsMock}
            disabled={false}
            value={originator}
            onSelect={(value: string | number) => {
              setOriginator(String(value));
            }}
          />
        </div>
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
};

export default OverviewView;
