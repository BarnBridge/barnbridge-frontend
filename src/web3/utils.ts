import { EthContract } from 'web3/types';
import Web3EthContract from 'web3-eth-contract';
import BigNumber from 'bignumber.js';

export function getRpcUrl(chainId: number = Number(process.env.REACT_APP_WEB3_CHAIN_ID)) {
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

export function createContract(abi: any, address: string, rpcUrl: string = getRpcUrl()): EthContract {
  const contract: EthContract = new (Web3EthContract as any)(abi, address);
  contract.setProvider?.(rpcUrl);
  return contract;
}

export function callContract(contract: EthContract, methodName: string, ...args: any[]): Promise<any> {
  return contract
    ?.methods[methodName](...args)
    ?.call()
    ?.catch((e: any) => {
      console.error(`${methodName}.call`, e);
      return Promise.reject(e);
    });
}

export function batchCallContract(contract: EthContract, methodNames: string[], ...args: any[]): Promise<any[]> {
  const batch = new contract.BatchRequest!();
  const promises = methodNames
    .map(methodName => {
      return new Promise(resolve => {
        const method = contract?.methods[methodName];

        if (!method) {
          resolve(undefined);
        }

        const request = method().call.request((err: Error, data: string) => {
          if (err) {
            console.error(err);
          }

          resolve(data);
        });

        batch.add(request);
      });
    });

  batch.execute();

  return Promise.all(promises);
}

export function getExponentValue(decimals: number = 0): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value?: BigNumber, decimals: number = 0): BigNumber | undefined {
  return value?.div(getExponentValue(decimals));
}

export function formatBigValue(value?: BigNumber, decimals: number = 3, defaultValue: string = '-'): string {
  return value ? value.toFormat(decimals) : defaultValue;
}

export function assertValues(...values: any[]): boolean {
  return !values.some(value => value === undefined || value === null);
}
