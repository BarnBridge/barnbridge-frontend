import Web3Contract, { createAbiItem } from 'web3/web3Contract';

class FauceteerContract extends Web3Contract {
  constructor(address: string) {
    super(
      [
        // send
        createAbiItem('drip', ['address'], []),
      ],
      address,
      'FauceteerFactory',
    );
  }

  drip(address: string): Promise<void> {
    return this.send('drip', [address]);
  }
}

export default FauceteerContract;
