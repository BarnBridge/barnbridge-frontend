import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'components/antd/card';
import { Text } from 'components/custom/typography';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Button from 'components/antd/button';
import Icons from 'components/custom/icon';
import Select from 'components/antd/select';
import IconBubble from 'components/custom/icon-bubble';
import TabCard from 'modules/smart-yield/components/tab-card';
import { formatBigValue, formatUSDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import s from './s.module.scss';

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
        <Text type="small" weight="semibold">
          Originator
        </Text>
      ),
      render: (value: string) => (
        <Grid flow="col" gap={16} align="center">
          <IconBubble name="usdc-token" bubbleName="compound" />
          <Grid flow="row" gap={4} className="ml-auto">
            <Text type="p1" weight="semibold" color="primary">
              {value[0]}
            </Text>
            <Text type="small" weight="semibold">{value[1]}</Text>
          </Grid>
        </Grid>
      ),
    },
    {
      dataIndex: 'seniorLiquidity',
      title: () => (
        <Text type="small" weight="semibold">
          Senior Liquidity
        </Text>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Text type="p1" weight="semibold" color="primary">
            {value[0]}
          </Text>
          <Text type="small" weight="semibold">{value[1]}</Text>
        </Grid>
      ),
    },
    {
      dataIndex: 'seniorAPY',
      title: () => (
        <Text type="small" weight="semibold">
          Senior APY
        </Text>
      ),
      render: (value: string) => (
        <Text type="p1" weight="semibold" color="primary">
          {value}
        </Text>
      ),
    },
    {
      dataIndex: 'juniorLiquidity',
      title: () => (
        <Text type="small" weight="semibold">
          Junior Liquidity
        </Text>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Text type="p1" weight="semibold" color="primary">
            {value[0]}
          </Text>
          <Text type="small" weight="semibold">{value[1]}</Text>
        </Grid>
      ),
    },
    {
      dataIndex: 'juniorAPY',
      title: () => (
        <Text type="small" weight="semibold">
          Junior APY
        </Text>
      ),
      render: (value: string) => (
        <Text type="p1" weight="semibold" color="purple">
          {value}
        </Text>
      ),
    },
    {
      dataIndex: 'originatorAPY',
      title: () => (
        <Text type="small" weight="semibold">
          Originator APY
        </Text>
      ),
      render: (value: string) => (
        <Text type="p1" weight="semibold" color="primary">
          {value}
        </Text>
      ),
    },
    {
      dataIndex: 'jTokenConversionRate',
      title: () => (
        <Text type="small" weight="semibold">
          jToken conversion rate
        </Text>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Text type="p1" weight="semibold" color="primary">
            {value[0]}
          </Text>
          <Text type="small" weight="semibold">{value[1]}</Text>
        </Grid>
      ),
    },
    {
      dataIndex: 'walletBalance',
      title: () => (
        <Text type="small" weight="semibold">
          Wallet balance
        </Text>
      ),
      render: (value: string) => (
        <Grid flow="row" gap={4}>
          <Text type="p1" weight="semibold" color="primary">
            {value[0]}
          </Text>
          <Text type="small" weight="semibold">{value[1]}</Text>
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
      <Text type="p1" weight="semibold" color="secondary" className="mb-8">
        Compound total liquidity
      </Text>
      <Text type="h2" color="primary" className="mb-40">
        {formatUSDValue(web3c.sy.underlyingTotal)}
      </Text>
      <Card
        // title={
        //   <Text type="p1" weight="semibold" color="primary">
        //     Voter weights
        //   </Text>
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
