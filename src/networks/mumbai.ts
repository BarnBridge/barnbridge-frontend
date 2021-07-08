import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '42d3fea6a96fc0700858bca99dd8224f785420d5';
const RPC_HTTPS_URL = 'https://rpc-mumbai.maticvigil.com/v1';
const RPC_WSS_URL = 'wss://rpc-mumbai.maticvigil.com/ws/v1';

const EXPLORER_KEY = 'CPRM5D2KD52ZZD2T7HFXE99J3WDSJF4P78';
const EXPLORER_URL = 'https://mumbai.polygonscan.com';
const EXPLORER_API_URL = 'https://api-testnet.polygonscan.com';

export const MUMBAI_CHAIN_ID = 80001;

export const MumbaiConfig: NetworkConfig = {
  title: 'BarnBridge Mumbai',
  features: {
    smartYield: true,
    smartYieldReward: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://mumbai.api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '',
    weth: '',
    bond: '0xebB83c1b86A27eb9e2523A2c117F1d656269dbAE',
    univ2: '',
    usdc: '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e',
    usdt: '',
    susd: '',
    gusd: '',
    dai: '',
    stkaave: '',
    ausdc: '0x2271e3Fef9e15046d09E1d78a8FF038c691E9Cf9',
    ausdt: '',
    agusd: '',
    adai: '',
    bb_cusdc: '0x2327c862e8770e10f63eef470686ffd2684a0092',
    bb_cdai: '0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1',
    bb_ausdc: '0x7Baa74D3091fA1d0FE2d05046EF4C9789b4451a3',
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
  contracts: {},
};

export const MumbaiMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(MUMBAI_CHAIN_ID),
  chainName: 'Mumbai Testnet',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const MumbaiNetwork: Web3Network = {
  id: 'mumbai',
  meta: {
    chainId: MUMBAI_CHAIN_ID,
    name: 'Polygon Dev (Mumbai)',
    logo: 'testnet-logo',
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
  metamaskChain: MumbaiMetamaskChain,
  config: MumbaiConfig,
};
