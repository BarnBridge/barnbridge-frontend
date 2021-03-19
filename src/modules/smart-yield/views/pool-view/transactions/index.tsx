import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { shortenAddr } from 'web3/utils';

import Select, { SelectOption } from 'components/antd/select';
import Table from 'components/antd/table';
import Tabs from 'components/antd/tabs';
import ExternalLink from 'components/custom/externalLink';
import { IconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';

import s from 'modules/smart-yield/views/pool-view/transactions/s.module.scss';

type DataType = {
  meta: {
    icon: IconNames;
  };
  market: {
    icon: IconNames;
  };
  amount: string;
  date: string;
  transactionHash: string;
  from: string;
};

const dataMock: DataType[] = [
  {
    meta: {
      icon: 'usdc-token',
    },
    market: {
      icon: 'bond-token',
    },
    amount: '2,132.3321',
    date: 'Jan 1, 2021 16:35:22',
    transactionHash: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
    from: '0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c',
  },
];

function getTableColumns(all: boolean = false): ColumnsType<DataType> {
  return [
    {
      title: 'Transaction',
      render: (_, entity) => (
        <div className="flex flow-col col-gap-16 align-center">
          <IconBubble name={entity.meta.icon} bubbleName={entity.market.icon} secondBubbleName="compound" />
          <div>
            <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
              Deposit
            </Text>
            <Text type="small" weight="semibold" wrap={false}>
              bbcUSDC
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Amount/Date',
      render: (_, entity) => (
        <>
          <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
            {entity.amount}
          </Text>
          <Text type="small" weight="semibold" wrap={false}>
            {entity.date}
          </Text>
        </>
      ),
    },
    ...(all
      ? ([
          {
            title: 'Transaction hash',
            render: (_, entity) => (
              <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
                {shortenAddr(entity.from, 6, 4)}
              </Text>
            ),
          },
        ] as ColumnsType<DataType>)
      : []),
    {
      title: 'Transaction hash',
      render: (_, entity) => (
        <ExternalLink href="https://etherscan.com" className="link-blue">
          {shortenAddr(entity.transactionHash, 6, 4)}
        </ExternalLink>
      ),
    },
  ];
}

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('my');
  const [transactionFilter, setTransactionFilter] = React.useState('all');

  const transactionOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All transactions',
        value: 'all',
      },
      {
        label: 'Transaction 1',
        value: '1',
      },
      {
        label: 'Transaction 2',
        value: '2',
      },
    ];
  }, []);

  return (
    <div className="card mb-32">
      <Tabs
        className={s.tabs}
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <Select
            options={transactionOpts}
            className="full-width"
            value={transactionFilter}
            onChange={value => setTransactionFilter(String(value))}
          />
        }>
        <Tabs.Tab key="my" tab="My transactions">
          <Table<DataType>
            columns={getTableColumns()}
            dataSource={dataMock}
            loading={false}
            rowKey="transactionHash"
            scroll={{
              x: true,
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab key="all" tab="All transactions">
          <Table<DataType>
            columns={getTableColumns(true)}
            dataSource={dataMock}
            loading={false}
            rowKey="transactionHash"
            scroll={{
              x: true,
            }}
          />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default Transactions;
