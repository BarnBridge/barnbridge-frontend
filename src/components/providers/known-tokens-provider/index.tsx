import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/contracts/erc20Contract';
import Web3Contract, { createAbiItem } from 'web3/contracts/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import { MainnetHttpsWeb3Provider } from 'components/providers/eth-web3-provider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

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
  UNIV2 = 'UNI V2',
}

/* eslint-disable @typescript-eslint/no-redeclare */
export namespace KnownTokens {
  const isProduction = process.env.NODE_ENV === 'production';

  export const bbcUSDC = isProduction ? 'bb_cUSDC' : 'bbcUSDC';
  export const bbcDAI = isProduction ? 'bb_cDAI' : 'bbcDAI';
}
/* eslint-enable @typescript-eslint/no-redeclare */

export type TokenMeta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  priceFeed?: string;
  pricePath?: KnownTokens[];
  price?: BigNumber;
  icon?: TokenIconNames;
  contract?: Web3Contract;
};

export const BondToken: TokenMeta = {
  address: String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase(),
  symbol: KnownTokens.BOND,
  name: 'BarnBridge',
  decimals: 18,
  priceFeed: String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase(), // BOND -> USDC
  pricePath: [KnownTokens.USDC],
  icon: 'static/token-bond',
  contract: new Erc20Contract([], String(process.env.REACT_APP_CONTRACT_BOND_ADDR).toLowerCase()),
};

export const UsdcToken: TokenMeta = {
  address: String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase(),
  symbol: KnownTokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  priceFeed: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // USDC -> $
  icon: 'token-usdc',
  contract: new Erc20Contract([], String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase()),
};

export const DaiToken: TokenMeta = {
  address: String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase(),
  symbol: KnownTokens.DAI,
  name: 'Dai Stablecoin',
  decimals: 18,
  priceFeed: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9', // DAI -> $
  icon: 'token-dai',
  contract: new Erc20Contract([], String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase()),
};

export const SusdToken: TokenMeta = {
  address: String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase(),
  symbol: KnownTokens.SUSD,
  name: 'Synth sUSD',
  decimals: 18,
  priceFeed: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757', // sUSD -> ETH
  pricePath: [KnownTokens.ETH],
  icon: 'token-susd',
  contract: new Erc20Contract([], String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase()),
};

export const UniV2Token: TokenMeta = {
  address: String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase(),
  symbol: KnownTokens.UNIV2,
  name: 'Uniswap V2',
  decimals: 18,
  priceFeed: String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase(), // UNIV2 -> USDC
  pricePath: [KnownTokens.USDC],
  icon: 'token-uniswap',
  contract: new Erc20Contract([], String(process.env.REACT_APP_CONTRACT_UNISWAP_V2_ADDR).toLowerCase()),
};

const KNOWN_TOKENS: TokenMeta[] = [
  {
    address: '0x',
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
  BondToken,
  UsdcToken,
  DaiToken,
  SusdToken,
  UniV2Token,
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
    priceFeed: '0x673f9488619821aB4f4155FdFFe06f6139De518F', // bbcDAI -> DAI
    pricePath: [KnownTokens.DAI],
    icon: 'token-dai',
  },
];

export function getKnownTokens(): TokenMeta[] {
  return [...KNOWN_TOKENS];
}

type ContextType = {
  tokens: TokenMeta[];
  getTokenBySymbol(symbol: string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenPriceIn(source: string, target: string): BigNumber | undefined;
  convertTokenIn(amount: BigNumber | undefined, source: string, target: string): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | undefined, source: string): BigNumber | undefined;
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
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('latestAnswer', [], ['int256']),
];

const BOND_PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
  createAbiItem('token0', [], ['address']),
];

const J_PRICE_FEED_ABI: AbiItem[] = [createAbiItem('price', [], ['uint256'])];

export function getTokenBySymbol(symbol: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
}

async function getFeedPrice(symbol: string): Promise<BigNumber> {
  const token = getTokenBySymbol(symbol);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const [decimals, latestAnswer] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'latestAnswer', transform: BigNumber.parse },
  ]);

  return latestAnswer.unscaleBy(decimals)!;
}

