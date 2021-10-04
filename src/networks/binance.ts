import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { isDevelopmentMode } from 'utils';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_HTTPS_URL = `https://bsc-dataseed1.binance.org`;
const RPC_WSS_URL = ``;

const EXPLORER_URL = 'https://bscscan.com';

export const BINANCE_CHAIN_ID = 56;

export const BinanceDevConfig: NetworkConfig = {
  title: isDevelopmentMode ? 'BarnBridge Alpha Binance' : 'BarnBridge Binance',
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
    baseUrl: isDevelopmentMode ? '' : '',
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
      loupe: '',
    },
  },
};

export const BinanceMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(BINANCE_CHAIN_ID),
  chainName: 'Binance Smart Chain Mainnet',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const BinanceNetwork: Web3Network = {
  id: 'binance',
  meta: {
    chainId: BINANCE_CHAIN_ID,
    name: isDevelopmentMode ? 'BSC Mainnet (Alpha)' : 'BSC Mainnet',
    logo: 'binance-logo',
  },
  rpc: {
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    name: 'Binance Explorer',
    key: '',
    url: EXPLORER_URL,
    apiUrl: '',
  },
  metamaskChain: BinanceMetamaskChain,
  config: BinanceDevConfig,
};
