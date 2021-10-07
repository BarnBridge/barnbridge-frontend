import BigNumber from 'bignumber.js';

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

type FormatNumberOptions = {
  decimals?: number;
};

export function formatNumber(value: number | BigNumber | undefined, options?: FormatNumberOptions): string | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  const { decimals } = options ?? {};

  const val = BigNumber.isBigNumber(value) ? value.toNumber() : value;

  return Intl.NumberFormat('en', {
    maximumFractionDigits: decimals,
  }).format(val);
}

export function formatPercent(value: number | BigNumber | undefined, decimals: number = 2): string | undefined {
  if (value === undefined || Number.isNaN(value)) {
    return undefined;
  }

  const rate = BigNumber.isBigNumber(value) ? value.toNumber() : value;

  return Intl.NumberFormat('en', {
    style: 'percent',
    maximumFractionDigits: decimals,
  }).format(rate);
}

type FormatTokenOptions = {
  tokenName?: string;
  decimals?: number;
  minDecimals?: number;
  maxDecimals?: number;
  scale?: number;
  compact?: boolean;
  hasLess?: boolean;
};

export function formatToken(
  value: number | BigNumber | string | undefined,
  options?: FormatTokenOptions,
): string | undefined {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return undefined;
  }

  let val = new BigNumber(value);

  if (val.isNaN()) {
    return undefined;
  }

  if (options) {
    if (options.hasOwnProperty('scale') && options.scale === undefined) {
      return undefined;
    }
  }

  const { tokenName, compact = false, decimals = 4, minDecimals, scale = 0, hasLess = false } = options ?? {};

  if (scale > 0) {
    val = val.unscaleBy(scale)!;
  }

  let str = '';

  if (hasLess) {
    if (val.gt(BigNumber.ZERO) && val.lt(1 / 10 ** decimals)) {
      str += '> ';
    }
  }

  if (compact && val.gt(1_000)) {
    str += Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(val.toNumber());
  } else {
    str += new BigNumber(val.toFixed(decimals)).toFormat(minDecimals);
  }

  if (tokenName) {
    str += ` ${tokenName}`;
  }

  return str;
}

type FormatUSDOptions = {
  decimals?: number;
  compact?: boolean;
};

export function formatUSD(
  value: number | BigNumber | string | undefined,
  options?: FormatUSDOptions,
): string | undefined {
  let val = value;

  if (val === undefined || val === null) {
    return undefined;
  }

  if (typeof val === 'string') {
    val = Number(val);
  }

  if (BigNumber.isBigNumber(val)) {
    if (val.isNaN()) {
      return undefined;
    }
  } else if (typeof val === 'number') {
    if (!Number.isFinite(val)) {
      return undefined;
    }
  }

  const { decimals = 2, compact = false } = options ?? {};

  if (0 > decimals || decimals > 20) {
    console.trace(`Decimals value is out of range 0..20 (value: ${decimals})`);
    return undefined;
  }

  let str = '';

  if (compact) {
    str = Intl.NumberFormat('en', {
      notation: 'compact',
      maximumFractionDigits: decimals !== 0 ? decimals : undefined,
    }).format(BigNumber.isBigNumber(val) ? val.toNumber() : val);
  } else {
    str = new BigNumber(val.toFixed(decimals)).toFormat(decimals);
  }

  return `$${str}`;
}

export function formatUSDValue(value?: BigNumber | number, decimals = 2, minDecimals: number = decimals): string {
  if (value === undefined) {
    return '-';
  }

  const val = BigNumber.isBigNumber(value) ? value : new BigNumber(value);
  const formattedValue = formatBigValue(val.abs(), decimals, '-', minDecimals);

  return val.isPositive() ? `$${formattedValue}` : `-$${formattedValue}`;
}

export function shortenAddr(addr: string | undefined, first = 6, last = 4): string | undefined {
  return addr ? [String(addr).slice(0, first), String(addr).slice(-last)].join('...') : undefined;
}
