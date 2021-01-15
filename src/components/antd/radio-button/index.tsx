import React from 'react';
import * as Antd from 'antd';
import { RadioProps as AntdRadioProps } from 'antd/lib/radio';
import cx from 'classnames';

import Grid from 'components/custom/grid';

import s from './styles.module.scss';

export type RadioButtonProps = {
  label: React.ReactNode;
  hint?: React.ReactNode;
};

const RadioButton: React.FunctionComponent<AntdRadioProps & RadioButtonProps> = props => {
  const { label, hint, className, ...radioProps } = props;

  return (
    <Antd.Radio className={cx(s.component, className)} {...radioProps}>
      <Grid flow="row" gap={4}>
        {label}
        {hint}
      </Grid>
    </Antd.Radio>
  );
};

export default RadioButton;
