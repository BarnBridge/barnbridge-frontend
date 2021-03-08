import React from 'react';
import AntdSlider, { SliderSingleProps } from 'antd/lib/slider';
import cn from 'classnames';

import s from './s.module.scss';

export type SliderProps = SliderSingleProps;

const Slider: React.FC<SliderProps> = props => {
  const { className, ...rest } = props;

  return <AntdSlider className={cn(s.component, className)} tooltipPlacement="bottom" {...rest} />;
};

export default Slider;
