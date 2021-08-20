import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type Props = {
  children?: any;
  selected?: boolean;
  onClick: (e: any) => void;
};

export const RadioCard: React.FC<Props> = props => {
  const { children, selected = false, ...rest } = props;

  return (
    <button type="button" className={cn(s.card, { [s.selected]: selected })} {...rest}>
      {children}
    </button>
  );
};

export const RadioCards: React.FC<{ className?: string }> = ({ className, ...rest }) => (
  <div className={cn(s.cards, className)} {...rest} />
);
