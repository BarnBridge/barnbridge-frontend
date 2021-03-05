import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EventEmitter from 'wolfy87-eventemitter';

import { DEFAULT_CONTRACT_PROVIDER, EthWeb3, WEB3_ERROR_VALUE } from 'components/providers/eth-web3-provider';

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
  onError?: (err: Error) => any;
};

export type Web3ContractAbiItem = AbiItem;

class Web3Contract extends EventEmitter {
  readonly abi: Web3ContractAbiItem[];

  readonly address: string;

  readonly ethContract: Contract & Eth;

  name: string;

  account?: string;

  constructor(abi: Web3ContractAbiItem[], address: string, name: string) {
    super();

    this.abi = abi;
    this.address = address;
    this.name = name;

    this.ethContract = new EthWeb3.eth.Contract(abi, address) as any;
  }

  get currentProvider(): any {
    return this.ethContract.currentProvider;
  }

  get writeFunctions(): Web3ContractAbiItem[] {
    return this.abi.filter(r => r.type === 'function' && !r.constant);
  }

  static tryCall(to: string, from: string, data: string, value: string): any {
    return EthWeb3.eth.call({
      to,
      from,
      data,
      value,
    });
  }

  setProvider(provider: any = DEFAULT_CONTRACT_PROVIDER): void {
    this.ethContract.setProvider(provider);
  }

  setAccount(account?: string): void {
    this.account = account;
  }

  batch(methods: BatchContractMethod[]): Promise<any[]> {
    if (methods.length === 0) {
      return Promise.reject();
    }

    // if (methods.length === 1) {
    //   const method = methods[0];
    //
    //   return this.call(method.method, method.methodArgs, method.callArgs)
    //     // .then(method.transform ?? (v => v))
    //     // .catch(method.onError ?? (e => e))
    //     .then(value => [value]);
    // }

    const batch = new EthWeb3.BatchRequest();

    const promises = methods.map((method: BatchContractMethod) => {
      return new Promise(resolve => {
        const {
          method: methodName,
          methodArgs = [],
          callArgs = {},
          transform = (value: any) => value,
          onError,
        } = method;

        const contractMethod = this.ethContract.methods[methodName];

        if (!contractMethod) {
          return resolve(undefined);
        }

        try {
          const request = contractMethod(...methodArgs).call.request(callArgs, (err: Error, value: string) => {
            if (err) {
              if (onError instanceof Function) {
                return resolve(onError(err));
              }
              console.error(`${this.name}:${methodName}.call`, err);
              return resolve(undefined);
            }

            if (+value === WEB3_ERROR_VALUE) {
              console.error(`${this.name}:${methodName}.call`, 'Contract call failure!');
              return resolve(undefined);
            }

            resolve(transform(value));
          });

          batch.add(request);
        } catch (e) {
          return resolve(undefined);
        }
      });
    });

    try {
      batch.execute();
    } catch {}

    return Promise.all(promises);
  }

  call(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}): Promise<any> {
    const contractMethod = this.ethContract.methods[method];

    return contractMethod?.(...methodArgs)?.call(sendArgs) ?? Promise.reject(undefined);
  }

  send(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}): Promise<any> {
    const contractMethod = this.ethContract.methods[method];

    return (
      contractMethod?.(...methodArgs)
        ?.send(sendArgs, async (err: Error, transactionHash: string) => {
          this.emit('tx:transactionHash', transactionHash, this, {
            method,
            methodArgs,
            sendArgs,
          });
        })
        .then((result: any) => {
          this.emit('tx:complete', result, this, {
            method,
            methodArgs,
            sendArgs,
          });

          return result;
        })
        .catch((error: Error) => {
          this.emit('tx:failure', error, this, {
            method,
            methodArgs,
            sendArgs,
          });

          return Promise.reject(error);
        }) ?? Promise.reject(undefined)
    );
  }
}

export default Web3Contract;
