import React from 'react';
import cx from 'classnames';

import s from './styles.module.css';

export type IconsSetProps = {
  icons: React.ComponentType<any>[];
  className?: string;
};

const IconsSet: React.FunctionComponent<IconsSetProps> = props => {
  return (
    <div className={cx(s.component, props.className)}>
      {props.icons?.map((C, idx) =>
        React.createElement(C, { key: idx }, null),
      )}
    </div>
  );
};

export default IconsSet;
