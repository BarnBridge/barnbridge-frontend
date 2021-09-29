import BN from 'bignumber.js/bignumber';

declare module 'bignumber.js' {
  export default class BigNumber extends BN {
    static ZERO: BigNumber;
    static MAX_UINT_256: BigNumber;

    static from(value?: BN.Value): BigNumber | undefined;

    static parse(value: BN.Value): BigNumber;

    static sumEach<T = any>(items: T[], predicate: (item: T) => BigNumber | undefined): BigNumber | undefined;

    scaleBy(decimals?: number): BigNumber | undefined;

    unscaleBy(decimals?: number): BigNumber | undefined;

    round(): BigNumber;
  }
}

declare module 'valirator' {
  namespace Module {
    function validate(schema: any, values: any): any;
  }

  export = Module;
}

declare module 'outy' {
  export default function outy(
    nodes: HTMLElement[],
    types: (Event | MouseEvent | TouchEvent)[],
    eventHandler: Function,
  ): { remove: () => void };
}
