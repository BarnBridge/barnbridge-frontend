import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import format from 'date-fns/format';

import Table from 'components/antd/table';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

type APIPairType = {
  token: string;
  lastRebalance: number;
  trancheLiquidity: number;
  myTrancheLiquidity: number;
  walletBallance: number;
};

const Columns: ColumnsType<APIPairType> = [
  {
    title: 'Target / current ratio',
    render: (_, entity) => {
      return (
        <>
          <div className="flex col-gap-32 mb-8">
            <div className="flex">
              <Icon name="token-wbtc" className="mr-8" />
              <div>
                <div className="text-p1 fw-semibold color-primary">75.00%</div>
                <div className="text-sm fw-semibold color-red flex">
                  73.87%
                  <Icon name="arrow-bottom-right-thin" className="mr-8" width={16} height={16} color="red" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex">
                <Icon name="token-eth" className="mr-8" />
                <div>
                  <div className="text-p1 fw-semibold color-primary">25.00%</div>
                  <div className="text-sm fw-semibold color-green flex">
                    26.13%
                    <Icon name="arrow-top-right-thin" className="mr-8" width={16} height={16} color="green" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <progress
            max="100"
            value="75"
            className="progress"
            style={{ '--background-color': '#627EEA', '--progress-color': '#F7931A' } as React.CSSProperties}>
            75%
          </progress>
        </>
      );
    },
  },
  {
    title: 'Last rebalance',
    render: (_, entity) => {
      const date = new Date(entity.lastRebalance);
      return (
        <time dateTime={date.toJSON()}>
          <div className="text-p1 fw-semibold color-primary">{format(date, 'dd.MM.yyyy')}</div>
          <div className="text-sm fw-semibold color-secondary">{format(date, 'HH:mm')}</div>
        </time>
      );
    },
  },
  {
    title: 'Tranche liquidity',
    render: (_, entity) => <div className="text-p1 fw-semibold color-primary">{entity.trancheLiquidity}</div>,
  },
  {
    title: 'My tranche liquidity',
    render: (_, entity) => <div className="text-p1 fw-semibold color-primary">{entity.myTrancheLiquidity}</div>,
  },
  {
    title: 'Wallet balance',
    render: (_, entity) => <div className="text-p1 fw-semibold color-primary">{entity.walletBallance}</div>,
  },
  {
    title: '',
    render: (_, entity) => (
      <NavLink to={`/smart-exposure/pairs/${entity.token}`} className="button-ghost">
        View details
      </NavLink>
    ),
  },
];

const dataMock = [
  {
    token: '75:25_WBTC_ETH',
    lastRebalance: 1619099668456,
    trancheLiquidity: 100_000_000,
    myTrancheLiquidity: 1_000_000,
    walletBallance: 300_000,
  },
  {
    token: '50:50_WBTC_ETH',
    lastRebalance: 1619099688997,
    trancheLiquidity: 200_000_000,
    myTrancheLiquidity: 3_000_000,
    walletBallance: 300_000,
  },
  {
    token: '25:75_WBTC_ETH',
    lastRebalance: 1619099688997,
    trancheLiquidity: 10_000_000,
    myTrancheLiquidity: 100_000,
    walletBallance: 300_000,
  },
];

export const PairsTable: React.FC = () => {
  return (
    <Table<APIPairType>
      columns={Columns}
      dataSource={dataMock}
      rowKey="token"
      loading={false}
      locale={{
        emptyText: 'No entries',
      }}
      pagination={{
        total: 10,
        current: 1,
        pageSize: 10,
        position: ['bottomRight'],
        showTotal: (total: number, [from, to]: [number, number]) => (
          <Text type="p2" weight="semibold" color="secondary">
            Showing {from} to {to} out of {total} entries
          </Text>
        ),
        onChange: () => console.log('onChange pagination'),
      }}
      scroll={{
        x: true,
      }}
    />
  );
};
