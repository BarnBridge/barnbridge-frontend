import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const ERC20ABI: AbiItem[] = [
  createAbiItem('name', [], ['string']),
  createAbiItem('symbol', [], ['string']),
  createAbiItem('decimals', [], ['uint8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('balanceOf', ['address'], ['uint256']),
  createAbiItem('allowance', ['address', 'address'], ['uint256']),
  createAbiItem('approve', ['address', 'uint256'], ['bool']),
];

export default class Erc20Contract extends Web3Contract {
  symbol?: string;

  decimals?: number;

  totalSupply?: BigNumber;

  private balances: Map<string, BigNumber>;

  private allowances: Map<string, BigNumber>;

  constructor(abi: AbiItem[], address: string) {
    super([...ERC20ABI, ...abi], address, '');

    this.balances = new Map<string, BigNumber>();
    this.allowances = new Map<string, BigNumber>();

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.balances.clear();
      this.allowances.clear();
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }

  get balance(): BigNumber | undefined {
    return this.getBalanceOf(this.account);
  }

  getBalanceOf(address?: string): BigNumber | undefined {
    return address ? this.balances.get(address) : undefined;
  }

  getAllowanceOf(spenderAddress: string): BigNumber | undefined {
    return spenderAddress ? this.allowances.get(spenderAddress) : undefined;
  }

  isAllowedOf(spenderAddress: string): boolean | undefined {
    return this.getAllowanceOf(spenderAddress)?.gt(BigNumber.ZERO);
  }

  async loadCommon(): Promise<void> {
    const [name, symbol, decimals, totalSupply] = await this.batch([
      { method: 'name' },
      { method: 'symbol' },
      { method: 'decimals' },
      { method: 'totalSupply' },
    ]);

    this.name = name;
    this.symbol = symbol;
    this.decimals = Number(decimals);
    this.totalSupply = BigNumber.from(totalSupply);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadBalance(address = this.account): Promise<void> {
    if (!address) {
      return Promise.reject(new Error('Invalid owner address!'));
    }

    const balance = await this.call('balanceOf', [address]);
    const value = BigNumber.from(balance);

    if (value) {
      this.balances.set(address, value);
      this.emit(Web3Contract.UPDATE_DATA);
    }
  }

  async loadAllowance(spenderAddress: string): Promise<void> {
    const address = this.account;

    if (!address) {
      return Promise.reject(new Error('Invalid owner address!'));
    }

    const allowance = await this.call('allowance', [address, spenderAddress]);
    const value = BigNumber.from(allowance);

    if (value) {
      this.allowances.set(spenderAddress, value);
      this.emit(Web3Contract.UPDATE_DATA);
    }
  }

  async approve(spenderAddress: string | undefined, enable: boolean): Promise<void> {
    if (!spenderAddress) {
      return Promise.reject(new Error('Invalid spender address!'));
    }

    const value = enable ? BigNumber.MAX_UINT_256 : BigNumber.ZERO;

    await this.send('approve', [spenderAddress, value]);
    await this.loadAllowance(spenderAddress).catch(() => undefined);
  }
}
