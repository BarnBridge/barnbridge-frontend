import { FC, createContext, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { useContractManager, useErc20Contract } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { useConfig } from 'components/providers/configProvider';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
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
  const knownTokens = useKnownTokens();

  const compFauceteerContract = useCompFauceteerContract();
  const aaveFauceteerContract = useAaveFauceteerContract();
  const compUsdcFaucet = useErc20Contract(config.contracts.faucets?.compUsdc!);
  const compDaiFaucet = useErc20Contract(config.contracts.faucets?.compDai!);
  const aaveUsdcFaucet = useErc20Contract(config.contracts.faucets?.aaveUsdc!);
  const aaveUsdtFaucet = useErc20Contract(config.contracts.faucets?.aaveUsdt!);
  const aaveDaiFaucet = useErc20Contract(config.contracts.faucets?.aaveDai!);

  const faucets = useMemo<FaucetType[]>(() => {
    const ethToken = knownTokens.getTokenBySymbol(KnownTokens.ETH);
    const bondToken = knownTokens.getTokenBySymbol(KnownTokens.BOND);
    const usdcToken = knownTokens.getTokenBySymbol(KnownTokens.USDC);
    const usdtToken = knownTokens.getTokenBySymbol(KnownTokens.USDT);
    const daiToken = knownTokens.getTokenBySymbol(KnownTokens.DAI);

    return [
      {
        name: 'kETH',
        icon: ethToken?.icon,
        decimals: ethToken?.decimals,
        label: 'Kovan Ether',
        link: { url: 'https://github.com/kovan-testnet/faucet', label: 'Faucets' },
      },
      ...(bondToken
        ? [
            {
              name: bondToken.symbol,
              icon: bondToken.icon,
              decimals: bondToken.decimals,
              link: {
                url: `https://app.uniswap.org/#/swap?use=V2&outputCurrency=${bondToken.address}`,
                label: 'Swap',
              },
              token: bondToken.contract,
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
                  name: 'Compound',
                  icon: 'compound',
                },
                {
                  name: 'C.R.E.A.M.',
                  icon: 'cream_finance',
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
                  icon: 'cream_finance',
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
                  icon: 'static/aave',
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
                  icon: 'static/aave',
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
                  icon: 'static/aave',
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
    faucets.forEach(faucet => {
      if (walletCtx.isActive) {
        faucet.token?.loadBalance().catch(Error);
      }
    });
  }, [faucets, walletCtx.isActive]);

  const value = {
    compFauceteerContract,
    aaveFauceteerContract,
    faucets,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
