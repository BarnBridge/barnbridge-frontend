import React, { Suspense } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import { PortfolioPositions } from './positions';
import { PortfolioStatistics } from './statistics';

const PortfolioView: React.FC = () => {
  return (
    <>
      <div className="tab-cards mb-64 sm-mb-32">
        <NavLink to="/smart-alpha/portfolio" exact className="tab-card" activeClassName="active">
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
        <NavLink to="/smart-alpha/portfolio/senior" className="tab-card" activeClassName="active">
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
        <NavLink to="/smart-alpha/portfolio/junior" className="tab-card" activeClassName="active">
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
          <Route path="/smart-alpha/portfolio" exact component={PortfolioStatistics} />
          <Route path="/smart-alpha/portfolio/:tranche(senior|junior)" component={PortfolioPositions} />
          <Redirect to="/smart-alpha/portfolio" />
        </Switch>
      </Suspense>
    </>
  );
};

export default PortfolioView;
