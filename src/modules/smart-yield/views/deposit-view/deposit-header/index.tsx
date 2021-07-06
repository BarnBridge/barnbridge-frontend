import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import { formatPercent, formatToken } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/walletProvider';

type Props = {
  className?: string;
};

const DepositHeader: React.FC<Props> = ({ className }) => {
  const wallet = useWallet();
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

  const isRootDeposit = Boolean(
    useRouteMatch({
      path: '/smart-yield/deposit',
      exact: true,
    }),
  );
  const isSeniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/senior'));
  const isJuniorDeposit = Boolean(useRouteMatch('/smart-yield/deposit/junior'));

  if (!pool) {
    return null;
  }

  return (
    <div
      className={cn('flexbox-list', className)}
      style={{ '--gap': '24px 64px', '--sm-gap': '24px', '--min': 'auto' } as React.CSSProperties}>
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={pool.meta?.icon} bubbleName={pool.market?.icon} />
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
      {wallet.isActive && (
        <>
          <Tooltip
            title={formatToken(pool.contracts.underlying.balance, {
              scale: pool.underlyingDecimals,
            })}>
            <Text type="small" weight="semibold" className="mb-4">
              Wallet balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              <span className="grid flow-col col-gap-8 align-center">
                {formatToken(pool.contracts.underlying.balance, {
                  scale: pool.underlyingDecimals,
                })}
                <Text type="small" tag="span" weight="semibold" color="secondary">
                  {pool.underlyingSymbol}
                </Text>
              </span>
            </Text>
          </Tooltip>
          {!isSeniorDeposit && !isRootDeposit && (
            <Tooltip
              title={formatToken(pool.contracts.smartYield.balance, {
                scale: pool.underlyingDecimals,
              })}>
              <Text type="small" weight="semibold" className="mb-4">
                Portfolio balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                <span className="grid flow-col col-gap-8 align-center">
                  {formatToken(pool.contracts.smartYield.balance, {
                    scale: pool.underlyingDecimals,
                  })}
                  <Text type="small" tag="span" weight="semibold" color="secondary">
                    {pool.contracts.smartYield.symbol}
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
              <Text type="p1" weight="semibold" color="green">
                {formatPercent(pool.state.seniorApy)}
              </Text>
            </div>
          )}
          {isJuniorDeposit && (
            <div>
              <Text type="small" weight="semibold" className="mb-4">
                Junior APY
              </Text>
              <Text type="p1" weight="semibold" color="purple">
                {formatPercent(pool.state.juniorApy)}
              </Text>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DepositHeader;
