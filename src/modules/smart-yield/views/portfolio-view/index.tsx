import React, { Suspense, lazy } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

const JuniorPortfolio = lazy(() => import('./junior'));
const PortfolioOverview = lazy(() => import('./overview'));
const SeniorPortfolio = lazy(() => import('./senior'));

const PortfolioView: React.FC = () => {
  return (
    <>
      <div className="tab-cards mb-64 sm-mb-32">
        <NavLink to="/smart-yield/portfolio" exact className="tab-card" activeClassName="active">
          <Icon name="statistics" width={53} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Overview
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Statistics
            </Text>
          </div>
        </NavLink>
        <NavLink to="/smart-yield/portfolio/senior" className="tab-card" activeClassName="active">
          <Icon name="senior_tranche_simplified" width={53} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Senior tranche
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Positions
            </Text>
          </div>
        </NavLink>
        <NavLink to="/smart-yield/portfolio/junior" className="tab-card" activeClassName="active">
          <Icon name="junior_tranche_simplified" width={53} height={40} className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary">
              Junior tranche
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Positions
            </Text>
          </div>
        </NavLink>
      </div>
      <Suspense fallback={<AntdSpin />}>
        <Switch>
          <Route path="/smart-yield/portfolio" exact component={PortfolioOverview} />
          <Route path="/smart-yield/portfolio/senior" component={SeniorPortfolio} />
          <Route path="/smart-yield/portfolio/junior" component={JuniorPortfolio} />
          <Redirect to="/smart-yield/portfolio" />
        </Switch>
      </Suspense>
    </>
  );
};

export default PortfolioView;
