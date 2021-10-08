import { IconNames } from 'components/custom/icon';
import { MetamaskAddEthereumChain } from 'wallets/connectors/metamask';

export const DEFAULT_RPC_POOLING_INTERVAL = 12_000;

export type NetworkConfig = {
  title: string;
  features: {
    yieldFarming?: boolean;
    dao?: boolean;
    smartYield?: boolean;
    smartYieldReward?: boolean;
    smartExposure?: boolean;
    smartAlpha?: boolean;
    faucets?: boolean;
    gasFees?: boolean;
    addBondToken?: boolean;
    smartAlphaKPIOptions?: boolean;
  };
  wallets: {
    portisId: string;
    walletConnectBridge: string;
    coinbaseAppName: string;
    trezorEmail: string;
    trezorAppUrl: string;
  };
  api: {
    baseUrl: string;
  };
  dao?: {
    activationThreshold: number;
  };
  tokens: Record<
    | 'wbtc'
    | 'weth'
    | 'bond'
    | 'univ2'
    | 'usdc'
    | 'usdt'
    | 'susd'
    | 'gusd'
    | 'dai'
    | 'rai'
    | 'stkaave'
    | 'wmatic'
    | 'ausdc'
    | 'ausdt'
    | 'agusd'
    | 'adai'
    | 'bb_cusdc'
    | 'bb_cdai'
    | 'bb_ausdc'
    | 'bb_ausdt'
    | 'bb_agusd'
    | 'bb_adai'
    | 'bb_crusdc'
    | 'bb_crusdt'
    | 'bb_crdai',
    string
  >;
  feeds: Record<'btc' | 'eth' | 'bond' | 'univ2' | 'usdc' | 'usdt' | 'susd' | 'dai' | 'stkaave' | 'wmatic', string>;
  contracts: {
    yf?: Record<'staking' | 'stable' | 'unilp' | 'bond', string>;
    dao?: Record<'governance' | 'barn' | 'reward', string>;
    se?: Record<'ePoolPeriphery' | 'ePoolHelper', string>;
    sa?: Record<'loupe', string>;
    faucets?: Record<
      'compFauceteer' | 'compUsdc' | 'compDai' | 'aaveFauceteer' | 'aaveUsdc' | 'aaveUsdt' | 'aaveDai',
      string
    >;
  };
};

export type Web3Network = {
  id: string;
  type: string;
  meta: {
    chainId: number;
    name: string;
    logo: IconNames;
  };
  rpc: {
    httpsUrl: string;
    wssUrl: string;
    poolingInterval: number;
  };
  explorer: {
    name: string;
    key: string;
    url: string;
    apiUrl: string;
  };
  metamaskChain?: MetamaskAddEthereumChain;
  config: NetworkConfig;
};
