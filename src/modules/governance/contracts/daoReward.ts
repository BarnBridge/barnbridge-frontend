import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

const DaoRewardABI: AbiItem[] = [
  // call
  createAbiItem('pullFeature', [], ['address', 'uint256', 'uint256', 'uint256', 'uint256']),
  // send
  createAbiItem('claim', [], ['uint256']),
];

class DaoRewardContract extends Web3Contract {
  constructor(address: string) {
    super(DaoRewardABI, address, 'DAO Reward');

    this.on(Web3Contract.UPDATE_ACCOUNT, () => {
      this.toClaim = undefined;
    });
  }

  // common data
  pullFeature?: {
    source: string;
    startTs: number;
    endTs: number;
    totalDuration: number;
    totalAmount: BigNumber;
  };
  // user data
  toClaim?: BigNumber;

  // computed data
  get bondRewards(): BigNumber | undefined {
    if (!this.pullFeature) {
      return undefined;
    }

    const { startTs, endTs, totalDuration, totalAmount } = this.pullFeature;
    const now = Date.now() / 1_000;

    if (startTs > now) {
      return BigNumber.ZERO;
    }

    if (endTs <= now) {
      return totalAmount;
    }

    return totalAmount.multipliedBy(now - startTs).div(totalDuration);
  }

  async loadCommonData(): Promise<void> {
    const [pullFeature] = await this.batch([{ method: 'pullFeature' }]);

    this.pullFeature = {
      source: pullFeature[0],
      startTs: Number(pullFeature[1]),
      endTs: Number(pullFeature[2]),
      totalDuration: Number(pullFeature[3]),
      totalAmount: new BigNumber(pullFeature[4]),
    };
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async loadUserData(): Promise<void> {
    const account = this.account;
    this.assertAccount();

    const [toClaim] = await this.batch([{ method: 'claim', callArgs: { from: account } }]);

    this.toClaim = new BigNumber(toClaim);
    this.emit(Web3Contract.UPDATE_DATA);
  }

  async claim(gasPrice?: number): Promise<void> {
    await this.send('claim', [], {}, gasPrice);
  }
}

export default DaoRewardContract;
