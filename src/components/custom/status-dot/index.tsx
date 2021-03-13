import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

export type StatusTagProps = {
  color: 'red' | 'green' | 'blue' | 'purple';
  className?: string;
};

const StatusDot: React.FC<StatusTagProps> = props => {
  const { color, className } = props;

  return <div className={cn(s.statusDot, s[color], className)} />;
};

export default StatusDot;
