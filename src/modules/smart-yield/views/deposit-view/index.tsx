import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

import Card from 'components/antd/card';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import PoolDetails from 'modules/smart-yield/components/pool-details';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';

import JuniorTranche from './junior-tranche';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';

export default function DepositView() {
  const web3c = useWeb3Contracts();
  const tokenPool = useTokenPool();

  async function handleSwitchChange(checked: boolean) {
    try {
      await tokenPool.actions.enableToken(checked);
    } catch {}
  }

  return (
    <>
      <Grid flow="col" gap={64} align="center" className="mb-64">
        <MarketCoinCard />
        <div>
          <Text type="small" weight="semibold" className="mb-4">
            Wallet balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(tokenPool.erc20?.state.balance)}
          </Text>
        </div>
        <div>
          <Tooltip title={formatBigValue(web3c.sy.balance, 18)}>
            <Text type="small" weight="semibold" className="mb-4">
              Portfolio balance
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(web3c.sy.balance)}
            </Text>
          </Tooltip>
        </div>
        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Enable Token
          </Text>
          <Antd.Switch
            style={{ justifySelf: 'flex-start' }}
            checked={tokenPool.erc20?.state.isAllowed}
            loading={tokenPool.erc20?.state.isAllowed === undefined || tokenPool.erc20?.state.isApproving}
            onChange={handleSwitchChange}
          />
        </Grid>

        <Switch>
          <Route path="/smart-yield/:id/deposit/senior">
            <div>
              <Text type="small" weight="semibold" className="mb-4">
                Senior APY
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                6.42%
              </Text>
            </div>
          </Route>
          <Route path="/smart-yield/:id/deposit/junior">
            <div>
              <Text type="small" weight="semibold" className="mb-4">
                Junior APY
              </Text>
              <Text type="p1" weight="semibold" color="purple">
                21.33%
              </Text>
            </div>
          </Route>
        </Switch>
      </Grid>
      <Grid flow="col" gap={32} colsTemplate="1fr minmax(240px, 482px)">
        <Card>
          <Text type="h3" weight="semibold" color="primary" className="mb-16">
            Select your preferred tranche
          </Text>
          <Text type="p2" weight="semibold" className="mb-32">
            You can choose between fixed, or variable interest.
            <br />
            Be aware of the risk involved and read the warnings before going further
          </Text>
          <Switch>
            <Route path="/smart-yield/:id/deposit/" exact>
              <SelectTranche />
            </Route>
            <Route path="/smart-yield/:id/deposit/senior">
              <SeniorTranche />
            </Route>
            <Route path="/smart-yield/:id/deposit/junior">
              <JuniorTranche />
            </Route>
          </Switch>
        </Card>
        <Grid flow="row" gap={32}>
          <PoolDetails />
          <Card noPaddingBody>APY trend</Card>
        </Grid>
      </Grid>
    </>
  );
}
