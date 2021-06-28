import classNames from 'classnames';

import Icon from 'components/custom/icon';

import s from './s.module.scss';

type PropsType = {
  className?: string;
  style?: React.CSSProperties;
};

export const Spinner: React.FC<PropsType> = ({ className, ...restProps }) => (
  <Icon name="loader" className={classNames(s.spinner, className)} {...restProps} />
);
