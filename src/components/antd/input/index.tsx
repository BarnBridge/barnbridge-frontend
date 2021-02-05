import React from 'react';
import * as Antd from 'antd';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import cx from 'classnames';

import s from './styles.module.scss';

export type InputProps = AntdInputProps & {};

const Input: React.FunctionComponent<InputProps> = props => {
  const { className, disabled, ...inputProps } = props;

  return (
    <Antd.Input
      className={cx(s.component, className, disabled && s.disabled)}
      disabled={disabled}
      autoComplete="off"
      {...inputProps}
    />
  );
};

export default Input;
