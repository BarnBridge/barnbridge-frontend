import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_HTTPS_URL = `https://data-seed-prebsc-2-s1.binance.org:8545`;
const RPC_WSS_URL = ``;

const EXPLORER_URL = 'https://testnet.bscscan.com';

export const BINANCE_TEST_CHAIN_ID = 97;

export const BinanceDevConfig: NetworkConfig = {
  title: 'BarnBridge Binance',
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
    baseUrl: 'https://dev-bsc.api.barnbridge.com',
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
      loupe: '0x144aBD818dCa6CbDB2aC11AB17dD803BDe39812d',
    },
  },
};

export const BinanceMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(BINANCE_TEST_CHAIN_ID),
  chainName: 'Binance Smart Chain Testnet',
  nativeCurrency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const BinanceTestnetNetwork: Web3Network = {
  id: 'binance-testnet',
  type: 'Binance',
  meta: {
    chainId: BINANCE_TEST_CHAIN_ID,
    name: 'BSC Testnet',
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
