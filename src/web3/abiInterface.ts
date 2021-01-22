import { Interface, FunctionFragment, Fragment, Result, defaultAbiCoder } from '@ethersproject/abi';

export type AbiInterfaceType = Interface;
export type AbiFragmentType = FunctionFragment;
export type AbiDecodeResult = Result;

export class AbiInterface {
  abi: AbiInterfaceType;

  constructor(abi: any) {
    this.abi = new Interface(abi);
  }

  get writableFunctions(): AbiFragmentType[] {
    return Object.values(this.abi.functions)
      .filter(fn => !['view', 'pure'].includes(fn.stateMutability));
  }

  encodeFunctionData(functionFragment: FunctionFragment | string, values?: Array<any>): string {
    const result = this.abi.encodeFunctionData(functionFragment, values);
    return `0x${result.slice(10)}`;
  }

  static decodeFunctionData(functionFragment: FunctionFragment | string, data: string): AbiDecodeResult {
    const fragment = typeof functionFragment === 'string' ? FunctionFragment.fromString(functionFragment) : functionFragment;
    const hexData = data.indexOf('0x') !== 0 ? `0x${data}` : data;

    return defaultAbiCoder.decode(fragment.inputs, hexData);
  }

  static getFunctionFragmentFrom(signature: string): FunctionFragment {
    return FunctionFragment.fromString(signature);
  }
}