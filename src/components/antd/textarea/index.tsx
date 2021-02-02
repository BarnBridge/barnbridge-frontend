import React from 'react';
import * as Antd from 'antd';
import { TextAreaProps as AntdTextAreaProps } from 'antd/lib/input';
import cx from 'classnames';

import s from './styles.module.scss';

export type TextareaProps = AntdTextAreaProps;

const Textarea: React.FunctionComponent<TextareaProps> = props => {
  const { className, ...inputProps } = props;

  return (
    <Antd.Input.TextArea
      className={cx(s.component, className)}
      {...inputProps}
    />
  );
};

export default Textarea;
