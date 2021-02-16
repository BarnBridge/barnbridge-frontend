import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import LayoutSideNav from 'layout/components/layout-side-nav';
import { Text } from 'components/custom/typography';
import MobileMenu from 'components/custom/mobile-menu';
import ExternalLink from 'components/custom/externalLink';
import StayTuned from 'components/custom/stay-tuned';
import WarningProvider from 'components/providers/warning-provider';

import YieldFarmingView from 'modules/yield-farming';
import GovernanceView from 'modules/governance';

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

const LayoutView: React.FC = () => {
  return (
    <Antd.Layout className={s.layout}>
      {!isMobile ? <LayoutSideNav /> : <MobileMenu />}
      <Antd.Layout className={s.layout}>
        <WarningProvider>
          <Antd.Layout.Content>
            <Switch>
              <Route path="/yield-farming" component={YieldFarmingView} />
              <Route path="/governance" component={GovernanceView} />
              <Route path="/bonds" render={() => <StayTuned />} />
              <Redirect from="/" to="/yield-farming" />
            </Switch>
          </Antd.Layout.Content>
          <Antd.Layout.Footer className={s.footer}>
            <div className="flex wrap col-gap-24 row-gap-24 justify-end">
              <ExternalLink href={WEBSITE_LINK}>
                <Text type="p2" weight="semibold">
                  Website
                </Text>
              </ExternalLink>
              <ExternalLink href={DISCORD_LINK}>
                <Text type="p2" weight="semibold">
                  Discord
                </Text>
              </ExternalLink>
              <ExternalLink href={TWITTER_LINK}>
                <Text type="p2" weight="semibold">
                  Twitter
                </Text>
              </ExternalLink>
              <ExternalLink href={WHITEPAPER_LINK}>
                <Text type="p2" weight="semibold">
                  Whitepaper
                </Text>
              </ExternalLink>
              <ExternalLink href={GITHUB_LINK}>
                <Text type="p2" weight="semibold">
                  Github
                </Text>
              </ExternalLink>
              <ExternalLink href={DOCS_LINK}>
                <Text type="p2" weight="semibold">
                  Docs
                </Text>
              </ExternalLink>
              <ExternalLink href={UNISWAP_LIQUIDITY_LINK}>
                <Text type="p2" weight="semibold">
                  Uniswap v2 USDC/BOND add liquidity
                </Text>
              </ExternalLink>
              <ExternalLink href={UNISWAP_MARKET_LINK}>
                <Text type="p2" weight="semibold">
                  Uniswap v2 USDC/BOND market
                </Text>
              </ExternalLink>
            </div>
          </Antd.Layout.Footer>
        </WarningProvider>
      </Antd.Layout>
    </Antd.Layout>
  );
};

export default LayoutView;
