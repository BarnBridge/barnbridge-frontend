import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import EventEmitter from 'wolfy87-eventemitter';
import { AbiItem } from 'web3-utils';

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
  onError?: (err: Error) => any;
};

export const WEB3_RPC_WSS_URL = String(process.env.REACT_APP_WEB3_RPC_WSS_URL);
export const WEB3_RPC_HTTPS_URL = String(process.env.REACT_APP_WEB3_RPC_HTTPS_URL);

export const DEFAULT_CONTRACT_PROVIDER = new Web3.providers.WebsocketProvider(WEB3_RPC_WSS_URL);

const WEB3_ERROR_VALUE = 3.9638773911973445e75;
const web3 = new Web3(DEFAULT_CONTRACT_PROVIDER);

export type Web3ContractAbiItem = AbiItem;

class Web3Contract extends EventEmitter {
  readonly abi: Web3ContractAbiItem[];
  readonly address: string;
  readonly name: string;
  readonly ethContract: Contract & Eth;

  constructor(abi: Web3ContractAbiItem[], address: string, name: string) {
    super();

    this.abi = abi;
    this.address = address;
    this.name = name;

    this.ethContract = new web3.eth.Contract(abi, address) as any;
  }

  static tryCall(to: string, from: string, data: string, value: string): any {
    return web3.eth.call({
      to,
      from,
      data,
      value,
    });
  }

  get writeFunctions(): Web3ContractAbiItem[] {
    return this.abi.filter(r => r.type === 'function' && !r.constant);
  }

  setProvider(provider: any = DEFAULT_CONTRACT_PROVIDER): void {
    if (this.ethContract.currentProvider !== provider) {
      this.ethContract.setProvider(provider);
    }
  }

  batch(methods: BatchContractMethod[]): Promise<any[]> {
    // if (methods.length === 0) {
    //   return Promise.reject();
    // }

    // if (methods.length === 1) {
    //   const method = methods[0];
    //
    //   return this.call(method.method, method.methodArgs, method.callArgs)
    //     // .then(method.transform ?? (v => v))
    //     // .catch(method.onError ?? (e => e))
    //     .then(value => [value]);
    // }

    const batch = new web3.BatchRequest();

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
          const request = contractMethod(...methodArgs).call.request(
            callArgs,
            (err: Error, value: string) => {
              if (err) {
                if (onError instanceof Function) {
                  return resolve(onError(err));
                } else {
                  console.error(`${this.name}:${methodName}.call`, err);
                  return resolve(undefined);
                }
              }

              if (+value === WEB3_ERROR_VALUE) {
                console.error(
                  `${this.name}:${methodName}.call`,
                  'Contract call failure!',
                );
                return resolve(undefined);
              }

              resolve(transform(value));
            },
          );

          batch.add(request);
        } catch (e) {
          return resolve(undefined);
        }
      });
    });

    try {
      batch.execute();
    } catch {
    }

    return Promise.all(promises);
  }

  call(
    method: string,
    methodArgs: any[] = [],
    sendArgs: Record<string, any> = {},
  ): Promise<any> {
    return this.execute('call', method, methodArgs, sendArgs);
  }

  send(
    method: string,
    methodArgs: any[] = [],
    sendArgs: Record<string, any> = {},
  ): Promise<any> {
    return this.execute('send', method, methodArgs, sendArgs);
  }

  private execute(
    type: 'call' | 'send',
    method: string,
    methodArgs: any[] = [],
    sendArgs: Record<string, any> = {},
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const contractMethod = this.ethContract.methods[method];

      if (!contractMethod) {
        return resolve(undefined);
      }

      const onError = (err: Error) => {
        this.emit('error', err, this, {
          method,
          methodArgs,
          sendArgs,
        });
        reject(err);
      };

      let pr = contractMethod(...methodArgs)?.[type](
        sendArgs,
        async (err: Error) => {
          if (err) {
            reject(err);
          }
        },
      );

      pr.then(resolve);

      if (type === 'send') {
        pr.catch(onError);
      }
    });
  }
}

export default Web3Contract;
