import { toHex } from 'web3-utils';

import { isDevelopmentMode } from 'components/providers/configProvider';
import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = 'ec7bd85d0babc7ec3e63aa71e7544214914fa01c';
const RPC_HTTPS_URL = `https://rpc-mainnet.maticvigil.com/v1/${RPC_KEY}`;
const RPC_WSS_URL = `wss://rpc-mainnet.maticvigil.com/ws/v1/${RPC_KEY}`;

const EXPLORER_KEY = 'CPRM5D2KD52ZZD2T7HFXE99J3WDSJF4P78';
const EXPLORER_URL = 'https://polygonscan.com';
const EXPLORER_API_URL = 'https://api.polygonscan.com';

export const POLYGON_CHAIN_ID = 137;

export const PolygonConfig: NetworkConfig = {
  title: isDevelopmentMode ? 'BarnBridge Alpha Polygon' : 'BarnBridge Polygon',
  features: {
    smartYield: true,
    smartYieldReward: true,
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
    baseUrl: isDevelopmentMode ? 'https://alpha.polygon.api.barnbridge.com' : 'https://polygon.api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '',
    weth: '',
    bond: '0xA041544fe2BE56CCe31Ebb69102B965E06aacE80',
    univ2: '',
    usdc: '',
    usdt: '',
    susd: '',
    gusd: '',
    dai: '',
    stkaave: '',
    wmatic: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
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
    btc: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    eth: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    bond: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
    univ2: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
    usdc: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    usdt: '0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',
    susd: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
    dai: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    stkaave: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
    wmatic: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676',
  },
  contracts: {
    se: {
      ePoolPeriphery: '0xb9556a673f2e01333570e68d95dDd17d92A0511A',
      ePoolHelper: '0x32f8E7FB11432263E545faA368a6a1f8eFB58314',
    },
  },
};

export const PolygonMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(POLYGON_CHAIN_ID),
  chainName: 'Matic(Polygon) Mainnet',
  nativeCurrency: {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mainnet.matic.network'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const PolygonNetwork: Web3Network = {
  id: 'polygon',
  meta: {
    chainId: POLYGON_CHAIN_ID,
    name: isDevelopmentMode ? 'Polygon Mainnet (Alpha)' : 'Polygon Mainnet',
    logo: 'polygon-logo',
  },
  rpc: {
    httpsUrl: RPC_HTTPS_URL,
    wssUrl: RPC_WSS_URL,
    poolingInterval: DEFAULT_RPC_POOLING_INTERVAL,
  },
  explorer: {
    name: 'Polygonscan',
    key: EXPLORER_KEY,
    url: EXPLORER_URL,
    apiUrl: EXPLORER_API_URL,
  },
  metamaskChain: PolygonMetamaskChain,
  config: PolygonConfig,
};
