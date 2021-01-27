import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import YieldFarmingView from 'modules/yield-farming';
import GovernanceView from 'modules/governance';

import Warnings from 'components/custom/warnings';
import LayoutSideNav from './components/layout-side-nav';
import MobileMenu from 'components/custom/mobile-menu';
import ExternalLink from 'components/custom/externalLink';

import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';

import StayTuned from 'components/custom/stay-tuned';

import s from './styles.module.scss';

const LayoutView: React.FunctionComponent = () => {
  return (
    <Antd.Layout className={s.container}>
      {!isMobile ? <LayoutSideNav /> : <MobileMenu />}

      <Antd.Layout className={s.main}>
        <Warnings>
          <Antd.Layout.Content className={s.content}>
            <Switch>
              <Route path="/yield-farming" component={YieldFarmingView} />
              <Route path="/governance/:vt(\w+)" component={GovernanceView} />
              <Route path="/governance" component={GovernanceView} />
              <Route path="/bonds" render={() => (
                <StayTuned />
              )} />
              <Redirect from="/" to="/yield-farming" />
            </Switch>
          </Antd.Layout.Content>
          <Antd.Layout.Footer className={s.footer}>
            <div className={s.footerLinks}>
              <ExternalLink href="http://www.barnbridge.com/">Website</ExternalLink>
              <ExternalLink href="https://discord.com/invite/FfEhsVk">Discord</ExternalLink>
              <ExternalLink href="https://twitter.com/barn_bridge">Twitter</ExternalLink>
              <ExternalLink href="https://github.com/BarnBridge/BarnBridge-Whitepaper">Whitepaper</ExternalLink>
              <ExternalLink href="https://github.com/BarnBridge/">Github</ExternalLink>
              <ExternalLink href="https://client.aragon.org/#/barnbridgelaunch/">LaunchDAO</ExternalLink>
              <ExternalLink
                href={`https://app.uniswap.org/#/add/${BONDTokenMeta.address}/${USDCTokenMeta.address}`}>
                Uniswap v2 USDC/BOND add liquidity
              </ExternalLink>
              <ExternalLink
                href={`https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`}>
                Uniswap v2 USDC/BOND market
              </ExternalLink>
            </div>
          </Antd.Layout.Footer>
        </Warnings>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
