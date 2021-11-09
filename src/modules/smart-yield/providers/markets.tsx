import { ReactElement } from 'react';

import { ExternalLink } from 'components/button';

export type MarketMeta = {
  id: string;
  name: string;
  icon: {
    active: string;
  };
  warning?: ReactElement;
  depositDisabled?: boolean;
};

export const CompoundMarket: MarketMeta = {
  id: 'compound/v2',
  name: 'Compound',
  icon: {
    active: 'compound',
  },
};

export const AaveMarket: MarketMeta = {
  id: 'aave/v2',
  name: 'AAVE',
  icon: {
    active: `aave`,
  },
};

const CreamFinanceMarket: MarketMeta = {
  id: 'cream/v2',
  name: 'C.R.E.A.M Finance',
  icon: {
    active: `cream`,
  },
  warning: (
    <span>
      C.R.E.A.M pool deposits have been disabled.
      <br />
      <ExternalLink variation="link" href="https://medium.com/cream-finance/post-mortem-exploit-oct-27-507b12bb6f8e">
        Click here to learn more
      </ExternalLink>
    </span>
  ),
  depositDisabled: true,
};

export const KnownMarkets: MarketMeta[] = [CompoundMarket, AaveMarket, CreamFinanceMarket];

export function getKnownMarketById(marketId: string): MarketMeta | undefined {
  return KnownMarkets.find(km => km.id === marketId);
}
