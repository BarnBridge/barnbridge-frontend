import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_HTTPS_URL = `https://api.avax-test.network/ext/bc/C/rpc`;
const RPC_WSS_URL = `wss://api.avax-test.network/ext/bc/C/ws`;

const EXPLORER_URL = 'https://cchain.explorer.avax-test.network';

export const AVALANCHE_TEST_CHAIN_ID = 43113;

export const AvalancheDevConfig: NetworkConfig = {
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
    baseUrl: 'https://dev-avalanche.api.barnbridge.com',
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
      loupe: '0x73097d9EAA1dD8d89BC2AcfE56F11957c6BfBCc1',
    },
  },
};

export const AvalancheMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(AVALANCHE_TEST_CHAIN_ID),
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const AvalancheTestnetNetwork: Web3Network = {
  id: 'avalanche-testnet',
  type: 'Avalanche',
  meta: {
    chainId: AVALANCHE_TEST_CHAIN_ID,
    name: 'Avalanche Testnet (Fuji)',
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
  config: AvalancheDevConfig,
};
