import React, { FC, forwardRef } from 'react';
import { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import cn from 'classnames';
import { isAddress } from 'web3-utils';

import Input from 'components/antd/input';
import Identicon from 'components/custom/identicon';

import s from './s.module.scss';

export type TokenInputProps = AntdInputProps;

export const TokenInput: FC<TokenInputProps> = forwardRef<HTMLInputElement, TokenInputProps>(props => {
  const { className, value, ...inputProps } = props;

  const addonBefore = React.useMemo(
    () => (isAddress(String(value)) ? <Identicon address={String(value)} width={24} height={24} /> : <div />),
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
});

export default TokenInput;
