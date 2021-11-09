import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

export type BadgeProps = {
  className?: string;
  color?: 'green' | 'blue' | 'red' | 'grey' | 'purple';
  size?: 'small' | 'medium' | 'large';
};

export const Badge: React.FC<BadgeProps> = ({ color = 'grey', size = 'medium', children, className, ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.badge, className, s[color], s[size])} {...rest}>
      {children}
    </div>
  );
};

type SquareBadgeProps = {
  className?: string;
  color?: 'green' | 'blue' | 'red' | 'grey';
};

export const SquareBadge: React.FC<SquareBadgeProps> = ({ children, className, color = 'grey', ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.squareBadge, s[color], className)} {...rest}>
      {children}
    </div>
  );
};
