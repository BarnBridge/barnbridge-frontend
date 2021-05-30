/// <reference types="react-scripts" />
declare module 'bignumber.js' {
  export default class BigNumber {
    static ZERO: BigNumber;
    static MAX_UINT_256: BigNumber;
    static from(value?: BigNumber.Value): BigNumber | undefined;
    static parse: (value: BigNumber.Value) => BigNumber;
    static sumEach: <T = any>(items: T[], predicate: (item: T) => BigNumber | undefined) => BigNumber | undefined;

    scaleBy(decimals?: number): BigNumber | undefined;

    unscaleBy(decimals?: number): BigNumber | undefined;
  }
}

export {};
