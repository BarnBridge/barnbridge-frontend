import React from 'react';
import AntdButton, { ButtonProps as AntdButtonProps, ButtonType as AntdButtonType } from 'antd/lib/button';
import cn from 'classnames';

import s from './s.module.scss';

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
    <AntdButton
      className={cn(s.component, className, type === 'light' && s.light, type === 'select' && s.select)}
      type={btnType}
      {...btnProps}>
      {props.children}
    </AntdButton>
  );
};

export default Button;
