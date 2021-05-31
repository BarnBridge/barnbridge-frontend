import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { NavTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import config from 'config';
import { SEPoolsProvider } from 'modules/smart-exposure/providers/se-pools-provider';
import RocketSvg from 'resources/img/rocket.png';
import { useWallet } from 'wallets/wallet';

import { PoolActionsView } from './views/pool-actions-view';

import s from './s.module.scss';

const PoolsView = lazy(() => import('./views/pools-view'));
const TrancheView = lazy(() => import('./views/tranche-view'));

const PortfolioView = lazy(() => import('./views/portfolio-view'));

type SmartYieldViewParams = {
  vt: string;
};

const SmartExposureView: React.FC = () => {
  const {
    params: { vt = 'markets' },
  } = useRouteMatch<SmartYieldViewParams>();
  const wallet = useWallet();
  const [activeTab, setActiveTab] = React.useState<string>(vt);

  React.useEffect(() => {
    if (['stats', 'deposit'].includes(vt)) {
      setActiveTab('markets');
      return;
    }

    if (vt === 'withdraw') {
      setActiveTab('portfolio');
      return;
    }

    if (vt === 'pool') {
      setActiveTab('pools');
      return;
    }

    if (vt !== activeTab) {
      setActiveTab(vt);
    }
  }, [vt]);

  const tabs = [
    {
      children: (
        <>
          <Icon name="finance" className="mr-8" /> Pools
        </>
      ),
      to: '/smart-exposure/pools',
    },
    {
      children: (
        <>
          <Icon name="wallet-outlined" className="mr-8" /> Portfolio
        </>
      ),
      to: '/smart-exposure/portfolio',
      disabled: !wallet.account,
    },
  ];

  if (!config.isDev) {
    return (
      <div className="flex flow-row row-gap-48 align-center justify-center full-height">
        <img
          src={RocketSvg}
          alt="Rocket"
          style={{
            maxWidth: '310px',
            maxHeight: '377px',
          }}
        />
        <div className="grid flow-row row-gap-8">
          <Text type="h1" weight="bold" color="primary">
            Stay tuned!
          </Text>
          <Text type="p1" weight="semibold" color="secondary">
            We are launching soon
          </Text>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavTabs tabs={tabs} className={s.tabs} />
      <div className="content-container-fix content-container">
        <SEPoolsProvider>
          <Suspense fallback={<AntdSpin />}>
            <Switch>
              <Route path="/smart-exposure/pools" exact>
                <PoolsView />
              </Route>
              <Route path="/smart-exposure/pools/:pool/:tranche" exact>
                <TrancheView />
              </Route>
              <Route path="/smart-exposure/pools/:pool/:tranche/:path(deposit|withdraw|change-tranche)" exact>
                <PoolActionsView />
              </Route>
              <Route path="/smart-exposure/portfolio" exact>
                <PortfolioView />
              </Route>
              <Redirect to="/smart-exposure/pools" />
            </Switch>
          </Suspense>
        </SEPoolsProvider>
      </div>
    </>
  );
};

export default SmartExposureView;
