import React from 'react';
import { isMobile } from 'react-device-detect';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PoolCard from 'modules/yield-farming/components/pool-card';
import PoolRewards from 'modules/yield-farming/components/pool-rewards';
import PoolStats from 'modules/yield-farming/components/pool-stats';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';
import SYPoolCard from 'modules/yield-farming/components/sy-pool-card';
import SyPoolsProvider from 'modules/yield-farming/providers/sy-pools-provider';
import { useWallet } from 'wallets/wallet';

import { PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolsOverviewView: React.FC = () => {
  const wallet = useWallet();

  return (
    <>
      {!isMobile && wallet.isActive && <PoolRewards />}
      <div className="content-container-fix content-container">
        <PoolStats className="mb-64" />

        <Grid flow="row" gap={16} className="mb-32">
          <Text type="h1" weight="bold" color="primary">
            Pools
          </Text>
          <Text type="p1" weight="semibold" color="secondary">
            Overview
          </Text>
        </Grid>
        <div className={s.poolCards}>
          <SyPoolsProvider>
            <SYPoolCard />
          </SyPoolsProvider>
          <PoolCard pool={PoolTypes.STABLE} />
          <PoolCard pool={PoolTypes.UNILP} />
          <PoolCard pool={PoolTypes.BOND} />
        </div>
        <PoolTxChart className="mb-32" />
        <PoolTxTable label="Transactions" />
      </div>
    </>
  );
};

export default PoolsOverviewView;
