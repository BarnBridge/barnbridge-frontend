import { FC, createContext, useCallback, useContext, useEffect, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/erc20Contract';
import { createAbiItem } from 'web3/web3Contract';

import { useNetwork } from 'components/providers/networkProvider';
import { TokenIconNames } from 'components/token-icon';
import { useReload } from 'hooks/useReload';
import { ArbitrumNetwork } from 'networks/arbitrum';
import { ArbitrumTestnetNetwork } from 'networks/arbitrum-testnet';
import { AvalancheNetwork } from 'networks/avalanche';
import { AvalancheTestnetNetwork } from 'networks/avalanche-testnet';
import { BinanceNetwork } from 'networks/binance';
import { BinanceTestnetNetwork } from 'networks/binance-testnet';
import { KovanNetwork } from 'networks/kovan';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { TestnetNetwork } from 'networks/testnet';

import {
  ArbitrumHttpsWeb3Provider,
  AvalancheHttpsWeb3Provider,
  BinanceHttpsWeb3Provider,
  MainnetHttpsWeb3Provider,
  PolygonHttpsWeb3Provider,
} from './web3Provider';

import { InvariantContext } from 'utils/context';
import { queryfy } from 'utils/fetch';

import { Web3Network } from 'networks/types';

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
  WAVAX = 'WAVAX',
  BOND = 'BOND',
  UNIV2 = 'UNI-V2',
  BTC = 'BTC',
  USD = 'USD',
  XSUSHI = 'xSUSHI',
  SUSHI = 'SUSHI',
  LINK = 'LINK',
  UNI = 'UNI',
  FEI = 'FEI',
  BNB = 'BNB',
  CAKE = 'CAKE',
  AAVE = 'AAVE',
  DPI = 'DPI',
}

export type BaseTokenType = {
  // address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: TokenIconNames;
};

const WBTC: BaseTokenType = {
  // address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  symbol: Tokens.WBTC,
  name: 'Wrapped BTC',
  decimals: 8,
  icon: 'wbtc',
};

const WETH: BaseTokenType = {
  // address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  symbol: Tokens.WETH,
  name: 'Wrapped Ether',
  decimals: 18,
  icon: 'weth',
};

const USDC: BaseTokenType = {
  // address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  symbol: Tokens.USDC,
  name: 'USD Coin',
  decimals: 6,
  icon: 'usdc',
};

const USDT: BaseTokenType = {
  // address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  symbol: Tokens.USDT,
  name: 'Tether USD',
  decimals: 6,
  icon: 'usdt',
};

const SUSD: BaseTokenType = {
  // address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
  symbol: Tokens.SUSD,
  name: 'Synth sUSD',
  decimals: 18,
  icon: 'susd',
};

const GUSD: BaseTokenType = {
  // address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
  symbol: Tokens.GUSD,
  name: 'Gemini dollar',
  decimals: 2,
  icon: 'gusd',
};

const DAI: BaseTokenType = {
  // address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  symbol: Tokens.DAI,
  name: 'Dai Stablecoin',
  decimals: 18,
  icon: 'dai',
};

const RAI: BaseTokenType = {
  // address: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
  symbol: Tokens.RAI,
  name: 'Rai Reflex Index',
  decimals: 18,
  icon: 'rai',
};

const AAVE: BaseTokenType = {
  // address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
  symbol: Tokens.AAVE,
  name: 'Aave',
  decimals: 18,
  icon: 'aave',
};

const STK_AAVE: BaseTokenType = {
  // address: '0x4da27a545c0c5b758a6ba100e3a049001de870f5',
  symbol: Tokens.STK_AAVE,
  name: 'Staked Aave',
  decimals: 18,
  icon: 'stkaave',
};

const MATIC: BaseTokenType = {
  // address: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
  symbol: Tokens.WMATIC,
  name: 'Polygon (MATIC)',
  decimals: 18,
  icon: 'wmatic',
};

const WAVAX: BaseTokenType = {
  // address: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
  symbol: Tokens.WAVAX,
  name: 'Avalanche',
  decimals: 18,
  icon: 'wavax',
};

const BOND: BaseTokenType = {
  // address: '0x0391d2021f89dc339f60fff84546ea23e337750f',
  symbol: Tokens.BOND,
  name: 'BarnBridge Governance Token',
  decimals: 18,
  icon: 'bond',
};

