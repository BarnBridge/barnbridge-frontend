import { useState } from 'react';
import {
  useHistory,
  useParams,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import Card from 'components/antd/card';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import RadioCard from 'modules/smart-yield/components/radio-card';
import PoolDetails from 'modules/smart-yield/components/pool-details';
import s from './s.module.scss';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';
import JuniorTranche from './junior-tranche';

export default function DepositTemplateView() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Grid flow="col" gap={64} align="center" className={s.pageHeader}>
        <MarketCoinCard />
        <Grid flow="row" gap={4}>
          <Small semiBold>Wallet balance</Small>
          <Paragraph type="p1" semiBold color="grey900">
            25,381.3247
          </Paragraph>
        </Grid>
      </Grid>
      <Grid flow="col" gap={32} colsTemplate="1fr minmax(240px, 482px)">
        <Card>
          <Heading type="h3" semiBold color="grey900" className="mb-16">
            Select your preferred tranche
          </Heading>
          <Paragraph type="p2" semiBold className="mb-32">
            You can choose between fixed, or variable interest.
            <br />
            Be aware of the risk involved and read the warnings before going
            further
          </Paragraph>
          <Switch>
            <Route path="/smart-yield/deposit/:id" exact>
              <SelectTranche />
            </Route>
            <Route path="/smart-yield/deposit/:id/senior">
              <SeniorTranche />
            </Route>
            <Route path="/smart-yield/deposit/:id/junior">
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
