import React from 'react';
import cx from 'classnames';

import Button, { ButtonProps } from 'components/antd/button';
import NumericInput, { NumericInputProps } from 'components/custom/numeric-input';

import s from './styles.module.scss';

export type TokenAmountProps = NumericInputProps & {
  className?: string;
  tokenIcon?: React.ReactNode;
  tokenLabel?: React.ReactNode | string;
  maxProps?: ButtonProps;
};

const TokenAmount: React.FunctionComponent<TokenAmountProps> = props => {
  const { className, tokenIcon, tokenLabel, maxProps, ...rest } = props;

  const addonBefore = React.useMemo(() => (
    <span className={s.addonBefore}>
      {tokenIcon}
      <span className={s.label}>{tokenLabel}</span>
    </span>
  ), [tokenIcon, tokenLabel]);

  const addonAfter = React.useMemo(() => (
    <Button className={s.addonAfter} {...maxProps}>MAX</Button>
  ), [maxProps]);

  return (
    <NumericInput
      className={cx(s.input, className)}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      {...rest}
    />
  );
};

export default TokenAmount;
