import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

import TokenPoolDetails from '../token-pool-view/token-pool-details';
import TokenPoolTrend from '../token-pool-view/token-pool-trend';
import JuniorTranche from './junior-tranche';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';

const DepositView: React.FC = () => {
  return (
    <>
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
            <Route path="/smart-yield/:id/deposit/" exact component={SelectTranche} />
            <Route path="/smart-yield/:id/deposit/senior" component={SeniorTranche} />
            <Route path="/smart-yield/:id/deposit/junior" component={JuniorTranche} />
          </Switch>
        </Card>
        <Grid flow="row" gap={32}>
          <TokenPoolDetails />
          <TokenPoolTrend />
        </Grid>
      </Grid>
    </>
  );
};

export default DepositView;
