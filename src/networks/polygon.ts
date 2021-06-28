import { NetworkMeta } from 'networks/types';

export const PolygonNetwork: NetworkMeta = {
  id: 'polygon',
  chainId: 137,
  name: 'Polygon',
  logo: 'polygon-logo',
  poolingInterval: 12_000,
  explorerUrl: 'https://explorer-mainnet.maticvigil.com',
  explorerApiUrl: '',
  rpcUrls: ['https://rpc-mainnet.maticvigil.com', 'wss://rpc-mainnet.maticvigil.com'],
  metamaskChain: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
    blockExplorerUrls: ['https://explorer-mainnet.maticvigil.com'],
  },
  features: {
    yieldFarming: true,
    dao: true,
    smartYield: true,
    smartExposure: true,
  },
};
