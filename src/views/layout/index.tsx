import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';

import BondsView from 'views/bonds';
import PoolsView from 'views/pools';
import VotingView from 'views/voting';

import SiderNav from 'components/sider-nav';
import { SiderNavLinkProps } from 'components/sider-nav-link';
import ExternalLink from 'components/externalLink';

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
              <ExternalLink href="http://www.barnbridge.com/">Website</ExternalLink>
              <ExternalLink href="https://discord.com/invite/FfEhsVk">Discord</ExternalLink>
              <ExternalLink href="https://twitter.com/barn_bridge">Twitter</ExternalLink>
              <ExternalLink href="https://github.com/BarnBridge/BarnBridge-Whitepaper">Whitepaper</ExternalLink>
              <ExternalLink href="https://github.com/BarnBridge/">Github</ExternalLink>
              <ExternalLink href="https://client.aragon.org/#/barnbridgelaunch/">LaunchDAO</ExternalLink>
              <ExternalLink
                href={`https://app.uniswap.org/#/add/${process.env.REACT_APP_CONTRACT_BOND_ADDR}/${process.env.REACT_APP_CONTRACT_USDC_ADDR}`}>Uniswap
                v2 USDC/BOND add liquidity</ExternalLink>
              <ExternalLink
                href={`https://app.uniswap.org/#/swap?inputCurrency=${process.env.REACT_APP_CONTRACT_BOND_ADDR}&outputCurrency=${process.env.REACT_APP_CONTRACT_USDC_ADDR}`}>Uniswap
                v2 USDC/BOND market</ExternalLink>
            </div>
          </Antd.Layout.Footer>
        </Antd.Layout.Content>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
