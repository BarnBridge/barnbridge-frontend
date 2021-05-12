import debounce from 'lodash/debounce';
import Web3 from 'web3';
import { Method } from 'web3-core-method';
import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { getGasValue } from 'web3/utils';
import EventEmitter from 'wolfy87-eventemitter';

import { DEFAULT_WEB3, DEFAULT_WEB3_PROVIDER, WEB3_ERROR_VALUE } from 'components/providers/eth-web3-provider';

export type Web3ContractAbiItem = AbiItem;

export function createAbiItem(name: string, inputs: string[] = [], outputs: string[] = []): AbiItem {
  return {
    name,
    type: 'function',
    stateMutability: 'view',
    inputs: inputs.map(type => ({ name: '', type })),
    outputs: outputs.map(type => ({ name: '', type })),
  };
}

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
  onError?: (err: Error) => any;
};

export type Web3SendState = 'progress' | 'success' | 'fail';

export type Web3SendMeta = {
  id: string;
  sender: Web3Contract;
  method: string;
  methodArgs: any[];
  sendArgs: Record<string, any>;
  state?: Web3SendState;
  txHash?: string;
  result?: any;
  error?: Error;
};

type EthContract = Contract & Eth;

class Web3Contract extends EventEmitter {
  static UPDATE_ACCOUNT = 'update:account';
  static UPDATE_DATA = 'update:data';

  static sendIncNumber: number = 0;
  static requestsPool: Map<any, Method[]> = new Map();

  static addRequest(source: Web3Contract, request: Method) {
    const provider = source._callContract.currentProvider;
    const collected = this.requestsPool.get(provider) ?? [];

    this.requestsPool.set(provider, [...collected, request]);
    this.run();
  }

  static run = debounce(() => {
    Web3Contract.requestsPool.forEach((requests, provider) => {
      const web3 = new Web3(provider);
      const batch = new web3.BatchRequest();

      requests.forEach(request => batch.add(request));
      batch.execute();

      Web3Contract.requestsPool.delete(provider);
    });
  }, 250);

  static tryCall(to: string, from: string, data: string, value: string): any {
    return DEFAULT_WEB3.eth.call({
      to,
      from,
      data,
      value,
    });
  }

  readonly _abi: AbiItem[];

  readonly address: string;

  readonly _callContract: EthContract;
  readonly _sendContract: EthContract;

  name: string;

  account?: string;

  constructor(abi: AbiItem[], address: string, name: string) {
    super();

    this._abi = abi;
    this.address = address;
    this.name = name;

    this._callContract = new DEFAULT_WEB3.eth.Contract(abi, address) as EthContract;
    this._sendContract = new DEFAULT_WEB3.eth.Contract(abi, address) as EthContract;
  }

  get writeFunctions(): AbiItem[] {
    return this._abi.filter(r => r.type === 'function' && !r.constant);
  }

  setCallProvider(provider: any = DEFAULT_WEB3_PROVIDER): void {
    this._callContract.setProvider(provider);
  }

  setProvider(provider: any = DEFAULT_WEB3_PROVIDER): void {
    this._sendContract.setProvider(provider);
  }

  setAccount(account?: string): void {
    this.account = account;
    this.emit(Web3Contract.UPDATE_ACCOUNT, account);
  }

  assertAccount() {
    if (!this.account) {
      throw new Error('This operation requires account to be connected!');
    }
  }

  batch(methods: BatchContractMethod[]): Promise<any[]> {
    if (methods.length === 0) {
      return Promise.reject(new Error(`Empty list of methods for batch.`));
    }

    const promises = methods.map((batchMethod: BatchContractMethod) => {
      return new Promise(resolve => {
        this.call(batchMethod.method, batchMethod.methodArgs ?? [], batchMethod.callArgs ?? {})
          .then(value => resolve((batchMethod.transform ?? (x => x))(value)))
          .catch(err => resolve(batchMethod.onError?.(err) ?? undefined));
      });
    });

    return Promise.all(promises);
  }

  call(method: string, methodArgs: any[] = [], callArgs: Record<string, any> = {}): Promise<any> {
    const contractMethod = this._callContract.methods[method];

    if (!contractMethod) {
      return Promise.reject(new Error(`Invalid contract method name [${method}].`));
    }

    return new Promise((resolve, reject) => {
      const req = contractMethod(...methodArgs).call.request(callArgs, (err: Error, value: string) => {
        if (err) {
          return reject(err);
        }

        if (+value === WEB3_ERROR_VALUE) {
          return Promise.reject(new Error(`Contract call failure. (${this.name}.${method})`));
        }

        resolve(value);
      });

      Web3Contract.addRequest(this, req);
    });
  }

  send(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}, gasPrice?: number): Promise<any> {
    this.assertAccount();

    const contractMethod = this._sendContract.methods[method];

    if (!contractMethod) {
      return Promise.reject(new Error(`Unknown method "${method}" in contract.`));
    }

    Web3Contract.sendIncNumber += 1;

    const _sendArgs = {
      from: this.account,
      gasPrice: gasPrice !== undefined ? getGasValue(gasPrice) : undefined,
      ...sendArgs,
    };

    const meta: Web3SendMeta = {
      id: `${method}:${Web3Contract.sendIncNumber}`,
      sender: this,
      method,
      methodArgs,
      sendArgs: _sendArgs,
    };

    return contractMethod(...methodArgs)
      .send(_sendArgs, async (err: Error, txHash: string) => {
        if (err) {
          return;
        }

        this.emit('tx:hash', txHash, {
          ...meta,
          state: 'progress',
          txHash,
        });
      })
      .then((result: any) => {
        this.emit('tx:success', result, {
          ...meta,
          state: 'success',
          result,
        });
        return result;
      })
      .catch((error: Error) => {
        this.emit('tx:fail', error, {
          ...meta,
          state: 'fail',
          error,
        });
        return Promise.reject(error);
      });
  }
}

export default Web3Contract;
