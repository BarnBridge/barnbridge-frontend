import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';
import Web3 from 'web3';
import { Method } from 'web3-core-method';
import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { getGasValue } from 'web3/utils';
import EventEmitter from 'wolfy87-eventemitter';

import { WEB3_ERROR_VALUE } from 'components/providers/web3Provider';

export class AbiTuple {
  items: string[] = [];

  constructor(items: string[]) {
    this.items = items;
  }
}

export class AbiTupleArray {
  items: string[] = [];

  constructor(items: string[]) {
    this.items = items;
  }
}

export function createAbiItem(
  name: string,
  inputs: (string | AbiTuple | AbiTupleArray)[] = [],
  outputs: (string | AbiTuple | AbiTupleArray)[] = [],
): AbiItem {
  return {
    name,
    type: 'function',
    stateMutability: 'view',
    inputs: inputs.map(type => {
      if (type instanceof AbiTuple) {
        return {
          name: '',
          type: 'tuple',
          components: type.items.map(t => ({ name: '', type: t })),
        };
      } else if (type instanceof AbiTupleArray) {
        return {
          name: '',
          type: 'tuple[]',
          components: type.items.map(t => ({ name: '', type: t })),
        };
      }

      return { name: '', type };
    }),
    outputs: outputs.map(type => {
      if (type instanceof AbiTuple) {
        return {
          name: '',
          type: 'tuple',
          components: type.items.map(t => ({ name: '', type: t })),
        };
      } else if (type instanceof AbiTupleArray) {
        return {
          name: '',
          type: 'tuple[]',
          components: type.items.map(t => ({ name: '', type: t })),
        };
      }

      return { name: '', type };
    }),
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

class BatchRequestManager {
  static requests: Map<any, Method[]> = new Map();

  static addRequest(source: EthContract, request: Method) {
    const { currentProvider } = source;

    if (!currentProvider) {
      return;
    }

    const { requests } = BatchRequestManager;

    let collected = requests.get(currentProvider);

    if (!collected) {
      collected = [];
      requests.set(currentProvider, collected);
    }

    collected.push(request);

    this.run();
  }

  static run = debounce(() => {
    const { requests } = BatchRequestManager;

    requests.forEach((methods, provider) => {
      const web3 = new Web3(provider);
      const batch = new web3.BatchRequest();

      methods.forEach(method => batch.add(method));
      batch.execute();

      requests.delete(provider);
    });
  }, 250);
}

class Web3Contract {
  static UPDATE_ACCOUNT = 'update:account';
  static UPDATE_DATA = 'update:data';

  private readonly _events: EventEmitter;
  private readonly _abi: AbiItem[];
  private readonly _callContract: EthContract;
  private readonly _sendContract: EthContract;
  readonly address: string;
  name: string;
  account?: string;

  constructor(abi: AbiItem[], address: string, name: string) {
    if (!address) {
      throw new Error(`Invalid contract address (${name})`);
    }

    this._events = new EventEmitter();
    this._abi = abi;
    this.address = address;
    this.name = name;

    const web3 = new Web3();
    this._callContract = new web3.eth.Contract(abi, address) as EthContract;
    this._sendContract = new web3.eth.Contract(abi, address) as EthContract;
  }

  /// GETTERS
  get writeFunctions(): AbiItem[] {
    return this._abi.filter(r => r.type === 'function' && !r.constant);
  }

  get callProvider(): any {
    return this._callContract.currentProvider;
  }

  get provider(): any {
    return this._sendContract.currentProvider;
  }

  /// SETTERS
  setCallProvider(provider: any): void {
    if (this._callContract.currentProvider !== provider) {
      this._callContract.setProvider(provider);
    }
  }

  setProvider(provider: any): void {
    if (this._sendContract.currentProvider !== provider) {
      this._sendContract.setProvider(provider);
    }
  }

  setAccount(account?: string): void {
    if (this.account !== account) {
      this.account = account;
      this.emit(Web3Contract.UPDATE_ACCOUNT, account);
    }
  }

  /// ASSERTION METHODS
  assertAccount() {
    if (!this.account) {
      throw new Error('This operation requires wallet to be connected!');
    }
  }

  /// REQUEST METHODS
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
          // console.error(err);
          return reject(err);
        }

        if (+value === WEB3_ERROR_VALUE) {
          return Promise.reject(new Error(`Contract call failure. (${this.name}.${method})`));
        }

        resolve(value);
      });

      BatchRequestManager.addRequest(this._callContract, req);
    });
  }

  send(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}, gasPrice?: number): Promise<any> {
    this.assertAccount();

    const contractMethod = this._sendContract.methods[method];

    if (!contractMethod) {
      return Promise.reject(new Error(`Unknown method "${method}" in contract.`));
    }

    const _sendArgs = {
      from: this.account,
      gasPrice: gasPrice !== undefined ? getGasValue(gasPrice) : undefined,
      ...sendArgs,
    };

    const meta: Web3SendMeta = {
      id: uniqueId(`${method}:`),
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

  /// EVENT METHODS
  on(event: string, listener: Function): EventEmitter {
    return this._events.on(event, listener);
  }

  once(event: string, listener: Function): EventEmitter {
    return this._events.once(event, listener);
  }

  off(event: string, listener: Function): EventEmitter {
    return this._events.off(event, listener);
  }

  emit(event: string, ...args: any[]): EventEmitter {
    return this._events.emit(event, ...args);
  }

  onUpdateAccount(listener: Function): EventEmitter {
    return this.on('update:account', listener);
  }

  onUpdateData(listener: Function): EventEmitter {
    return this.on('update:data', listener);
  }
}

export default Web3Contract;
