import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = 'f35c2a4f3d0941a38a3edb62ed10c847';
const RPC_HTTPS_URL = `https://ropsten.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://ropsten.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://ropsten.etherscan.io';
const EXPLORER_API_URL = 'https://api-ropsten.etherscan.io';

export const ROPSTEN_CHAIN_ID = 3;

export const RopstenConfig: NetworkConfig = {
  title: 'BarnBridge ROSPTEN',
  features: {
    yieldFarming: false,
    dao: true,
    smartYield: false,
    smartYieldReward: false,
    smartExposure: false,
    smartAlpha: false,
    gasFees: true,
    addBondToken: true,
    smartAlphaKPIOptions: false,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://dev-v2.api.barnbridge.com',
  },
  dao: {
    activationThreshold: 400_000,
  },
  tokens: {
    wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bond: '0x521EE0CeDbed2a5A130B9218551fe492C5c402e4',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x4A69d0F05c8667B993eFC2b500014AE1bC8fD958',
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    susd: '0xED159a31184ADADC5c28CE5D9e4822ea2b0B6ef9',
    gusd: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    dai: '0xEa8BE82DF1519D4a25E2539bcA0342a1203CD591',
    rai: '',
    stkaave: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
    wmatic: '',
    ausdc: '0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0',
    ausdt: '0xFF3c8bc103682FA918c954E84F5056aB4DD5189d',
    agusd: '0xD37EE7e4f452C6638c96536e68090De8cBcdb583',
    adai: '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',
    bb_cusdc: '0x2327c862e8770e10f63eef470686ffd2684a0092',
    bb_cdai: '0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1',
    bb_ausdc: '0xEBc8cfd1A357BF0060f72871E96bEfaE5A629eCC',
    bb_ausdt: '0xe3d9c0ca18e6757e975b6f663811f207ec26c2b3',
    bb_agusd: '',
    bb_adai: '0xdfcb1c9d8209594cbc39745b274e9171ba4fd343',
    bb_crusdc: '0x378630f9e1968Aa76b299636A837E737fa476037',
    bb_crusdt: '',
    bb_crdai: '',
  },
  feeds: {
    btc: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    eth: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    bond: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    usdt: '0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',
    susd: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
    dai: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    stkaave: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
    wmatic: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676',
  },
  contracts: {
    yf: {
      staking: '0x618bB8f9e76f2982B8783e6AA09bC930c65f0AC8',
      stable: '0xf865D61e3791ef6C202c62b79f42de3f9e9AC8b3',
      unilp: '0x4e600bd65AE29d12ab22EE0384bD472F24d7aEa6',
      bond: '0x82B568C2E5159ba20358aF425E92ac96345c9C9a',
    },
    dao: {
      governance: '0x034a13bb56304438d4aC389eE0e56D1697A2Ec04',
      barn: '0xc950Fa60bD9CbC4D306Ce2A4405D1156F77f44B4',
      reward: '0x00D09C9AD07010B9F32907DfCA70E2fBF5189AD8',
    },
    se: {
      ePoolPeriphery: '0x5fa08f7817844e38ee8f54a24b65f6dc1ae23785',
      ePoolHelper: '0xc1442ac5d2631bd9369b42b35bfe12b88ee8daaf',
    },
    sa: {
      loupe: '0xA408F3f26ebe1768512c9977108633CEF84c17a7',
    },
  },
};

export const RopstenMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(ROPSTEN_CHAIN_ID),
  chainName: 'Ropsten Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://ropsten.infura.io'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const RopstenNetwork: Web3Network = {
  id: 'ropsten',
  type: 'Ethereum',
  meta: {
    chainId: ROPSTEN_CHAIN_ID,
    name: 'Ethereum Testnet (Ropsten)',
    logo: 'testnet-logo',
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
  metamaskChain: RopstenMetamaskChain,
  config: RopstenConfig,
};
