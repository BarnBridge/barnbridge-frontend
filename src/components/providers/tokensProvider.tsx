import { FC, createContext, useCallback, useContext, useEffect, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/token-icon';
import { useReload } from 'hooks/useReload';

import { MainnetHttpsWeb3Provider } from './web3Provider';

import { InvariantContext } from 'utils/context';
import { queryfy } from 'utils/fetch';

export enum Tokens {
  WBTC = 'WBTC',
  WETH = 'WETH',
  USDC = 'USDC',
  USDT = 'USDT',
  SUSD = 'sUSD',
  GUSD = 'GUSD',
  DAI = 'DAI',
  RAI = 'RAI',
  STK_AAVE = 'stkAAVE',
  WMATIC = 'WMATIC',
  BOND = 'BOND',
  UNIV2 = 'UNI-V2',
  BTC = 'BTC',
  USD = 'USD',
  XSUSHI = 'xSUSHI',
  LINK = 'LINK',
  UNI = 'UNI',
  FEI = 'FEI',
}

export type BaseTokenType = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: TokenIconNames;
};

export const WBTC: BaseTokenType = {
  address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  symbol: Tokens.WBTC,
  name: 'Wrapped BTC',
  decimals: 8,
  icon: 'wbtc',
};

export const WETH: BaseTokenType = {
  address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  symbol: Tokens.WETH,
  name: 'Wrapped Ether',
  decimals: 18,
  icon: 'weth',
};

export const USDC: BaseTokenType = {
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  symbol: Tokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  icon: 'usdc',
};

export const USDT: BaseTokenType = {
  address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  symbol: Tokens.USDT,
  name: 'Tether USD',
  decimals: 6,
  icon: 'usdt',
};

export const SUSD: BaseTokenType = {
  address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
  symbol: Tokens.SUSD,
  name: 'Synth sUSD',
  decimals: 18,
  icon: 'susd',
};

export const GUSD: BaseTokenType = {
  address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
  symbol: Tokens.GUSD,
  name: 'Gemini dollar',
  decimals: 2,
  icon: 'gusd',
};

export const DAI: BaseTokenType = {
  address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  symbol: Tokens.DAI,
  name: 'Dai Stablecoin',
  decimals: 18,
  icon: 'dai',
};

export const RAI: BaseTokenType = {
  address: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
  symbol: Tokens.RAI,
  name: 'Rai Reflex Index',
  decimals: 18,
  icon: 'rai',
};

export const STK_AAVE: BaseTokenType = {
  address: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
  symbol: Tokens.STK_AAVE,
  name: 'Staked Aave',
  decimals: 18,
  icon: 'stkaave',
};

export const MATIC: BaseTokenType = {
  address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  symbol: Tokens.WMATIC,
  name: 'Matic Token',
  decimals: 18,
  icon: 'wmatic',
};

export const BOND: BaseTokenType = {
  address: '0x0391d2021f89dc339f60fff84546ea23e337750f',
  symbol: Tokens.BOND,
  name: 'BarnBridge Governance Token',
  decimals: 18,
  icon: 'bond',
};

export const UNIV2: BaseTokenType = {
  address: '0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244',
  symbol: Tokens.UNIV2,
  name: 'Uniswap V2',
  decimals: 18,
  icon: 'uniswap',
};

export const XSUSHI: BaseTokenType = {
  address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
  symbol: Tokens.XSUSHI,
  name: 'xSUSHI',
  decimals: 18,
  icon: 'xsushi',
};

export const LINK: BaseTokenType = {
  address: '0x514910771af9ca656af840dff83e8264ecf986ca',
  symbol: Tokens.LINK,
  name: 'Chainlink',
  decimals: 18,
  icon: 'link',
};

export const UNI: BaseTokenType = {
  address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  symbol: Tokens.UNI,
  name: 'Uniswap',
  decimals: 18,
  icon: 'uni',
};

export const FEI: BaseTokenType = {
  address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
  symbol: Tokens.FEI,
  name: 'Fei Protocol',
  decimals: 18,
  icon: 'fei',
};

export const ProjectToken: BaseTokenType = BOND;

export type TokenType = BaseTokenType & {
  price?: BigNumber;
};

