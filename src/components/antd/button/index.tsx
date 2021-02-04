import React from 'react';
import * as Antd from 'antd';
import { ButtonProps as AntdButtonProps, ButtonType as AntdButtonType } from 'antd/lib/button';
import cx from 'classnames';

import s from './styles.module.scss';

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type: 'default' | 'primary' | 'ghost' | 'link' | 'light';
};

const Button: React.FunctionComponent<ButtonProps> = props => {
  const { children, className, type, ...btnProps } = props;

  let btnType: AntdButtonType = 'default';

  if (type === 'light') {
    btnType = 'link';
  } else {
    btnType = type;
  }

  console.log(type === 'light', s.light);

  return (
    <Antd.Button
      className={cx(s.component, className, type === 'light' && s.light)}
      type={btnType}
      {...btnProps}>
      {props.children}
    </Antd.Button>
  );
};

export default Button;
