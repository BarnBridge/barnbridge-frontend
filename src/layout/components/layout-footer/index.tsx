import React from 'react';
import cn from 'classnames';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';

import ExternalLink from 'components/custom/externalLink';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

const WEBSITE_LINK = 'http://www.barnbridge.com/';
const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
const TWITTER_LINK = 'https://twitter.com/barn_bridge';
const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
const GITHUB_LINK = 'https://github.com/BarnBridge/';
const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/v2/${BONDTokenMeta.address}/${USDCTokenMeta.address}`;
const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`;

const LayoutFooter: React.FC = () => {
  return (
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
  );
};

export default LayoutFooter;
