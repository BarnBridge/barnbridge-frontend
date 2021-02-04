import React from 'react';

import PoolCard from '../pool-card';
import PoolTransactionChart from '../pool-transaction-chart';
import PoolTransactionTable from '../pool-transaction-table';

import s from './styles.module.scss';

const PoolOverview: React.FunctionComponent = () => {
  return (
    <div>
      <div className={s.labelPools}>Pools</div>
      <div className={s.labelOverview}>Overview</div>
      <div className={s.cards}>
        <PoolCard stableToken />
        <PoolCard unilpToken />
        <PoolCard bondToken />
      </div>
      <PoolTransactionChart />
      <PoolTransactionTable
        label="Transactions"
        stableToken
        unilpToken
        bondToken
      />
    </div>
  );
};

export default PoolOverview;
