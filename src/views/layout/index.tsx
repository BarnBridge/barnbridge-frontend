import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import BondsView from 'views/bonds';
import PoolsView from 'views/pools';
import VotingView from 'views/voting';

import Warnings from 'components/warnings';
import SiderNav from 'components/sider-nav';
import { SiderNavLinkProps } from 'components/sider-nav-link';
import MobileMenu from 'components/mobile-menu';
import ExternalLink from 'components/externalLink';

import { CONTRACT_BOND_ADDR, CONTRACT_USDC_ADDR } from 'web3/contracts';

import { ReactComponent as BondsSvg } from 'resources/svg/icons/bonds.svg';
import { ReactComponent as PoolsSvg } from 'resources/svg/icons/pools.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/voting.svg';

import s from './styles.module.css';

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

const LayoutView: React.FunctionComponent = () => {
  return (
    <Antd.Layout className={s.container}>
      <SiderNav className={s.siderNav} links={SiderNavLinks} />
      <Antd.Layout className={s.main}>
        {isMobile && <MobileMenu />}
        <Warnings>
          <Antd.Layout.Content className={s.content}>
            <Switch>
              <Route path="/pools" component={PoolsView} />
              <Route path="/voting" component={VotingView} />
              <Route path="/bonds" component={BondsView} />
              <Redirect from="/" to="/pools" />
            </Switch>
            <Antd.Layout.Footer className={s.footer}>
              <div className={s.footerLinks}>
                <ExternalLink href="http://www.barnbridge.com/">Website</ExternalLink>
                <ExternalLink href="https://discord.com/invite/FfEhsVk">Discord</ExternalLink>
                <ExternalLink href="https://twitter.com/barn_bridge">Twitter</ExternalLink>
                <ExternalLink href="https://github.com/BarnBridge/BarnBridge-Whitepaper">Whitepaper</ExternalLink>
                <ExternalLink href="https://github.com/BarnBridge/">Github</ExternalLink>
                <ExternalLink href="https://client.aragon.org/#/barnbridgelaunch/">LaunchDAO</ExternalLink>
                <ExternalLink
                  href={`https://app.uniswap.org/#/add/${CONTRACT_BOND_ADDR}/${CONTRACT_USDC_ADDR}`}>
                  Uniswap v2 USDC/BOND add liquidity
                </ExternalLink>
                <ExternalLink
                  href={`https://app.uniswap.org/#/swap?inputCurrency=${CONTRACT_BOND_ADDR}&outputCurrency=${CONTRACT_USDC_ADDR}`}>
                  Uniswap v2 USDC/BOND market
                </ExternalLink>
              </div>
            </Antd.Layout.Footer>
          </Antd.Layout.Content>
        </Warnings>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
