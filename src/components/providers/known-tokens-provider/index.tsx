import React, { FC, createContext, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { AbiItem } from 'web3-utils';
import Erc20Contract from 'web3/contracts/erc20Contract';

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
  bbcUSDC = 'bbcUSDC',
  bbcDAI = 'bbcDAI',
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
    symbol: KnownTokens.ETH,
    name: 'Ether',
    decimals: 0,
    priceFeed: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH -> $
    icon: 'token-eth',
  },
  {
    address: '',
    symbol: KnownTokens.BTC,
    name: 'BTC',
    decimals: 0,
    priceFeed: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC -> $
    icon: 'token-wbtc',
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
    address: '0x2327c862e8770e10f63eef470686ffd2684a0092',
    symbol: KnownTokens.bbcUSDC,
    name: 'BarnBridge cUSDC',
    decimals: 6,
    priceFeed: '0x2327c862e8770e10f63eef470686ffd2684a0092', // bbcUSDC -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-usdc',
  },
  {
    address: '0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1',
    symbol: KnownTokens.bbcDAI,
    name: 'BarnBridge cDAI',
    decimals: 18,
    priceFeed: '0xebf32075b5ee6e9aff265d3ec6c69a2b381b61b1', // bbcDAI -> USDC
    pricePath: [KnownTokens.USDC],
    icon: 'token-dai',
  },
];

type ContextType = {
  tokens: TokenMeta[];
};

const Context = createContext<ContextType>({
  tokens: [...KNOWN_TOKENS],
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

export function getTokenBySymbol(symbol: KnownTokens): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.symbol === symbol);
}

export function getTokenByAddress(address: string): TokenMeta | undefined {
  return KNOWN_TOKENS.find(token => token.address === address);
}

const KnownTokensProvider: FC = props => {
  const { children } = props;

  const [reload] = useReload();

  React.useEffect(() => {
    (async () => {
      await Promise.allSettled(
        KNOWN_TOKENS.map(async token => {
          if (token.priceFeed) {
            if (token.symbol === KnownTokens.BOND) {
              const priceFeedContract = new Erc20Contract(BOND_PRICE_FEED_ABI, token.priceFeed);
              priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

              const [decimals, { reserve1, reserve2 }] = await priceFeedContract.batch([
                { method: 'decimals' },
                { method: 'getReserves' },
              ]);

              const bondReserve = new BigNumber(reserve1).dividedBy(10 ** decimals);
              const usdcReserve = new BigNumber(reserve2).dividedBy(1e6); // usdc decimals

              token.price = usdcReserve.dividedBy(bondReserve);
            } else if (token.symbol === KnownTokens.bbcUSDC || token.symbol === KnownTokens.bbcDAI) {
              const priceFeedContract = new Erc20Contract(J_PRICE_FEED_ABI, token.priceFeed);

              const price = await priceFeedContract.call('price');
              token.price = new BigNumber(price).dividedBy(1e18);
            } else {
              const priceFeedContract = new Erc20Contract(PRICE_FEED_ABI, token.priceFeed);
              priceFeedContract.setCallProvider(MainnetHttpsWeb3Provider);

              const [decimals, latestAnswer] = await priceFeedContract.batch([
                { method: 'decimals' },
                { method: 'latestAnswer' },
              ]);

              token.price = new BigNumber(latestAnswer).dividedBy(10 ** decimals);
            }
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
  };

  return (
    <Context.Provider value={value}>
      {children}
      {/*<ul>*/}
      {/*  {KNOWN_TOKENS.map(token => (*/}
      {/*    <div key={token.symbol}>*/}
      {/*      <Icon name={token.icon as IconNames} />*/}
      {/*      {token.name} - {token.price?.toNumber()}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </Context.Provider>
  );
};

export default KnownTokensProvider;
