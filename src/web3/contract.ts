import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import EventEmitter from 'wolfy87-eventemitter';

import { getWSRpcUrl } from 'web3/utils';

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
};

export const DEFAULT_CONTRACT_PROVIDER = new Web3.providers.WebsocketProvider(getWSRpcUrl());

const WEB3_ERROR_VALUE = 3.9638773911973445e+75;
const web3 = new Web3(DEFAULT_CONTRACT_PROVIDER);

class Web3Contract extends EventEmitter {
  readonly abi: any;
  readonly address: string;
  readonly name: string;
  readonly ethContract: Contract & Eth;

  constructor(abi: any, address: string, name: string) {
    super();

    this.abi = abi;
    this.address = address;
    this.name = name;

    this.ethContract = new web3.eth.Contract(abi, address) as any;
  }

  setProvider(provider: any = DEFAULT_CONTRACT_PROVIDER): void {
    if (this.ethContract.currentProvider !== provider) {
      this.ethContract.setProvider(provider);
    }
  }

  batch(methods: BatchContractMethod[]): Promise<any[]> {
    const batch = new web3.BatchRequest();

    const promises = methods.map((method: BatchContractMethod) => {
      return new Promise(resolve => {
        const {
          method: methodName,
          methodArgs = [],
          callArgs = {},
          transform = (value: any) => value,
        } = method;

        const contractMethod = this.ethContract.methods[methodName];

        if (!contractMethod) {
          return resolve(undefined);
        }

        try {
          const request = contractMethod(...methodArgs).call
            .request(callArgs, (err: Error, value: string) => {
              if (err) {
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

    batch.execute();

    return Promise.all(promises);
  }

  send(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}): Promise<any> {
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

      contractMethod(...methodArgs)
        ?.send(sendArgs, async (err: Error) => {
          if (err) {
            reject(err);
          }
        })
        .then(resolve)
        .catch(onError);
    });
  }
}

export default Web3Contract;
