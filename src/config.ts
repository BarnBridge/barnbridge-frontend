import BigNumber from 'bignumber.js';

function toLowerCase(value: any): string {
  return String(value ?? '').toLowerCase();
}

const config = {
  env: String(process.env.REACT_APP_ENV),
  isDev: String(process.env.REACT_APP_ENV) === 'development',
  isProd: String(process.env.REACT_APP_ENV) === 'production',
  isTestnet: String(process.env.REACT_APP_ENV) === 'testnet',
  api: {
    baseUrl: String(process.env.REACT_APP_BASE_API_URL),
  },
  tokens: {
    wBtc: toLowerCase(process.env.REACT_APP_TOKEN_WBTC_ADDR),
    renBtc: toLowerCase(process.env.REACT_APP_TOKEN_RENBTC_ADDR),
    wEth: toLowerCase(process.env.REACT_APP_TOKEN_WETH_ADDR),
    bond: toLowerCase(process.env.REACT_APP_TOKEN_BOND_ADDR),
    usdc: toLowerCase(process.env.REACT_APP_TOKEN_USDC_ADDR),
    dai: toLowerCase(process.env.REACT_APP_TOKEN_DAI_ADDR),
    susd: toLowerCase(process.env.REACT_APP_TOKEN_SUSD_ADDR),
    gusd: toLowerCase(process.env.REACT_APP_TOKEN_GUSD_ADDR),
    usdt: toLowerCase(process.env.REACT_APP_TOKEN_USDT_ADDR),
    univ2: toLowerCase(process.env.REACT_APP_TOKEN_UNIV2_ADDR),
    stkAave: toLowerCase(process.env.REACT_APP_TOKEN_STKAAVE_ADDR),
    bbcUsdc: toLowerCase(process.env.REACT_APP_TOKEN_BBC_USDC_ADDR),
    bbcDai: toLowerCase(process.env.REACT_APP_TOKEN_BBC_DAI_ADDR),
    bbaDai: toLowerCase(process.env.REACT_APP_TOKEN_BBA_DAI_ADDR),
    bbaGusd: toLowerCase(process.env.REACT_APP_TOKEN_BBA_GUSD_ADDR),
    bbaUsdc: toLowerCase(process.env.REACT_APP_TOKEN_BBA_USDC_ADDR),
    bbaUsdt: toLowerCase(process.env.REACT_APP_TOKEN_BBA_USDT_ADDR),
    aDai: toLowerCase(process.env.REACT_APP_TOKEN_ADAI_ADDR),
    aGusd: toLowerCase(process.env.REACT_APP_TOKEN_AGUSD_ADDR),
    aUsdc: toLowerCase(process.env.REACT_APP_TOKEN_AUSDC_ADDR),
    aUsdt: toLowerCase(process.env.REACT_APP_TOKEN_AUSDT_ADDR),

    bbcrUsdc: toLowerCase(process.env.REACT_APP_TOKEN_BBCR_USDC_ADDR),
    bbcrDai: toLowerCase(process.env.REACT_APP_TOKEN_BBCR_DAI_ADDR),
    bbcrUsdt: toLowerCase(process.env.REACT_APP_TOKEN_BBCR_USDT_ADDR),
  },
  feeds: {
    btc: toLowerCase(process.env.REACT_APP_FEED_BTC_ADDR),
    eth: toLowerCase(process.env.REACT_APP_FEED_ETH_ADDR),
    bond: toLowerCase(process.env.REACT_APP_FEED_BOND_ADDR),
    usdc: toLowerCase(process.env.REACT_APP_FEED_USDC_ADDR),
    dai: toLowerCase(process.env.REACT_APP_FEED_DAI_ADDR),
    susd: toLowerCase(process.env.REACT_APP_FEED_SUSD_ADDR),
    usdt: toLowerCase(process.env.REACT_APP_FEED_USDT_ADDR),
    univ2: toLowerCase(process.env.REACT_APP_FEED_UNIV2_ADDR),
    stkAave: toLowerCase(process.env.REACT_APP_FEED_STKAAVE_ADDR),
    bbcUsdc: toLowerCase(process.env.REACT_APP_FEED_BBC_USDC_ADDR),
    bbcDai: toLowerCase(process.env.REACT_APP_FEED_BBC_DAI_ADDR),
    bbaDai: toLowerCase(process.env.REACT_APP_FEED_BBA_DAI_ADDR),
  },
  contracts: {
    yf: {
      staking: toLowerCase(process.env.REACT_APP_CONTRACT_YF_STAKING_ADDR),
      stable: toLowerCase(process.env.REACT_APP_CONTRACT_YF_STABLE_ADDR),
      unilp: toLowerCase(process.env.REACT_APP_CONTRACT_YF_UNILP_ADDR),
      bond: toLowerCase(process.env.REACT_APP_CONTRACT_YF_BOND_ADDR),
    },
    dao: {
      governance: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR),
      barn: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_BARN_ADDR),
      reward: toLowerCase(process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR),
    },
    se: {
      ePoolHelper: toLowerCase(process.env.REACT_APP_CONTRACT_SE_EPOOL_HELPER),
      ePoolPeriphery: toLowerCase(process.env.REACT_APP_CONTRACT_SE_EPOOL_PERIPHERY),
    },
  },
  testnet: {
    comp: {
      fauceteer: toLowerCase(process.env.REACT_APP_TESTNET_COMP_FAUCETEER_ADDR),
      usdc: toLowerCase(process.env.REACT_APP_TESTNET_COMP_USDC_ADDR),
      dai: toLowerCase(process.env.REACT_APP_TESTNET_COMP_DAI_ADDR),
    },
    aave: {
      fauceteer: toLowerCase(process.env.REACT_APP_TESTNET_AAVE_FAUCETEER_ADDR),
      usdc: toLowerCase(process.env.REACT_APP_TESTNET_AAVE_USDC_ADDR),
      dai: toLowerCase(process.env.REACT_APP_TESTNET_AAVE_DAI_ADDR),
      usdt: toLowerCase(process.env.REACT_APP_TESTNET_AAVE_USDT_ADDR),
    },
  },
  web3: {
    chainId: Number(process.env.REACT_APP_WEB3_CHAIN_ID),
    poolingInterval: Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL),
    rpc: {
      wssUrl: String(process.env.REACT_APP_WEB3_RPC_WSS_URL),
      httpsUrl: String(process.env.REACT_APP_WEB3_RPC_HTTPS_URL),
    },
    etherscan: {
      apiKey: String(process.env.REACT_APP_ETHERSCAN_API_KEY),
    },
    wallets: {
      portis: {
        id: String(process.env.REACT_APP_WEB3_PORTIS_APP_ID),
      },
      walletConnect: {
        bridge: String(process.env.REACT_APP_WEB3_WALLET_CONNECT_BRIDGE),
      },
      coinbase: {
        appName: String(process.env.REACT_APP_WEB3_COINBASE_APP_NAME),
      },
      trezor: {
        email: String(process.env.REACT_APP_WEB3_TREZOR_EMAIL),
        appUrl: String(process.env.REACT_APP_WEB3_TREZOR_APP_URL),
      },
    },
  },
  dao: {
    activationThreshold: new BigNumber(String(process.env.REACT_APP_DAO_ACTIVATION_THRESHOLD)),
  },
};

export const WEBSITE_LINK = 'http://www.barnbridge.com/';
export const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
export const TWITTER_LINK = 'https://twitter.com/barn_bridge';
export const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
export const GITHUB_LINK = 'https://github.com/BarnBridge/';
export const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/v2/${config.tokens.bond}/${config.tokens.usdc}`;
export const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?use=V2&inputCurrency=${config.tokens.bond}&outputCurrency=${config.tokens.usdc}`;

export default config;
