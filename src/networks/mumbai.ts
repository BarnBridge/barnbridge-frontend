import { NetworkMeta } from 'networks/types';

export const MumbaiNetwork: NetworkMeta = {
  id: 'mumbai',
  chainId: 80001,
  name: 'Ethereum Mumbai',
  logo: 'testnet-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://explorer-mumbai.maticvigil.com',
  explorerApiUrl: '',
  rpcUrls: ['https://rpc-mumbai.maticvigil.com/v1', 'wss://rpc-mumbai.maticvigil.com/ws/v1'],
  metamaskChain: {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    blockExplorerUrls: ['https://explorer-mumbai.maticvigil.com'],
  },
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartExposure: true,
  },
};
