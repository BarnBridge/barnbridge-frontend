import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '37be407c6e72476aa174bc8657c8a787';
const RPC_HTTPS_URL = `https://optimism-mainnet.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://optimism-mainnet.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://optimistic.etherscan.io';
const EXPLORER_API_URL = 'https://api-optimistic.etherscan.io';

export const OPTIMISTIC_MAINNET_CHAIN_ID = 10;

export const OptimisticMainnetConfig: NetworkConfig = {
  title: 'BarnBridge Optimistic Ethereum',
  features: {
    smartAlpha: true,
    gasFees: true,
    addBondToken: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://prod-optimistic.api.barnbridge.com/api',
  },
  tokens: {
    wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bond: '0x521EE0CeDbed2a5A130B9218551fe492C5c402e4',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x4A69d0F05c8667B993eFC2b500014AE1bC8fD958',
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    susd: '0xED159a31184ADADC5c28CE5D9e4822ea2b0B6ef9',
    gusd: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    dai: '0xEa8BE82DF1519D4a25E2539bcA0342a1203CD591',
    rai: '',
    stkaave: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
    floki: '',
    wmatic: '',
    ausdc: '0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0',
    ausdt: '0xFF3c8bc103682FA918c954E84F5056aB4DD5189d',
    agusd: '0xD37EE7e4f452C6638c96536e68090De8cBcdb583',
    adai: '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',
    bb_cusdc: '0x2327c862e8770e10f63eef470686ffd2684a0092',
    bb_cdai: '0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1',
    bb_ausdc: '0xEBc8cfd1A357BF0060f72871E96bEfaE5A629eCC',
    bb_ausdt: '0xe3d9c0ca18e6757e975b6f663811f207ec26c2b3',
    bb_agusd: '',
    bb_adai: '0xdfcb1c9d8209594cbc39745b274e9171ba4fd343',
    bb_arai: '',
    bb_crusdc: '0x378630f9e1968Aa76b299636A837E737fa476037',
    bb_crusdt: '',
    bb_crdai: '',
  },
  feeds: {
    btc: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    eth: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    bond: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    usdt: '0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',
    susd: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
    dai: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    stkaave: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
    floki: '',
    wmatic: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676',
  },
  contracts: {
    sa: {
      loupe: '0x045a3438a37de5b68c9e4ed5ea26c49cce1b5f5a',
    },
  },
};

export const OptimisticMainnetMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(OPTIMISTIC_MAINNET_CHAIN_ID),
  chainName: 'Optimistic Ethereum',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.optimism.io'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const OptimisticMainnetNetwork: Web3Network = {
  id: 'optimistic-ethereum',
  type: 'Ethereum',
  meta: {
    chainId: OPTIMISTIC_MAINNET_CHAIN_ID,
    name: 'Optimistic Ethereum',
    logo: 'optimistic-kovan-logo',
  },
  rpc: {
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    name: 'Etherscan',
    key: EXPLORER_KEY,
    url: EXPLORER_URL,
    apiUrl: EXPLORER_API_URL,
  },
  metamaskChain: OptimisticMainnetMetamaskChain,
  config: OptimisticMainnetConfig,
};
