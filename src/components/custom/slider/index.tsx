import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Slider: React.FC<Props> = ({ className, value, ...rest }) => {
  const max = Number(rest.max) || 0;
  const slicedMax = Math.floor(max * 1e6) / 1e6;
  const slicedValue = Math.floor(Number(value) * 1e6) / 1e6;
  const percent = (slicedValue / slicedMax) * 100 || 0;
  const disabled = slicedMax === 0;

  return (
    <input
      {...rest}
      type="range"
      className={cn(s.input, className)}
      style={{ '--track-fill': `${!disabled ? percent : 0}%` } as React.CSSProperties}
      max={disabled ? 1 : slicedMax}
      disabled={disabled}
      value={!disabled ? value || '0' : '0'}
    />
  );
};
