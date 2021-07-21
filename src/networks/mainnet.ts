import { toHex } from 'web3-utils';

import { isDevelopmentMode } from 'components/providers/configProvider';
import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = '6c58700fe84943eb83c4cd5c23dff3d8';
const RPC_HTTPS_URL = `https://mainnet.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://mainnet.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://etherscan.io';
const EXPLORER_API_URL = 'https://api.etherscan.io';

export const MAINNET_CHAIN_ID = 1;

export const MainnetConfig: NetworkConfig = {
  title: isDevelopmentMode ? 'BarnBridge Alpha' : 'BarnBridge',
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartYieldReward: true,
    smartExposure: true,
    smartAlpha: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: isDevelopmentMode ? 'https://alpha.api.barnbridge.com' : 'https://api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bond: '0x0391D2021f89DC339F60Fff84546EA23E337750f',
    univ2: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
    usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    susd: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51',
    gusd: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    stkaave: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
    wmatic: '',
    ausdc: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
    ausdt: '0x3Ed3B47Dd13EC9a98b44e6204A523E766B225811',
    agusd: '0xD37EE7e4f452C6638c96536e68090De8cBcdb583',
    adai: '0x028171bCA77440897B824Ca71D1c56caC55b68A3',
    bb_cusdc: '0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840',
    bb_cdai: '0x673f9488619821aB4f4155FdFFe06f6139De518F',
    bb_ausdc: '0x3cf46DA7D65E9aa2168a31b73dd4BeEA5cA1A1f1',
    bb_ausdt: '0x660dAF6643191cF0eD045B861D820F283cA078fc',
    bb_agusd: '0x6324538cc222b43490dd95CEBF72cf09d98D9dAe',
    bb_adai: '0x6c9DaE2C40b1e5883847bF5129764e76Cb69Fc57',
    bb_crusdc: '0x62e479060c89C48199FC7ad43b1432CC585BA1b9',
    bb_crusdt: '0xc45F49bE156888a1C0C93dc0fE7dC89091E291f5',
    bb_crdai: '0x89d82FdF095083Ded96B48FC6462Ed5dBD14151f',
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
    yf: {
      staking: '0xb0Fa2BeEe3Cf36a7Ac7E99B885b48538Ab364853',
      stable: '0xB3F7abF8FA1Df0fF61C5AC38d35e20490419f4bb',
      unilp: '0xC25c37c387C5C909a94055F4f16184ca325D3a76',
      bond: '0x3FdFb07472ea4771E1aD66FD3b87b265Cd4ec112',
    },
    dao: {
      governance: '0x4cAE362D7F227e3d306f70ce4878E245563F3069',
      barn: '0x10e138877df69Ca44Fdc68655f86c88CDe142D7F',
      reward: '0x9d0CF50547D848cC4b6A12BeDCF7696e9b334a22',
    },
    se: {
      ePoolPeriphery: '0x33c8d6f8271675eda1a0e72558d4904c96c7a888',
      ePoolHelper: '0x8a63822d8c1be5590bbf72fb58e69285a776a5df',
    },
  },
};

export const MainnetMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(MAINNET_CHAIN_ID),
  chainName: 'Ethereum',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.infura.io'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const MainnetNetwork: Web3Network = {
  id: 'mainnet',
  meta: {
    chainId: MAINNET_CHAIN_ID,
    name: isDevelopmentMode ? 'Ethereum Mainnet (Alpha)' : 'Ethereum Mainnet',
    logo: 'mainnet-logo',
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
  metamaskChain: MainnetMetamaskChain,
  config: MainnetConfig,
};