async function getBondPrice(): Promise<BigNumber> {
  const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  const bondToken = getTokenBySymbol(KnownTokens.BOND);

  if (!usdcToken || !bondToken || !bondToken.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, bondToken.priceFeed);

  const [decimals, [reserve0, reserve1], token0] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    {
      method: 'getReserves',
      transform: ({ 0: reserve0, 1: reserve1 }) => [BigNumber.parse(reserve0), BigNumber.parse(reserve1)],
    },
    { method: 'token0', transform: value => value.toLowerCase() },
  ]);

  const bond = token0 === bondToken.address.toLowerCase() ? reserve0 : reserve1;
  const usdc = token0 === bondToken.address.toLowerCase() ? reserve1 : reserve0;

  const bondReserve = bond.unscaleBy(decimals)!;
  const usdcReserve = usdc.unscaleBy(usdcToken.decimals)!;

  return usdcReserve.dividedBy(bondReserve);
}

async function getUniV2Price(): Promise<BigNumber> {
  const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  const univ2Token = getTokenBySymbol(KnownTokens.UNIV2);

  if (!usdcToken || !univ2Token || !univ2Token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, univ2Token.priceFeed);

  const [decimals, totalSupply, [reserve0, reserve1], token0] = await priceFeedContract.batch([
    { method: 'decimals', transform: Number },
    { method: 'totalSupply', transform: BigNumber.parse },
    {
      method: 'getReserves',
      transform: ({ 0: reserve0, 1: reserve1 }) => [BigNumber.parse(reserve0), BigNumber.parse(reserve1)],
    },
    { method: 'token0', transform: value => value.toLowerCase() },
  ]);

  const usdcAmount = token0 === usdcToken.address.toLowerCase() ? reserve0 : reserve1;
  const usdcReserve = usdcAmount.unscaleBy(usdcToken.decimals)!;
  const supply = totalSupply.unscaleBy(decimals)!;

  return usdcReserve.dividedBy(supply).multipliedBy(2);
}

async function getJTokenPrice(symbol: string): Promise<BigNumber> {
  const token = getTokenBySymbol(symbol);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed);
  priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

  const price = await priceFeedContract.call('price');

  return new BigNumber(price).dividedBy(1e18);
}

export function getTokenPrice(symbol: string): BigNumber | undefined {
  return getTokenBySymbol(symbol)?.price;
}

export function getTokenPriceIn(source: string, target: string): BigNumber | undefined {
  const sourcePrice = getTokenPrice(source);
  const targetPrice = getTokenPrice(target);

  if (!sourcePrice || !targetPrice) {
    return undefined;
  }

  return sourcePrice.dividedBy(targetPrice);
}

export function convertTokenIn(
  amount: BigNumber | number | undefined,
  source: string,
  target: string,
): BigNumber | undefined {
  if (amount === undefined || amount === null) {
    return undefined;
  }

  if (amount === 0 || BigNumber.ZERO.eq(amount)) {
    return BigNumber.ZERO;
  }

  const bnAmount = new BigNumber(amount);

  if (bnAmount.isNaN()) {
    return undefined;
  }

  if (source === target) {
    return bnAmount;
  }

  const price = getTokenPriceIn(source, target);

  if (!price) {
    return undefined;
  }

  return bnAmount.multipliedBy(price);
}

export function convertTokenInUSD(amount: BigNumber | number | undefined, source: string): BigNumber | undefined {
  return convertTokenIn(amount, source, KnownTokens.USDC);
}

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const wallet = useWallet();
  const [reload] = useReload();

  React.useEffect(() => {
    (async () => {
      await Promise.allSettled(
        KNOWN_TOKENS.map(async token => {
          switch (token.symbol) {
            case KnownTokens.BOND:
              token.price = await getBondPrice();
              break;
            case KnownTokens.UNIV2:
              token.price = await getUniV2Price();
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

  React.useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setProvider(wallet.provider);
    });
  }, [wallet.provider]);

  React.useEffect(() => {
    KNOWN_TOKENS.forEach(token => {
      token.contract?.setAccount(wallet.account);
    });

    // load bonds balance for connected wallet
    if (wallet.account) {
      (BondToken.contract as Erc20Contract).loadBalance();
    }
  }, [wallet.account]);

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
