import React from 'react';
import cx from 'classnames';

import Button, { ButtonProps } from 'components/antd/button';
import Grid from 'components/custom/grid';
import NumericInput, {
  NumericInputProps,
} from 'components/custom/numeric-input';
import Icons, { TokenIconNames } from 'components/custom/icon';

import s from './styles.module.scss';

export type TokenAmountProps = NumericInputProps & {
  className?: string;
  tokenIcon?: TokenIconNames;
  maxProps?: ButtonProps;
};

const TokenAmount: React.FunctionComponent<TokenAmountProps> = props => {
  const { className, tokenIcon, maxProps, ...rest } = props;

  const addonBefore = React.useMemo(
    () => (
      <Grid flow="col" gap={4}>
        {tokenIcon && <Icons name={tokenIcon} width={24} height={24} />}
      </Grid>
    ),
    [tokenIcon],
  );

  const addonAfter = React.useMemo(
    () => (
      <Button type="default" className={s.maxBtn} {...maxProps}>
        MAX
      </Button>
    ),
    [maxProps],
  );

  return (
    <NumericInput
      className={cx(s.component, className)}
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      {...rest}
    />
  );
};

export default TokenAmount;
