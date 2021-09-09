import { useMemo } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import { Icon } from 'components/icon';

import s from './s.module.scss';

type InputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  /** "size" prop sounds better, but this word already reserved in input props */
  dimension?: 'normal' | 'large';
  before?: React.ReactNode;
};

export const Input: React.FC<InputPropsType> = ({ id, before, className, dimension = 'normal', ...rest }) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  const isSearch = rest.type === 'search';

  return (
    <label htmlFor={inputId} className={classNames(s.inputWrapper, className)}>
      {before && <div className={classNames(s.before, s[dimension])}>{before}</div>}
      {isSearch && <Icon name="search" size={16} className={s.searchIcon} color="icon" />}
      <input
        type="text"
        id={inputId}
        className={classNames(s.input, s[dimension], {
          [s.inputSearch]: isSearch,
        })}
        {...rest}
      />
    </label>
  );
};
