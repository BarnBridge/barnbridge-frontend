import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Slider: React.FC<Props> = ({ className, value, ...rest }) => {
  const max = Number(rest.max) || 10;
  const percent = (Number(value) / max) * 100;
  return (
    <input
      {...rest}
      value={value || '0'}
      className={cn(s.input, className)}
      type="range"
      style={{ '--track-fill': `${percent}%` } as React.CSSProperties}
    />
  );
};
