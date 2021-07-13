import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const DaoBarnABI: AbiItem[] = [
  // call
  createAbiItem('bondStaked', [], ['uint256']),
  createAbiItem('balanceOf', ['address'], ['uint256']),
  createAbiItem('votingPower', ['address'], ['uint256']),
  createAbiItem('userLockedUntil', ['address'], ['uint256']),
  createAbiItem('delegatedPower', ['address'], ['uint256']),
  createAbiItem('userDelegatedTo', ['address'], ['address']),
  createAbiItem('bondStakedAtTs', ['uint256'], ['uint256']),
  createAbiItem('votingPowerAtTs', ['address', 'uint256'], ['uint256']),
  createAbiItem('multiplierAtTs', ['address', 'uint256'], ['uint256']),
  // send
  createAbiItem('deposit', ['uint256'], []),
  createAbiItem('withdraw', ['uint256'], []),
  createAbiItem('delegate', ['address'], []),
  createAbiItem('stopDelegate', [], []),
  createAbiItem('lock', ['uint256'], []),
];

class DaoBarnContract extends Web3Contract {
  constructor(address: string) {
    super(DaoBarnABI, address, 'DAO Barn');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.balance = undefined;
      this.votingPower = undefined;
      this.userLockedUntil = undefined;
      this.delegatedPower = undefined;
      this.userDelegatedTo = undefined;
    });
  }

  // common data
  bondStaked?: BigNumber;

  // user data
  balance?: BigNumber;
  votingPower?: BigNumber;
  userLockedUntil?: number;
  delegatedPower?: BigNumber;
  userDelegatedTo?: string;

  // computed data
  get isUserLocked(): boolean {
    return (this.userLockedUntil ?? 0) > Date.now() / 1_000;
  }

  async loadCommonData(): Promise<void> {
    const [bondStaked] = await this.batch([{ method: 'bondStaked' }]);

    this.bondStaked = new BigNumber(bondStaked).unscaleBy(18); /// TODO: re-check
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadUserData(): Promise<void> {
    const account = this.account;
    this.assertAccount();

    const [balance, votingPower, userLockedUntil, delegatedPower, userDelegatedTo] = await this.batch([
      { method: 'balanceOf', methodArgs: [account] },
      { method: 'votingPower', methodArgs: [account] },
      { method: 'userLockedUntil', methodArgs: [account] },
      { method: 'delegatedPower', methodArgs: [account] },
      { method: 'userDelegatedTo', methodArgs: [account] },
    ]);

    this.balance = new BigNumber(balance).unscaleBy(18); /// TODO: re-check
    this.votingPower = new BigNumber(votingPower).unscaleBy(18); /// TODO: re-check
    this.userLockedUntil = Number(userLockedUntil);
    this.delegatedPower = new BigNumber(delegatedPower).unscaleBy(18); /// TODO: re-check
    this.userDelegatedTo = userDelegatedTo;
    this.emit(Web3Contract.UPDATE_DATA);
  }

  getBondStakedAtTs(timestamp: number): Promise<BigNumber> {
    return this.call('bondStakedAtTs', [timestamp]).then(value => new BigNumber(value).unscaleBy(18)!); /// TODO: re-check
  }

  getVotingPower(address: string): Promise<BigNumber> {
    return this.call('votingPower', [address]).then(value => new BigNumber(value).unscaleBy(18)!); /// TODO: re-check
  }

  getVotingPowerAtTs(address: string, timestamp: number): Promise<BigNumber> {
    return this.call('votingPowerAtTs', [address, timestamp]).then(value => new BigNumber(value).unscaleBy(18)!); /// TODO: re-check
  }

  getMultiplierAtTs(address: string, timestamp: number): Promise<BigNumber> {
    return this.call('votingPowerAtTs', [address, timestamp]).then(value => new BigNumber(value).unscaleBy(18)!); /// TODO: re-check
  }

  deposit(amount: BigNumber, gasPrice?: number): Promise<void> {
    return this.send('deposit', [amount], {}, gasPrice);
  }

  withdraw(amount: BigNumber, gasPrice?: number): Promise<void> {
    return this.send('withdraw', [amount], {}, gasPrice);
  }

  delegate(to: string, gasPrice?: number): Promise<void> {
    return this.send('delegate', [to], {}, gasPrice);
  }

  stopDelegate(gasPrice?: number): Promise<void> {
    return this.send('stopDelegate', [], {}, gasPrice);
  }

  lock(timestamp: number, gasPrice?: number): Promise<void> {
    return this.send('lock', [timestamp], {}, gasPrice);
  }
}

export default DaoBarnContract;
