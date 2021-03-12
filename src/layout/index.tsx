import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import WarningProvider from 'components/providers/warning-provider';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import LayoutSideNav from 'layout/components/layout-side-nav';

import s from './s.module.scss';

const YieldFarmingView = lazy(() => import('modules/yield-farming'));
const GovernanceView = lazy(() => import('modules/governance'));
const SmartYieldView = lazy(() => import('modules/smart-yield'));
const SmartAlphaView = lazy(() => import('modules/smart-alpha'));

const LayoutView: React.FC = () => {
  return (
    <div className={s.layout}>
      <LayoutSideNav />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <WarningProvider>
          <LayoutHeader />
          <main className={s.main}>
            <Suspense fallback={<AntdSpin className="pv-24 ph-64" />}>
              <Switch>
                <Route path="/yield-farming" component={YieldFarmingView} />
                <Route path="/governance/:vt(\w+)" component={GovernanceView} />
                <Route path="/governance" component={GovernanceView} />
                <Route path="/smart-yield/:vt(\w+)" component={SmartYieldView} />
                <Route path="/smart-yield" component={SmartYieldView} />
                <Route path="/smart-alpha" component={SmartAlphaView} />
                <Redirect from="/" to="/yield-farming" />
              </Switch>
            </Suspense>
          </main>
          <LayoutFooter />
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
