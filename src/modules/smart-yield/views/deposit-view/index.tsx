import { Route, Switch } from 'react-router-dom';
import Card from 'components/antd/card';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import PoolDetails from 'modules/smart-yield/components/pool-details';
import SelectTranche from './select-tranche';
import SeniorTranche from './senior-tranche';
import JuniorTranche from './junior-tranche';

export default function DepositView() {
  return (
    <>
      <Grid flow="col" gap={64} align="center" className="mb-64">
        <MarketCoinCard />
        <div>
          <Small semiBold block className="mb-4">
            Wallet balance
          </Small>
          <Paragraph type="p1" semiBold color="grey900" block>
            25,381.3247
          </Paragraph>
        </div>
        <div>
          <Small semiBold block className="mb-4">
            Portfolio balance
          </Small>
          <Paragraph type="p1" semiBold color="grey900" block>
            5,230.9971
          </Paragraph>
        </div>

        <Switch>
          <Route path="/smart-yield/deposit/:id/senior">
            <div>
              <Small semiBold block className="mb-4">
                Senior APY
              </Small>
              <Paragraph type="p1" semiBold color="green500" block>
                6.42%
              </Paragraph>
            </div>
          </Route>
          <Route path="/smart-yield/deposit/:id/junior">
            <div>
              <Small semiBold block className="mb-4">
                Junior APY
              </Small>
              <Paragraph type="p1" semiBold color="purple500" block>
                21.33%
              </Paragraph>
            </div>
          </Route>
        </Switch>
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
