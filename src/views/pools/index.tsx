import React from 'react';
import * as Antd from 'antd';

import StatWidget from 'components/stat-widget';
import DataRow from 'components/data-row';
import MyRewards from 'components/my-rewards';
import PoolCard from 'components/pool-card';
import PoolTransactions from 'components/pool-transactions';

import { useWeekCountdown } from 'hooks/useCountdown';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

import { ReactComponent as USDCIcon } from 'resources/svg/coins/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/coins/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/coins/susd.svg';
import { ReactComponent as BONDIcon } from 'resources/svg/coins/bond.svg';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent<{}> = props => {
  const { aggregated, yf, yflp, bond, ethOracle } = useWeb3Contracts();
  const [untilNextEpoch] = useWeekCountdown();

  return (
    <div className={s.view}>
      <MyRewards
        currentReward={formatBigValue(aggregated.currentReward)}
        bondBalance={formatBigValue(bond?.balance)}
        potentialReward={formatBigValue(aggregated.potentialReward)}
      />

      <div className={s.stat_widgets}>
        <StatWidget
          label="Total Value Locked"
          value={`$ ${formatBigValue(aggregated.potentialReward, 2)}`}
          hint="100,007" />
        <StatWidget
          label="Bond Rewards"
          value={formatBigValue(aggregated.bondReward)}
          hint={`out of ${formatBigValue(aggregated.totalBondReward, 2)}`} />
        <StatWidget
          label="Bond Price"
          value={`$ ${formatBigValue(ethOracle?.value, 2)}`}
          hint="updated 3 minutes ago" />
        <StatWidget
          label="Time Left"
          value={untilNextEpoch}
          hint="until next epoch" />
      </div>

      <div className={s.pools_label}>Pools</div>
      <div className={s.overview_label}>Overview</div>

      <div className={s.pools_list}>
        <PoolCard
          names={['USDC', 'DAI', 'sUSD']}
          icons={[<USDCIcon key="usdc" />, <DAIIcon key="dai" />, <SUSDIcon key="susd" />]}
          colors={['#4f6ae6', '#ffd160', '#1e1a31']}
          currentEpoch={yf?.currentEpoch}
          totalEpochs={yf?.totalEpochs}
          reward={yf?.epochReward}
          potentialReward={aggregated.potentialReward}
          balance={aggregated.poolBalanceDUS}
          balanceShare={aggregated.poolBalanceDUSShares}
          myBalance={aggregated.myPoolBalanceDUS}
          myBalanceShare={[50, 30, 20]}
        />

        <PoolCard
          names={['USDC_BOND_UNI_LP']}
          icons={[<BONDIcon key="bond" />]}
          colors={['#ff4339']}
          currentEpoch={yflp?.currentEpoch}
          totalEpochs={yflp?.totalEpochs}
          reward={yflp?.epochReward}
          potentialReward={aggregated.potentialReward}
          balance={aggregated.poolBalanceUB}
          balanceShare={[100]}
          myBalance={aggregated.myPoolBalanceUB}
          myBalanceShare={[100]}
        />
      </div>

      <PoolTransactions />

      <Antd.Tabs defaultActiveKey="deposit">
        <Antd.Tabs.TabPane key="deposit" tab="Deposit">

          <div className={s.data_rows}>
            <DataRow logo={<USDCIcon />} name="USDC" rewards={100} balance={100} enabled={true} />
            <DataRow logo={<DAIIcon />} name="DAI" rewards={0} balance={0} enabled={false} />
            <DataRow logo={<SUSDIcon />} name="sUSD" rewards={0} balance={0} enabled={false} />
          </div>

        </Antd.Tabs.TabPane>
        <Antd.Tabs.TabPane key="withdraw" tab="Withdraw">
          WITHDRAW
        </Antd.Tabs.TabPane>
      </Antd.Tabs>
    </div>
  );
};

export default PoolsView;
