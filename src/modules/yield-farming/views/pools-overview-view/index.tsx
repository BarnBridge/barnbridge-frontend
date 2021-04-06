import React from 'react';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PoolCard from 'modules/yield-farming/components/pool-card';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';
import SYPoolCard from 'modules/yield-farming/components/sy-pool-card';

import { PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolsOverviewView: React.FC = () => {
  return (
    <>
      <Grid flow="row" gap={16} className="mb-32">
        <Text type="h1" weight="bold" color="primary">
          Pools
        </Text>
        <Text type="p1" weight="semibold" color="secondary">
          Overview
        </Text>
      </Grid>
      <div className={s.poolCards}>
        <SYPoolCard />
        <PoolCard pool={PoolTypes.STABLE} />
        <PoolCard pool={PoolTypes.UNILP} />
        <SYPoolCard />
        <PoolCard pool={PoolTypes.BOND} />
      </div>
      <PoolTxChart className="mb-32" />
      <PoolTxTable label="Transactions" />
    </>
  );
};

export default PoolsOverviewView;
