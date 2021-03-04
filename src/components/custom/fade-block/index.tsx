import React from 'react';
import cn from 'classnames';

import s from './styles.module.scss';

export type FadeBlockProps = {
  className?: string;
  visible: boolean;
};

const FadeBlock: React.FC<FadeBlockProps> = props => {
  return (
    <div
      className={cn(s.component, props.className, {
        [s.visible]: props.visible,
      })}>
      {props.children}
    </div>
  );
};

export default FadeBlock;
