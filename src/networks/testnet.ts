import { toHex } from 'web3-utils';

import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

import { DEFAULT_RPC_POOLING_INTERVAL, NetworkConfig, Web3Network } from 'networks/types';

const RPC_KEY = 'aacf4c6a162a483eab3163105bebe222';
const RPC_HTTPS_URL = `https://kovan.infura.io/v3/${RPC_KEY}`;
const RPC_WSS_URL = `wss://kovan.infura.io/ws/v3/${RPC_KEY}`;

const EXPLORER_KEY = '4RSJUUZQFMXUAUUJP5FI5UR5U59N7UIA32';
const EXPLORER_URL = 'https://kovan.etherscan.io';
const EXPLORER_API_URL = 'https://api-kovan.etherscan.io';

export const TESTNET_CHAIN_ID = 42;

export const TestnetConfig: NetworkConfig = {
  title: 'BarnBridge Testnet',
  features: {
    dao: true,
    faucets: true,
    smartYield: true,
  },
  wallets: {
    portisId: 'b0b0f776-bbf6-458c-a175-6483e0c452b7',
    walletConnectBridge: 'https://bridge.walletconnect.org',
    coinbaseAppName: 'barnbridge',
    trezorEmail: 'bogdan@barnbridge.com',
    trezorAppUrl: 'https://app.barnbridge.com/',
  },
  api: {
    baseUrl: 'https://testnet.api.barnbridge.com/',
  },
  dao: {
    activationThreshold: 400000,
  },
  tokens: {
    wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    weth: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    bond: '0xc40a66AFB908789341A58B8423F89fE2cb7Dc1f9',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x4A69d0F05c8667B993eFC2b500014AE1bC8fD958',
    usdt: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    susd: '0xED159a31184ADADC5c28CE5D9e4822ea2b0B6ef9',
    gusd: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    dai: '0xEa8BE82DF1519D4a25E2539bcA0342a1203CD591',
    stkaave: '0xf2fbf9a6710afda1c4aab2e922de9d69e0c97fd2',
    wmatic: '',
    ausdc: '0xe12AFeC5aa12Cf614678f9bFeeB98cA9Bb95b5B0',
    ausdt: '0xFF3c8bc103682FA918c954E84F5056aB4DD5189d',
    agusd: '',
    adai: '0xdCf0aF9e59C002FA3AA091a46196b37530FD48a8',
    bb_cusdc: '0x63fD30ed07c91B7b27Da5c828c7eB752F7e4676b',
    bb_cdai: '0x3fc25d9e5a583E96E626D921660b5Ef6ecC8A19E',
    bb_ausdc: '0x7559E79fcFD34431bD3c6d9Cf82228477888E844',
    bb_ausdt: '0x73d82Cd31CEe823B75E2078dbf16e11C7C174a6E',
    bb_agusd: '',
    bb_adai: '0xc62441DE5dD50b4ee18265d5AD66FAAB2EEBc4Fe',
    bb_crusdc: '0xEd515cC6470f075bd32899dB8a42ddB75f43a4f1',
    bb_crusdt: '',
    bb_crdai: '',
  },
  feeds: {
    btc: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
    eth: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    bond: '0xc40a66AFB908789341A58B8423F89fE2cb7Dc1f9',
    univ2: '0xe594D2B3BeA4454D841e5b616627dCA6A5D7aCF1',
    usdc: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
    usdt: '0x4e58ab12d2051ea2068e78e4fcee7ddee6785848',
    susd: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
    dai: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
    stkaave: '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9',
    wmatic: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676',
  },
  contracts: {
    dao: {
      governance: '0x88C072c6B78a05D8Bbd8629fE7CA88287e12B211',
      barn: '0x59E2bC2E34EEeA09BfB99C2069Bfadf872D5F56f',
      reward: '0xb21FC0d3C8C7550A1e4f1eC8017c1f098Ceb1A76',
    },
    faucets: {
      compFauceteer: '0x916518711a75a98Ac00e8E3386d036F7eA56A484',
      compUsdc: '0xb7a4f3e9097c08da09517b5ab877f7a917224ede',
      compDai: '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
      aaveFauceteer: '0x600103d518cC5E8f3319D532eB4e5C268D32e604',
      aaveUsdc: '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
      aaveUsdt: '0x13512979ADE267AB5100878E2e0f485B568328a4',
      aaveDai: '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
    },
  },
};

export const TestnetMetamaskChain: MetamaskAddEthereumChain = {
  chainId: toHex(TESTNET_CHAIN_ID),
  chainName: 'Kovan Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://kovan.infura.io'],
  blockExplorerUrls: [EXPLORER_URL],
};

export const TestnetNetwork: Web3Network = {
  id: 'testnet',
  meta: {
    chainId: TESTNET_CHAIN_ID,
    name: 'Ethereum Testnet (Kovan)',
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
  metamaskChain: TestnetMetamaskChain,
  config: TestnetConfig,
};
