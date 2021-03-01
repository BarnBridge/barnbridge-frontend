import React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export type StatusTagProps = {
  color: 'red' | 'green' | 'blue' | 'purple';
  className?: string;
};

const StatusDot: React.FC<StatusTagProps> = props => {
  const { color, className } = props;

  return <div className={cx(s.statusDot, s[color], className)} />;
};

export default StatusDot;
