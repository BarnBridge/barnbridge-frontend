import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import * as Antd from 'antd';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import TokenPoolHeader from 'modules/smart-yield/views/token-pool-view/token-pool-header';
import TokenPoolProvider, { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';

import TokenPoolDetails from '../token-pool-view/token-pool-details';
import TokenPoolTrend from '../token-pool-view/token-pool-trend';
import JuniorTranche from './junior-tranche';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';

import s from './s.module.scss';

const DepositViewInner: React.FC = () => {
  const poolCtx = useTokenPool();

  if (poolCtx.loading) {
    return <Antd.Spin />;
  }

  if (poolCtx.pool === null) {
    return <Redirect to={'/smart-yield'} />;
  }

  return (
    <>
      <TokenPoolHeader />
      <div className={s.container}>
        <Card style={{ flexGrow: 1 }}>
          <Text type="h3" weight="semibold" color="primary" className="mb-16">
            Select your preferred tranche
          </Text>
          <Text type="p2" weight="semibold" className="mb-32">
            You can choose between fixed, or variable interest.
            <br />
            Be aware of the risk involved and read the warnings before going further
          </Text>
          <Switch>
            <Route path="/smart-yield/deposit" exact component={SelectTranche} />
            <Route path="/smart-yield/deposit/senior" exact component={SeniorTranche} />
            <Route path="/smart-yield/deposit/junior" exact component={JuniorTranche} />
          </Switch>
        </Card>
        <Grid flow="row" gap={32}>
          <TokenPoolDetails />
          <TokenPoolTrend />
        </Grid>
      </div>
    </>
  );
};

const DepositView: React.FC = () => {
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search);
  const market = decodeURIComponent(urlQuery.get('m') ?? '');
  const token = decodeURIComponent(urlQuery.get('t') ?? '');

  return (
    <TokenPoolProvider market={market} token={token}>
      <DepositViewInner />
    </TokenPoolProvider>
  );
};

export default DepositView;
