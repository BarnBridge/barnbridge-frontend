import React, { SyntheticEvent } from 'react';
import * as Antd from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import BigNumber from 'bignumber.js';

import s from './styles.module.css';

export type NumericInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: string | number | undefined;
  numberFormat?: Intl.NumberFormatOptions;
  onChange: (value: string | undefined, ev?: SyntheticEvent) => void;
};

const NumericInput: React.FunctionComponent<NumericInputProps> = props => {
  const { numberFormat, ...rest } = props;

  function handleOnKeyDown(event: React.KeyboardEvent) {
    event.persist();

    if (event.key === '.') {
      return;
    }

    if (event.key === 'Backspace') {
      return;
    }

    if (!isNaN(parseInt(event.key))) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (/^(\d*,?)*(\.\d*)?$/gm.test(value)) {
      let newValue = value.replace(/,/gi, '');

      try {
        const bgn = new BigNumber(newValue);

        if (bgn.decimalPlaces() > props.numberFormat?.maximumFractionDigits! ?? 18) {
          return;
        }

        let rtnValue = new BigNumber(bgn.toFixed(props.numberFormat?.maximumFractionDigits ?? 18)).toFormat();

        const match = newValue.match(/(\.$)|(\.)\d*0$/gi);

        if (match) {
          newValue = value.replace(/(\.\w*)/gi, '');
          rtnValue = newValue + match[0];
        }

        props.onChange?.(rtnValue, event);
      } catch {
      }
    }
  }

  const value = React.useMemo(() => {
    try {
      let val = String(props.value).replace(/,/gi, '');
      const bgn = new BigNumber(val);

      if (isNaN(bgn.toNumber())) {
        return undefined;
      }

      let newValue = new BigNumber(bgn.toFixed(props.numberFormat?.maximumFractionDigits ?? 18)).toFormat();

      const match = String(props.value).match(/(\.$)|(\.)\d*0$/gi);

      if (match) {
        val = String(props.value).replace(/(\.\w*)/gi, '');
        newValue = val + match[0];
      }

      return newValue;
    } catch (e) {
    }
  }, [props.value, props.numberFormat]);

  return (
    <Antd.Input
      {...rest}
      className={s.component}
      onKeyDown={handleOnKeyDown}
      onChange={handleOnChange}
      value={value}
    />
  );
};

export default NumericInput;
