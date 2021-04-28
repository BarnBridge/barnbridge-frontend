import { useState } from 'react';
import cn from 'classnames';

import IconsPair from 'components/custom/icons-pair';
import { Pagination } from 'components/custom/pagination';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';

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
        <Tabs tabs={tabs} active={activeTab} onClick={setActiveTab} variation="normal" size="small" />
      </header>
      {activeTab === 'positions' ? <PositionsTable /> : <TransactionHistoryTable />}
    </section>
  );
};

const PositionsTable = () => {
  return (
    <div className="table-container">
      <table className="table">
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
              <div className="flex align-center">
                <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" style={{ flexShrink: 0 }} />
                <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
              </div>
            </td>
            <td>
              <div className="text-p1 fw-semibold color-primary mr-4">25,381.32</div>
            </td>
            <td>
              <div className="flex align-center col-gap-24">
                <button type="button" className="button-primary">
                  Withdraw
                </button>
                <button type="button" className="button-ghost">
                  Change tranche
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex align-center">
                <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" style={{ flexShrink: 0 }} />
                <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
              </div>
            </td>
            <td>
              <div className="text-p1 fw-semibold color-primary mr-4">25,381.32</div>
            </td>
            <td>
              <div className="flex align-center col-gap-24">
                <button type="button" className="button-primary">
                  Withdraw
                </button>
                <button type="button" className="button-ghost">
                  Change tranche
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex align-center">
                <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" style={{ flexShrink: 0 }} />
                <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
              </div>
            </td>
            <td>
              <div className="text-p1 fw-semibold color-primary mr-4">25,381.32</div>
            </td>
            <td>
              <div className="flex align-center col-gap-24">
                <button type="button" className="button-primary">
                  Withdraw
                </button>
                <button type="button" className="button-ghost">
                  Change tranche
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex p-24">
        <Text type="p2" weight="semibold" color="secondary">
          Showing 1 to 10 out of 3189 entries
        </Text>
        <Pagination className="ml-auto" />
      </div>
    </div>
  );
};

const TransactionHistoryTable = () => {
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