const UNIV2: BaseTokenType = {
  // address: '0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244',
  symbol: Tokens.UNIV2,
  name: 'Uniswap V2',
  decimals: 18,
  icon: 'uniswap',
};

const SUSHI: BaseTokenType = {
  // address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
  symbol: Tokens.SUSHI,
  name: 'SUSHI',
  decimals: 18,
  icon: 'sushi',
};

const XSUSHI: BaseTokenType = {
  // address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
  symbol: Tokens.XSUSHI,
  name: 'xSUSHI',
  decimals: 18,
  icon: 'xsushi',
};

const LINK: BaseTokenType = {
  // address: '0x514910771af9ca656af840dff83e8264ecf986ca',
  symbol: Tokens.LINK,
  name: 'Chainlink',
  decimals: 18,
  icon: 'link',
};

const UNI: BaseTokenType = {
  // address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  symbol: Tokens.UNI,
  name: 'Uniswap',
  decimals: 18,
  icon: 'uni',
};

const FEI: BaseTokenType = {
  // address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
  symbol: Tokens.FEI,
  name: 'Fei Protocol',
  decimals: 18,
  icon: 'fei',
};

const BNB: BaseTokenType = {
  symbol: Tokens.BNB,
  name: 'Binance Coin',
  decimals: 18,
  icon: 'bnb',
};

const CAKE: BaseTokenType = {
  symbol: Tokens.CAKE,
  name: 'PancakeSwap',
  decimals: 18,
  icon: 'cake',
};

const DPI: BaseTokenType = {
  symbol: Tokens.DPI,
  name: 'DeFiPulse Index',
  decimals: 18,
  icon: 'dpi',
};

export const ProjectToken: BaseTokenType & {
  address: string;
} = {
  ...BOND,
  address: '0x0391d2021f89dc339f60fff84546ea23e337750f',
};

export type TokenType = BaseTokenType & {
  price?: BigNumber;
};

