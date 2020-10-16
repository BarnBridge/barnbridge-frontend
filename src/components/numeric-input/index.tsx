import React from 'react';
import * as Antd from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import BigNumber from 'bignumber.js';

import s from './styles.module.css';

export type NumericInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  value: BigNumber | undefined;
  maximumFractionDigits?: number;
  onChange: (value: BigNumber | undefined) => void;
};

function removeComma(value: string): string {
  return value.replace(/,/g, '');
}

const NumericInput: React.FunctionComponent<NumericInputProps> = props => {
  const { maximumFractionDigits, ...inputProps } = props;

  const [, forceRender] = React.useState<{}>({});
  const valueRef = React.useRef<string>('');
  const onChangeRef = React.useRef<Function | undefined>();
  onChangeRef.current = props.onChange;

  const stateVal = valueRef.current;

  React.useEffect(() => {
    const val = props.value;

    valueRef.current = val !== undefined ? val.toFormat() : '';
    forceRender({});
  }, [props.value]);

  React.useEffect(() => {
    if (valueRef.current === '') {
      onChangeRef.current?.(undefined);
      return;
    }

    const val = removeComma(valueRef.current);
    const bnValue = new BigNumber(val);

    if (removeComma(bnValue.toFormat()) !== val) {
      return;
    }

    valueRef.current = bnValue.toFormat();
    onChangeRef.current?.(bnValue);
  }, [stateVal]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value;

    let rx = `^[,|\\d*]*(\\.\\d*)?$`;

    if (props.maximumFractionDigits) {
      rx = `^[,|\\d*]*(\\.\\d{0,${props.maximumFractionDigits}})?$`;
    }

    if (new RegExp(rx, 'g').test(val)) {
      valueRef.current = val;
      forceRender({});
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const val = removeComma(event.target.value);

    if (val === '' || val === '.') {
      valueRef.current = '';
      onChangeRef.current?.(undefined);
      forceRender({});
      return;
    }

    const bnValue = new BigNumber(val);

    if (bnValue.toFormat() !== val) {
      onChangeRef.current?.(bnValue);
    }
  }

  return (
    <Antd.Input
      {...inputProps}
      className={s.component}
      onChange={handleChange}
      onBlur={handleBlur}
      value={valueRef.current}
    />
  );
};

export default NumericInput;
