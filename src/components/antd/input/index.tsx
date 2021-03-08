import React from 'react';
import AntdInput, { InputProps as AntdInputProps } from 'antd/lib/input';
import cn from 'classnames';

import s from './s.module.scss';

export type InputProps = AntdInputProps;

const Input: React.FC<InputProps> = props => {
  const { className, disabled, ...inputProps } = props;

  return (
    <AntdInput
      className={cn(s.component, className, disabled && s.disabled)}
      disabled={disabled}
      autoComplete="off"
      {...inputProps}
    />
  );
};

export default Input;
