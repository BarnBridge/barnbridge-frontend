import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import { ExternalLink, Link } from 'components/button';
import OldIcon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';

import s from './s.module.scss';

const LayoutFooter: React.FC = () => {
  const { links } = useConfig();

  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div className={s.footerTopLeft}>
          <RouterLink to="/" className={s.logo}>
            <OldIcon name="bond-square-token" className="mr-12" />
            <OldIcon name="barnbridge" width="113" color="primary" />
          </RouterLink>
          <Text type="small" weight="semibold" color="secondary" className="mb-24">
            A fluctuations derivatives protocol for hedging yield sensitivity and market price.
          </Text>
          <div className={s.socialLinks}>
            <ExternalLink href={links.twitter} variation="ghost-alt" icon="twitter" iconPosition="only" />
            <ExternalLink href={links.discord} variation="ghost-alt" icon="discord" iconPosition="only" />
            <ExternalLink href={links.github} variation="ghost-alt" icon="github" iconPosition="only" />
          </div>
        </div>
        <div className={s.footerTopRight}>
          <section className={s.navSection}>
            <Text type="lb2" weight="bold" tag="h3" className="mb-16 color-icon">
              DAO
            </Text>
            <ul>
              <li>
                <Link variation="text-alt" to="/yield-farming">
                  Yield Farming
                </Link>
              </li>
              <li>
                <Link variation="text-alt" to="/governance">
                  Governance
                </Link>
              </li>
              <li>
                <ExternalLink variation="text-alt" href="https://forum.barnbridge.com">
                  Forum
                </ExternalLink>
              </li>
              <li>
                <ExternalLink variation="text-alt" href="https://signal.barnbridge.com">
                  Signal
                </ExternalLink>
              </li>
            </ul>
          </section>
          <section className={s.navSection}>
            <Text type="lb2" weight="bold" tag="h3" className="mb-16 color-icon">
              SMART Products
            </Text>
            <ul>
              <li>
                <Link variation="text-alt" to="/smart-yield">
                  SMART Yield
                </Link>
              </li>
              <li>
                <Link variation="text-alt" to="/smart-alpha">
                  SMART Alpha
                </Link>
              </li>
              <li>
                <Link variation="text-alt" to="/smart-exposure">
                  SMART Exposure
                </Link>
              </li>
            </ul>
          </section>
          <section className={s.navSection}>
            <Text type="lb2" weight="bold" tag="h3" className="mb-16 color-icon">
              INFO
            </Text>
            <ul>
              <li>
                <ExternalLink variation="text-alt" href={links.website}>
                  Website
                </ExternalLink>
              </li>
              <li>
                <ExternalLink variation="text-alt" href={links.whitepaper}>
                  Whitepaper
                </ExternalLink>
              </li>
              <li>
                <ExternalLink variation="text-alt" href={links.docs}>
                  Docs
                </ExternalLink>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className={s.footerBottom}>
        <Text type="small" weight="semibold" className={s.copyright}>
          BarnBridge © 2021
        </Text>
        <div className={s.footerBottomLinks}>
          <ExternalLink variation="text-alt" href={links.uniswapSwap}>
            Uniswap v2 USDC/BOND market
          </ExternalLink>
          <ExternalLink variation="text-alt" href={links.uniswapLiquidity}>
            Uniswap v2 USDC/BOND add liquidity
          </ExternalLink>
        </div>
      </div>

      {/* <ExternalLink href={links.website}>
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
      </ExternalLink> */}
    </footer>
  );
};

export default LayoutFooter;
