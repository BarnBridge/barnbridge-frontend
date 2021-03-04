import React from 'react';
import * as Antd from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import cn from 'classnames';

import s from './styles.module.scss';

export type TextareaProps = AntdTextAreaProps;

const Textarea: React.FC<TextareaProps> = props => {
  const { className, ...inputProps } = props;

  return <Antd.Input.TextArea className={cn(s.component, className)} {...inputProps} />;
};

export default Textarea;
