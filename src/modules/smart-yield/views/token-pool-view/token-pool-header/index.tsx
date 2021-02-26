import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import { formatBigValue } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';

const TokenPoolHeader: React.FC = () => {
  const pool = useTokenPool();

  const isRootDeposit = Boolean(
    useRouteMatch({
      path: '/smart-yield/:address/deposit',
      exact: true,
    }),
  );
  const isSeniorDeposit = Boolean(useRouteMatch('/smart-yield/:address/deposit/senior'));
  const isJuniorDeposit = Boolean(useRouteMatch('/smart-yield/:address/deposit/junior'));

  const [isApproving, setApproving] = React.useState<boolean>(false);

  async function handleSwitchChange(enable: boolean) {
    setApproving(true);

    try {
      await pool.actions.approveUnderlying(enable);
    } catch {}

    setApproving(false);
  }

  return (
    <Grid flow="col" gap={64} align="center" className="mb-64">
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={pool.pool?.meta?.icon!} bubbleName={pool.pool?.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <div>
            <Text type="p1" weight="semibold" color="primary">
              {pool.pool?.meta?.name}
            </Text>{' '}
            <Text type="p1" weight="semibold">
              ({pool.pool?.underlyingSymbol})
            </Text>
          </div>
          <Text type="small" weight="semibold">
            {pool.pool?.market?.name}
          </Text>
        </Grid>
      </Grid>
      <div>
        <Text type="small" weight="semibold" className="mb-4">
          Wallet balance
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(pool.pool?.underlyingContract?.balance)} {pool.pool?.underlyingSymbol}
        </Text>
      </div>
      {!isSeniorDeposit && !isRootDeposit && (
        <div>
          <Tooltip>
            <Text type="small" weight="semibold" className="mb-4">
              Portfolio balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              -
            </Text>
          </Tooltip>
        </div>
      )}
      {isSeniorDeposit && (
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Senior APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(pool.pool?.state.seniorApy)}%
          </Text>
        </div>
      )}
      {isJuniorDeposit && (
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Junior APY
          </Text>
          <Text type="p1" weight="semibold" color="purple">
            {formatBigValue(pool.pool?.state.juniorApy)}%
          </Text>
        </div>
      )}
      {(isSeniorDeposit || isJuniorDeposit) && (
        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Enable Token
          </Text>
          <Antd.Switch
            style={{ justifySelf: 'flex-start' }}
            checked={pool.pool?.underlyingContract?.isAllowed}
            loading={pool.pool?.underlyingContract?.isAllowed === undefined || isApproving}
            onChange={handleSwitchChange}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TokenPoolHeader;
