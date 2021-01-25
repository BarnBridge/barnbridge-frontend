import { Interface, FunctionFragment, Result, defaultAbiCoder } from '@ethersproject/abi';

export type AbiInterfaceType = Interface;
export type AbiFragmentType = FunctionFragment;
export type AbiDecodeResult = Result;
export type AbiFunctionFragment = FunctionFragment;

export class AbiInterface {
  abi: AbiInterfaceType;

  constructor(abi: any) {
    this.abi = new Interface(abi);
  }

  get writableFunctions(): AbiFragmentType[] {
    return Object.values(this.abi.functions)
      .filter(fn => !['view', 'pure'].includes(fn.stateMutability));
  }

  encodeFunctionData(functionFragment: AbiFunctionFragment | string, values?: Array<any>): string {
    return this.abi.encodeFunctionData(functionFragment, values);
  }

  static encodeFunctionData(functionFragment: AbiFunctionFragment | string, data: Array<any>): string | undefined {
    try {
      const fragment = typeof functionFragment === 'string'
        ? FunctionFragment.fromString(functionFragment)
        : functionFragment;
      return defaultAbiCoder.encode(fragment.inputs, data.map(dt => {
        try {
          return JSON.parse(dt);
        } catch {
          return dt;
        }
      }));
    } catch (e) {
      console.error('AbiInterface::encodeFunctionData', e.message);
    }
  }

  static decodeFunctionData(functionFragment: AbiFunctionFragment | string, data: string): AbiDecodeResult | undefined {
    try {
      const fragment = typeof functionFragment === 'string'
        ? FunctionFragment.fromString(functionFragment)
        : functionFragment;
      const hexData = data.indexOf('0x') !== 0
        ? `0x${data}`
        : data;
      return defaultAbiCoder.decode(fragment.inputs, hexData);
    } catch (e) {
      console.error('AbiInterface::decodeFunctionData', e.message);
    }
  }

  static getFunctionFragmentFrom(signature: string): AbiFunctionFragment | undefined {
    try {
      return FunctionFragment.fromString(signature);
    } catch (e) {
      console.error('AbiInterface::getFunctionFragmentFrom', e.message);
    }
  }

  static stringifyParamValue(param: Record<string, any>): string | undefined {
    try {
      if (Array.isArray(param)) {
        return JSON.stringify(param, null, 2);
      } else if (typeof param?.toString === 'function') {
        return param.toString();
      }

      return JSON.stringify(param, null, 2);
    } catch (e) {
      console.error('AbiInterface::stringifyParamValue', e.message);
    }
  }
}