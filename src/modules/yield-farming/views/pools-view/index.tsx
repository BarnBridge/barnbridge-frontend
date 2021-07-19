import { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { Text } from 'components/custom/typography';
import SyAPIProvider from 'modules/smart-yield/api';
import RewardPoolsProvider from 'modules/smart-yield/providers/reward-pools-provider';
import AggregatedPoolCard from 'modules/smart-yield/views/pools-view/aggregated-pool-card';
import PoolsTransactions from 'modules/yield-farming/components/pools-transactions';
import { useWallet } from 'wallets/walletProvider';

import PoolCard from '../../components/pool-card';
import PoolChart from '../../components/pool-chart';
import PoolRewards from '../../components/pool-rewards';
import PoolStats from '../../components/pool-stats';
import { YFPoolID } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolsView: FC = () => {
  const walletCtx = useWallet();

  return (
    <SyAPIProvider>
      {!isMobile && walletCtx.isActive && <PoolRewards />}
      <div className="content-container-fix content-container">
        <RewardPoolsProvider>
          <PoolStats className="mb-64" />
          <Text type="h1" weight="bold" color="primary" className="mb-16">
            Pools
          </Text>
          <Text type="p1" weight="semibold" color="secondary" className="mb-32">
            Overview
          </Text>
          <div className={s.poolCards}>
            <AggregatedPoolCard />
            <PoolCard poolId={YFPoolID.UNILP} />
            <PoolCard poolId={YFPoolID.STABLE} />
            <PoolCard poolId={YFPoolID.BOND} />
          </div>
        </RewardPoolsProvider>
        <PoolChart className="mb-32" />
        <PoolsTransactions />
      </div>
    </SyAPIProvider>
  );
};

export default PoolsView;
