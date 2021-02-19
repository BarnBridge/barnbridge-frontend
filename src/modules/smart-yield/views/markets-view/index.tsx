import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Card from 'components/antd/card';
import { Paragraph, Small, Heading, Text } from 'components/custom/typography';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Button from 'components/antd/button';
import Icons from 'components/custom/icon';
import Select from 'components/antd/select';
import IconBubble from 'components/custom/icon-bubble';
import TabCard from 'modules/smart-yield/components/tab-card';
import s from './s.module.scss';
import { formatBigValue, formatUSDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

const originatorOptionsMock = [
  { value: '', label: 'All originators' },
  { value: 'value1', label: 'Label 1' },
  { value: 'value2', label: 'Label 2' },
];

const OverviewView: React.FunctionComponent = () => {
  const history = useHistory();
  const [originator, setOriginator] = React.useState('');

  const web3c = useWeb3Contracts();

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
          onClick={() => history.push(`/smart-yield/${value}/deposit`)}
          // onClick={(value) => console.log(value)}
        >
          Deposit
        </Button>
      ),
    },
  ];

  const dataMock = [
    {
      address: '0xb7a4f3e9097c08da09517b5ab877f7a917224ede',
      originator: ['USDC', 'Compound'],
      seniorLiquidity: ['578.32', '$ 579.46 M'],
      seniorAPY: '6.42%',
      juniorLiquidity: ['831.32 M', '$ 832.46 M'],
      juniorAPY: '21.33%',
      originatorAPY: '3.47%',
      jTokenConversionRate: ['1 USDC', `= ${formatBigValue(web3c.sy.price)} jUSDC`],
      walletBalance: [
        formatUSDValue(web3c.sy.balance),
        formatUSDValue(web3c.sy.balance?.multipliedBy(web3c.sy.price ?? 1))
      ],
    },
  ];

  return (
    <>
      <Grid flow="col" gap={24} className="mb-64">
        {/*<button onClick={() => console.log('asd qwe')} className="tab-card">*/}
        {/*  <Icons name="compound" width={40} height={40} className="mr-16" />*/}
        {/*  <Grid flow="row">*/}
        {/*    <Text type="p1" weight="semibold" color="primary">Compound</Text>*/}
        {/*    <Text type="small" weight="semibold" color="secondary">Markets</Text>*/}
        {/*  </Grid>*/}
        {/*</button>*/}
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
        {formatUSDValue(web3c.sy.underlyingTotal)}
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
