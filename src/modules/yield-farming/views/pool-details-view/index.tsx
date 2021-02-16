import React from 'react';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Button from 'components/antd/button';
import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';

import PoolTokenDeposit from 'modules/yield-farming/components/pool-token-deposit';
import PoolTokenWithdraw from 'modules/yield-farming/components/pool-token-withdraw';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';

import { useWallet } from 'wallets/wallet';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { getPoolNames, PoolActions, PoolTypes } from 'modules/yield-farming/utils';

type RouteParams = {
  pool: PoolTypes;
  action: PoolActions;
};

const PoolDetailsView: React.FunctionComponent = () => {
  const {
    params: {
      pool = PoolTypes.STABLE,
      action = PoolActions.DEPOSIT,
    },
  } = useRouteMatch<RouteParams>();

  const history = useHistory();
  const wallet = useWallet();

  const [activeTab, setActiveTab] = React.useState<string>(action);

  React.useEffect(() => {
    setActiveTab(action);
  }, [action]);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!wallet.initialized) {
    return null;
  }

  if (!wallet.isActive) {
    return (
      <Redirect to="/yield-farming" />
    );
  }

  function handleBackClick() {
    history.replace('/yield-farming');
  }

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/yield-farming/${pool}/${tabKey}`);
  }

  return (
    <Grid flow="row" gap={32} align="start">
      <Button type="link" onClick={handleBackClick}>
        <Grid flow="col" gap={16} align="center">
          <Icons name="left-arrow" />
          <Heading type="h1" bold color="primary">
            {getPoolNames(pool).join('/')}
          </Heading>
        </Grid>
      </Button>

      <Grid flow="row" gap={24} width="100%">
        <Tabs simple activeKey={activeTab} onChange={handleTabChange}>
          <Tabs.Tab key={PoolActions.DEPOSIT} tab="Deposit" />
          <Tabs.Tab key={PoolActions.WITHDRAW} tab="Withdraw" />
        </Tabs>

        <Switch>
          <Route path={`/yield-farming/${pool}/${PoolActions.DEPOSIT}`} exact render={() => (
            <Grid flow="row" gap={64}>
              <Grid flow="row" gap={16}>
                {pool === PoolTypes.STABLE && (
                  <>
                    <PoolTokenDeposit token={USDCTokenMeta} />
                    <PoolTokenDeposit token={DAITokenMeta} />
                    <PoolTokenDeposit token={SUSDTokenMeta} />
                  </>
                )}
                {pool === PoolTypes.UNILP && (
                  <PoolTokenDeposit token={UNISWAPTokenMeta} expanded />
                )}
                {pool === PoolTypes.BOND && (
                  <PoolTokenDeposit token={BONDTokenMeta} expanded />
                )}
              </Grid>

              <Grid flow="row" gap={24}>
                <Paragraph type="p1" semiBold color="primary">
                  Transactions
                </Paragraph>
                <PoolTxTable
                  label="My Transactions"
                  ownTransactions
                  pool={pool}
                  action={PoolActions.DEPOSIT}
                />
              </Grid>
            </Grid>
          )} />
          <Route path={`/yield-farming/${pool}/${PoolActions.WITHDRAW}`} exact render={() => (
            <Grid flow="row" gap={64}>
              <Grid flow="row" gap={16}>
                {pool === PoolTypes.STABLE && (
                  <>
                    <PoolTokenWithdraw token={USDCTokenMeta} />
                    <PoolTokenWithdraw token={DAITokenMeta} />
                    <PoolTokenWithdraw token={SUSDTokenMeta} />
                  </>
                )}
                {pool === PoolTypes.UNILP && (
                  <PoolTokenWithdraw token={UNISWAPTokenMeta} expanded />
                )}
                {pool === PoolTypes.BOND && (
                  <PoolTokenWithdraw token={BONDTokenMeta} expanded />
                )}
              </Grid>

              <Grid flow="row" gap={24}>
                <Paragraph type="p1" semiBold color="primary">
                  Transactions
                </Paragraph>
                <PoolTxTable
                  label="My Transactions"
                  ownTransactions
                  pool={pool}
                  action={PoolActions.WITHDRAW}
                />
              </Grid>
            </Grid>
          )} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default PoolDetailsView;
