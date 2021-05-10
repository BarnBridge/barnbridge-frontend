import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { Text } from 'components/custom/typography';
import { useWallet } from 'wallets/wallet';

import PoolCard from '../../components/pool-card';
import PoolChart from '../../components/pool-chart';
import PoolRewards from '../../components/pool-rewards';
import PoolStats from '../../components/pool-stats';
import PoolSYCard from '../../components/pool-sy-card';
import PoolTransactions from '../../components/pool-transactions';
import { YFPoolID } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolsView: FC = () => {
  const walletCtx = useWallet();

  return (
    <>
      {!isMobile && walletCtx.isActive && <PoolRewards />}
      <div className="content-container-fix content-container">
        <PoolStats className="mb-64" />
        <Text type="h1" weight="bold" color="primary" className="mb-16">
          Pools
        </Text>
        <Text type="p1" weight="semibold" color="secondary" className="mb-32">
          Overview
        </Text>
        <div className={s.poolCards}>
          <PoolSYCard />
          <PoolCard poolId={YFPoolID.UNILP} />
          <PoolCard poolId={YFPoolID.STABLE} />
          <PoolCard poolId={YFPoolID.BOND} />
        </div>
        <PoolChart className="mb-32" />
        <PoolTransactions />
      </div>
    </>
  );
};

export default PoolsView;
