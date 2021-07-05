const REACT_APP_VARS = process.env;

export const isDevelopmentMode = process.env.REACT_APP_ENV === 'development';
export const isProductionMode = process.env.REACT_APP_ENV === 'production';

interface IConfig {
  api: {
    baseUrl: string;
  };
  tokens: Record<string, string>;
  contracts: {
    dao: Record<'governance' | 'barn' | 'reward', string>;
  };
}

function toString(value: any): string {
  return String(value ?? '');
}

function toLowerCase(value: any): string {
  return toString(value).toLowerCase();
}

function getConfigFor(network: string): IConfig {
  const prefix = `REACT_APP_${network}`;

  return {
    api: {
      baseUrl: toString(REACT_APP_VARS[`${prefix}_BASE_API_URL`]),
    },
    tokens: {
      bond: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BOND_ADDR`]),
      usdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_USDC_ADDR`]),
    },
    contracts: {
      dao: {
        governance: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_GOVERNANCE_ADDR`]),
        barn: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_BARN_ADDR`]),
        reward: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_REWARD_ADDR`]),
      },
    },
  };
}

export let config: IConfig = getConfigFor('KOVAN');

export const WEBSITE_LINK = 'http://www.barnbridge.com/';
export const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
export const TWITTER_LINK = 'https://twitter.com/barn_bridge';
export const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
export const GITHUB_LINK = 'https://github.com/BarnBridge/';
export const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/v2/${config.tokens?.bond}/${config.tokens?.usdc}`;
export const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?use=V2&inputCurrency=${config.tokens?.bond}&outputCurrency=${config.tokens?.usdc}`;
