import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import { Heading, Paragraph, Small } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import PoolDetails from 'modules/smart-yield/components/pool-details';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';
import JuniorTranche from './junior-tranche';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';
import Tooltip from 'components/antd/tooltip';

export default function DepositView() {
  const web3c = useWeb3Contracts();
  const tokenPool = useTokenPool();

  async function handleSwitchChange(checked: boolean) {
    try {
      await tokenPool.actions.enableToken(checked);
    } catch {
    }
  }

  return (
    <>
      <Grid flow="col" gap={64} align="center" className="mb-64">
        <MarketCoinCard />
        <div>
          <Small semiBold className="mb-4">
            Wallet balance
          </Small>
          <Paragraph type="p1" semiBold color="primary">
            {formatBigValue(tokenPool.erc20?.state.balance)}
          </Paragraph>
        </div>
        <div>
          <Tooltip title={formatBigValue(web3c.sy.balance, 18)}>
            <Small semiBold className="mb-4">
              Portfolio balance
            </Small>
            <Paragraph type="p1" semiBold color="primary">
              {formatBigValue(web3c.sy.balance)}
            </Paragraph>
          </Tooltip>
        </div>
        <Grid flow="row" gap={4}>
          <Small semiBold color="secondary">
            Enable Token
          </Small>
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
              <Small semiBold className="mb-4">
                Senior APY
              </Small>
              <Paragraph type="p1" semiBold color="primary">
                6.42%
              </Paragraph>
            </div>
          </Route>
          <Route path="/smart-yield/:id/deposit/junior">
            <div>
              <Small semiBold className="mb-4">
                Junior APY
              </Small>
              <Paragraph type="p1" semiBold color="purple">
                21.33%
              </Paragraph>
            </div>
          </Route>
        </Switch>
      </Grid>
      <Grid flow="col" gap={32} colsTemplate="1fr minmax(240px, 482px)">
        <Card>
          <Heading type="h3" semiBold color="primary" className="mb-16">
            Select your preferred tranche
          </Heading>
          <Paragraph type="p2" semiBold className="mb-32">
            You can choose between fixed, or variable interest.
            <br />
            Be aware of the risk involved and read the warnings before going
            further
          </Paragraph>
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
