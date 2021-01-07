import React from 'react';
import * as Antd from 'antd';
import { AlertProps as AntdAlertProps } from 'antd/lib/alert';
import cx from 'classnames';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/icons/info-circle.svg';
import { ReactComponent as ErrorTriangleSvg } from 'resources/svg/icons/error-triangle.svg';

import s from './styles.module.scss';

export type AlertProps = AntdAlertProps & {};

const Alert: React.FunctionComponent<AlertProps> = props => {
  const { className, type = 'info', ...alertProps } = props;

  const icon = React.useMemo<React.ReactNode>(() => {
    switch (props.type) {
      case 'success':
        return undefined;
      case 'info':
        return <InfoCircleSvg />;
      case 'warning':
        return undefined;
      case 'error':
        return <ErrorTriangleSvg />;
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
