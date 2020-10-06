import React from 'react';

import PoolCard from 'components/pool-card';
import PoolTransactionChart from 'components/pool-transaction-chart';
import PoolTransactionTable from 'components/pool-transaction-table';

import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNIIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

export type PoolOverviewProps = {
  onPoolStackSelect: (stakKey: string) => void;
};

const PoolOverview: React.FunctionComponent<PoolOverviewProps> = props => {
  const { aggregated, yf, yflp } = useWeb3Contracts();

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
          names={['USDC', 'DAI', 'sUSD']}
          icons={[<USDCIcon key="usdc" />, <DAIIcon key="dai" />, <SUSDIcon key="susd" />]}
          colors={['#4f6ae6', '#ffd160', '#1e1a31']}
          currentEpoch={yf?.currentEpoch}
          totalEpochs={yf?.totalEpochs}
          reward={yf?.epochReward}
          potentialReward={yf.potentialReward}
          balance={aggregated.poolBalanceUDS}
          balanceShare={aggregated.poolBalanceUDSShares}
          myBalance={aggregated.myPoolBalanceUDS}
          myBalanceShare={[50, 30, 20]}
          onStaking={handleUDSStaking}
        />
        <PoolCard
          names={['USDC_BOND_UNI_LP']}
          icons={[<UNIIcon key="uniswap" />]}
          colors={['#ff4339']}
          currentEpoch={yflp?.currentEpoch}
          totalEpochs={yflp?.totalEpochs}
          reward={yflp?.epochReward}
          potentialReward={yflp.potentialReward}
          balance={aggregated.poolBalanceUNI}
          balanceShare={[100]}
          myBalance={aggregated.myPoolBalanceUNI}
          myBalanceShare={[100]}
          onStaking={handleUNIStaking}
        />
      </div>

      <PoolTransactionChart />
      <PoolTransactionTable label="Transactions" />
    </div>
  );
};

export default PoolOverview;
