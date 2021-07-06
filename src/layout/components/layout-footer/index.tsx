import React from 'react';
import cn from 'classnames';

import ExternalLink from 'components/custom/externalLink';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const { links } = useConfig();

  return (
    <footer className={cn(s.footer, 'flex wrap col-gap-24 row-gap-24 justify-end')}>
      <ExternalLink href={links.website}>
        <Text type="p2" weight="semibold">
          Website
        </Text>
      </ExternalLink>
      <ExternalLink href={links.discord}>
        <Text type="p2" weight="semibold">
          Discord
        </Text>
      </ExternalLink>
      <ExternalLink href={links.twitter}>
        <Text type="p2" weight="semibold">
          Twitter
        </Text>
      </ExternalLink>
      <ExternalLink href={links.whitepaper}>
        <Text type="p2" weight="semibold">
          Whitepaper
        </Text>
      </ExternalLink>
      <ExternalLink href={links.github}>
        <Text type="p2" weight="semibold">
          Github
        </Text>
      </ExternalLink>
      <ExternalLink href={links.uniswapLiquidity}>
        <Text type="p2" weight="semibold">
          Uniswap v2 USDC/BOND add liquidity
        </Text>
      </ExternalLink>
      <ExternalLink href={links.uniswapSwap}>
        <Text type="p2" weight="semibold">
          Uniswap v2 USDC/BOND market
        </Text>
      </ExternalLink>
    </footer>
  );
};

export default LayoutFooter;
