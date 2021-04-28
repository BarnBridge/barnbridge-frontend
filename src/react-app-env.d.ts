/// <reference types="react-scripts" />

declare module 'bignumber.js' {
  export default class BigNumber {
    static ZERO: BigNumber;
    static MAX_UINT_256: BigNumber;
    static parse: (value: BigNumber.Value) => BigNumber;

    scaleBy(decimals?: number): BigNumber | undefined;

    unscaleBy(decimals?: number): BigNumber | undefined;
  }
}

export {};
