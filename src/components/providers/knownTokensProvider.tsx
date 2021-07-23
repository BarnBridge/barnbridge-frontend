import { FC, createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { useContractManager, useErc20Contract } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import { formatUSD } from 'web3/utils';
import Web3Contract, { createAbiItem } from 'web3/web3Contract';

import { TokenIconNames } from 'components/custom/icon';
import { isDevelopmentMode, useConfig } from 'components/providers/configProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { MainnetHttpsWeb3Provider, useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import { MumbaiNetwork } from 'networks/mumbai';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

import { InvariantContext } from 'utils/context';

export enum KnownTokens {
  ETH = 'ETH',
  BTC = 'BTC',
  WETH = 'WETH',
  WBTC = 'WBTC',
  BOND = 'BOND',
  USDC = 'USDC',
  DAI = 'DAI',
  SUSD = 'sUSD',
  GUSD = 'GUSD',
  UNIV2 = 'UNI-V2',
  USDT = 'USDT',
  STK_AAVE = 'stkAAVE',
  WMATIC = 'wMATIC',
}

/* eslint-disable @typescript-eslint/no-redeclare */
export namespace KnownTokens {
  // compound
  export const bbcUSDC = 'bb_cUSDC';
  export const bbcDAI = 'bb_cDAI';
  // aave
  export const bbaUSDC = 'bb_aUSDC';
  export const bbaDAI = 'bb_aDAI';
  export const bbaUSDT = 'bb_aUSDT';
  export const bbaGUSD = 'bb_aGUSD';
  // cream
  export const bbcrUSDC = 'bb_crUSDC';
  export const bbcrDAI = 'bb_crDAI';
  export const bbcrUSDT = 'bb_crUSDT';
}
/* eslint-enable @typescript-eslint/no-redeclare */

export type TokenMeta = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  icon?: TokenIconNames;
  color?: string;
  priceFeed?: string;
  pricePath?: KnownTokens[];
  price?: BigNumber;
  contract?: Web3Contract;
};

export type KnownTokensContextType = {
  tokens: TokenMeta[];
  projectToken: TokenMeta;
  bondToken: TokenMeta;
  ethToken: TokenMeta;
  stkAaveToken: TokenMeta;
  daiToken: TokenMeta;
  gusdToken: TokenMeta;
  susdToken: TokenMeta;
  univ2Token: TokenMeta;
  usdcToken: TokenMeta;
  usdtToken: TokenMeta;
  getTokenBySymbol(symbol: string): TokenMeta | undefined;
  getTokenByAddress(address: string): TokenMeta | undefined;
  getTokenIconBySymbol(address: string): string;
  getTokenPriceIn(source: string, target: string): BigNumber | undefined;
  convertTokenIn(amount: BigNumber | number | undefined, source: string, target: string): BigNumber | undefined;
  convertTokenInUSD(amount: BigNumber | number | undefined, source: string): BigNumber | undefined;
};

const Context = createContext<KnownTokensContextType>(InvariantContext('KnownTokensProvider'));

