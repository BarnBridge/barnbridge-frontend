import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

export type IconsSetProps = {
  icons: React.ReactNode[];
  className?: string;
};

const IconsSet: React.FC<IconsSetProps> = props => {
  return <div className={cn(s.component, props.className)}>{props.icons}</div>;
};

export default IconsSet;
