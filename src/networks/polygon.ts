import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '6c58700fe84943eb83c4cd5c23dff3d8';
const RPC_HTTPS_URL = 'https://rpc-mainnet.maticvigil.com';
const RPC_WSS_URL = 'wss://rpc-mainnet.maticvigil.com';

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://explorer-mainnet.maticvigil.com';
const EXPLORER_API_URL = '';

export const POLYGON_CHAIN_ID = 137;

export const PolygonConfig: NetworkConfig = {
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartExposure: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '',
    weth: '',
    bond: '',
    univ2: '',
    usdc: '',
    usdt: '',
    susd: '',
    gusd: '',
    dai: '',
    stkaave: '',
    ausdc: '',
    ausdt: '',
    agusd: '',
    adai: '',
    bb_cusdc: '',
    bb_cdai: '',
    bb_ausdc: '',
    bb_ausdt: '',
    bb_agusd: '',
    bb_adai: '',
    bb_crusdc: '',
    bb_crusdt: '',
    bb_crdai: '',
  },
  feeds: {
    btc: '',
    eth: '',
    bond: '',
    univ2: '',
    usdc: '',
    usdt: '',
    susd: '',
    dai: '',
  },
  contracts: {
    yf: {
      staking: '',
      stable: '',
      unilp: '',
      bond: '',
    },
    dao: {
      governance: '',
      barn: '',
      reward: '',
    },
    se: {
      ePool: '',
      ePoolPeriphery: '',
      ePoolHelper: '',
    },
  },
};

export const PolygonMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(POLYGON_CHAIN_ID),
  chainName: 'Matic',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const PolygonNetwork: Web3Network = {
  id: 'polygon',
  meta: {
    chainId: POLYGON_CHAIN_ID,
    name: 'Polygon',
    logo: 'polygon-logo',
  },
  rpc: {
    key: RPC_KEY,
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    key: EXPLORER_KEY,
    url: EXPLORER_URL,
    apiUrl: EXPLORER_API_URL,
  },
  metamaskChain: PolygonMetamaskChain,
  config: PolygonConfig,
};
