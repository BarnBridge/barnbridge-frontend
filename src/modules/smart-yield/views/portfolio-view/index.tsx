import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import TabCard from 'modules/smart-yield/components/tab-card';
import PortfolioStatistics from './statistics';
import PortfolioSenior from './senior';
import PortfolioJunior from './junior';

const PortfolioView: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <>
      <Grid flow="col" gap={24} className="mb-64">
        <TabCard
          title="Overview"
          subtitle="Statistics"
          icon={<Icons name="statistics" width={53} height={40} />}
          active
          {...{
            type: "button",
            onClick: () => history.push('/smart-yield/portfolio')
          }}

        />
        <TabCard
          title="Senior tranche"
          subtitle="Positions"
          icon={
            <Icons name="senior_tranche_simplified" width={53} height={40} />
          }
          {...{
            type: "button",
            onClick: () => history.push('/smart-yield/portfolio/senior')
          }}
        />
        <TabCard
          title="Junior tranche"
          subtitle="Positions"
          icon={
            <Icons name="junior_tranche_simplified" width={53} height={40} />
          }
          {...{
            type: "button",
            onClick: () => history.push('/smart-yield/portfolio/junior')
          }}
        />
      </Grid>
      <Switch>
          <Route path="/smart-yield/portfolio" exact component={PortfolioStatistics} />
          <Route path="/smart-yield/portfolio/senior" component={PortfolioSenior} />
          <Route path="/smart-yield/portfolio/junior" component={PortfolioJunior} />
          <Redirect to="/smart-yield/portfolio" />
        </Switch>
    </>
  );
};

export default PortfolioView;
