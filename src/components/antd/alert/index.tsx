import React from 'react';
import * as Antd from 'antd';
import { AlertProps as AntdAlertProps } from 'antd/lib/alert';
import cx from 'classnames';

import Icon from 'components/custom/icon';

import s from './styles.module.scss';

export type AlertProps = AntdAlertProps & {};

const Alert: React.FunctionComponent<AlertProps> = props => {
  const { className, type = 'info', ...alertProps } = props;

  const icon = React.useMemo<React.ReactNode>(() => {
    switch (type) {
      case 'info':
        return <Icon type="info-circle" />;
      case 'success':
      case 'warning':
      case 'error':
        return undefined;
    }
  }, [type]);

  return (
    <Antd.Alert
      className={cx(s.component, className)}
      type={type}
      showIcon
      icon={icon}
      {...alertProps}
    />
  );
};

export default Alert;
