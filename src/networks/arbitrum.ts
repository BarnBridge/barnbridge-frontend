import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = 'a48fe2240ca64ae1bb90de52285923ce';
const RPC_HTTPS_URL = `https://arbitrum-mainnet.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://kovan.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '';
const EXPLORER_URL = 'https://arbiscan.io';
const EXPLORER_API_URL = 'https://api.arbiscan.io';

export const ARBITRUM_CHAIN_ID = 42161;

export const ArbitrumConfig: NetworkConfig = {
  title: 'BarnBridge Arbitrum',
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
    baseUrl: 'https://prod-arbitrum.api.barnbridge.com',
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
      loupe: '0x4b8998c34810c80b5038f5928fb3a633ccbf6abb',
    },
  },
};

export const ArbitrumMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(ARBITRUM_CHAIN_ID),
  chainName: 'Arbitrum',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const ArbitrumNetwork: Web3Network = {
  id: 'arbitrum',
  type: 'Arbitrum',
  meta: {
    chainId: ARBITRUM_CHAIN_ID,
    name: 'Arbitrum Mainnet',
    logo: 'arbitrum-logo',
  },
  rpc: {
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    name: 'Arbiscan',
    key: EXPLORER_KEY,
    url: EXPLORER_URL,
    apiUrl: EXPLORER_API_URL,
  },
  metamaskChain: ArbitrumMetamaskChain,
  config: ArbitrumConfig,
};
