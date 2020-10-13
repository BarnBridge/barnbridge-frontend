import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';

import BondsView from 'views/bonds';
import PoolsView from 'views/pools';
import VotingView from 'views/voting';

import SiderNav from 'components/sider-nav';
import { SiderNavLinkProps } from 'components/sider-nav-link';

import { ReactComponent as BondsSvg } from 'resources/svg/icons/bonds.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/icons/pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/voting.svg';

import s from './styles.module.css';
import ExternalLink from 'components/externalLink';

const SiderNavLinks: SiderNavLinkProps[] = [
  {
    icon: <PoolsSvg />,
    label: 'Pools',
    path: '/pools',
  },
  {
    icon: <VotingSvg />,
    label: 'Voting',
    path: '/voting',
  },
  {
    icon: <BondsSvg />,
    label: 'Bonds',
    path: '/bonds',
  },
];

const LayoutView: React.FunctionComponent = props => {
  return (
    <Antd.Layout className={s.container}>
      <SiderNav links={SiderNavLinks} />
      <Antd.Layout className={s.main}>
        <Antd.Layout.Content>
          <Switch>
            <Route path="/pools" component={PoolsView} />
            <Route path="/voting" component={VotingView} />
            <Route path="/bonds" component={BondsView} />
            <Redirect from="/" to="/pools" />
          </Switch>
          <Antd.Layout.Footer className={s.footer}>
            <div className={s.footerLinks}>
              <ExternalLink href="#">Discord</ExternalLink>
              <ExternalLink href="#">Twitter</ExternalLink>
              <ExternalLink href="#">Whitepaper</ExternalLink>
              <ExternalLink href="#">Github</ExternalLink>
              <ExternalLink href="#">USDC/BOND Uniswap v2 pool</ExternalLink>
            </div>
          </Antd.Layout.Footer>
        </Antd.Layout.Content>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
