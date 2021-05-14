import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import { formatUSD } from 'web3/utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import { MainnetHttpsWeb3Provider } from 'components/providers/eth-web3-provider';
import config from 'config';
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
  UNIV2 = 'UNI-V2',
  USDT = 'USDT',
}

/* eslint-disable @typescript-eslint/no-redeclare */
export namespace KnownTokens {
  export const bbcUSDC = config.isDev ? 'bbcUSDC' : 'bb_cUSDC';
  export const bbcDAI = config.isDev ? 'bbcDAI' : 'bb_cDAI';
}
/* eslint-enable @typescript-eslint/no-redeclare */

export type TokenMeta = {
  address: string;
  symbol: string;
  name: string;
  icon?: TokenIconNames;
  decimals: number;
  priceFeed?: string;
  pricePath?: KnownTokens[];
  price?: BigNumber;
  contract?: Web3Contract;
};

export const BtcToken: TokenMeta = {
  address: '0x',
  symbol: KnownTokens.BTC,
  name: 'BTC',
  icon: 'token-wbtc',
  decimals: 0,
  priceFeed: config.feeds.btc, // BTC -> $
};

export const WBtcToken: TokenMeta = {
  address: config.tokens.wBtc,
  symbol: KnownTokens.WBTC,
  name: 'Wrapped BTC',
  icon: 'token-wbtc',
  decimals: 8,
  pricePath: [KnownTokens.BTC],
};

export const RenBtcToken: TokenMeta = {
  address: config.tokens.renBtc,
  symbol: KnownTokens.REN_BTC,
  name: 'renBTC',
  icon: 'token-renbtc',
  decimals: 8,
  pricePath: [KnownTokens.BTC],
};

export const EthToken: TokenMeta = {
  address: '0x',
  symbol: KnownTokens.ETH,
  name: 'Ether',
  icon: 'token-eth',
  decimals: 18,
  priceFeed: config.feeds.eth, // ETH -> $
};

export const WEthToken: TokenMeta = {
  address: config.tokens.wEth,
  symbol: KnownTokens.WETH,
  name: 'Wrapped Ether',
  icon: 'token-weth',
  decimals: 18,
  pricePath: [KnownTokens.ETH],
};

export const UsdcToken: TokenMeta = {
  address: config.tokens.usdc,
  symbol: KnownTokens.USDC,
  name: 'USD Coin',
  icon: 'token-usdc',
  decimals: 6,
  priceFeed: config.feeds.usdc, // USDC -> $
  contract: new Erc20Contract([], config.tokens.usdc),
};

export const BondToken: TokenMeta = {
  address: config.tokens.bond,
  symbol: KnownTokens.BOND,
  name: 'BarnBridge',
  icon: 'static/token-bond',
  decimals: 18,
  priceFeed: config.feeds.bond, // BOND -> USDC
  pricePath: [KnownTokens.USDC],
  contract: new Erc20Contract([], config.tokens.bond),
};

export const UsdtToken: TokenMeta = {
  address: config.tokens.usdt,
  symbol: KnownTokens.USDT,
  name: 'Tether USD',
  icon: 'token-usdt',
  decimals: 6,
  priceFeed: config.feeds.usdt, // USDT -> $
};

export const DaiToken: TokenMeta = {
  address: config.tokens.dai,
  symbol: KnownTokens.DAI,
  name: 'Dai Stablecoin',
  icon: 'token-dai',
  decimals: 18,
  priceFeed: config.feeds.dai, // DAI -> $
  contract: new Erc20Contract([], config.tokens.dai),
};

export const SusdToken: TokenMeta = {
  address: config.tokens.susd,
  symbol: KnownTokens.SUSD,
  name: 'Synth sUSD',
  icon: 'token-susd',
  decimals: 18,
  priceFeed: config.feeds.susd, // sUSD -> ETH
  pricePath: [KnownTokens.ETH],
  contract: new Erc20Contract([], config.tokens.susd),
};

export const UniV2Token: TokenMeta = {
  address: config.tokens.univ2,
  symbol: KnownTokens.UNIV2,
  name: 'Uniswap V2',
  icon: 'static/token-uniswap',
  decimals: 18,
  priceFeed: config.feeds.univ2, // UNIV2 -> USDC
  pricePath: [KnownTokens.USDC],
  contract: new Erc20Contract([], config.tokens.univ2),
};

export const BBcUsdcToken: TokenMeta = {
  address: config.tokens.bbcUsdc,
  symbol: KnownTokens.bbcUSDC,
  name: 'BarnBridge cUSDC',
  icon: 'token-usdc',
  decimals: 6,
  priceFeed: config.feeds.bbcUsdc, // bbcUSDC -> USDC
  pricePath: [KnownTokens.USDC],
};

export const BBcDaiToken: TokenMeta = {
  address: config.tokens.bbcDai,
  symbol: KnownTokens.bbcDAI,
  name: 'BarnBridge cDAI',
  icon: 'token-dai',
  decimals: 18,
  priceFeed: config.feeds.bbcDai, // bbcDAI -> DAI
  pricePath: [KnownTokens.DAI],
};

const KNOWN_TOKENS: TokenMeta[] = [
  BtcToken,
  WBtcToken,
  RenBtcToken,
  EthToken,
  WEthToken,
  UsdcToken,
  BondToken,
  UsdtToken,
  DaiToken,
  SusdToken,
  UniV2Token,
  BBcUsdcToken,
  BBcDaiToken,
];

(window as any).KNOWN_TOKENS = KNOWN_TOKENS;

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
  createAbiItem('decimals', [], ['uint8']),
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
  try {
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
  } catch (e) {
    console.log(e);
    return BigNumber.ZERO;
  }
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
    (BondToken.contract as Erc20Contract).loadCommon().catch(Error);

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
        if (token.priceFeed && token.price === undefined) {
          token.price = BigNumber.ZERO;
        } else if (token.pricePath) {
          for (let path of token.pricePath) {
            const tk = getTokenBySymbol(path);

            if (!tk || !tk.price) {
              token.price = undefined;
              break;
            }

            token.price = token.price?.multipliedBy(tk.price) ?? tk.price;
          }
        }

        console.log(`[Token Price] ${token.symbol} = ${formatUSD(token.price)}`);
      });

      reload();
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
      (BondToken.contract as Erc20Contract).loadBalance().then(reload).catch(Error);
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
