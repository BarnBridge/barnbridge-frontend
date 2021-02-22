import React from 'react';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PoolCard from 'modules/yield-farming/components/pool-card';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';

import { PoolTypes } from 'modules/yield-farming/utils';

const PoolsOverviewView: React.FC = () => {
  return (
    <Grid flow="row" gap={32}>
      <Grid flow="row" gap={16}>
        <Text type="h1" weight="bold" color="primary">
          Pools
        </Text>
        <Text type="p1" weight="semibold" color="secondary">
          Overview
        </Text>
      </Grid>
      <Grid flow="col" gap={32} colsTemplate="repeat(auto-fit, minmax(392px, 1fr))">
        <PoolCard pool={PoolTypes.STABLE} />
        <PoolCard pool={PoolTypes.UNILP} />
        <PoolCard pool={PoolTypes.BOND} />
      </Grid>
      <PoolTxChart />
      <PoolTxTable label="Transactions" />
    </Grid>
  );
};

export default PoolsOverviewView;
