import { useState } from 'react';
import cn from 'classnames';

import IconsPair from 'components/custom/icons-pair';
import { Table, TableFooter } from 'components/custom/table';
import { Tabs } from 'components/custom/tabs';

const tabs = [
  {
    id: 'positions',
    children: 'Positions',
  },
  {
    id: 'transactionHistory',
    children: 'Transaction history',
  },
];

type Props = {
  className?: string;
};

export const PortfolioTable: React.FC<Props> = ({ className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className={cn('card', className)}>
      <header className="card-header flex align-center ph-24 pv-0">
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} variation="normal" size="small" />
      </header>
      {activeTab === 'positions' ? <PositionsTable /> : <TransactionHistoryTable />}
    </section>
  );
};

type ColumnType = {
  trancheName: string;
  poolAmount: number;
};

const PositionsTable: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const total = 54;
  const pageSize = 10;

  return (
    <>
      <Table<ColumnType>
        columns={[
          {
            heading: 'Tranche / Transaction',
            render: item => (
              <div className="flex align-center">
                <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" style={{ flexShrink: 0 }} />
                <div className="text-p1 fw-semibold color-primary mr-4">{item.trancheName}</div>
              </div>
            ),
          },
          {
            heading: 'Pool token amount',
            render: item => <div className="text-p1 fw-semibold color-primary mr-4">{item.poolAmount}</div>,
          },
          {
            heading: 'Actions',
            render: item => (
              <div className="flex align-center col-gap-24">
                <button type="button" className="button-primary">
                  Withdraw
                </button>
                <button type="button" className="button-ghost">
                  Change tranche
                </button>
              </div>
            ),
          },
        ]}
        data={[
          {
            trancheName: '75% WBTC / 25% ETH',
            poolAmount: 25381.32,
          },
          {
            trancheName: '50% WBTC / 50% ETH',
            poolAmount: 25381.32,
          },
          {
            trancheName: '25% WBTC / 75% ETH',
            poolAmount: 25381.32,
          },
        ]}
      />
      <TableFooter total={total} current={current} pageSize={pageSize} changeHandler={setCurrent}>
        {({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} entries
          </>
        )}
      </TableFooter>
    </>
  );
};

const TransactionHistoryTable: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tranche / Transaction</th>
          <th>Pool token amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="flex">
              <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" />
              <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
