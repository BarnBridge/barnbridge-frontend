import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type BadgeProps = {
  className?: string;
  color?: 'green' | 'blue' | 'red' | 'grey';
  size?: 'small' | 'medium';
};

export const Badge: React.FC<BadgeProps> = ({ color, size, children, className, ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.badge, className, s[color ?? ''], s[size ?? ''])} {...rest}>
      {children}
    </div>
  );
};

type SquareBadgeProps = {
  className?: string;
};

export const SquareBadge: React.FC<SquareBadgeProps> = ({ children, className, ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.squareBadge, className)} {...rest}>
      {children}
    </div>
  );
};
