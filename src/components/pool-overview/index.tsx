import React from 'react';

import { LP_TOKEN_KEY, STABLE_TOKEN_KEY } from 'web3/contracts';

import PoolCard from 'components/pool-card';
import PoolTransactionChart from 'components/pool-transaction-chart';
import PoolTransactionTable from 'components/pool-transaction-table';

import s from './styles.module.css';

export type PoolOverviewProps = {
  onPoolStakSelect: (stakKey: string) => void;
};

const PoolOverview: React.FunctionComponent<PoolOverviewProps> = props => {
  function handleUDSStaking() {
    props.onPoolStakSelect?.(STABLE_TOKEN_KEY);
  }

  function handleUNIStaking() {
    props.onPoolStakSelect?.(LP_TOKEN_KEY);
  }

  return (
    <div className={s.component}>
      <div className={s.labelPools}>Pools</div>
      <div className={s.labelOverview}>Overview</div>
      <div className={s.cards}>
        <PoolCard stableToken onStaking={handleUDSStaking} />
        <PoolCard lpToken onStaking={handleUNIStaking} />
      </div>

      <PoolTransactionChart />
      <PoolTransactionTable label="Transactions" stableToken lpToken />
    </div>
  );
};

export default PoolOverview;