export type TokensContextType = {
  version: number;
  getToken(symbol?: string): TokenType | undefined;
  getAmountInUSD(amount: BigNumber | undefined, source: string | undefined): BigNumber | undefined;
};

const Context = createContext<TokensContextType>(InvariantContext('TokensProvider'));

export function useTokens(): TokensContextType {
  return useContext(Context);
}

const CHAINLINK_PRICE_FEED_ABI: AbiItem[] = [
  createAbiItem('decimals', [], ['int8']),
  createAbiItem('latestAnswer', [], ['int256']),
];

const UNISWAP_V2_BOND_USDC_ABI: AbiItem[] = [
  createAbiItem('totalSupply', [], ['uint256']),
  createAbiItem('getReserves', [], ['uint112', 'uint112']),
];

async function getChainlinkFeedPrice(feedAddress: string): Promise<BigNumber | undefined> {
  const contract = new Erc20Contract(CHAINLINK_PRICE_FEED_ABI, feedAddress);
  contract.setCallProvider(MainnetHttpsWeb3Provider);

  const [decimals, latestAnswer] = await contract.batch([
    { method: 'decimals', transform: Number },
    { method: 'latestAnswer', transform: BigNumber.from },
  ]);

  return latestAnswer?.unscaleBy(decimals);
}

