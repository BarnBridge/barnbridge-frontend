import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';

const TokenPoolHeader: React.FC = () => {
  const poolCtx = useTokenPool();
  const { pool } = poolCtx;

  const isRootDeposit = Boolean(
    useRouteMatch({
      path: '/smart-yield/deposit',
      exact: true,
    }),
  );
  const isSeniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/senior'));
  const isJuniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/junior'));

  const [isApproving, setApproving] = React.useState<boolean>(false);

  async function handleSwitchChange(enable: boolean) {
    setApproving(true);

    try {
      await poolCtx.actions.approveUnderlying(enable);
    } catch {}

    setApproving(false);
  }

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
      {!isSeniorDeposit && !isRootDeposit && (
        <Tooltip
          title={formatBigValue(
            getHumanValue(pool.smartYieldBalance, pool.underlyingDecimals),
            pool.underlyingDecimals,
          )}>
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
      )}
      {isSeniorDeposit && (
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Senior APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.state.seniorApy * 100)}%
          </Text>
        </div>
      )}
      {isJuniorDeposit && (
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Junior APY
          </Text>
          <Text type="p1" weight="semibold" color="purple">
            {formatBigValue(pool.state.juniorApy * 100)}%
          </Text>
        </div>
      )}
      {(isSeniorDeposit || isJuniorDeposit) && (
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Enable Token
          </Text>
          <Antd.Switch
            style={{ justifySelf: 'flex-start' }}
            checked={pool.underlyingIsAllowed}
            loading={pool.underlyingIsAllowed === undefined || isApproving}
            onChange={handleSwitchChange}
          />
        </div>
      )}
    </div>
  );
};

export default TokenPoolHeader;
