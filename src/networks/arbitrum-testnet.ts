import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '6c58700fe84943eb83c4cd5c23dff3d8';
const RPC_HTTPS_URL = `https://rinkeby.arbitrum.io/rpc`;
const RPC_WSS_URL = `wss://kovan.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '';
const EXPLORER_URL = 'https://testnet.arbiscan.io';
const EXPLORER_API_URL = 'https://api-testnet.arbiscan.io';

export const ARBITRUM_CHAIN_ID = 421611;

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
    baseUrl: 'https://dev-arbitrum.api.barnbridge.com',
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
      loupe: '0x500813d36d27320012F0DA24CC7dfaC4fADb4519',
    },
  },
};

export const ArbitrumMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(ARBITRUM_CHAIN_ID),
  chainName: 'Arbitrum Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const ArbitrumTestnetNetwork: Web3Network = {
  id: 'arbitrum-testnet',
  type: 'Arbitrum',
  meta: {
    chainId: ARBITRUM_CHAIN_ID,
    name: 'Arbitrum Testnet',
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
