import React from 'react';
import * as Antd from 'antd';
import { SliderSingleProps } from 'antd/lib/slider';
import cx from 'classnames';

import s from './styles.module.scss';

export type SliderProps = SliderSingleProps & {};

const Slider: React.FC<SliderProps> = props => {
  const { className, ...rest } = props;

  return (
    <Antd.Slider
      className={cx(s.component, className)}
      tooltipPlacement="bottom"
      {...rest}
    />
  );
};

export default Slider;
