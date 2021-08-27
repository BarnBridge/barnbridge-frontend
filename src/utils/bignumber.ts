import BigNumber from 'bignumber.js';

BigNumber.ZERO = new BigNumber(0);
BigNumber.MAX_UINT_256 = new BigNumber(2).pow(256).minus(1);

BigNumber.from = (value: BigNumber.Value | undefined): BigNumber | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }

  const bnValue = new BigNumber(value);

  if (bnValue.isNaN()) {
    return undefined;
  }

  return bnValue;
};

BigNumber.parse = (value: BigNumber.Value) => {
  return new BigNumber(value);
};

BigNumber.sumEach = <T = any>(items: T[], predicate: (item: T) => BigNumber | undefined): BigNumber | undefined => {
  let sum = BigNumber.ZERO;

  for (let item of items) {
    const val = predicate?.(item);

    if (!val || val.isNaN()) {
      return undefined;
    }

    sum = sum.plus(val);
  }

  return sum;
};

BigNumber.prototype.scaleBy = function (decimals?: number): BigNumber | undefined {
  if (decimals === undefined) {
    return undefined;
  }

  return this.multipliedBy(10 ** decimals);
};

BigNumber.prototype.unscaleBy = function (decimals?: number): BigNumber | undefined {
  if (decimals === undefined) {
    return undefined;
  }

  return this.dividedBy(10 ** decimals);
};

BigNumber.prototype.round = function (): BigNumber {
  return new BigNumber(this.toPrecision(1, 0));
};
