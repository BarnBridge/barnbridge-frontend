import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_HTTPS_URL = 'https://api.avax.network/ext/bc/C/rpc';
const RPC_WSS_URL = 'wss://api.avax.network/ext/bc/C/ws';

const EXPLORER_URL = 'https://cchain.explorer.avax.network';

export const AVALANCHE_CHAIN_ID = 43114;

export const AvalancheConfig: NetworkConfig = {
  title: 'BarnBridge Avalanche',
  features: {
    smartAlpha: true,
    gasFees: false,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://prod-avalanche.api.barnbridge.com',
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
    rai: '',
    stkaave: '',
    wmatic: '',
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
    stkaave: '',
    wmatic: '',
  },
  contracts: {
    sa: {
      loupe: '0x0bA62a21274D10FFA2bCA465c05361A47BD67263',
    },
  },
};

export const AvalancheMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(AVALANCHE_CHAIN_ID),
  chainName: 'Avalanche C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const AvalancheNetwork: Web3Network = {
  id: 'avalanche',
  type: 'Avalanche',
  meta: {
    chainId: AVALANCHE_CHAIN_ID,
    name: 'Avalanche Mainnet',
    logo: 'avalanche-logo',
  },
  rpc: {
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    name: 'Avalanche Explorer',
    key: '',
    url: EXPLORER_URL,
    apiUrl: '',
  },
  metamaskChain: AvalancheMetamaskChain,
  config: AvalancheConfig,
};
