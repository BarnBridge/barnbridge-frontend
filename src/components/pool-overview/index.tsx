import React from 'react';

import PoolCard from 'components/pool-card';
import PoolTransactionChart from 'components/pool-transaction-chart';
import PoolTransactionTable from 'components/pool-transaction-table';

import { LP_TOKENS, TokenInfo, UDS_TOKENS, useWeb3Contracts } from 'web3/contracts';

import s from './styles.module.css';

export type PoolOverviewProps = {
  onPoolStackSelect: (stakKey: string) => void;
};

const PoolOverview: React.FunctionComponent<PoolOverviewProps> = props => {
  const { aggregated } = useWeb3Contracts();

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
        <PoolCard
          stableToken
          balanceShare={aggregated.poolBalanceUDSShares}
          myBalanceShare={[50, 30, 20]}
          onStaking={handleUDSStaking}
        />
        <PoolCard
          lpToken
          balanceShare={[100]}
          myBalanceShare={[100]}
          onStaking={handleUNIStaking}
        />
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
