import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';

import s from './styles.module.css';

import HomeView from 'views/home';
import BondsView from 'views/bonds';
import PoolsView from 'views/pools';
import VotingView from 'views/voting';

import SiderNavLink from 'components/siderNavLink';
import ConnectedWallet from 'components/connectedWallet';

import { ReactComponent as LogoSvg } from 'resources/svg/logo.svg';
import { ReactComponent as HomeSvg } from 'resources/svg/home.svg';
import { ReactComponent as BondsSvg } from 'resources/svg/bonds.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/voting.svg';

const LayoutView: React.FunctionComponent = props => {
  return (
    <Antd.Layout className={s.container}>
      <Antd.Layout.Sider className={s.sider} width={72}>
        <LogoSvg className={s.logo} />
        <SiderNavLink icon={<HomeSvg />} label="Home" path="/" />
        <SiderNavLink icon={<BondsSvg />} label="Bonds" path="/bonds" />
        <SiderNavLink icon={<PoolsSvg />} label="Pools" path="/pools" />
        <SiderNavLink icon={<VotingSvg />} label="Voting" path="/voting" />
      </Antd.Layout.Sider>
      <Antd.Layout className={s.main}>
        <Antd.Layout.Content>
          <ConnectedWallet />
          <Switch>
            <Route path="/bonds" component={BondsView} />
            <Route path="/pools" component={PoolsView} />
            <Route path="/voting" component={VotingView} />
            <Route path="/" component={HomeView} />
          </Switch>
        </Antd.Layout.Content>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
