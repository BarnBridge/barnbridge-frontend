import React, { FC } from 'react';
import { isMobile } from 'react-device-detect';

import { Text } from 'components/custom/typography';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import { YFPoolID } from 'modules/yield-farming/providers/pools-provider';
import PoolRewards from 'modules/yield-farming/views/pool-rewards';
import PoolStats from 'modules/yield-farming/views/pool-stats';
import PoolTransactions from 'modules/yield-farming/views/pool-transactions';
import SYPoolCard from 'modules/yield-farming/views/sy-pool-card';
import { useWallet } from 'wallets/wallet';

import PoolCard from '../pool-card';

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
          <SYPoolCard />
          <PoolCard poolId={YFPoolID.UNILP} />
          <PoolCard poolId={YFPoolID.STABLE} />
          <PoolCard poolId={YFPoolID.BOND} />
        </div>
        <PoolTxChart className="mb-32" />
        <PoolTransactions />
      </div>
    </>
  );
};

export default PoolsView;
