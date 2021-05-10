const config = {
  env: String(process.env.REACT_APP_ENV),
  api: {
    baseUrl: String(process.env.REACT_APP_BASE_API_URL),
  },
  contracts: {
    usdc: String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase(),
    dai: String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase(),
    susd: String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase(),
    bond: String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase(),
    univ2: String(process.env.REACT_APP_CONTRACT_UNIV2_ADDR).toLowerCase(),
    yfStaking: String(process.env.REACT_APP_CONTRACT_YF_STAKING_ADDR).toLowerCase(),
    yfStable: String(process.env.REACT_APP_CONTRACT_YF_STABLE_ADDR).toLowerCase(),
    yfUnilp: String(process.env.REACT_APP_CONTRACT_YF_UNILP_ADDR).toLowerCase(),
    yfBond: String(process.env.REACT_APP_CONTRACT_YF_BOND_ADDR).toLowerCase(),
    daoGovernance: String(process.env.REACT_APP_CONTRACT_DAO_GOVERNANCE_ADDR).toLowerCase(),
    daoBarn: String(process.env.REACT_APP_CONTRACT_DAO_BARN_ADDR).toLowerCase(),
    daoReward: String(process.env.REACT_APP_CONTRACT_DAO_REWARD_ADDR).toLowerCase(),
  },
  web3: {
    chainId: Number(process.env.REACT_APP_WEB3_CHAIN_ID),
    poolingInterval: Number(process.env.REACT_APP_WEB3_POLLING_INTERVAL),
    rpc: {
      wssUrl: Number(process.env.REACT_APP_WEB3_RPC_WSS_URL),
      httpsUrl: Number(process.env.REACT_APP_WEB3_RPC_HTTPS_URL),
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
};

export const WEBSITE_LINK = 'http://www.barnbridge.com/';
export const DISCORD_LINK = 'https://discord.com/invite/FfEhsVk';
export const TWITTER_LINK = 'https://twitter.com/barn_bridge';
export const WHITEPAPER_LINK = 'https://github.com/BarnBridge/BarnBridge-Whitepaper';
export const GITHUB_LINK = 'https://github.com/BarnBridge/';
export const UNISWAP_LIQUIDITY_LINK = `https://app.uniswap.org/#/add/v2/${config.contracts.bond}/${config.contracts.usdc}`;
export const UNISWAP_MARKET_LINK = `https://app.uniswap.org/#/swap?use=V2&inputCurrency=${config.contracts.bond}&outputCurrency=${config.contracts.usdc}`;

export default config;
