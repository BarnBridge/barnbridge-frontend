import React from 'react';
import AntdRadio, { RadioProps as AntdRadioProps } from 'antd/lib/radio';
import cn from 'classnames';

import Grid from 'components/custom/grid';

import s from './s.module.scss';

export type RadioButtonProps = {
  label: React.ReactNode;
  hint?: React.ReactNode;
};

const RadioButton: React.FC<AntdRadioProps & RadioButtonProps> = props => {
  const { label, hint, className, ...radioProps } = props;

  return (
    <AntdRadio className={cn(s.component, className)} {...radioProps}>
      <Grid flow="row" gap={4}>
        {label}
        {hint}
      </Grid>
    </AntdRadio>
  );
};

export default RadioButton;
