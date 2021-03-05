import React from 'react';
import { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import cn from 'classnames';
import Web3 from 'web3';

import Input from 'components/antd/input';
import Identicon from 'components/custom/identicon';

import s from './styles.module.scss';

export type TokenInputProps = AntdInputProps & {};

const TokenInput: React.FC<TokenInputProps> = props => {
  const { className, value, ...inputProps } = props;

  const addonBefore = React.useMemo(
    () =>
      Web3.utils.isAddress(String(value)) ? <Identicon address={String(value)} width={24} height={24} /> : <div />,
    [value],
  );

  return (
    <Input
      className={cn(s.component, className)}
      size="large"
      addonBefore={addonBefore}
      value={value}
      {...inputProps}
    />
  );
};

export default TokenInput;
