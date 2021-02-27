import React from 'react';
import { formatBigValue } from 'web3/utils';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

import { useTokenPool } from '../token-pool-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const TokenPoolDetails: React.FC = () => {
  const poolCtx = useTokenPool();
  const { pool } = poolCtx;

  if (!pool) {
    return null;
  }

  return (
    <Card noPaddingBody>
      <div className={s.detailsRow}>
        <Text type="p1" weight="semibold" color="primary">
          Pool details
        </Text>
      </div>
      <Divider />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior Liquidity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.juniorLiquidity)}
          </Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Senior Liquidity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.seniorLiquidity)}
          </Text>
        </Grid>
      </Grid>
      <Divider />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            # of juniors
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.numberOfJuniors)}
          </Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            # of seniors
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.numberOfSeniors)}
          </Text>
        </Grid>
      </Grid>
      <Divider />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior APY
          </Text>
          <Text type="p1" weight="semibold" color="purple">
            {formatBigValue(pool.state.juniorApy * 100)}%
          </Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Senior APY
          </Text>
          <Text type="p1" weight="semibold" color="green">
            {formatBigValue(pool.state.seniorApy * 100)}%
          </Text>
        </Grid>
      </Grid>
      <Divider />
      <Grid flow="col" gap={32} className={s.detailsRow} colsTemplate="1fr 1fr">
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior liquidity locked
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            -
          </Text>
        </Grid>
        <Grid flow="row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Average senior maturity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {getFormattedDuration(
              Date.now(),
              Date.now() + (pool.state.avgSeniorMaturityDays ?? 0) * 24 * 60 * 60 * 1_000,
            )}
          </Text>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TokenPoolDetails;
