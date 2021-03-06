import React from 'react';
import * as Antd from 'antd';
import { AlertProps as AntdAlertProps } from 'antd/lib/alert';
import cn from 'classnames';

import Icons from 'components/custom/icon';

import s from './styles.module.scss';

export type AlertProps = AntdAlertProps & {};

const Alert: React.FC<AlertProps> = props => {
  const { className, type = 'info', ...alertProps } = props;

  const icon = React.useMemo<React.ReactNode>(() => {
    switch (type) {
      case 'info':
        return <Icons name="info-outlined" />;
      default:
        return undefined;
    }
  }, [type]);

  return <Antd.Alert className={cn(s.component, className)} type={type} showIcon icon={icon} {...alertProps} />;
};

export default Alert;
