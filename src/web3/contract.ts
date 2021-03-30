import debounce from 'lodash/debounce';
import { Eth } from 'web3-eth';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EventEmitter from 'wolfy87-eventemitter';

import { DEFAULT_CONTRACT_PROVIDER, EthWeb3, WEB3_ERROR_VALUE } from 'components/providers/eth-web3-provider';

export type Web3ContractAbiItem = AbiItem;

export type BatchContractMethod = {
  method: string;
  methodArgs?: any[];
  callArgs?: Record<string, any>;
  transform?: (value: any) => any;
  onError?: (err: Error) => any;
};

export type Web3SendState = 'progress' | 'success' | 'fail';

export type Web3SendMeta = {
  sender: Web3Contract;
  method: string;
  methodArgs: any[];
  sendArgs: Record<string, any>;
  state?: Web3SendState;
  txHash?: string;
  result?: any;
  error?: Error;
};

class Web3Contract extends EventEmitter {
  static UPDATE_DATA = 'update:data';

  static requestsPool: any[] = [];

  static addRequest(request: any) {
    this.requestsPool.push(request);
    this.run();
  }

  static run = debounce(() => {
    const requests = [...Web3Contract.requestsPool];
    Web3Contract.requestsPool.length = 0;

    const batch = new EthWeb3.BatchRequest();
    requests.forEach(request => batch.add(request));
    batch.execute();
  }, 250);

  readonly abi: AbiItem[];

  readonly address: string;

  readonly ethContract: Contract & Eth;

  name: string;

  account?: string;

  constructor(abi: AbiItem[], address: string, name: string) {
    super();

    this.abi = abi;
    this.address = address;
    this.name = name;

    this.ethContract = new EthWeb3.eth.Contract(abi, address) as Contract & Eth;
  }

  get currentProvider(): any {
    return this.ethContract.currentProvider;
  }

  get writeFunctions(): AbiItem[] {
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
      return Promise.reject(new Error(`Empty list of methods for batch.`));
    }

    const promises = methods.map((batchMethod: BatchContractMethod) => {
      return new Promise(resolve => {
        this.call(batchMethod.method, batchMethod.methodArgs ?? [], batchMethod.callArgs ?? {})
          .then(value => resolve((batchMethod.transform ?? (x => x))(value)))
          .catch(err => {
            if (batchMethod.onError instanceof Function) {
              return resolve(batchMethod.onError(err));
            }

            resolve(undefined);
          });
      });
    });

    return Promise.all(promises);
  }

  call(method: string, methodArgs: any[] = [], callArgs: Record<string, any> = {}): Promise<any> {
    const contractMethod = this.ethContract.methods[method];

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

      Web3Contract.addRequest(req);
    });
  }

  send(method: string, methodArgs: any[] = [], sendArgs: Record<string, any> = {}): Promise<any> {
    const contractMethod = this.ethContract.methods[method];

    if (!contractMethod) {
      return Promise.reject(new Error(`Unknown method "${method}" in contract.`));
    }

    const meta: Web3SendMeta = {
      sender: this,
      method,
      methodArgs,
      sendArgs,
    };

    return contractMethod(...methodArgs)
      .send(sendArgs, async (err: Error, transactionHash: string) => {
        if (err) {
          return;
        }

        meta.state = 'progress';
        meta.txHash = transactionHash;

        this.emit('tx:hash', transactionHash, meta);
      })
      .then((result: any) => {
        meta.state = 'success';
        meta.result = result;

        this.emit('tx:success', result, meta);
        return result;
      })
      .catch((error: Error) => {
        meta.state = 'fail';
        meta.error = error;

        this.emit('tx:fail', error, meta);
        return Promise.reject(error);
      });
  }
}

export default Web3Contract;
