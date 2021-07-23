import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '5aa7739d0e474570a7561dd546a7dfe3';
const RPC_HTTPS_URL = `https://goerli.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://goerli.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://goerli.etherscan.io';
const EXPLORER_API_URL = 'https://api-goerli.etherscan.io';

export const GOERLI_CHAIN_ID = 5;

export const GoerliConfig: NetworkConfig = {
  title: 'BarnBridge Goerli',
  features: {
    dao: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://goerli.api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '',
    weth: '',
    bond: '0xd7d55Fd7763A356aF99f17C9d6c21d933bC2e2F1',
    univ2: '',
    usdc: '',
    usdt: '',
    susd: '',
    gusd: '',
    dai: '',
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
    dao: {
      governance: '0xD0219B2B4B5C26C90C6A73D10DCeCB52BE20885b',
      barn: '0x34981b958C8d13eB4b5585f4eF6a772510EF2374',
      reward: '0x7Ae75542b3fa0039198036783D2dDc80f70171AF',
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
  rpcUrls: ['https://goerli.infura.io'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const GoerliNetwork: Web3Network = {
  id: 'goerli',
  meta: {
    chainId: GOERLI_CHAIN_ID,
    name: 'Ethereum Dev (Goerli)',
    logo: 'goerli-logo',
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
  metamaskChain: GoerliMetamaskChain,
  config: GoerliConfig,
};
