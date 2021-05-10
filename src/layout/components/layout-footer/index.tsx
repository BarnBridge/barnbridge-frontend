import React from 'react';
import cn from 'classnames';

import ExternalLink from 'components/custom/externalLink';
import { Text } from 'components/custom/typography';
import {
  DISCORD_LINK,
  GITHUB_LINK,
  TWITTER_LINK,
  UNISWAP_LIQUIDITY_LINK,
  UNISWAP_MARKET_LINK,
  WEBSITE_LINK,
  WHITEPAPER_LINK,
} from 'config';

import s from './s.module.scss';

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