export function useKnownTokens(): KnownTokensContextType {
  return useContext<KnownTokensContextType>(Context);
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

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const network = useNetwork();
  const config = useConfig();
  const wallet = useWallet();
  const web3 = useWeb3();
  const { getContract } = useContractManager();
  const [reload] = useReload();

  const wbtcContract = useErc20Contract(config.tokens.wbtc);
  const wethContract = useErc20Contract(config.tokens.weth);
  const usdcContract = useErc20Contract(config.tokens.usdc);
  const bondContract = useErc20Contract(config.tokens.bond);
  const usdtContract = useErc20Contract(config.tokens.usdt);
  const susdContract = useErc20Contract(config.tokens.susd);
  const gusdContract = useErc20Contract(config.tokens.gusd);
  const daiContract = useErc20Contract(config.tokens.dai);
  const univ2Contract = useErc20Contract(config.tokens.univ2);
  const stkaaveContract = useErc20Contract(config.tokens.stkaave);
  const wmaticContract = useErc20Contract(config.tokens.wmatic);

  const tokens = useMemo<TokenMeta[]>(
    () => [
      {
        symbol: KnownTokens.BTC,
        name: 'BTC',
        address: '0x',
        decimals: 0,
        icon: 'token-wbtc',
        priceFeed: config.feeds.btc, // BTC -> $
      },
      {
        symbol: KnownTokens.WBTC,
        name: 'Wrapped BTC',
        address: config.tokens.wbtc.toLowerCase(),
        decimals: 8,
        icon: 'token-wbtc',
        pricePath: [KnownTokens.BTC],
        contract: wbtcContract,
      },
      {
        symbol: KnownTokens.ETH,
        name: 'Ether',
        address: '0x',
        decimals: 18,
        icon: 'token-eth',
        priceFeed: config.feeds.eth, // ETH -> $
      },
      {
        symbol: KnownTokens.WETH,
        name: 'Wrapped Ether',
        address: config.tokens.weth.toLowerCase(),
        decimals: 18,
        icon: 'token-weth',
        pricePath: [KnownTokens.ETH],
        contract: wethContract,
      },
      {
        symbol: KnownTokens.USDC,
        name: 'USD Coin',
        address: config.tokens.usdc.toLowerCase(),
        decimals: 6,
        icon: 'token-usdc',
        color: '#4f6ae5',
        priceFeed: config.feeds.usdc, // USDC -> $
        contract: usdcContract,
      },
      {
        symbol: KnownTokens.BOND,
        name: 'BarnBridge',
        address: config.tokens.bond.toLowerCase(),
        decimals: 18,
        icon: 'static/token-bond',
        priceFeed: config.feeds.bond, // BOND -> USDC
        pricePath: [KnownTokens.USDC],
        contract: bondContract,
      },
      {
        symbol: KnownTokens.USDT,
        name: 'Tether USD',
        address: config.tokens.usdt.toLowerCase(),
        decimals: 6,
        icon: 'token-usdt',
        priceFeed: config.feeds.usdt, // USDT -> $
        contract: usdtContract,
      },
      {
        symbol: KnownTokens.SUSD,
        name: 'Synth sUSD',
        address: config.tokens.susd.toLowerCase(),
        decimals: 18,
        icon: 'token-susd',
        color: '#1e1a31',
        priceFeed: config.feeds.susd, // sUSD -> ETH
        pricePath: [KnownTokens.ETH],
        contract: susdContract,
      },
      {
        symbol: KnownTokens.GUSD,
        name: 'Gemini dollar',
        address: config.tokens.gusd.toLowerCase(),
        decimals: 2,
        icon: 'token-gusd',
        price: new BigNumber(1),
        priceFeed: undefined,
        pricePath: undefined,
        contract: gusdContract,
      },
      {
        symbol: KnownTokens.DAI,
        name: 'Dai Stablecoin',
        address: config.tokens.dai.toLowerCase(),
        decimals: 18,
        icon: 'token-dai',
        color: '#ffd160',
        priceFeed: config.feeds.dai, // DAI -> $
        contract: daiContract,
      },
      {
        symbol: KnownTokens.UNIV2,
        name: 'Uniswap V2',
        address: config.tokens.univ2.toLowerCase(),
        decimals: 18,
        icon: 'static/token-uniswap',
        priceFeed: config.feeds.univ2, // UNIV2 -> USDC
        pricePath: [KnownTokens.USDC],
        contract: univ2Contract,
      },
      {
        symbol: KnownTokens.STK_AAVE,
        name: 'Staked AAVE',
        address: config.tokens.stkaave.toLowerCase(),
        decimals: 18,
        icon: 'static/token-staked-aave',
        priceFeed: config.feeds.stkaave, // stkAAVE -> USD
        pricePath: [],
        contract: stkaaveContract,
      },
      {
        symbol: KnownTokens.WMATIC,
        name: 'wMATIC',
        address: config.tokens.wmatic.toLowerCase(),
        decimals: 18,
        icon: 'token-wmatic',
        priceFeed: config.feeds.wmatic, // WMATIC -> USD
        pricePath: [],
        contract: wmaticContract,
      },
      {
        symbol: KnownTokens.bbcUSDC,
        name: 'BarnBridge cUSDC',
        address: config.tokens.bb_cusdc.toLowerCase(),
        decimals: 6,
        icon: 'token-usdc',
        priceFeed: config.tokens.bb_cusdc, // bb_cUSDC -> USDC
        pricePath: [KnownTokens.USDC],
      },
      {
        symbol: KnownTokens.bbcDAI,
        name: 'BarnBridge cDAI',
        address: config.tokens.bb_cdai.toLowerCase(),
        decimals: 18,
        icon: 'token-dai',
        priceFeed: config.tokens.bb_cdai, // bb_cDAI -> DAI
        pricePath: [KnownTokens.DAI],
      },
      {
        symbol: KnownTokens.bbaUSDC,
        name: 'BarnBridge aUSDC',
        address: config.tokens.bb_ausdc.toLowerCase(),
        decimals: 6,
        icon: 'token-usdc',
        priceFeed: config.tokens.bb_ausdc, // bb_aUSDC -> USDC
        pricePath: [KnownTokens.USDC],
      },
      {
        symbol: KnownTokens.bbaDAI,
        name: 'BarnBridge aDAI',
        address: config.tokens.bb_adai.toLowerCase(),
        decimals: 18,
        icon: 'token-dai',
        priceFeed: config.tokens.bb_adai, // bb_aDAI -> DAI
        pricePath: [KnownTokens.DAI],
      },
      {
        symbol: KnownTokens.bbaUSDT,
        name: 'BarnBridge aUSDT',
        address: config.tokens.bb_ausdt.toLowerCase(),
        decimals: 6,
        icon: 'token-usdt',
        priceFeed: config.tokens.bb_ausdt, // bb_aUSDT -> USDT
        pricePath: [KnownTokens.USDT],
      },
      {
        symbol: KnownTokens.bbaGUSD,
        name: 'BarnBridge aGUSD',
        address: config.tokens.bb_agusd.toLowerCase(),
        decimals: 2,
        icon: 'token-gusd',
        priceFeed: config.tokens.bb_agusd, // bb_aGUSD -> GUSD
        pricePath: [KnownTokens.GUSD],
      },
      {
        symbol: KnownTokens.bbcrUSDC,
        name: 'BarnBridge crUSDC',
        address: config.tokens.bb_crusdc.toLowerCase(),
        decimals: 6,
        icon: 'token-usdc',
        priceFeed: config.tokens.bb_crusdc, // bb_crUSDC -> USDC
        pricePath: [KnownTokens.USDC],
      },
      {
        symbol: KnownTokens.bbcrDAI,
        name: 'BarnBridge crDAI',
        address: config.tokens.bb_crdai.toLowerCase(),
        decimals: 18,
        icon: 'token-dai',
        priceFeed: config.tokens.bb_crdai, // bb_crDAI -> DAI
        pricePath: [KnownTokens.DAI],
      },
      {
        symbol: KnownTokens.bbcrUSDT,
        name: 'BarnBridge crUSDT',
        address: config.tokens.bb_crusdt.toLowerCase(),
        decimals: 6,
        icon: 'token-usdt',
        priceFeed: config.tokens.bb_crusdt, // bb_crUSDT -> USDT
        pricePath: [KnownTokens.USDT],
      },
    ],
    [],
  );

  const getTokenBySymbol = useCallback(
    (symbol: string): TokenMeta | undefined => {
      let fSymbol = symbol;

      if (isDevelopmentMode) {
        if (fSymbol === 'bbcUSDC') {
          fSymbol = KnownTokens.bbcUSDC;
        }
      }

      if (network.activeNetwork === PolygonNetwork || network.activeNetwork === MumbaiNetwork) {
        switch (fSymbol) {
          case 'bb_cmUSDC':
            fSymbol = KnownTokens.bbcUSDC;
            break;
          case 'bb_cmDAI':
            fSymbol = KnownTokens.bbcDAI;
            break;
          case 'bb_amUSDC':
            fSymbol = KnownTokens.bbaUSDC;
            break;
          case 'bb_amUSDT':
            fSymbol = KnownTokens.bbaUSDT;
            break;
          case 'bb_amGUSD':
            fSymbol = KnownTokens.bbaGUSD;
            break;
          case 'bb_amDAI':
            fSymbol = KnownTokens.bbaDAI;
            break;
          case 'bb_crmUSDC':
            fSymbol = KnownTokens.bbcrUSDC;
            break;
          case 'bb_crmUSDT':
            fSymbol = KnownTokens.bbcrUSDT;
            break;
          case 'bb_crmDAI':
            fSymbol = KnownTokens.bbcrDAI;
            break;
        }
      }

      return tokens.find(token => token.symbol === fSymbol);
    },
    [tokens],
  );

  const getTokenByAddress = useCallback(
    (address: string): TokenMeta | undefined => {
      return tokens.find(token => token.address.toLowerCase() === address.toLowerCase());
    },
    [tokens],
  );

  const getTokenIconBySymbol = useCallback(
    (symbol: string): string => {
      let foundToken: TokenMeta | undefined;

      if (isDevelopmentMode && symbol === KnownTokens.bbcUSDC) {
        foundToken = tokens.find(token => token.symbol === 'bb_cUSDC');
      } else {
        foundToken = tokens.find(token => token.symbol === symbol);
      }

      return foundToken?.icon || 'token-unknown';
    },
    [tokens],
  );

  const getFeedPrice = useCallback(async (symbol: string): Promise<BigNumber> => {
    const token = getTokenBySymbol(symbol);

    if (!token || !token.priceFeed) {
      return Promise.reject();
    }

    const priceFeedContract = getContract<Erc20Contract>(token.priceFeed, () => {
      return new Erc20Contract(PRICE_FEED_ABI, token.priceFeed!);
    });
    priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider

    const [decimals, latestAnswer] = await priceFeedContract.batch([
      { method: 'decimals', transform: Number },
      { method: 'latestAnswer', transform: BigNumber.parse },
    ]);

    return latestAnswer.unscaleBy(decimals)!;
  }, []);

  const getBondPrice = useCallback(async (): Promise<BigNumber> => {
    const usdcToken = getTokenBySymbol(KnownTokens.USDC);
    const bondToken = getTokenBySymbol(KnownTokens.BOND);

    if (!usdcToken || !bondToken || !bondToken.priceFeed) {
      return Promise.reject();
    }

    const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, bondToken.priceFeed);
    priceFeedContract.setCallProvider(web3.activeProvider);
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
  }, [getTokenBySymbol]);

  const getUniV2Price = useCallback(async (): Promise<BigNumber> => {
    const usdcToken = getTokenBySymbol(KnownTokens.USDC);
    const univ2Token = getTokenBySymbol(KnownTokens.UNIV2);

    if (!usdcToken || !univ2Token || !univ2Token.priceFeed) {
      return Promise.reject();
    }

    const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, univ2Token.priceFeed);
    priceFeedContract.setCallProvider(web3.activeProvider);

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
  }, [getTokenBySymbol]);

  const getJTokenPrice = useCallback(
    async (symbol: string): Promise<BigNumber> => {
      const token = getTokenBySymbol(symbol);

      if (!token || !token.priceFeed) {
        return Promise.reject();
      }

      const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed!);
      priceFeedContract.setCallProvider(web3.activeProvider);

      const price = await priceFeedContract.call('price');

      return new BigNumber(price).dividedBy(1e18);
    },
    [getTokenBySymbol],
  );

  const getJATokenPrice = useCallback(
    async (symbol: string): Promise<BigNumber> => {
      const token = getTokenBySymbol(symbol);

      if (!token || !token.priceFeed) {
        return Promise.reject();
      }

      const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed!);
      priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider

      const price = await priceFeedContract.call('price');

      return new BigNumber(price).dividedBy(1e18);
    },
    [getTokenBySymbol],
  );

  const getTokenPrice = useCallback(
    (symbol: string): BigNumber | undefined => {
      return getTokenBySymbol(symbol)?.price;
    },
    [getTokenBySymbol],
  );

  const getTokenPriceIn = useCallback(
    (source: string, target: string): BigNumber | undefined => {
      const sourcePrice = getTokenPrice(source);
      const targetPrice = getTokenPrice(target);

      if (!sourcePrice || !targetPrice) {
        return undefined;
      }

      return sourcePrice.dividedBy(targetPrice);
    },
    [getTokenPrice],
  );

  const convertTokenIn = useCallback(
    (amount: BigNumber | number | undefined, source: string, target: string): BigNumber | undefined => {
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
    },
    [getTokenPriceIn],
  );

  const convertTokenInUSD = useCallback(
    (amount: BigNumber | number | undefined, source: string): BigNumber | undefined => {
      return convertTokenIn(amount, source, KnownTokens.USDC);
    },
    [convertTokenIn],
  );

  const [
    projectToken,
    bondToken,
    ethToken,
    stkAaveToken,
    daiToken,
    gusdToken,
    susdToken,
    univ2Token,
    usdcToken,
    usdtToken,
  ] = useMemo<TokenMeta[]>(() => {
    return [
      getTokenBySymbol(KnownTokens.BOND)!,
      getTokenBySymbol(KnownTokens.BOND)!,
      getTokenBySymbol(KnownTokens.ETH)!,
      network.activeNetwork !== PolygonNetwork
        ? getTokenBySymbol(KnownTokens.STK_AAVE)!
        : getTokenBySymbol(KnownTokens.WMATIC)!,
      getTokenBySymbol(KnownTokens.DAI)!,
      getTokenBySymbol(KnownTokens.GUSD)!,
      getTokenBySymbol(KnownTokens.SUSD)!,
      getTokenBySymbol(KnownTokens.UNIV2)!,
      getTokenBySymbol(KnownTokens.USDC)!,
      getTokenBySymbol(KnownTokens.USDT)!,
    ];
  }, [getTokenBySymbol]);

  useEffect(() => {
    (async () => {
      await Promise.allSettled(
        tokens.map(async token => {
          switch (token.symbol) {
            case KnownTokens.BOND:
              token.price = await getBondPrice();
              break;
            case KnownTokens.UNIV2:
              token.price = await getUniV2Price();
              break;
            case KnownTokens.bbcUSDC:
            case KnownTokens.bbcDAI:
            case KnownTokens.bbcrDAI:
            case KnownTokens.bbcrUSDC:
            case KnownTokens.bbcrUSDT:
              token.price = await getJTokenPrice(token.symbol);
              break;
            case KnownTokens.bbaDAI:
            case KnownTokens.bbaUSDC:
            case KnownTokens.bbaUSDT:
            case KnownTokens.bbaGUSD:
              token.price = await getJATokenPrice(token.symbol);
              break;
            default:
              token.price = await getFeedPrice(token.symbol);
              break;
          }
        }),
      );

      tokens.forEach(token => {
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
  }, [getBondPrice, getFeedPrice, getJATokenPrice, getJTokenPrice, getTokenBySymbol, getUniV2Price, reload, tokens]);

  useEffect(() => {
    if (projectToken) {
      (projectToken.contract as Erc20Contract).loadCommon().catch(Error);
    }
  }, [projectToken]);

  useEffect(() => {
    if (projectToken && wallet.account) {
      (projectToken.contract as Erc20Contract).loadBalance().then(reload);
    }
  }, [projectToken, reload, wallet.account]);

  const value: KnownTokensContextType = {
    tokens,
    projectToken,
    bondToken,
    ethToken,
    stkAaveToken,
    daiToken,
    gusdToken,
    susdToken,
    univ2Token,
    usdcToken,
    usdtToken,
    getTokenBySymbol,
    getTokenByAddress,
    getTokenIconBySymbol,
    getTokenPriceIn,
    convertTokenIn,
    convertTokenInUSD,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default KnownTokensProvider;
