import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import ErrorBoundary from 'components/custom/error-boundary';
import { useEthWeb3 } from 'components/providers/eth-web3-provider';
import WarningProvider from 'components/providers/warning-provider';
import LayoutFooter from 'layout/components/layout-footer';
import LayoutHeader from 'layout/components/layout-header';
import LayoutSideNav from 'layout/components/layout-side-nav';

import s from './s.module.scss';

const YieldFarmingView = lazy(() => import('modules/yield-farming'));
const GovernanceView = lazy(() => import('modules/governance'));
const SmartYieldView = lazy(() => import('modules/smart-yield'));
const SmartAlphaView = lazy(() => import('modules/smart-alpha'));
const SmartExposureView = lazy(() => import('modules/smart-exposure'));
const FaucetsView = lazy(() => import('modules/faucets'));

const LayoutView: React.FC = () => {
  const { activeNetwork } = useEthWeb3();

  if (!activeNetwork) {
    return null;
  }

  const { features } = activeNetwork.config;

  return (
    <div className={s.layout}>
      <LayoutSideNav />
      <div className="flex flow-row flex-grow">
        <WarningProvider>
          <LayoutHeader />
          <main className={s.main}>
            <ErrorBoundary>
              <Suspense fallback={<AntdSpin className="pv-24 ph-64" />}>
                <Switch>
                  {features.yieldFarming && <Route path="/yield-farming" component={YieldFarmingView} />}
                  {features.dao && <Route path="/governance/:vt(\w+)" component={GovernanceView} />}
                  {features.dao && <Route path="/governance" component={GovernanceView} />}
                  {features.smartAlpha && <Route path="/smart-alpha" component={SmartAlphaView} />}
                  {features.smartExposure && <Route path="/smart-exposure" component={SmartExposureView} />}
                  {features.faucets && <Route path="/faucets" component={FaucetsView} />}
                  {features.smartYield && (
                    <Route
                      path="/smart-yield"
                      render={() => (
                        <Switch>
                          <Route path="/smart-yield/:vt(\w+)" component={SmartYieldView} />
                          <Route path="/smart-yield" component={SmartYieldView} />
                        </Switch>
                      )}
                    />
                  )}
                  <Redirect from="/" to="/smart-yield" />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          </main>
          <LayoutFooter />
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
