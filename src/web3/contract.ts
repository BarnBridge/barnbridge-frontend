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

class Web3Contract extends EventEmitter {
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
          .then(value => {
            if (+value === WEB3_ERROR_VALUE) {
              const err = new Error(`Contract call failure. (${this.name}.${batchMethod.method})`);
              console.error(err);

              return Promise.reject(err);
            }

            resolve((batchMethod.transform ?? (x => x))(value));
          })
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

    return contractMethod(...methodArgs)
      .send(sendArgs, async (err: Error, transactionHash: string) => {
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
      });
  }
}

export default Web3Contract;
