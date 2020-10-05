import React from 'react';
import cx from 'classnames';

import s from './styles.module.css';

export type IconsSetProps = {
  icons: React.ReactNode[];
  className?: string;
};

const IconsSet: React.FunctionComponent<IconsSetProps> = props => {
  const { icons, className } = props;

  return (
    <div className={cx(s.component, className)}>
      {icons}
    </div>
  );
};

export default IconsSet;
