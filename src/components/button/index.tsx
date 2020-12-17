import React from 'react';
import * as Antd from 'antd';
import { ButtonProps as AntdButtonProps } from 'antd/lib/button';
import cx from 'classnames';

import s from 'components/button/styles.module.scss';

export type ButtonProps = AntdButtonProps & {};

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { children, className, ...rest } = props;

  return (
    <Antd.Button className={cx(s.component, className)} type="default" {...rest}>
      {props.children}
    </Antd.Button>
  );
};

export default Button;
