import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import LayoutSideNav from 'layout/components/layout-side-nav';
import { Paragraph } from 'components/custom/typography';
import MobileMenu from 'components/custom/mobile-menu';
import ExternalLink from 'components/custom/externalLink';
import StayTuned from 'components/custom/stay-tuned';
import WarningProvider from 'components/providers/warning-provider';

import YieldFarmingView from 'modules/yield-farming';
import GovernanceView from 'modules/governance';
import SmartYieldView from 'modules/smart-yield';

import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';

import s from './styles.module.scss';

const WEBSITE_LINK = 'http://www.barnbridge.com/';
const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
const TWITTER_LINK = 'https://twitter.com/barn_bridge';
const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
const GITHUB_LINK = 'https://github.com/BarnBridge/';
const DOCS_LINK = 'https://docs.barnbridge.com/';
const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/${BONDTokenMeta.address}/${USDCTokenMeta.address}`;
const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`;

const isDev = process.env.NODE_ENV === 'development';

const LayoutView: React.FunctionComponent = () => {
  return (
    <Antd.Layout className={s.layout}>
      {!isMobile ? <LayoutSideNav /> : <MobileMenu />}
      <Antd.Layout className={s.layout}>
        <WarningProvider>
          <Antd.Layout.Content>
            <Switch>
              <Route path="/yield-farming" component={YieldFarmingView} />
              <Route path="/governance/:vt(\w+)" component={GovernanceView} />
              <Route path="/governance" component={GovernanceView} />
              <Route path="/smart-yield/:vt(\w+)" component={isDev ? SmartYieldView : StayTuned} />
              <Route path="/smart-yield" component={isDev ? SmartYieldView : StayTuned} />
              <Redirect from="/" to="/yield-farming" />
            </Switch>
          </Antd.Layout.Content>
          <Antd.Layout.Footer className={s.footer}>
            <div className="flex wrap col-gap-24 row-gap-24 justify-end">
              <ExternalLink href={WEBSITE_LINK}>
                <Paragraph type="p2" semiBold>
                  Website
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={DISCORD_LINK}>
                <Paragraph type="p2" semiBold>
                  Discord
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={TWITTER_LINK}>
                <Paragraph type="p2" semiBold>
                  Twitter
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={WHITEPAPER_LINK}>
                <Paragraph type="p2" semiBold>
                  Whitepaper
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={GITHUB_LINK}>
                <Paragraph type="p2" semiBold>
                  Github
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={DOCS_LINK}>
                <Paragraph type="p2" semiBold>
                  Docs
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={UNISWAP_LIQUIDITY_LINK}>
                <Paragraph type="p2" semiBold>
                  Uniswap v2 USDC/BOND add liquidity
                </Paragraph>
              </ExternalLink>
              <ExternalLink href={UNISWAP_MARKET_LINK}>
                <Paragraph type="p2" semiBold>
                  Uniswap v2 USDC/BOND market
                </Paragraph>
              </ExternalLink>
            </div>
          </Antd.Layout.Footer>
        </WarningProvider>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
