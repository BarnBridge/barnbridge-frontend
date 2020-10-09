import React from 'react';

import PoolCard from 'components/pool-card';
import PoolTransactionChart from 'components/pool-transaction-chart';
import PoolTransactionTable from 'components/pool-transaction-table';

import { LP_TOKENS, TokenInfo, UDS_TOKENS } from 'web3/contracts';

import s from './styles.module.css';

export type PoolOverviewProps = {
  onPoolStackSelect: (stakKey: string) => void;
};

const PoolOverview: React.FunctionComponent<PoolOverviewProps> = props => {
  function handleUDSStaking() {
    props.onPoolStackSelect?.('uds');
  }

  function handleUNIStaking() {
    props.onPoolStackSelect?.('uni');
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
      <PoolTransactionTable
        label="Transactions"
        tokens={new Map<string, TokenInfo>([
          ...Array.from(UDS_TOKENS),
          ...Array.from(LP_TOKENS),
        ])}
      />
    </div>
  );
};

export default PoolOverview;
