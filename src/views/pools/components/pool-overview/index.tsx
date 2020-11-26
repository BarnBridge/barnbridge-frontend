import React from 'react';

import PoolCard from 'views/pools/components/pool-card';
import PoolTransactionChart from 'views/pools/components/pool-transaction-chart';
import PoolTransactionTable from 'views/pools/components/pool-transaction-table';

import s from './styles.module.css';

const PoolOverview: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <div className={s.labelPools}>Pools</div>
      <div className={s.labelOverview}>Overview</div>
      <div className={s.cards}>
        <PoolCard stableToken />
        <PoolCard unilpToken />
        <PoolCard bondToken />
      </div>
      <PoolTransactionChart />
      <PoolTransactionTable label="Transactions" stableToken unilpToken bondToken />
    </div>
  );
};

export default PoolOverview;
