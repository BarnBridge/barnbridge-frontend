import React from 'react';

import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';

import PoolCard from 'modules/yield-farming/components/pool-card';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';
import { PoolTypes } from 'modules/yield-farming/utils';

const PoolsOverviewView: React.FunctionComponent = () => {
  return (
    <Grid flow="row" gap={32}>
      <Grid flow="row" gap={16}>
        <Heading type="h1" bold color="primary">Pools</Heading>
        <Paragraph type="p1" semiBold color="secondary">Overview</Paragraph>
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
