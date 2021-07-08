import classNames from 'classnames';

import Icon from 'components/custom/icon';
import { FCx } from 'components/types.tx';

import s from './s.module.scss';

export const Spinner: FCx = ({ className, ...restProps }) => (
  <Icon name="loader" className={classNames(s.spinner, className)} {...restProps} />
);
