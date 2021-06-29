import { config, setConfigFor } from 'config';
import { GoerliNetwork } from 'networks/goerli';
import { KovanNetwork } from 'networks/kovan';
import { MainnetNetwork } from 'networks/mainnet';
import { MumbaiNetwork } from 'networks/mumbai';
import { PolygonNetwork } from 'networks/polygon';
import { TestnetNetwork } from 'networks/testnet';

import { Web3Network } from 'networks/types';

export const KnownNetworks: Web3Network[] = [
  ...(config.env === 'development' ? [KovanNetwork, MumbaiNetwork, GoerliNetwork] : []),
  MainnetNetwork,
  PolygonNetwork,
  TestnetNetwork,
];

export let DefaultNetwork = KnownNetworks[0];

(() => {
  let lastNetwork: string | undefined;

  try {
    lastNetwork = JSON.parse(localStorage.getItem('bb_last_network') ?? '');
  } catch {}

  lastNetwork = lastNetwork ?? DefaultNetwork.id;

  if (lastNetwork === 'polygon') {
    lastNetwork = MainnetNetwork.id;
  }
  const network = KnownNetworks.find(kn => kn.id === lastNetwork);
  const newConfig = setConfigFor(network!.id.toUpperCase());

  const rpcUrl = `${network!.rpc.httpsUrl}/${newConfig.web3.rpcKey}`;
  const { setProviderByUrl } = require('components/providers/eth-web3-provider');
  setProviderByUrl(rpcUrl);
})();

export function getHttpRpcUrl(): string {
  return `${DefaultNetwork.rpc.httpsUrl}/${config.web3.rpcKey}`;
}

export function getWsRpcUrl(): string {
  return `${DefaultNetwork.rpc.wssUrl}/${config.web3.rpcKey}`;
}

export function getEtherscanTxUrl(txHash?: string): string | undefined {
  return txHash ? `${DefaultNetwork.explorer.url}/tx/${txHash}` : undefined;
}

export function getEtherscanAddressUrl(address?: string): string | undefined {
  return address ? `${DefaultNetwork.explorer.url}/address/${address}` : undefined;
}

export function getEtherscanABIUrl(address: string): string | undefined {
  return address
    ? `${DefaultNetwork.explorer.url}/api?module=contract&action=getabi&address=${address}&apikey=${config.web3.etherscanKey}`
    : undefined;
}

export function getEtherscanGasUrl(): string {
  return `${DefaultNetwork.explorer.url}//api?module=gastracker&action=gasoracle&apikey=${config.web3.etherscanKey}`;
}
