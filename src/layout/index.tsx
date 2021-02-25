import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import cn from 'classnames';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';

import ExternalLink from 'components/custom/externalLink';
import { Text } from 'components/custom/typography';
import WarningProvider from 'components/providers/warning-provider';
import LayoutHeader from 'layout/components/layout-header';
import LayoutSideNav from 'layout/components/layout-side-nav';
import GovernanceView from 'modules/governance';
import SmartYieldView from 'modules/smart-yield';
import YieldFarmingView from 'modules/yield-farming';

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
    <div className={s.layout}>
      <LayoutSideNav />
      <div style={{ flexGrow: 1 }}>
        <WarningProvider>
          <LayoutHeader />
          <main className={s.main}>
            <Switch>
              <Route path="/yield-farming" component={YieldFarmingView} />
              <Route path="/governance/:vt(\w+)" component={GovernanceView} />
              <Route path="/governance" component={GovernanceView} />
              <Route path="/smart-yield/:vt(\w+)" component={SmartYieldView} />
              <Route path="/smart-yield" component={SmartYieldView} />
              <Redirect from="/" to="/yield-farming" />
            </Switch>
          </main>
          <footer className={cn(s.footer, 'flex wrap col-gap-24 row-gap-24 justify-end')}>
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
          </footer>
        </WarningProvider>
      </div>
    </div>
  );
};

export default LayoutView;
