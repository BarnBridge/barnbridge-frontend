import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/contracts/erc20Contract';

// import Icon, { IconNames } from 'components/custom/icon';
import { MainnetHttpsWeb3Provider } from 'components/providers/eth-web3-provider';
import { useReload } from 'hooks/useReload';

export enum KnownTokens {
  ETH = 'ETH',
  BTC = 'BTC',
  WETH = 'WETH',
  WBTC = 'WBTC',
  REN_BTC = 'renBTC',
  BOND = 'BOND',
  USDC = 'USDC',
  DAI = 'DAI',
  SUSD = 'sUSD',
  bbcUSDC = 'bb_cUSDC',
  bbcDAI = 'bb_cDAI',
}

type TokenMeta = {
  symbol: KnownTokens;
  name: string;
  address: string;
  decimals: number;
  priceFeed?: string;
  pricePath?: KnownTokens[];
  price?: BigNumber;
  icon?: React.ReactNode;
};

const KNOWN_TOKENS: TokenMeta[] = [
  {
    address: '',
    symbol: KnownTokens.BTC,
    name: 'BTC',
    decimals: 0,
    priceFeed: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC -> $
    icon: 'token-wbtc',
  },
  {
    address: '0x',
    symbol: KnownTokens.ETH,
    name: 'Ether',
    decimals: 0,
    priceFeed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH -> $
    icon: 'token-eth',
  },
  {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    symbol: KnownTokens.WETH,
    name: 'Wrapped Ether',
    decimals: 18,
    pricePath: [KnownTokens.ETH],
    icon: 'token-weth',
  },
  {
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    symbol: KnownTokens.WBTC,
    name: 'Wrapped BTC',
    decimals: 8,
    pricePath: [KnownTokens.BTC],
    icon: 'token-wbtc',
  },
  {
    address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
    symbol: KnownTokens.REN_BTC,
    name: 'renBTC',
    decimals: 8,
    pricePath: [KnownTokens.BTC],
    icon: 'token-renbtc',
  },
  {
    address: '0x0391D2021f89DC339F60Fff84546EA23E337750f',
    symbol: KnownTokens.BOND,
    name: 'BarnBridge',
    decimals: 18,
    priceFeed: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244', // BOND -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-bond',
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: KnownTokens.USDC,
    name: 'USD Coin',
    decimals: 6,
    priceFeed: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // USDC -> $
    icon: 'token-usdc',
  },
  {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    symbol: KnownTokens.DAI,
    name: 'Dai Stablecoin',
    decimals: 18,
    priceFeed: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9', // DAI -> $
    icon: 'token-dai',
  },
  {
    address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    symbol: KnownTokens.SUSD,
    name: 'Synth sUSD',
    decimals: 18,
    priceFeed: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757', // sUSD -> ETH
    pricePath: [KnownTokens.ETH],
    icon: 'token-susd',
  },
  {
    address: '0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840',
    symbol: KnownTokens.bbcUSDC,
    name: 'BarnBridge cUSDC',
    decimals: 6,
    priceFeed: '0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840', // bbcUSDC -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-usdc',
  },
  {
    address: '0x673f9488619821aB4f4155FdFFe06f6139De518F',
    symbol: KnownTokens.bbcDAI,
    name: 'BarnBridge cDAI',
    decimals: 18,
    priceFeed: '0x673f9488619821aB4f4155FdFFe06f6139De518F', // bbcDAI -> USDC
    pricePath: [KnownTokens.DAI],
    icon: 'token-dai',
  },
];

export function getKnownTokens(): TokenMeta[] {
  return [...KNOWN_TOKENS];
}

type ContextType = {
  tokens: TokenMeta[];
  getTokenBySymbol(symbol: KnownTokens | string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenPriceIn(source: KnownTokens, target: KnownTokens): BigNumber | undefined;
  convertTokenIn(
    amount: BigNumber | undefined,
    source: KnownTokens | string,
    target: KnownTokens | string,
  ): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | undefined, source: KnownTokens | string): BigNumber | undefined;
};

const Context = createContext<ContextType>({
  tokens: [...KNOWN_TOKENS],
  getTokenBySymbol: () => undefined,
  getTokenByAddress: () => undefined,
  getTokenPriceIn: () => undefined,
  convertTokenIn: () => undefined,
  convertTokenInUSD: () => undefined,
});