export type TokensContextType = {
  version: number;
  getToken(symbol?: string, network?: Web3Network): TokenType | undefined;
  getAmountInUSD(
    amount: BigNumber | undefined,
    source: string | undefined,
    network?: Web3Network,
  ): BigNumber | undefined;
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

async function getChainlinkFeedPrice(
  feedAddress: string,
  provider: any = MainnetHttpsWeb3Provider,
): Promise<BigNumber | undefined> {
  const contract = new Erc20Contract(CHAINLINK_PRICE_FEED_ABI, feedAddress);
  contract.setCallProvider(provider);

  const [decimals, latestAnswer] = await contract.batch([
    { method: 'decimals', transform: Number },
    { method: 'latestAnswer', transform: BigNumber.from },
  ]);

  return latestAnswer?.unscaleBy(decimals);
}

async function getGeckoPrice(symbol): Promise<BigNumber | undefined> {
  const query = queryfy({
    ids: [symbol],
    vs_currencies: 'usd',
  });

  const url = new URL(`/api/v3/simple/price?${query}`, 'https://api.coingecko.com');
  const result = await fetch(String(url)).then(response => response.json());

  return BigNumber.from(result[symbol].usd);
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

async function getPriceFor(symbol: string, network: Web3Network = MainnetNetwork): Promise<BigNumber | undefined> {
  if (network === MainnetNetwork || network === KovanNetwork || network === TestnetNetwork) {
    switch (symbol.toUpperCase()) {
      case 'BTC':
      case 'WBTC':
        // Chainlink: BTC/USD
        return getChainlinkFeedPrice('0xf4030086522a5beea4988f8ca5b36dbc97bee88c', MainnetHttpsWeb3Provider);
      case 'ETH':
      case 'WETH':
        // Chainlink: ETH/USD
        return getChainlinkFeedPrice('0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419', MainnetHttpsWeb3Provider);
      case 'USDC':
        // Chainlink: USDC/USD
        return getChainlinkFeedPrice('0x8fffffd4afb6115b954bd326cbe7b4ba576818f6', MainnetHttpsWeb3Provider);
      case 'USDT':
        // Chainlink: USDT/USD
        return getChainlinkFeedPrice('0x3e7d1eab13ad0104d2750b8863b489d65364e32d', MainnetHttpsWeb3Provider);
      case 'SUSD':
        // Chainlink: sUSD/USD
        return getChainlinkFeedPrice('0xad35bd71b9afe6e4bdc266b345c198eadef9ad94', MainnetHttpsWeb3Provider);
      case 'DAI':
        // Chainlink: DAI/USD
        return getChainlinkFeedPrice('0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9', MainnetHttpsWeb3Provider);
      case 'AAVE':
      case 'STKAAVE':
        // Chainlink: AAVE/USD
        return getChainlinkFeedPrice('0x547a514d5e3769680ce22b2361c10ea13619e8a9', MainnetHttpsWeb3Provider);
      case 'MATIC':
      case 'WMATIC':
        // Chainlink: MATIC/USD
        return getChainlinkFeedPrice('0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676', MainnetHttpsWeb3Provider);
      case 'AVAX':
      case 'WAVAX':
        // Chainlink: AVAX/USD
        return getChainlinkFeedPrice('0xff3eeb22b5e3de6e705b44749c2559d704923fd7', MainnetHttpsWeb3Provider);
      case 'LINK':
        // Chainlink: LINK/USD
        return getChainlinkFeedPrice('0x2c1d072e956affc0d435cb7ac38ef18d24d9127c', MainnetHttpsWeb3Provider);
      case 'UNI':
        // Chainlink: UNI/USD
        return getChainlinkFeedPrice('0x553303d460ee0afb37edff9be42922d8ff63220e', MainnetHttpsWeb3Provider);
      case 'FEI':
        // Chainlink: FEI/USD
        return getChainlinkFeedPrice('0x31e0a88fecb6ec0a411dbe0e9e76391498296ee9', MainnetHttpsWeb3Provider);
      case 'BNB':
        // Chainlink: BNB/USD
        return getChainlinkFeedPrice('0x14e613ac84a31f709eadbdf89c6cc390fdc9540a', MainnetHttpsWeb3Provider);
      case 'DPI':
        // Chainlink: DPI/USD
        return getChainlinkFeedPrice('0x68f1b8317c19ff02fb68a8476c1d3f9fc5139c0a', MainnetHttpsWeb3Provider);
      case 'GUSD':
        // Coingecko API: GUSD/USD
        return getGeckoPrice('gemini-dollar');
      case 'RAI':
        // Coingecko API: RAI/USD
        return getGeckoPrice('rai');
      case 'CAKE':
        // Coingecko API: CAKE/USD
        return getGeckoPrice('pancakeswap-token');
      case 'XSUSHI':
        // Coingecko API: XSUSHI/USD
        return getGeckoPrice('xsushi');
      case 'SUSHI':
        // Coingecko API: SUSHI/USD
        return getChainlinkFeedPrice('0x7213536a36094cd8a768a5e45203ec286cba2d74', MainnetHttpsWeb3Provider);
      case 'BOND':
        // UNISWAP V2: BOND/USDC
        return getBondPrice('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244');
      case 'UNI-V2':
        // UNISWAP V2: BOND/USDC
        return getUniV2Price('0x6591c4bcd6d7a1eb4e537da8b78676c1576ba244');
      default:
        return undefined;
    }
  } else if (network === PolygonNetwork) {
    switch (symbol.toUpperCase()) {
      case 'BTC':
      case 'WBTC':
        // Chainlink: BTC/USD
        return getChainlinkFeedPrice('0xc907e116054ad103354f2d350fd2514433d57f6f', PolygonHttpsWeb3Provider);
      case 'ETH':
      case 'WETH':
        // Chainlink: ETH/USD
        return getChainlinkFeedPrice('0xf9680d99d6c9589e2a93a78a04a279e509205945', PolygonHttpsWeb3Provider);
      case 'MATIC':
      case 'WMATIC':
        // Chainlink: MATIC/USD
        return getChainlinkFeedPrice('0xab594600376ec9fd91f8e885dadf0ce036862de0', PolygonHttpsWeb3Provider);
      case 'LINK':
        // Chainlink: LINK/USD
        return getChainlinkFeedPrice('0xd9ffdb71ebe7496cc440152d43986aae0ab76665', PolygonHttpsWeb3Provider);
      case 'AAVE':
      case 'STKAAVE':
        // Chainlink: AAVE/USD
        return getChainlinkFeedPrice('0x72484b12719e23115761d5da1646945632979bb6', PolygonHttpsWeb3Provider);
      case 'UNI':
        // Chainlink: UNI/USD
        return getChainlinkFeedPrice('0xdf0fb4e4f928d2dcb76f438575fdd8682386e13c', PolygonHttpsWeb3Provider);
      case 'SUSHI':
        // Chainlink: SUSHI/USD
        return getChainlinkFeedPrice('0x49b0c695039243bbfeb8ecd054eb70061fd54aa0', PolygonHttpsWeb3Provider);
      case 'USDC':
        // Chainlink: USDC/USD
        return getChainlinkFeedPrice('0xfe4a8cc5b5b2366c1b58bea3858e81843581b2f7', PolygonHttpsWeb3Provider);
      case 'USDT':
        // Chainlink: USDT/USD
        return getChainlinkFeedPrice('0x0a6513e40db6eb1b165753ad52e80663aea50545', PolygonHttpsWeb3Provider);
      default:
        return getPriceFor(symbol, MainnetNetwork);
    }
  } else if (network === AvalancheNetwork || network === AvalancheTestnetNetwork) {
    switch (symbol.toUpperCase()) {
      case 'BTC':
      case 'WBTC':
        // Chainlink: BTC/USD
        return getChainlinkFeedPrice('0x2779d32d5166baaa2b2b658333ba7e6ec0c65743', AvalancheHttpsWeb3Provider);
      case 'ETH':
      case 'WETH':
        // Chainlink: ETH/USD
        return getChainlinkFeedPrice('0x976b3d034e162d8bd72d6b9c989d545b839003b0', AvalancheHttpsWeb3Provider);
      case 'AVAX':
      case 'WAVAX':
        // Chainlink: AVAX/USD
        return getChainlinkFeedPrice('0x0A77230d17318075983913bC2145DB16C7366156', AvalancheHttpsWeb3Provider);
      case 'LINK':
        // Chainlink: LINK/USD
        return getChainlinkFeedPrice('0x49ccd9ca821efeab2b98c60dc60f518e765ede9a', AvalancheHttpsWeb3Provider);
      case 'AAVE':
      case 'STKAAVE':
        // Chainlink: AAVE/USD
        return getChainlinkFeedPrice('0x3ca13391e9fb38a75330fb28f8cc2eb3d9ceceed', AvalancheHttpsWeb3Provider);
      case 'USDC':
        // Chainlink: USDC/USD
        return getChainlinkFeedPrice('0xf096872672f44d6eba71458d74fe67f9a77a23b9', AvalancheHttpsWeb3Provider);
      case 'USDT':
        // Chainlink: USDT/USD
        return getChainlinkFeedPrice('0xebe676ee90fe1112671f19b6b7459bc678b67e8a', AvalancheHttpsWeb3Provider);
      default:
        return getPriceFor(symbol, MainnetNetwork);
    }
  } else if (network === BinanceNetwork || network === BinanceTestnetNetwork) {
    switch (symbol.toUpperCase()) {
      case 'BTC':
      case 'WBTC':
        // Chainlink: BTC/USD
        return getChainlinkFeedPrice('0x264990fbd0a4796a3e3d8e37c4d5f87a3aca5ebf', BinanceHttpsWeb3Provider);
      case 'ETH':
      case 'WETH':
        // Chainlink: ETH/USD
        return getChainlinkFeedPrice('0x9ef1b8c0e4f7dc8bf5719ea496883dc6401d5b2e', BinanceHttpsWeb3Provider);
      case 'BNB':
        // Chainlink: BNB/USD
        return getChainlinkFeedPrice('0x0567f2323251f0aab15c8dfb1967e4e8a7d42aee', BinanceHttpsWeb3Provider);
      case 'CAKE':
        // Chainlink: CAKE/USD
        return getChainlinkFeedPrice('0xb6064ed41d4f67e353768aa239ca86f4f73665a1', BinanceHttpsWeb3Provider);
      case 'LINK':
        // Chainlink: LINK/USD
        return getChainlinkFeedPrice('0xca236e327f629f9fc2c30a4e95775ebf0b89fac8', BinanceHttpsWeb3Provider);
      case 'AAVE':
      case 'STKAAVE':
        // Chainlink: AAVE/USD
        return getChainlinkFeedPrice('0xa8357bf572460fc40f4b0acacbb2a6a61c89f475', BinanceHttpsWeb3Provider);
      case 'MATIC':
      case 'WMATIC':
        // Chainlink: MATIC/USD
        return getChainlinkFeedPrice('0x7ca57b0ca6367191c94c8914d7df09a57655905f', BinanceHttpsWeb3Provider);
      case 'UNI':
        // Chainlink: UNI/USD
        return getChainlinkFeedPrice('0xb57f259e7c24e56a1da00f66b55a5640d9f9e7e4', BinanceHttpsWeb3Provider);
      case 'USDC':
        // Chainlink: USDC/USD
        return getChainlinkFeedPrice('0x51597f405303c4377e36123cbc172b13269ea163', BinanceHttpsWeb3Provider);
      case 'USDT':
        // Chainlink: USDT/USD
        return getChainlinkFeedPrice('0xb97ad0e74fa7d920791e90258a6e2085088b4320', BinanceHttpsWeb3Provider);
      default:
        return getPriceFor(symbol, MainnetNetwork);
    }
  } else if (network === ArbitrumNetwork || network === ArbitrumTestnetNetwork) {
    switch (symbol.toUpperCase()) {
      case 'SUSHI':
        // Chainlink: SUSHI/USD
        return getChainlinkFeedPrice('0xb2a8ba74cbca38508ba1632761b56c897060147c', ArbitrumHttpsWeb3Provider);
      default:
        return getPriceFor(symbol, MainnetNetwork);
    }
  }

  return undefined;
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
  AAVE,
  STK_AAVE,
  MATIC,
  WAVAX,
  BOND,
  UNIV2,
  XSUSHI,
  SUSHI,
  LINK,
  UNI,
  BNB,
  CAKE,
  FEI,
  DPI,
];

const TokensProvider: FC = props => {
  const { children } = props;

  const { activeNetwork } = useNetwork();
  const [reload, version] = useReload();
  const tokensRef = useRef<Map<string, TokenType>>(new Map());

  useEffect(() => {
    const promises = ALL_TOKENS.map(async token => {
      try {
        const newToken: TokenType = {
          ...token,
        };

        tokensRef.current.set(token.symbol.toUpperCase(), newToken);
        newToken.price = await getPriceFor(token.symbol, activeNetwork);
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
        console.log(`[New Token Price] ${t.symbol} = $${t.price?.toFixed(3) ?? '-'}`);
      });
    })();
  }, []);

  const getToken = useCallback(
    (symbol: string | undefined, network: Web3Network = activeNetwork): TokenType | undefined => {
      if (network === AvalancheNetwork || network === AvalancheTestnetNetwork) {
        switch (symbol?.toUpperCase()) {
          case 'WBTC.E':
            symbol = Tokens.WBTC;
            break;
          case 'WETH.E':
            symbol = Tokens.WETH;
            break;
          case 'AAVE.E':
            symbol = Tokens.AAVE;
            break;
          default:
            break;
        }
      } else if (network === BinanceNetwork || network === BinanceTestnetNetwork) {
        switch (symbol?.toUpperCase()) {
          case 'BTCB':
            symbol = Tokens.WBTC;
            break;
          case 'ETH':
            symbol = Tokens.WETH;
            break;
          case 'WBNB':
            symbol = Tokens.BNB;
            break;
          default:
            break;
        }
      }

      return symbol ? tokensRef.current.get(symbol.toUpperCase()) : undefined;
    },
    [],
  );

  const getAmountInUSD = useCallback(
    (amount: BigNumber | undefined, source: string | undefined, network?: Web3Network): BigNumber | undefined => {
      if (!amount || !source) {
        return undefined;
      }

      const token = getToken(source, network);

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

export function getAsset(symbol: string): AssetType | undefined {
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
      return undefined;
  }
}

export function isEthAsset(symbol: string) {
  return symbol.toUpperCase() === 'ETH';
}

export function isUsdAsset(symbol: string) {
  return symbol.toUpperCase() === 'USD';
}
