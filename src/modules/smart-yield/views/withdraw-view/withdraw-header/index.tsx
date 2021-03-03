import React from 'react';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

const WithdrawHeader: React.FC = () => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

  if (!pool) {
    return null;
  }

  return (
    <div
      className="flexbox-grid mb-64"
      style={{ '--gap': '64px', '--sm-gap': '24px', '--min': 'auto' } as React.CSSProperties}>
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={pool.meta?.icon!} bubbleName={pool.market?.icon!} />
        <div className="ml-auto">
          <div
            className="mb-4"
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
            }}>
            <Text type="p1" weight="semibold" color="primary" className="mr-4">
              {pool.meta?.name}
            </Text>
            <Text type="p1" weight="semibold">
              ({pool.underlyingSymbol})
            </Text>
          </div>
          <Text type="small" weight="semibold">
            {pool.market?.name}
          </Text>
        </div>
      </Grid>
      <Tooltip
        title={formatBigValue(getHumanValue(pool.underlyingBalance, pool.underlyingDecimals), pool.underlyingDecimals)}>
        <Text type="small" weight="semibold" className="mb-4">
          Wallet balance
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          <span className="grid flow-col col-gap-8 align-center">
            {formatBigValue(getHumanValue(pool.underlyingBalance, pool.underlyingDecimals))}
            <Text type="small" tag="span" weight="semibold" color="secondary">
              {pool.underlyingSymbol}
            </Text>
          </span>
        </Text>
      </Tooltip>
      <Tooltip
        title={formatBigValue(getHumanValue(pool.smartYieldBalance, pool.underlyingDecimals), pool.underlyingDecimals)}>
        <Text type="small" weight="semibold" className="mb-4">
          Portfolio balance
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          <span className="grid flow-col col-gap-8 align-center">
            {formatBigValue(getHumanValue(pool.smartYieldBalance, pool.underlyingDecimals))}
            <Text type="small" tag="span" weight="semibold" color="secondary">
              j{pool.underlyingSymbol}
            </Text>
          </span>
        </Text>
      </Tooltip>
    </div>
  );
};

export default WithdrawHeader;
