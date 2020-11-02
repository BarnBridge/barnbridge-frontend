import React from 'react';
import cx from 'classnames';

import s from './styles.module.css';

export type IconsSetProps = {
  icons: React.ReactNode[];
  className?: string;
};

const IconsSet: React.FunctionComponent<IconsSetProps> = props => {
  return (
    <div className={cx(s.component, props.className)}>
      {props.icons}
    </div>
  );
};

export default IconsSet;
