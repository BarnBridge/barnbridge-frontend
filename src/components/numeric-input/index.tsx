import React, { ChangeEvent } from 'react';
import * as Antd from 'antd';
import { InputProps } from 'antd/lib/input/Input';

import s from './styles.module.css';

export type NumericInputProps = InputProps;

const NumericInput: React.FunctionComponent<NumericInputProps> = props => {
  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    if (/^\d*(\.\d*)?$/.test(value)) {
      props.onChange?.(event);
    }
  }

  return (
    <Antd.Input
      {...props}
      className={s.component}
      onChange={handleOnChange}
    />
  );
};

export default NumericInput;
