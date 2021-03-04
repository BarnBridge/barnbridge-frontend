import React from 'react';
import * as Antd from 'antd';
import { DividerProps as AntdDividerProps } from 'antd/lib/divider';
import cn from 'classnames';

import s from './styles.module.scss';

const Divider: React.FC<AntdDividerProps> = props => {
  const { className, ...dividerProps } = props;

  return <Antd.Divider className={cn(s.divider, className)} {...dividerProps} />;
};

export default Divider;