async function getGusdPrice(): Promise<BigNumber | undefined> {
  const query = queryfy({
    ids: ['gemini-dollar'],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result['gemini-dollar'].usd);
}

async function getRaiPrice(): Promise<BigNumber | undefined> {
  const query = queryfy({
    ids: ['rai'],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result['rai'].usd);
}

async function getXSushiPrice(): Promise<BigNumber | undefined> {
  const query = queryfy({
    ids: ['xsushi'],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result['xsushi'].usd);
}

async function getBondPrice(poolAddress: string): Promise<BigNumber | undefined> {
  const contract = new Erc20Contract(UNISWAP_V2_BOND_USDC_ABI, poolAddress);
  contract.setCallProvider(MainnetHttpsWeb3Provider);

  const [[reserve0, reserve1]] = await contract.batch([
    {
      method: 'getReserves',
      transform: ({ 0: reserve0, 1: reserve1 }) => [BigNumber.from(reserve0), BigNumber.from(reserve1)],
    },
  ]);

  const bondReserve = reserve0.unscaleBy(18);
  const usdcReserve = reserve1.unscaleBy(6);

  return usdcReserve?.dividedBy(bondReserve);
}

async function getUniV2Price(poolAddress: string): Promise<BigNumber | undefined> {
  const contract = new Erc20Contract(UNISWAP_V2_BOND_USDC_ABI, poolAddress);
  contract.setCallProvider(MainnetHttpsWeb3Provider);

  const [reserve1, totalSupply] = await contract.batch([
    {
      method: 'getReserves',
      transform: ({ 1: reserve1 }) => BigNumber.from(reserve1),
    },
    { method: 'totalSupply', transform: BigNumber.from },
  ]);

  const usdcReserve = reserve1.unscaleBy(6);
  const supply = totalSupply.unscaleBy(18);

  return usdcReserve?.dividedBy(supply).multipliedBy(2);
}

async function getPriceFor(symbol: string): Promise<BigNumber | undefined> {
  switch (symbol) {
    case Tokens.WBTC:
      return getChainlinkFeedPrice('0xf4030086522a5beea4988f8ca5b36dbc97bee88c'); // Chainlink: BTC/USD
    case Tokens.WETH:
      return getChainlinkFeedPrice('0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'); // Chainlink: ETH/USD
    case Tokens.USDC:
      return getChainlinkFeedPrice('0x8fffffd4afb6115b954bd326cbe7b4ba576818f6'); // Chainlink: USDC/USD
    case Tokens.USDT:
      return getChainlinkFeedPrice('0x3e7d1eab13ad0104d2750b8863b489d65364e32d'); // Chainlink: USDT/USD
    case Tokens.SUSD:
      return getChainlinkFeedPrice('0xad35bd71b9afe6e4bdc266b345c198eadef9ad94'); // Chainlink: sUSD/USD
    case Tokens.DAI:
      return getChainlinkFeedPrice('0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9'); // Chainlink: DAI/USD
    case Tokens.STK_AAVE:
      return getChainlinkFeedPrice('0x547a514d5e3769680ce22b2361c10ea13619e8a9'); // Chainlink: STK_AAVE/USD
    case Tokens.WMATIC:
      return getChainlinkFeedPrice('0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676'); // Chainlink: MATIC/USD
    case Tokens.LINK:
      return getChainlinkFeedPrice('0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c'); // Chainlink: LINK/USD
    case Tokens.UNI:
      return getChainlinkFeedPrice('0x553303d460EE0afB37EdFf9bE42922D8FF63220e'); // Chainlink: UNI/USD
    case Tokens.FEI:
      return getChainlinkFeedPrice('0x31e0a88fecB6eC0a411DBe0e9E76391498296EE9'); // Chainlink: FEI/USD
    case Tokens.GUSD:
      return getGusdPrice(); // Coingecko API: GUSD/USD
    case Tokens.RAI:
      return getRaiPrice(); // Coingecko API: RAI/USD
    case Tokens.XSUSHI:
      return getXSushiPrice(); // Coingecko API: XSUSHI/USD
    case Tokens.BOND:
      return getBondPrice('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244'); // UNISWAP V2: BOND/USDC
    case Tokens.UNIV2:
      return getUniV2Price('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244'); // UNISWAP V2: BOND/USDC
    default:
      return undefined;
  }
}

const ALL_TOKENS: BaseTokenType[] = [
  WBTC,
  WETH,
  USDC,
  USDT,
  SUSD,
  GUSD,
  DAI,
  RAI,
  STK_AAVE,
  MATIC,
  BOND,
  UNIV2,
  XSUSHI,
  LINK,
  UNI,
  FEI,
];

const TokensProvider: FC = props => {
  const { children } = props;

  const [reload, version] = useReload();
  const tokensRef = useRef<Map<string, TokenType>>(new Map());

  useEffect(() => {
    const promises = ALL_TOKENS.map(async token => {
      try {
        const newToken: TokenType = {
          ...token,
        };

        tokensRef.current.set(newToken.symbol, newToken);
        newToken.price = await getPriceFor(token.symbol);
        reload();
      } catch (e) {
        console.error(e);
      }
    });

    (async () => {
      await Promise.all(promises);

      const usdcToken = tokensRef.current.get(Tokens.USDC);

      if (usdcToken && usdcToken.price) {
        const usdcPrice = usdcToken.price;

        // convert USDC -> USD
        [Tokens.BOND, Tokens.UNIV2].forEach(symbol => {
          const token = tokensRef.current.get(symbol);

          if (token) {
            token.price = token.price?.multipliedBy(usdcPrice);
          }
        });
      }

      Array.from(tokensRef.current).forEach(([k, t]) => {
        console.log(`[New Token Price] ${t.symbol} = $${t.price?.toFixed(3)}`);
      });
    })();
  }, []);

  const getToken = useCallback((symbol: string | undefined): TokenType | undefined => {
    return symbol ? tokensRef.current.get(symbol) : undefined;
  }, []);

  const getAmountInUSD = useCallback(
    (amount: BigNumber | undefined, source: string | undefined): BigNumber | undefined => {
      if (!amount || !source) {
        return undefined;
      }

      const token = getToken(source);

      if (!token || !token.price) {
        return undefined;
      }

      return amount.multipliedBy(token.price);
    },
    [],
  );

  const value: TokensContextType = {
    version,
    getToken,
    getAmountInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default TokensProvider;

type AssetType = {
  icon: TokenIconNames;
  decimals: number;
};

export function getAsset(symbol: string): AssetType | null {
  switch (symbol) {
    case 'BTC':
      return {
        icon: 'wbtc',
        decimals: WBTC.decimals,
      };
    case 'ETH':
      return {
        icon: 'eth',
        decimals: WETH.decimals,
      };
    case 'USD':
      return {
        icon: 'usd',
        decimals: 2,
      };
    default:
      return null;
  }
}

export function isEthAsset(symbol: string) {
  return symbol.toUpperCase() === 'ETH';
}

export function isUsdAsset(symbol: string) {
  return symbol.toUpperCase() === 'USD';
}
