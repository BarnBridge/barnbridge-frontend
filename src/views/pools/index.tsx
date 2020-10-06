import React from 'react';
import { formatDistance } from 'date-fns';

import MyRewards from 'components/my-rewards';
import StatWidget from 'components/stat-widget';
import PoolStak from 'components/pool-stak';
import PoolOverview from 'components/pool-overview';

import { useWeekCountdown } from 'hooks/useCountdown';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNIIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

const PoolsView: React.FunctionComponent<{}> = props => {
  const { aggregated, staking, uniswapV2 } = useWeb3Contracts();
  const [untilNextEpoch] = useWeekCountdown(staking?.epochEnd);

  const [activeStaking, setActiveStaking] = React.useState<string | undefined>();

  function handleStakBack() {
    setActiveStaking(undefined);
  }

  return (
    <div className={s.view}>
      <MyRewards />

      <div className={s.statWidgets}>
        <StatWidget
          label="Total Value Locked"
          value={`$ ${formatBigValue(aggregated.totalStaked, 2)}`}
          hint={`${formatBigValue(aggregated.totalStakedInETH)} ETH`} />
        <StatWidget
          label="Bond Rewards"
          value={formatBigValue(aggregated.bondReward)}
          hint={`out of ${formatBigValue(aggregated.totalBondReward, 0)}`} />
        <StatWidget
          label="Bond Price"
          value={`$ ${formatBigValue(aggregated.bondPrice, 2)}`}
          hint={uniswapV2?.lastBlockTime ? formatDistance(new Date(uniswapV2.lastBlockTime), new Date(), {
            addSuffix: true,
          }) : '-'} />
        <StatWidget
          label="Time Left"
          value={untilNextEpoch}
          hint="until next epoch" />
      </div>

      {!activeStaking && (
        <PoolOverview onPoolStackSelect={setActiveStaking} />
      )}
      {activeStaking === 'uds' && (
        <PoolStak
          loading={false}
          label="USDC/DAI/sUSD"
          tokens={[
            String(process.env.REACT_APP_CONTRACT_USDC_ADDR),
            String(process.env.REACT_APP_CONTRACT_DAI_ADDR),
            String(process.env.REACT_APP_CONTRACT_SUSD_ADDR),
          ]}
          summary={[
            {
              logo: <USDCIcon />,
              name: 'USDC',
              walletBalance: '800',
              stakedBalance: '100',
              enabled: true,
            },
            {
              logo: <DAIIcon />,
              name: 'DAI',
              walletBalance: '800',
              stakedBalance: '100',
              enabled: false,
            },
            {
              logo: <SUSDIcon />,
              name: 'sUSD',
              walletBalance: '800',
              stakedBalance: '100',
              enabled: false,
            },
          ]}
          onBack={handleStakBack}
        />
      )}
      {activeStaking === 'uni' && (
        <PoolStak
          loading={false}
          label="USDC_BOND_UNI_LP"
          tokens={[String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR)]}
          summary={[
            {
              logo: <UNIIcon />,
              name: 'USDC_BOND_UNI_LP',
              walletBalance: '800',
              stakedBalance: '100',
              enabled: false,
            },
          ]}
          onBack={handleStakBack}
        />
      )}
    </div>
  );
};

export default PoolsView;
