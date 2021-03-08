import React from 'react';
import AntdAlert, { AlertProps as AntdAlertProps } from 'antd/lib/alert';
import cn from 'classnames';

import Icon from 'components/custom/icon';

import s from './s.module.scss';

export type AlertProps = AntdAlertProps;

const Alert: React.FC<AlertProps> = props => {
  const { className, type = 'info', ...alertProps } = props;

  const icon = React.useMemo<React.ReactNode>(() => {
    switch (type) {
      case 'info':
        return <Icon name="info-outlined" />;
      default:
        return undefined;
    }
  }, [type]);

  return <AntdAlert className={cn(s.component, className)} type={type} showIcon icon={icon} {...alertProps} />;
};

export default Alert;
