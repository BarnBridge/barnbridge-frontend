import BigNumber from 'bignumber.js';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { useContractFactory } from 'hooks/useContract';

import { AirdropClaimType, AirdropDataType } from 'networks/types';

export class MerkleDistributor extends Web3Contract {
  airdropData: AirdropDataType;
  claimMeta: AirdropClaimType | undefined;
  isClaimed: boolean = false;
  toClaim: BigNumber | undefined;

  constructor(address: string, airdropData: AirdropDataType) {
    super(
      [
        createAbiItem('isClaimed', ['uint256'], ['bool']),
        createAbiItem('claim', ['uint256', 'address', 'uint256', 'bytes32[]']),
      ],
      address,
      'MerkleDistributor',
    );

    this.airdropData = airdropData;

    this.on(Web3Contract.UPDATE_ACCOUNT, async () => {
      this.loadUserData().catch(Error);
    });
  }

  async loadUserData(): Promise<void> {
    this.claimMeta = undefined;
    this.isClaimed = false;
    this.toClaim = undefined;

    if (this.account) {
      for (let claimAddress in this.airdropData.claims) {
        if (claimAddress.toUpperCase() === this.account.toUpperCase()) {
          this.claimMeta = this.airdropData.claims[claimAddress];
          break;
        }
      }

      if (this.claimMeta) {
        const { index, amount } = this.claimMeta;
        const [isClaimed] = await this.batch([{ method: 'isClaimed', methodArgs: [index] }]);
        this.isClaimed = isClaimed;
        this.toClaim = !isClaimed ? new BigNumber(amount).div(10 ** 18) : BigNumber.ZERO;
      }
    }

    this.emit(Web3Contract.UPDATE_DATA);
  }

  async claim(): Promise<void> {
    if (!this.account || !this.claimMeta) {
      return;
    }

    const { index, amount, proof } = this.claimMeta;

    return this.send('claim', [index, this.account, amount, proof], {
      from: this.account,
    }).then(() => {
      this.isClaimed = true;
      this.toClaim = BigNumber.ZERO;
      this.emit(Web3Contract.UPDATE_DATA);
    });
  }
}

export function useAirdrop(
  merkleDistributorAddress: string | undefined,
  data: AirdropDataType | undefined,
): MerkleDistributor | undefined {
  const { getOrCreateContract } = useContractFactory();

  return merkleDistributorAddress && data
    ? getOrCreateContract(merkleDistributorAddress, () => {
        return new MerkleDistributor(merkleDistributorAddress, data);
      })
    : undefined;
}
