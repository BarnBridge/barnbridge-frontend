import React from 'react';
import * as Antd from 'antd';
import { useWeb3Contracts } from 'context/Web3Contracts';

import StatWidget from 'components/statWidget';
import DataRow from 'components/DataRow';
import MyRewards from 'components/my-rewards';

import { ReactComponent as USDCIcon } from 'resources/svg/coins/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/coins/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/coins/susd.svg';
import { ReactComponent as BONDIcon } from 'resources/svg/coins/bond.svg';

import s from './styles.module.css';
import PoolCard from 'components/pool-card';
import { useWeekCountdown } from 'hooks/useCountdown';

const PoolsView: React.FunctionComponent<{}> = props => {
  const web3c = useWeb3Contracts();
  const [untilNextEpoch] = useWeekCountdown();

  return (
    <div className={s.view}>
      <MyRewards />

      <div className={s.stat_widgets}>
        <StatWidget
          label="Total Staked"
          value={`$ ${web3c.aggregated.potentialReward?.toFormat(3) || '-'}`}
          hint="100,007" />
        <StatWidget
          label="Bond Rewards"
          value={web3c.aggregated.bondReward?.toFormat(3) || '-'}
          hint={`out of ${web3c.aggregated.totalBondReward?.toFormat() || '-'}`} />
        <StatWidget
          label={`Epoch ${web3c.yf?.currentEpoch ?? '-'}/${web3c.yf?.meta.totalEpochs ?? '-'}`}
          value={untilNextEpoch}
          hint="left until next epoch" />
      </div>

      <div className={s.pools_label}>Pools</div>
      <div className={s.overview_label}>Overview</div>

      <div className={s.pools_list}>
        <PoolCard
          names={['USDC', 'DAI', 'sUSD']}
          icons={[<USDCIcon key="usdc" />, <DAIIcon key="dai" />, <SUSDIcon key="susd" />]}
          colors={['#4f6ae6', '#ffd160', '#1e1a31']}
          currentEpoch={web3c.yf?.currentEpoch}
          totalEpochs={web3c.yf?.meta.totalEpochs}
          reward={web3c.yf?.meta.epochReward}
          potentialReward={web3c.aggregated.potentialReward}
          balance={web3c.aggregated.poolBalanceDUS}
          balanceShare={web3c.aggregated.poolBalanceDUSShares}
          myBalance={web3c.aggregated.myPoolBalanceDUS}
          myBalanceShare={[50, 30, 20]}
        />

        <PoolCard
          names={['USDC_BOND_UNI_LP']}
          icons={[<BONDIcon key="bond" />]}
          colors={['#ff4339']}
          currentEpoch={web3c.yflp?.currentEpoch}
          totalEpochs={web3c.yflp?.meta.totalEpochs}
          reward={web3c.yflp?.meta.epochReward}
          potentialReward={web3c.aggregated.potentialReward}
          balance={web3c.aggregated.poolBalanceUB}
          balanceShare={[100]}
          myBalance={web3c.aggregated.myPoolBalanceUB}
          myBalanceShare={[100]}
        />
      </div>

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
