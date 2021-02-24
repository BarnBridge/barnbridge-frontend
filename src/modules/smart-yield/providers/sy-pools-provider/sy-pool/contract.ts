import Web3Contract from 'web3/contract';

import SYPoolCTokenContract from '../sy-pool-c-token/contract';
import SYPoolUTokenContract from '../sy-pool-u-token/contract';
import ABI from './abi';

export default class SYPoolContract extends Web3Contract {
  constructor(address: string) {
    super(ABI, address, address);

    this.on('changeProvider', (provider: any) => {
      this.cToken?.setProvider(provider);
      this.uToken?.setProvider(provider);
    });

    this.on('changeAccount', () => {
      this.cToken?.setAccount(this.account);
      this.uToken?.setAccount(this.account);
    });
  }

  cTokenAddr?: string;
  uTokenAddr?: string;

  // related contracts
  cToken?: SYPoolCTokenContract;
  uToken?: SYPoolUTokenContract;

  async init() {
    try {
      const [
        cTokenAddr,
        uTokenAddr,
      ] = await this.batch([
        { method: 'cToken', },
        { method: 'uToken', },
      ]);

      this.cTokenAddr = cTokenAddr;
      this.uTokenAddr = uTokenAddr;

      this.emit('update');

      await this.loadRelatedContracts();
    } catch (e) {
      console.error('SYPoolContract', e);
    }
  }

  private async loadRelatedContracts() {
    if (this.cTokenAddr) {
      try {
        this.cToken = new SYPoolCTokenContract(this.cTokenAddr);
        this.cToken.on('update', () => {
          this.emit('update');
        });
        this.cToken.setProvider(this.currentProvider);
        this.cToken.setAccount(this.account);
        await this.cToken.init();
      } catch {
      }
    }

    if (this.uTokenAddr) {
      try {
        this.uToken = new SYPoolUTokenContract(this.uTokenAddr);
        this.uToken.on('update', () => {
          this.emit('update');
        });
        this.uToken.setPoolAddress(this.address);
        this.uToken.setProvider(this.currentProvider);
        this.uToken.setAccount(this.account);
        await this.uToken.init();
      } catch {
      }
    }
  }
}
