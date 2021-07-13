export type MarketMeta = {
  id: string;
  name: string;
  icon: {
    active: string;
    inactive: string;
  };
};

export const CompoundMarket: MarketMeta = {
  id: 'compound/v2',
  name: 'Compound',
  icon: {
    active: 'compound',
    inactive: 'compound_grayed',
  },
};

export const AaveMarket: MarketMeta = {
  id: 'aave/v2',
  name: 'AAVE',
  icon: {
    active: `static/aave`,
    inactive: `static/aave_grayed`,
  },
};

const CreamFinanceMarket: MarketMeta = {
  id: 'cream/v2',
  name: 'C.R.E.A.M Finance',
  icon: {
    active: `cream_finance`,
    inactive: `cream_finance_grayed`,
  },
};

export const KnownMarkets: MarketMeta[] = [CompoundMarket, AaveMarket, CreamFinanceMarket];

export function getKnownMarketById(marketId: string): MarketMeta | undefined {
  return KnownMarkets.find(km => km.id === marketId);
}
