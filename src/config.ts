import BigNumber from 'bignumber.js';

const REACT_APP_VARS = process.env;

interface IConfig {
  env: string;
  web3: {
    rpcKey: string;
    etherscanKey: string;
  };
  wallets: {
    portisId: string;
    walletConnectBridge: string;
    coinbaseAppName: string;
    trezorEmail: string;
    trezorAppUrl: string;
  };
  api: {
    baseUrl: string;
  };
  dao: {
    activationThreshold: BigNumber;
  };
  tokens: Record<string, string>;
  feeds: Record<string, string>;
  contracts: {
    yf: Record<'staking' | 'stable' | 'unilp' | 'bond', string>;
    dao: Record<'governance' | 'barn' | 'reward', string>;
    se: Record<'ePool' | 'ePoolPeriphery' | 'ePoolHelper', string>;
  };
  testnet: {
    comp: Record<'fauceteer' | 'usdc' | 'dai', string>;
    aave: Record<'fauceteer' | 'usdc' | 'usdt' | 'dai', string>;
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
    env: toString(process.env.REACT_APP_ENV),
    web3: {
      rpcKey: toString(REACT_APP_VARS[`${prefix}_WEB3_RPC_KEY`]),
      etherscanKey: toString(REACT_APP_VARS[`${prefix}_WEB3_ETHERSCAN_API_KEY`]),
    },
    wallets: {
      portisId: toString(REACT_APP_VARS[`${prefix}_WALLET_PORTIS_APP_ID`]),
      walletConnectBridge: toString(REACT_APP_VARS[`${prefix}_WALLET_WALLETCONNECT_BRIDGE`]),
      coinbaseAppName: toString(REACT_APP_VARS[`${prefix}_WALLET_COINBASE_APP_NAME`]),
      trezorEmail: toString(REACT_APP_VARS[`${prefix}_WALLET_TREZOR_EMAIL`]),
      trezorAppUrl: toString(REACT_APP_VARS[`${prefix}_WALLET_TREZOR_APP_URL`]),
    },
    api: {
      baseUrl: toString(REACT_APP_VARS[`${prefix}_BASE_API_URL`]),
    },
    dao: {
      activationThreshold: new BigNumber(REACT_APP_VARS[`${prefix}_DAO_ACTIVATION_THRESHOLD`]!),
    },
    tokens: {
      wBtc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_WBTC_ADDR`]),
      wEth: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_WETH_ADDR`]),
      bond: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BOND_ADDR`]),
      univ2: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_UNIV2_ADDR`]),
      usdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_USDC_ADDR`]),
      usdt: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_USDT_ADDR`]),
      susd: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_SUSD_ADDR`]),
      gusd: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_GUSD_ADDR`]),
      dai: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_DAI_ADDR`]),
      stkAave: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_STKAAVE_ADDR`]),
      aUsdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_AUSDC_ADDR`]),
      aUsdt: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_AUSDT_ADDR`]),
      aGusd: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_AGUSD_ADDR`]),
      aDai: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_ADAI_ADDR`]),
      bbcUsdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_CUSDC_ADDR`]),
      bbcDai: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_CDAI_ADDR`]),
      bbaUsdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_AUSDC_ADDR`]),
      bbaUsdt: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_AUSDT_ADDR`]),
      bbaGusd: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_AGUSD_ADDR`]),
      bbaDai: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_ADAI_ADDR`]),
      bbcrUsdc: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_CRUSDC_ADDR`]),
      bbcrUsdt: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_CRUSDT_ADDR`]),
      bbcrDai: toLowerCase(REACT_APP_VARS[`${prefix}_TOKEN_BB_CRDAI_ADDR`]),
    },
    feeds: {
      btc: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_BTC_ADDR`]),
      eth: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_ETH_ADDR`]),
      bond: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_BOND_ADDR`]),
      univ2: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_UNIV2_ADDR`]),
      usdc: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_USDC_ADDR`]),
      usdt: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_USDT_ADDR`]),
      susd: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_SUSD_ADDR`]),
      dai: toLowerCase(REACT_APP_VARS[`${prefix}_FEED_DAI_ADDR`]),
    },
    contracts: {
      yf: {
        staking: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_YF_STAKING_ADDR`]),
        stable: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_YF_STABLE_ADDR`]),
        unilp: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_YF_UNILP_ADDR`]),
        bond: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_YF_BOND_ADDR`]),
      },
      dao: {
        governance: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_GOVERNANCE_ADDR`]),
        barn: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_BARN_ADDR`]),
        reward: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_DAO_REWARD_ADDR`]),
      },
      se: {
        ePool: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_SE_EPOOL_ADDR`]),
        ePoolPeriphery: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_SE_EPOOL_PERIPHERY_ADDR`]),
        ePoolHelper: toLowerCase(REACT_APP_VARS[`${prefix}_CONTRACT_SE_EPOOL_HELPER_ADDR`]),
      },
    },
    testnet: {
      comp: {
        fauceteer: toLowerCase(REACT_APP_VARS[`${prefix}_COMP_FAUCETEER_ADDR`]),
        usdc: toLowerCase(REACT_APP_VARS[`${prefix}_COMP_USDC_ADDR`]),
        dai: toLowerCase(REACT_APP_VARS[`${prefix}_COMP_DAI_ADDR`]),
      },
      aave: {
        fauceteer: toLowerCase(REACT_APP_VARS[`${prefix}_AAVE_FAUCETEER_ADDR`]),
        usdc: toLowerCase(REACT_APP_VARS[`${prefix}_AAVE_USDC_ADDR`]),
        usdt: toLowerCase(REACT_APP_VARS[`${prefix}_AAVE_USDT_ADDR`]),
        dai: toLowerCase(REACT_APP_VARS[`${prefix}_AAVE_DAI_ADDR`]),
      },
    },
  };
}

export let config: IConfig = {
  env: REACT_APP_VARS['REACT_APP_ENV'],
} as any;

export function setConfigFor(network: string): IConfig {
  return (config = getConfigFor(network));
}

export const WEBSITE_LINK = 'http://www.barnbridge.com/';
export const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
export const TWITTER_LINK = 'https://twitter.com/barn_bridge';
export const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
export const GITHUB_LINK = 'https://github.com/BarnBridge/';
export const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/v2/${config.tokens?.bond}/${config.tokens?.usdc}`;
export const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?use=V2&inputCurrency=${config.tokens?.bond}&outputCurrency=${config.tokens?.usdc}`;
