import React from 'react';
import { formatBigValue } from 'web3/utils';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import { Hint, Text } from 'components/custom/typography';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { getFormattedDuration } from 'utils';

const PoolDetails: React.FC = () => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

  if (!pool) {
    return null;
  }

  return (
    <Card noPaddingBody>
      <div className="p-24">
        <Text type="p1" weight="semibold" color="primary">
          Pool details
        </Text>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Senior Liquidity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.seniorLiquidity)}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior Liquidity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.juniorLiquidity)}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            # of seniors
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.numberOfSeniors)}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            # of juniors
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.numberOfJuniors)}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Senior APY
          </Text>
          <Text type="p1" weight="semibold" color="green">
            {formatBigValue(pool.state.seniorApy * 100)}%
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior APY
          </Text>
          <Text type="p1" weight="semibold" color="purple">
            {formatBigValue(pool.state.juniorApy * 100)}%
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Hint text="The average maturity date of the current senior bonds in this pool.">
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Average senior maturity
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary">
            {getFormattedDuration(
              Date.now(),
              Date.now() + (pool.state.avgSeniorMaturityDays ?? 0) * 24 * 60 * 60 * 1_000,
            )}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior liquidity locked
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.juniorLiquidityLocked)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PoolDetails;
