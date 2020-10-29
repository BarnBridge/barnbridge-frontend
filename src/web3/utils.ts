import Web3EthContract from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import isString from 'lodash/isString';

import { EthContract } from 'web3/types';

export const MAX_UINT_256 = new BigNumber(2).pow(256).minus(1);
export const ZERO_BIG_NUMBER = new BigNumber(0);

export function getRpcUrl(chainId: number = Number(process.env.REACT_APP_WEB3_CHAIN_ID)): string {
  const rpcId = String(process.env.REACT_APP_WEB3_RPC_ID);

  switch (chainId) {
    case 1:
      return `wss://mainnet.infura.io/ws/v3/${rpcId}`;
    case 4:
      return `wss://rinkeby.infura.io/ws/v3/${rpcId}`;
    default:
      throw new Error(`Not supported chainId=${chainId}.`);
  }
}

export function getEtherscanTxUrl(
  txHash: string,
  chainId: number = Number(process.env.REACT_APP_WEB3_CHAIN_ID),
): string {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${txHash}`;
    case 4:
      return `https://rinkeby.etherscan.io/tx/${txHash}`;
    default:
      throw new Error(`Not supported chainId=${chainId}.`);
  }
}

export function getEtherscanAddressUrl(
  address: string,
  chainId: number = Number(process.env.REACT_APP_WEB3_CHAIN_ID),
): string {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/address/${address}`;
    case 4:
      return `https://rinkeby.etherscan.io/address/${address}`;
    default:
      throw new Error(`Not supported chainId=${chainId}.`);
  }
}

export function createContract(abi: any, address: string, rpcUrl: string = getRpcUrl()): EthContract | undefined {
  try {
    const contract: EthContract = new (Web3EthContract as any)(abi, address);
    contract.setProvider?.(rpcUrl);
    return contract;
  } catch (e) {
    return undefined;
  }
}

type BatchMethodConfig = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
};

export type BatchMethod = string | BatchMethodConfig;

export function batchContract(contract: EthContract | undefined, methods: BatchMethod[]): Promise<any[]> {
  if (!contract) {
    return Promise.resolve([]);
  }

  const batch = new contract.BatchRequest!();

  const promises = methods.map((method: BatchMethod) => {
    return new Promise(resolve => {
      let methodName: string;
      let methodArgs: any[] = [];
      let callArgs: Record<string, any> = {};

      if (isString(method)) {
        methodName = method as string;
      } else {
        methodName = (method as BatchMethodConfig).method;
        methodArgs = (method as BatchMethodConfig).methodArgs ?? [];
        callArgs = (method as BatchMethodConfig).callArgs ?? {};
      }

      const contractMethod = contract.methods[methodName];

      if (!contractMethod) {
        return resolve(undefined);
      }

      try {
        const request = contractMethod(...methodArgs).call
          .request(callArgs, (err: Error, data: string) => {
            if (err) {
              console.error(`${method}.call`, err);
              return resolve(undefined);
            }

            resolve(data);
          });

        batch.add(request);
      } catch (e) {
        return resolve(undefined);
      }
    });
  });

  batch.execute();

  return Promise.all(promises);
}

export function sendContract(contract: EthContract | undefined, method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}): Promise<any> {
  if (!contract) {
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    const clonedContract: EthContract = contract.clone();
    clonedContract.setProvider?.((window as any).ethereum);

    const contractMethod = clonedContract.methods[method];

    if (!contractMethod) {
      return resolve(undefined);
    }

    contractMethod(...methodArgs)
      ?.send(sendArgs, async (err: Error) => {
        if (err) {
          return reject(err);
        }
      })
      .then(resolve)
      .catch(reject);
  });
}

export function getExponentValue(decimals: number = 0): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value?: BigNumber, decimals: number = 0): BigNumber | undefined {
  return value?.div(getExponentValue(decimals));
}

export function getNonHumanValue(value: BigNumber | number, decimals: number = 0): BigNumber {
  return (new BigNumber(value)).multipliedBy(getExponentValue(decimals));
}

export function formatBigValue(value?: BigNumber, decimals: number = 4, defaultValue: string = '-', minDecimals: number | undefined = undefined): string {
  return value ? new BigNumber(value.toFixed(decimals)).toFormat(minDecimals) : defaultValue;
}

export function assertValues(...values: any[]): boolean {
  return !values.some(value => value === undefined || value === null);
}

export function shortenAddr(addr: string, first: number = 6, last: number = 4) {
  return [String(addr).slice(0, first), String(addr).slice(-last)].join('...');
}
