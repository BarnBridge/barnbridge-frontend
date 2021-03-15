import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type Props = {
  children?: number;
  className?: string;
};

const Badge: React.FC<Props> = ({ children, className, ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.badge, className)} {...rest}>
      {children}
    </div>
  );
};

export default Badge;
