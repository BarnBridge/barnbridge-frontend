import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';

import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import PortfolioJunior from './junior';
import PortfolioSenior from './senior';
import PortfolioStatistics from './statistics';

const PortfolioView: React.FunctionComponent = () => {
  return (
    <>
      <Grid flow="col" gap={24} className="mb-64">
        <NavLink to="/smart-yield/portfolio" exact className="tab-card" activeClassName="active">
          <Icons name="statistics" width={53} height={40} className="mr-16" />
          <Grid flow="row">
            <Text type="p1" weight="semibold" color="primary">
              Overview
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Statistics
            </Text>
          </Grid>
        </NavLink>
        <NavLink to="/smart-yield/portfolio/senior" className="tab-card" activeClassName="active">
          <Icons name="senior_tranche_simplified" width={53} height={40} className="mr-16" />
          <Grid flow="row">
            <Text type="p1" weight="semibold" color="primary">
              Senior tranche
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Positions
            </Text>
          </Grid>
        </NavLink>
        <NavLink to="/smart-yield/portfolio/junior" className="tab-card" activeClassName="active">
          <Icons name="junior_tranche_simplified" width={53} height={40} className="mr-16" />
          <Grid flow="row">
            <Text type="p1" weight="semibold" color="primary">
              Junior tranche
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Positions
            </Text>
          </Grid>
        </NavLink>
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