export function useKnownTokens(): ContextType {
  return useContext<ContextType>(Context);
}

const PRICE_FEED_ABI: AbiItem[] = [
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'value', type: 'int8' }],
  },
  {
    name: 'latestAnswer',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'value', type: 'int256' }],
  },
];

const BOND_PRICE_FEED_ABI: AbiItem[] = [
  {
    name: 'decimals',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'value', type: 'int8' }],
  },
  {
    name: 'getReserves',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      { name: 'reserve1', type: 'uint112' },
      { name: 'reserve2', type: 'uint112' },
    ],
  },
];

const J_PRICE_FEED_ABI: AbiItem[] = [
  {
    name: 'price',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [{ name: 'value', type: 'uint256' }],
  },
];

export function getTokenBySymbol(symbol: KnownTokens | string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address === address);
}

async function getFeedPrice(symbol: KnownTokens): Promise<BigNumber> {
  const token = getTokenBySymbol(symbol);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const [decimals, latestAnswer] = await priceFeedContract.batch([{ method: 'decimals' }, { method: 'latestAnswer' }]);

  return new BigNumber(latestAnswer).dividedBy(10 ** decimals);
}

async function getBondPrice(): Promise<BigNumber> {
  const token = getTokenBySymbol(KnownTokens.BOND);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const [decimals, { reserve1, reserve2 }] = await priceFeedContract.batch([
    { method: 'decimals' },
    { method: 'getReserves' },
  ]);

  const bondReserve = new BigNumber(reserve1).dividedBy(10 ** decimals);
  const usdcReserve = new BigNumber(reserve2).dividedBy(1e6); // usdc decimals

  return usdcReserve.dividedBy(bondReserve);
}

async function getJTokenPrice(symbol: KnownTokens): Promise<BigNumber> {
  const token = getTokenBySymbol(symbol);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const price = await priceFeedContract.call('price');

  return new BigNumber(price).dividedBy(1e18);
}

export function getTokenPrice(symbol: KnownTokens): BigNumber | undefined {
  return getTokenBySymbol(symbol)?.price;
}

export function getTokenPriceIn(source: KnownTokens, target: KnownTokens): BigNumber | undefined {
  const sourcePrice = getTokenPrice(source);
  const targetPrice = getTokenPrice(target);

  if (!sourcePrice || !targetPrice) {
    return undefined;
  }

  return sourcePrice.dividedBy(targetPrice);
}

export function convertTokenIn(
  amount: BigNumber | number | undefined,
  source: KnownTokens | string,
  target: KnownTokens | string,
): BigNumber | undefined {
  if (!amount) {
    return undefined;
  }

  const bnAmount = new BigNumber(amount);

  if (source === target) {
    return bnAmount;
  }

  const price = getTokenPriceIn(source as KnownTokens, target as KnownTokens);

  if (!price) {
    return undefined;
  }

  return bnAmount.multipliedBy(price);
}

export function convertTokenInUSD(
  amount: BigNumber | number | undefined,
  source: KnownTokens | string,
): BigNumber | undefined {
  return convertTokenIn(amount, source, KnownTokens.USDC);
}

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const [reload] = useReload();

  React.useEffect(() => {
    (async () => {
      await Promise.allSettled(
        KNOWN_TOKENS.map(async token => {
          switch (token.symbol) {
            case KnownTokens.BOND:
              token.price = await getBondPrice();
              break;
            case KnownTokens.bbcUSDC:
            case KnownTokens.bbcDAI:
              token.price = await getJTokenPrice(token.symbol);
              break;
            default:
              token.price = await getFeedPrice(token.symbol);
              break;
          }
        }),
      );

      KNOWN_TOKENS.forEach(token => {
        if (token.pricePath) {
          for (let path of token.pricePath) {
            const tk = getTokenBySymbol(path);

            if (!tk || !tk.price) {
              token.price = undefined;
              break;
            }

            token.price = token.price?.multipliedBy(tk.price) ?? tk.price;
          }
        }

        reload();
      });
    })();
  }, []);

  const value = {
    tokens: [...KNOWN_TOKENS],
    getTokenBySymbol,
    getTokenByAddress,
    getTokenPriceIn,
    convertTokenIn,
    convertTokenInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default KnownTokensProvider;
