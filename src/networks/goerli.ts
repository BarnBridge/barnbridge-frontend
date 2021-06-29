import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '6c58700fe84943eb83c4cd5c23dff3d8';
const RPC_HTTPS_URL = 'https://goerli.infura.io/v3';
const RPC_WSS_URL = 'wss://goerli.infura.io/ws/v3';

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://goerli.etherscan.com';
const EXPLORER_API_URL = 'https://api-goerli.etherscan.io';

export const GOERLI_CHAIN_ID = 5;

export const GoerliConfig: NetworkConfig = {
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

export const GoerliMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(GOERLI_CHAIN_ID),
  chainName: 'Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: [RPC_HTTPS_URL],
  blockExplorerUrls: [EXPLORER_URL],
};

export const GoerliNetwork: Web3Network = {
  id: 'goerli',
  meta: {
    chainId: GOERLI_CHAIN_ID,
    name: 'Ethereum Goerli',
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
  metamaskChain: GoerliMetamaskChain,
  config: GoerliConfig,
};
