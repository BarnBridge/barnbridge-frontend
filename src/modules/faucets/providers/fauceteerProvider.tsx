import { createContext, useContext, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { BondToken, DaiToken, EthToken, UsdcToken, UsdtToken } from 'components/providers/known-tokens-provider';
import config from 'config';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

interface IFauceteer {
  drip(address: string, decimals?: number): Promise<void>;
}

class CompFauceteerContract extends Web3Contract implements IFauceteer {
  constructor(address: string) {
    super(
      [
        // send
        createAbiItem('drip', ['address'], []),
      ],
      address,
      '',
    );
  }

  drip(address: string): Promise<void> {
    return this.send('drip', [address]);
  }
}

class AaveFauceteerContract extends Web3Contract implements IFauceteer {
  constructor(address: string) {
    super([createAbiItem('mint', ['address', 'uint256'], [])], address, '');
  }

  drip(faucetAddress: string, decimals: number = 18) {
    return this.send('mint', [faucetAddress, new BigNumber(1).scaleBy(decimals)]);
  }
}

const compFauceteerContract = new CompFauceteerContract(config.contracts.testnet.comp.fauceteer);
const aaveFauceteerContract = new AaveFauceteerContract(config.contracts.testnet.aave.fauceteer);

export type FaucetType = {
  name: string;
  icon: string;
  decimals: number;
  label?: string;
  link?: {
    url: string;
    label: string;
  };
  fauceteer?: IFauceteer;
  markets?: {
    name: string;
    icon: string;
  }[];
  token?: Erc20Contract;
};

export const FAUCETS: FaucetType[] = [
  {
    name: 'kETH',
    icon: EthToken.icon!,
    decimals: EthToken.decimals,
    label: 'Kovan Ether',
    link: { url: 'https://github.com/kovan-testnet/faucet', label: 'Faucets' },
  },
  {
    name: BondToken.symbol,
    icon: BondToken.icon!,
    decimals: BondToken.decimals,
    link: {
      url: `https://app.uniswap.org/#/swap?use=V2&outputCurrency=${config.contracts.testnet.bond}`,
      label: 'Swap',
    },
    token: new Erc20Contract([], config.contracts.testnet.bond),
  },
  {
    name: UsdcToken.symbol,
    icon: UsdcToken.icon!,
    decimals: UsdcToken.decimals,
    markets: [
      {
        name: 'Compound',
        icon: 'compound',
      },
      {
        name: 'C.R.E.A.M.',
        icon: 'cream_finance',
      },
    ],
    fauceteer: compFauceteerContract,
    token: new Erc20Contract([], config.contracts.testnet.comp.usdc),
  },
  {
    name: DaiToken.symbol,
    icon: DaiToken.icon!,
    decimals: DaiToken.decimals,
    markets: [
      {
        name: 'Compound',
        icon: 'compound',
      },
      {
        name: 'C.R.E.A.M.',
        icon: 'cream_finance',
      },
    ],
    fauceteer: compFauceteerContract,
    token: new Erc20Contract([], config.contracts.testnet.comp.dai),
  },
  {
    name: UsdcToken.symbol,
    icon: UsdcToken.icon!,
    decimals: UsdcToken.decimals,
    markets: [
      {
        name: 'AAVE',
        icon: 'static/aave',
      },
    ],
    fauceteer: aaveFauceteerContract,
    token: new Erc20Contract([], config.contracts.testnet.aave.usdc),
  },
  {
    name: UsdtToken.symbol,
    icon: UsdtToken.icon!,
    decimals: UsdtToken.decimals,
    markets: [
      {
        name: 'AAVE',
        icon: 'static/aave',
      },
    ],
    fauceteer: aaveFauceteerContract,
    token: new Erc20Contract([], config.contracts.testnet.aave.usdt),
  },
  {
    name: DaiToken.symbol,
    icon: DaiToken.icon!,
    decimals: DaiToken.decimals,
    markets: [
      {
        name: 'AAVE',
        icon: 'static/aave',
      },
    ],
    fauceteer: aaveFauceteerContract,
    token: new Erc20Contract([], config.contracts.testnet.aave.dai),
  },
];

type FauceteerContextType = {
  compFauceteerContract?: CompFauceteerContract;
  aaveFauceteerContract?: AaveFauceteerContract;
  faucets: FaucetType[];
};

const Context = createContext<FauceteerContextType>({
  compFauceteerContract: undefined,
  aaveFauceteerContract: undefined,
  faucets: [],
});

export function useFauceteer(): FauceteerContextType {
  return useContext(Context);
}

export const FauceteerProvider: React.FC = props => {
  const { children } = props;
  const [reload] = useReload();
  const walletCtx = useWallet();

  useEffect(() => {
    FAUCETS.forEach(faucet => {
      faucet.token?.on(Web3Contract.UPDATE_DATA, reload);
    });
  }, [reload]);

  useEffect(() => {
    compFauceteerContract.setProvider(walletCtx.provider);
    aaveFauceteerContract.setProvider(walletCtx.provider);

    FAUCETS.forEach(faucet => {
      faucet.token?.setProvider(walletCtx.provider);
    });
  }, [walletCtx.provider]);

  useEffect(() => {
    compFauceteerContract.setAccount(walletCtx.account);
    aaveFauceteerContract.setAccount(walletCtx.account);

    FAUCETS.forEach(faucet => {
      faucet.token?.setAccount(walletCtx.account);

      if (walletCtx.isActive) {
        faucet.token?.loadBalance().catch(Error);
      }
    });
  }, [walletCtx.isActive, walletCtx.account]);

  const value = {
    compFauceteerContract,
    aaveFauceteerContract,
    faucets: FAUCETS,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
