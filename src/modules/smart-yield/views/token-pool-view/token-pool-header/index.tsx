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
  const tokenPool = useTokenPool();

  const isRootDeposit = Boolean(
    useRouteMatch({
      path: '/smart-yield/:address/deposit',
      exact: true,
    }),
  );
  const isSeniorDeposit = Boolean(useRouteMatch('/smart-yield/:address/deposit/senior'));
  const isJuniorDeposit = Boolean(useRouteMatch('/smart-yield/:address/deposit/junior'));

  async function handleSwitchChange(checked: boolean) {
    try {
      await tokenPool.actions.enableToken(checked);
    } catch {}
  }

  return (
    <Grid flow="col" gap={64} align="center" className="mb-64">
      {tokenPool.originator && (
        <Grid flow="col" gap={16} align="center">
          <IconBubble name={tokenPool.originator.icon} bubbleName={tokenPool.originator.market.icon} />
          <Grid flow="row" gap={4} className="ml-auto">
            <div>
              <Text type="p1" weight="semibold" color="primary">
                {tokenPool.uToken?.name}
              </Text>{' '}
              <Text type="p1" weight="semibold">
                ({tokenPool.uToken?.symbol})
              </Text>
            </div>
            <Text type="small" weight="semibold">
              {tokenPool.originator.market.name}
            </Text>
          </Grid>
        </Grid>
      )}
      <div>
        <Text type="small" weight="semibold" className="mb-4">
          Wallet balance
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(tokenPool.uToken?.balance)} {tokenPool.uToken?.symbol}
        </Text>
      </div>
      {!isSeniorDeposit && !isRootDeposit && (
        <div>
          <Tooltip>
            <Text type="small" weight="semibold" className="mb-4">
              Portfolio balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(tokenPool.sy?.balance)} {tokenPool.cToken?.symbol}
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
            - %
          </Text>
        </div>
      )}
      {isJuniorDeposit && (
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Junior APY
          </Text>
          <Text type="p1" weight="semibold" color="purple">
            - %
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
            checked={tokenPool.uToken?.isAllowed}
            loading={tokenPool.uToken?.isAllowed === undefined || tokenPool.uToken?.isApproving}
            onChange={handleSwitchChange}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TokenPoolHeader;
