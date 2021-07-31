export type MarketMeta = {
  id: string;
  name: string;
  icon: {
    active: string;
  };
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
};

export const KnownMarkets: MarketMeta[] = [CompoundMarket, AaveMarket, CreamFinanceMarket];

export function getKnownMarketById(marketId: string): MarketMeta | undefined {
  return KnownMarkets.find(km => km.id === marketId);
}
