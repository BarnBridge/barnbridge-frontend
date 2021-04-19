import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import { BondContract, CONTRACT_BOND_ADDR } from 'web3/contracts/bond';
import { CONTRACT_DAI_ADDR, DaiContract } from 'web3/contracts/dai';
import Erc20Contract from 'web3/contracts/erc20Contract';
import { CONTRACT_SUSD_ADDR, SusdContract } from 'web3/contracts/susd';
import { CONTRACT_UNISWAP_ADDR, UniV2Contract } from 'web3/contracts/uniswap';
import { CONTRACT_USDC_ADDR, UsdcContract } from 'web3/contracts/usdc';
import Web3Contract from 'web3/contracts/web3Contract';

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
  UNIV2 = 'UNIV2',
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
  contract?: Web3Contract;
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
    address: CONTRACT_BOND_ADDR,
    symbol: KnownTokens.BOND,
    name: 'BarnBridge',
    decimals: 18,
    priceFeed: CONTRACT_UNISWAP_ADDR, // BOND -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-bond',
    contract: new BondContract(),
  },
  {
    address: CONTRACT_USDC_ADDR,
    symbol: KnownTokens.USDC,
    name: 'USD Coin',
    decimals: 6,
    priceFeed: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6', // USDC -> $
    icon: 'token-usdc',
    contract: new UsdcContract(),
  },
  {
    address: CONTRACT_DAI_ADDR,
    symbol: KnownTokens.DAI,
    name: 'Dai Stablecoin',
    decimals: 18,
    priceFeed: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9', // DAI -> $
    icon: 'token-dai',
    contract: new DaiContract(),
  },
  {
    address: CONTRACT_SUSD_ADDR,
    symbol: KnownTokens.SUSD,
    name: 'Synth sUSD',
    decimals: 18,
    priceFeed: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757', // sUSD -> ETH
    pricePath: [KnownTokens.ETH],
    icon: 'token-susd',
    contract: new SusdContract(),
  },
  {
    address: CONTRACT_UNISWAP_ADDR,
    symbol: KnownTokens.UNIV2,
    name: 'Uniswap V2',
    decimals: 18,
    priceFeed: CONTRACT_UNISWAP_ADDR, // UNIV2 -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-uniswap',
    contract: new UniV2Contract(),
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
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'value', type: 'uint256' }],
  },
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
  {
    name: 'token0',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: 'value', type: 'address' }],
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

  return new BigNumber(latestAnswer).unscaleBy(decimals)!;
}

async function getBondPrice(): Promise<BigNumber> {
  const bondToken = getTokenBySymbol(KnownTokens.BOND);

  if (!bondToken || !bondToken.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, bondToken.priceFeed);

  const [decimals, { reserve1, reserve2 }, token0] = await priceFeedContract.batch([
    { method: 'decimals' },
    { method: 'getReserves' },
    { method: 'token1' },
  ]);

  const bond = token0 === bondToken.address ? reserve1 : reserve2;
  const usdc = token0 === bondToken.address ? reserve2 : reserve1;

  const usdcToken = getTokenBySymbol(KnownTokens.USDC);

  const bondReserve = new BigNumber(bond).unscaleBy(decimals)!;
  const usdcReserve = new BigNumber(usdc).unscaleBy(usdcToken?.decimals)!;

  return usdcReserve.dividedBy(bondReserve);
}

async function getUniV2Price(): Promise<BigNumber> {
  const token = getTokenBySymbol(KnownTokens.UNIV2);

  if (!token || !token.priceFeed) {
    return Promise.reject();
  }

  const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, token.priceFeed);

  const [decimals, totalSupply, { reserve1, reserve2 }, token0] = await priceFeedContract.batch([
    { method: 'decimals' },
    { method: 'totalSupply' },
    { method: 'getReserves' },
    { method: 'token1' },
  ]);

  const usdcAmount = token0 === token.address ? reserve2 : reserve1;
  const usdcToken = getTokenBySymbol(KnownTokens.USDC);
  const usdcReserve = new BigNumber(usdcAmount).unscaleBy(usdcToken?.decimals)!;
  const supply = new BigNumber(totalSupply).unscaleBy(decimals)!;

  return usdcReserve.dividedBy(supply).multipliedBy(2);
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
