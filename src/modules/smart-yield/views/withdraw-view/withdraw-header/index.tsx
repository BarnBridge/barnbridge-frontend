import React from 'react';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

const WithdrawHeader: React.FC = () => {
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

  if (!pool) {
    return null;
  }

  return (
    <div
      className="flexbox-list mb-64"
      style={{ '--gap': '64px', '--sm-gap': '24px', '--min': 'auto' } as React.CSSProperties}>
      <Grid flow="col" gap={16} align="center">
        <TokenIcon name={pool.token?.icon as TokenIconNames} bubble1Name={pool.market?.icon.active as TokenIconNames} />
        <div className="ml-auto">
          <div
            className="mb-4"
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
            }}>
            <Text type="body1" weight="semibold" color="primary" className="mr-4">
              {pool.token?.name}
            </Text>
            <Text type="body1" weight="semibold">
              ({pool.underlyingSymbol})
            </Text>
          </div>
          <Text type="caption" weight="semibold">
            {pool.market?.name}
          </Text>
        </div>
      </Grid>
      <Tooltip
        title={formatBigValue(
          getHumanValue(pool.contracts.underlying.balance, pool.underlyingDecimals),
          pool.underlyingDecimals,
        )}>
        <Text type="caption" weight="semibold" className="mb-4">
          Wallet balance
        </Text>
        <Text type="body1" weight="semibold" color="primary">
          <span className="grid flow-col col-gap-8 align-center">
            {formatBigValue(getHumanValue(pool.contracts.underlying.balance, pool.underlyingDecimals))}
            <Text type="caption" tag="span" weight="semibold" color="secondary">
              {pool.underlyingSymbol}
            </Text>
          </span>
        </Text>
      </Tooltip>
      <Tooltip
        title={formatBigValue(
          getHumanValue(pool.contracts.smartYield.balance, pool.underlyingDecimals),
          pool.underlyingDecimals,
        )}>
        <Text type="caption" weight="semibold" className="mb-4">
          Portfolio balance
        </Text>
        <Text type="body1" weight="semibold" color="primary">
          <span className="grid flow-col col-gap-8 align-center">
            {formatBigValue(getHumanValue(pool.contracts.smartYield.balance, pool.underlyingDecimals))}
            <Text type="caption" tag="span" weight="semibold" color="secondary">
              {pool.contracts.smartYield.symbol}
            </Text>
          </span>
        </Text>
      </Tooltip>
    </div>
  );
};

export default WithdrawHeader;
