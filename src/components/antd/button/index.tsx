import React from 'react';
import * as Antd from 'antd';
import { ButtonProps as AntdButtonProps, ButtonType as AntdButtonType } from 'antd/lib/button';
import cx from 'classnames';

import s from './styles.module.scss';

export type ButtonProps = Omit<AntdButtonProps, 'type'> & {
  type: 'default' | 'primary' | 'ghost' | 'link' | 'light' | 'select';
};

const Button: React.FC<ButtonProps> = props => {
  const { children, className, type, ...btnProps } = props;

  let btnType: AntdButtonType;

  if (type === 'light') {
    btnType = 'link';
  } else if (type === 'select') {
    btnType = 'ghost';
  } else {
    btnType = type;
  }

  return (
    <Antd.Button
      className={cx(
        s.component,
        className,
        type === 'light' && s.light,
        type === 'select' && s.select,
      )}
      type={btnType}
      {...btnProps}>
      {props.children}
    </Antd.Button>
  );
};

export default Button;
