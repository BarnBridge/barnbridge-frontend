import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import EventEmitter from 'wolfy87-eventemitter';

import { getWSRpcUrl } from 'web3/utils';

const Web3EthContract = require('web3-eth-contract');

Web3EthContract.setProvider(getWSRpcUrl());

export type EthContract = Contract & Web3;

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
};

const WEB3_ERROR_VALUE = 3.9638773911973445e+75;

class Web3Contract extends EventEmitter {
  readonly ethContract: EthContract;
  readonly name: string;

  constructor(abi: any, address: string, name: string) {
    super();
    this.ethContract = new Web3EthContract(abi, address);
    this.name = name;
  }

  batch(methods: BatchContractMethod[]): Promise<any[]> {
    const batch = new this.ethContract.BatchRequest();

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
      const clonedContract = this.ethContract.clone() as any;
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
        .catch((err: Error) => {
          this.emit('error', err, this);
          reject();
        });
    });
  }
}

export default Web3Contract;
