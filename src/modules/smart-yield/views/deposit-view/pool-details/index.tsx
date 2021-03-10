import React from 'react';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatUSDValue } from 'web3/utils';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Tooltip from 'components/antd/tooltip';
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
          <Tooltip
            title={
              <>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {formatBigValue(pool.state.seniorLiquidity)}
                  {` ${pool.underlyingSymbol}`}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSDValue(new BigNumber(pool.state.seniorLiquidity))}
                </Text>
              </>
            }>
            <div className="flex flow-col col-gap-8">
              <Text type="p1" weight="semibold" color="primary">
                {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.seniorLiquidity)}
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {pool.underlyingSymbol}
              </Text>
            </div>

            <Text type="small" weight="semibold">
              {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                pool.state.seniorLiquidity,
              )}
            </Text>
          </Tooltip>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior Liquidity
          </Text>
          <Tooltip
            title={
              <>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {formatBigValue(pool.state.juniorLiquidity)}
                  {` ${pool.underlyingSymbol}`}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSDValue(new BigNumber(pool.state.juniorLiquidity))}
                </Text>
              </>
            }>
            <div className="flex flow-col col-gap-8">
              <Text type="p1" weight="semibold" color="primary">
                {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.juniorLiquidity)}
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {pool.underlyingSymbol}
              </Text>
            </div>
            <Text type="small" weight="semibold">
              {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                pool.state.juniorLiquidity,
              )}
            </Text>
          </Tooltip>
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
          <Tooltip
            title={
              <>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {formatBigValue(pool.state.juniorLiquidityLocked)}
                  {` ${pool.underlyingSymbol}`}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSDValue(new BigNumber(pool.state.juniorLiquidityLocked))}
                </Text>
              </>
            }>
            <div className="flex flow-col col-gap-8">
              <Text type="p1" weight="semibold" color="primary">
                {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.juniorLiquidityLocked)}
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {pool.underlyingSymbol}
              </Text>
            </div>
            <Text type="small" weight="semibold">
              {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                pool.state.juniorLiquidityLocked,
              )}
            </Text>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default PoolDetails;
