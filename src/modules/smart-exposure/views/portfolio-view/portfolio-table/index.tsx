import { useEffect, useState } from 'react';
import cn from 'classnames';

import IconsPair from 'components/custom/icons-pair';
import { Table } from 'components/custom/table';
import { Tabs } from 'components/custom/tabs';
import { TranchesItemApiType, fetchTranches } from 'modules/smart-exposure/api';
import { TransactionsTable } from 'modules/smart-exposure/components/transactions-table';
import { useWallet } from 'wallets/wallet';

import { PositionsTable } from './positions';

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
  poolAddress: string;
  className?: string;
};

export const PortfolioTable: React.FC<Props> = ({ poolAddress, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { account } = useWallet();

  return (
    <section className={cn('card', className)}>
      <header className="card-header flex align-center ph-24 pv-0">
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} variation="normal" size="small" />
      </header>
      {activeTab === 'positions' ? (
        <PositionsTable poolAddress={poolAddress} />
      ) : (
        <TransactionsTable accountAddress={account} />
      )}
    </section>
  );
};
