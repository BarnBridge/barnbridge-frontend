import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { NavTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { ReactComponent as RocketSvg } from 'resources/svg/rocket.svg';
import { useWallet } from 'wallets/wallet';

import { isDevelopment } from 'utils';

import s from './s.module.scss';

const PairsView = lazy(() => import('./views/pairs-view'));
const PoolView = lazy(() => import('./views/pool-view'));
const DepositView = lazy(() => import('./views/deposit-view'));
const WithdrawView = lazy(() => import('./views/withdraw-view'));
const ChangeTrancheView = lazy(() => import('./views/change-tranche-view'));
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
          <Icon name="finance" className="mr-8" /> Pairs
        </>
      ),
      to: '/smart-exposure/pairs',
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

  if (!isDevelopment) {
    return (
      <div className="flex flow-row row-gap-48 align-center justify-center full-height">
        <RocketSvg style={{ maxWidth: '310px', maxHeight: '377px' }} />
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
        <Suspense fallback={<AntdSpin />}>
          <Switch>
            <Route path="/smart-exposure/pairs" exact>
              <PairsView />
            </Route>
            <Route path="/smart-exposure/pairs/:pool" exact>
              <PoolView />
            </Route>
            <Route path="/smart-exposure/pairs/:pool/deposit" exact>
              <DepositView />
            </Route>
            <Route path="/smart-exposure/pairs/:pool/withdraw" exact>
              <WithdrawView />
            </Route>
            <Route path="/smart-exposure/pairs/:pool/change-tranche" exact>
              <ChangeTrancheView />
            </Route>
            <Route path="/smart-exposure/portfolio" exact>
              <PortfolioView />
            </Route>
            <Redirect to="/smart-exposure/pairs" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartExposureView;
