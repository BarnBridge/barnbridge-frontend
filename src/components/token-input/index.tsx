import React from 'react';
import * as Antd from 'antd';
import { InputProps as AntdInputProps } from 'antd/lib/input/Input';
import cx from 'classnames';
import Web3 from 'web3';

import Identicon from 'components/identicon';

import s from './styles.module.scss';

export type TokenInputProps = AntdInputProps & {};

const TokenInput: React.FunctionComponent<TokenInputProps> = props => {
  const { className, value, ...inputProps } = props;

  const addonBefore = React.useMemo(() => Web3.utils.isAddress(String(value)) ? (
    <Identicon address={String(value)} className={s.addonBefore} />
  ) : <div className={s.addonBefore} />, [value]);

  return (
    <Antd.Input
      className={cx(s.component, className)}
      addonBefore={addonBefore}
      value={value}
      {...inputProps}
    />
  );
};

export default TokenInput;
