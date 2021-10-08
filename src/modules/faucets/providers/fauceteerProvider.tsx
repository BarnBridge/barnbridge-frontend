import { FC, createContext, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useContractManager, useErc20Contract } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { useConfig } from 'components/providers/configProvider';
import { Tokens, useTokens } from 'components/providers/tokensProvider';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

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

export function useCompFauceteerContract(): CompFauceteerContract {
  const config = useConfig();
  const address = config.contracts.faucets?.compFauceteer!;
  return useContractManager().getContract<CompFauceteerContract>(address, () => new CompFauceteerContract(address));
}

class AaveFauceteerContract extends Web3Contract implements IFauceteer {
  constructor(address: string) {
    super([createAbiItem('mint', ['address', 'uint256'], [])], address, '');
  }

  drip(faucetAddress: string, decimals: number = 18) {
    return this.send('mint', [faucetAddress, new BigNumber(10_000).scaleBy(decimals)]);
  }
}

export function useAaveFauceteerContract(): AaveFauceteerContract {
  const config = useConfig();
  const address = config.contracts.faucets?.aaveFauceteer!;
  return useContractManager().getContract<AaveFauceteerContract>(address, () => new AaveFauceteerContract(address));
}

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

type FauceteerContextType = {
  compFauceteerContract: CompFauceteerContract;
  aaveFauceteerContract: AaveFauceteerContract;
  faucets: FaucetType[];
};

const Context = createContext<FauceteerContextType>(InvariantContext('FauceteerProvider'));

export function useFauceteer(): FauceteerContextType {
  return useContext(Context);
}

export const FauceteerProvider: FC = props => {
  const { children } = props;
  const config = useConfig();
  const walletCtx = useWallet();
  const { getToken } = useTokens();

  const compFauceteerContract = useCompFauceteerContract();
  const aaveFauceteerContract = useAaveFauceteerContract();
  const compUsdcFaucet = useErc20Contract(config.contracts.faucets?.compUsdc!);
  const compDaiFaucet = useErc20Contract(config.contracts.faucets?.compDai!);
  const aaveUsdcFaucet = useErc20Contract(config.contracts.faucets?.aaveUsdc!);
  const aaveUsdtFaucet = useErc20Contract(config.contracts.faucets?.aaveUsdt!);
  const aaveDaiFaucet = useErc20Contract(config.contracts.faucets?.aaveDai!);
  const bondContract = useErc20Contract('0xc40a66AFB908789341A58B8423F89fE2cb7Dc1f9');

  const faucets = useMemo<FaucetType[]>(() => {
    const ethToken = getToken(Tokens.WETH);
    const usdcToken = getToken(Tokens.USDC);
    const usdtToken = getToken(Tokens.USDT);
    const daiToken = getToken(Tokens.DAI);
    const bondToken = getToken(Tokens.BOND);

    return [
      {
        name: 'kETH',
        icon: ethToken?.icon,
        decimals: ethToken?.decimals,
        label: 'Kovan Ether',
        link: { url: 'https://github.com/kovan-testnet/faucet', label: 'Faucets' },
      },
      {
        name: bondToken?.symbol,
        icon: bondToken?.icon,
        decimals: bondToken?.decimals,
        link: {
          url: `https://app.uniswap.org/#/swap?use=V2&outputCurrency=${bondContract?.address}`,
          label: 'Swap',
        },
        token: bondContract,
      },
      ...(usdcToken
        ? [
            {
              name: usdcToken.symbol,
              icon: usdcToken.icon,
              decimals: usdcToken.decimals,
              markets: [
                {
                  name: 'Compound',
                  icon: 'compound',
                },
                {
                  name: 'C.R.E.A.M.',
                  icon: 'cream',
                },
              ],
              fauceteer: compFauceteerContract,
              token: compUsdcFaucet,
            },
          ]
        : []),
      ...(daiToken
        ? [
            {
              name: daiToken.symbol,
              icon: daiToken.icon,
              decimals: daiToken.decimals,
              markets: [
                {
                  name: 'Compound',
                  icon: 'compound',
                },
                {
                  name: 'C.R.E.A.M.',
                  icon: 'cream',
                },
              ],
              fauceteer: compFauceteerContract,
              token: compDaiFaucet,
            },
          ]
        : []),
      ...(usdcToken
        ? [
            {
              name: usdcToken.symbol,
              icon: usdcToken.icon,
              decimals: usdcToken.decimals,
              markets: [
                {
                  name: 'AAVE',
                  icon: 'aave',
                },
              ],
              fauceteer: aaveFauceteerContract,
              token: aaveUsdcFaucet,
            },
          ]
        : []),
      ...(usdtToken
        ? [
            {
              name: usdtToken.symbol,
              icon: usdtToken.icon,
              decimals: usdtToken.decimals,
              markets: [
                {
                  name: 'AAVE',
                  icon: 'aave',
                },
              ],
              fauceteer: aaveFauceteerContract,
              token: aaveUsdtFaucet,
            },
          ]
        : []),
      ...(daiToken
        ? [
            {
              name: daiToken.symbol,
              icon: daiToken.icon,
              decimals: daiToken.decimals,
              markets: [
                {
                  name: 'AAVE',
                  icon: 'aave',
                },
              ],
              fauceteer: aaveFauceteerContract,
              token: aaveDaiFaucet,
            },
          ]
        : []),
    ] as FaucetType[];
  }, []);

  useEffect(() => {
    if (walletCtx.account) {
      faucets.forEach(faucet => {
        faucet.token?.loadBalance().catch(Error);
      });
    }
  }, [faucets, walletCtx.account]);

  const value = {
    compFauceteerContract,
    aaveFauceteerContract,
    faucets,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
