import React from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue, formatUSDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';

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
            <Text type="small" weight="semibold">
              {value[1]}
            </Text>
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
          <Text type="small" weight="semibold">
            {value[1]}
          </Text>
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
          <Text type="small" weight="semibold">
            {value[1]}
          </Text>
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
          <Text type="small" weight="semibold">
            {value[1]}
          </Text>
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
          <Text type="small" weight="semibold">
            {value[1]}
          </Text>
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
        formatUSDValue(web3c.sy.balance?.multipliedBy(web3c.sy.price ?? 1)),
      ],
    },
  ];

  return (
    <>
      <div className="tab-cards mb-64">
        <button onClick={() => console.log('asd qwe')} className="tab-card active">
          <Icons name="compound" width={40} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Compound
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Markets
            </Text>
          </div>
        </button>
        <button onClick={() => console.log('asd qwe')} className="tab-card">
          {/* ADDED INLINE, DUE TO CHROMIUM ISSUE */}
          {/* <Icons name="aave" width={40} height={40} className="mr-16" /> */}
          <svg fill="none" viewBox="0 0 40 40" width="40" height="40" className="mr-16">
            <path
              fill="url(#paint0_linearaave)"
              fill-rule="evenodd"
              d="M20 0C8.956 0 0 8.956 0 20s8.956 20 20 20 20-8.956 20-20S31.044 0 20 0z"
              clip-rule="evenodd"
            />
            <g fill="#fff">
              <path d="M23.675 23.979l-3.048-7.22a.621.621 0 01-.038-.204.558.558 0 01.149-.402.527.527 0 01.405-.153.557.557 0 01.315.102c.095.07.17.163.215.27l2.9 7.063 2.9-7.063a.655.655 0 01.218-.27.558.558 0 01.315-.102.537.537 0 01.402.153c.102.11.157.254.151.402a.621.621 0 01-.038.204l-3.048 7.22a.8.8 0 01-.29.396.832.832 0 01-.473.158h-.271a.832.832 0 01-.473-.158.8.8 0 01-.29-.396zM29.856 24.311a.527.527 0 01-.158-.386v-7.31a.547.547 0 01.338-.52.533.533 0 01.216-.038h4.954a.504.504 0 01.373.154.492.492 0 010 .722.526.526 0 01-.376.148h-4.38v2.662h3.94a.504.504 0 01.373.154.505.505 0 01.12.56.463.463 0 01-.12.162.527.527 0 01-.373.148h-3.94v2.674h4.38a.502.502 0 01.376.154.492.492 0 01.157.367.454.454 0 01-.157.358.525.525 0 01-.376.145h-4.95a.501.501 0 01-.397-.154zM21.317 23.774l-3.05-7.22a.8.8 0 00-.29-.395.832.832 0 00-.471-.159h-.268a.832.832 0 00-.473.158.8.8 0 00-.29.397L15.147 19.7h-1.005a.557.557 0 00-.385.158.531.531 0 00-.16.376v.006c0 .141.058.276.16.376.102.1.24.157.385.159h.539l-1.265 2.998a.618.618 0 00-.038.205.558.558 0 00.149.4.525.525 0 00.405.154.556.556 0 00.315-.102.653.653 0 00.215-.27l1.396-3.385h.959a.558.558 0 00.385-.159c.102-.1.16-.235.16-.376v-.014a.532.532 0 00-.16-.377.558.558 0 00-.385-.158h-.519l1.073-2.594 2.9 7.063c.045.107.12.2.215.27.091.065.201.1.315.102a.536.536 0 00.408-.153c.1-.11.152-.254.145-.401a.473.473 0 00-.035-.205h-.003zM12.207 23.774l-3.049-7.22a.8.8 0 00-.292-.397.832.832 0 00-.474-.157h-.268a.832.832 0 00-.473.158.8.8 0 00-.29.397L6.033 19.7H5.03a.557.557 0 00-.385.158.531.531 0 00-.16.376v.006c0 .141.058.276.16.376.102.1.24.157.385.159h.54l-1.266 2.998a.62.62 0 00-.037.205.558.558 0 00.148.4.526.526 0 00.405.154.556.556 0 00.315-.102.654.654 0 00.216-.27l1.396-3.385h.964a.557.557 0 00.387-.158c.102-.1.16-.235.16-.377v-.014a.531.531 0 00-.16-.378.557.557 0 00-.387-.157h-.516l1.064-2.594 2.9 7.063c.045.107.12.2.215.27.092.065.202.1.315.102a.535.535 0 00.408-.153c.1-.11.152-.254.146-.401a.473.473 0 00-.035-.205z" />
            </g>
            <defs>
              <linearGradient
                id="paint0_linearaave"
                x1="-3.467"
                x2="41.6"
                y1="7.467"
                y2="32.533"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#2EBAC6" />
                <stop offset="1" stop-color="#B6509E" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Aave
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Markets
            </Text>
          </div>
        </button>
        <button onClick={() => console.log('asd qwe')} className="tab-card">
          <Icons name="cream_finance" width={40} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Cream Finance
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Markets
            </Text>
          </div>
        </button>
        <button onClick={() => console.log('asd qwe')} className="tab-card">
          <Icons name="yearn_finance" width={40} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Yearn Finance
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Markets
            </Text>
          </div>
        </button>
      </div>
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
          scroll={{
            x: true,
          }}
          // loading={loading}
        />
      </Card>
    </>
  );
};

export default OverviewView;
