import classNames from 'classnames';

import { Icon } from 'components/icon';

import s from './s.module.scss';

type PropsType = {
  spinning?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const Spinner: React.FC<PropsType> = ({ className, children, spinning, ...restProps }) => {
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

type PageSpinnerProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const PageSpinner: React.FC<PageSpinnerProps> = ({ className, ...restProps }) => (
  <div className={s.pageSpinnerContainer}>
    <Icon name="loader" className={classNames(s.spinner, className)} {...restProps} />
  </div>
);
