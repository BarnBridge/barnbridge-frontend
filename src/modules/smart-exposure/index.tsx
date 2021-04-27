import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AntdSpin from 'antd/lib/spin';

import Icon from 'components/custom/icon';
import { NavTabs } from 'components/custom/tabs';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const PairsView = lazy(() => import('./views/pairs-view'));
const PoolView = lazy(() => import('./views/pool-view'));
const DepositView = lazy(() => import('./views/deposit-view'));

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
      href: '/smart-exposure/pairs',
    },
    {
      children: (
        <>
          <Icon name="wallet-outlined" className="mr-8" /> Portfolio
        </>
      ),
      href: '/smart-exposure/portfolio',
      disabled: !wallet.account,
    },
  ];

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
            <Redirect to="/smart-exposure/pairs" />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default SmartExposureView;
