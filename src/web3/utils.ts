import BigNumber from 'bignumber.js';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { TokenMeta } from 'web3/types';

export const MAX_UINT_256 = new BigNumber(2).pow(256).minus(1);
export const ZERO_BIG_NUMBER = new BigNumber(0);
export const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000';
const ETHERSCAN_API_KEY = String(process.env.REACT_APP_ETHERSCAN_API_KEY);

export function getEtherscanTxUrl(
  txHash?: string,
  chainId = Number(process.env.REACT_APP_WEB3_CHAIN_ID),
): string | undefined {
  if (txHash) {
    switch (chainId) {
      case 1:
        return `https://etherscan.io/tx/${txHash}`;
      case 4:
        return `https://rinkeby.etherscan.io/tx/${txHash}`;
      case 42:
        return `https://kovan.etherscan.io/tx/${txHash}`;
      default:
    }
  }

  return undefined;
}

export function getEtherscanAddressUrl(
  address?: string,
  chainId = Number(process.env.REACT_APP_WEB3_CHAIN_ID),
): string | undefined {
  if (address) {
    switch (chainId) {
      case 1:
        return `https://etherscan.io/address/${address}`;
      case 4:
        return `https://rinkeby.etherscan.io/address/${address}`;
      case 42:
        return `https://kovan.etherscan.io/address/${address}`;
      default:
    }
  }

  return undefined;
}

export function getEtherscanABIUrl(
  address?: string,
  apiKey?: string,
  chainId = Number(process.env.REACT_APP_WEB3_CHAIN_ID),
): string | undefined {
  if (address) {
    switch (chainId) {
      case 1:
        return `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
      case 4:
        return `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
      case 42:
        return `https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
      default:
    }
  }

  return undefined;
}

export function getExponentValue(decimals = 0): BigNumber {
  return new BigNumber(10).pow(decimals);
}

export function getHumanValue(value?: BigNumber, decimals = 0): BigNumber | undefined {
  return value?.div(getExponentValue(decimals));
}

export function getNonHumanValue(value: BigNumber | number, decimals = 0): BigNumber {
  return new BigNumber(value).multipliedBy(getExponentValue(decimals));
}

export function getGasValue(price: number): number {
  return getNonHumanValue(price, 9).toNumber();
}

export function formatBigValue(
  value?: BigNumber | number,
  decimals = 4,
  defaultValue = '-',
  minDecimals: number | undefined = undefined,
): string {
  if (value === undefined) {
    return defaultValue;
  }

  const bnValue = new BigNumber(value);

  if (bnValue.isNaN()) {
    return defaultValue;
  }

  return new BigNumber(bnValue.toFixed(decimals)).toFormat(minDecimals);
}

export function formatPercent(value: number | BigNumber | undefined, decimals: number = 2): string | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  const rate = BigNumber.isBigNumber(value) ? value.toNumber() : value;

  return `${(rate * 100).toFixed(decimals)}%`;
}

type FormatTokenOptions = {
  tokenName?: string;
  decimals?: number;
  minDecimals?: number;
  maxDecimals?: number;
  scale?: number;
  compact?: boolean;
};

export function formatToken(value: number | BigNumber | undefined, options?: FormatTokenOptions): string | undefined {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return undefined;
  }

  const { tokenName, compact = false, decimals = 4, minDecimals, scale = 0 } = options ?? {};

  let val = new BigNumber(value);

  if (scale > 0) {
    val = val.dividedBy(10 ** scale);
  }

  let str = '';

  if (compact) {
    str = Intl.NumberFormat('en', {
      notation: 'compact',
    }).format(val.toNumber());
  } else {
    str = new BigNumber(val.toFixed(decimals)).toFormat(minDecimals);
  }

  return tokenName ? `${str} ${tokenName}` : str;
}

export function formatUSD(value: number | BigNumber | undefined, compact?: boolean): string | undefined {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return undefined;
  }

  return Intl.NumberFormat('en', {
    notation: compact ? 'compact' : undefined,
    style: 'currency',
    currency: 'USD',
  }).format(BigNumber.isBigNumber(value) ? value.toNumber() : value);
}

export function formatUSDValue(value?: BigNumber | number, decimals = 2, minDecimals: number = decimals): string {
  if (value === undefined) {
    return '-';
  }

  const val = BigNumber.isBigNumber(value) ? value : new BigNumber(value);
  const formattedValue = formatBigValue(val.abs(), decimals, '-', minDecimals);

  return val.isPositive() ? `$${formattedValue}` : `-$${formattedValue}`;
}

export function formatBONDValue(value?: BigNumber): string {
  return formatBigValue(value, 4);
}

export function isSmallBONDValue(value?: BigNumber): boolean {
  return !!value && value.gt(ZERO_BIG_NUMBER) && value.lt(0.0001);
}

export function shortenAddr(addr: string | undefined, first = 6, last = 4): string | undefined {
  return addr ? [String(addr).slice(0, first), String(addr).slice(-last)].join('...') : undefined;
}

export function getTokenMeta(tokenAddr: string): TokenMeta | undefined {
  switch (tokenAddr.toLowerCase()) {
    case USDCTokenMeta.address:
      return USDCTokenMeta;
    case DAITokenMeta.address:
      return DAITokenMeta;
    case SUSDTokenMeta.address:
      return SUSDTokenMeta;
    case UNISWAPTokenMeta.address:
      return UNISWAPTokenMeta;
    case BONDTokenMeta.address:
      return BONDTokenMeta;
    default:
      return undefined;
  }
}

export function fetchContractABI(address: string): any {
  const url = getEtherscanABIUrl(address, ETHERSCAN_API_KEY);

  if (!url) {
    return Promise.reject();
  }

  return fetch(url)
    .then(result => result.json())
    .then(({ status, result }: { status: string; result: string }) => {
      if (status === '1') {
        return JSON.parse(result);
      }

      return Promise.reject(result);
    });
}

type GasPriceResult = {
  veryFast: number;
  fast: number;
  average: number;
  safeLow: number;
};

export function fetchGasPrice(): Promise<GasPriceResult> {
  return fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`)
    .then(result => result.json())
    .then(result => result.result)
    .then(result => {
      return {
        veryFast: Number(result.FastGasPrice),
        fast: Number(result.ProposeGasPrice),
        average: Math.round((Number(result.ProposeGasPrice) + Number(result.SafeGasPrice)) / 2),
        safeLow: Number(result.SafeGasPrice),
      };
    });
}
