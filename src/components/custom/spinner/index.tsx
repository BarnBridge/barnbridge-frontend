import classNames from 'classnames';

import { Icon } from 'components/icon';
import { FCx } from 'components/types.tx';

import s from './s.module.scss';

type PropsType = {
  spinning?: boolean;
};

export const Spinner: FCx<PropsType> = ({ className, children, spinning, ...restProps }) => {
  if (children) {
    if (spinning) {
      return (
        <div className={s.container}>
          <div className={s.children}>{children}</div>
          <Icon name="loader" className={classNames(s.spinner, className)} {...restProps} />
        </div>
      );
    }

    return <>{children}</>;
  }

  return <Icon name="loader" className={classNames(s.spinner, className)} {...restProps} />;
};
