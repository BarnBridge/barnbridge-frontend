import React from 'react';

import PoolCard from 'components/pool-card';
import PoolTransactionChart from 'components/pool-transaction-chart';
import PoolTransactionTable from 'components/pool-transaction-table';

import s from './styles.module.css';

const PoolOverview: React.FunctionComponent = () => {
  return (
    <div className={s.component}>
      <div className={s.labelPools}>Pools</div>
      <div className={s.labelOverview}>Overview</div>
      <div className={s.cards}>
        <PoolCard stableToken />
        <PoolCard lpToken />
      </div>
      <PoolTransactionChart />
      <PoolTransactionTable label="Transactions" stableToken lpToken />
    </div>
  );
};

export default PoolOverview;
