import { useMemo } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import s from './s.module.scss';

type InputPropsType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  /** "size" prop sounds better, but this word already reserved in input props */
  dimension?: 'normal' | 'large';
  before?: React.ReactNode;
};

export const Input: React.FC<InputPropsType> = ({ id, before, className, dimension = 'normal', ...rest }) => {
  const inputId = useMemo(() => id ?? nanoid(), [id]);
  return (
    <label htmlFor={inputId} className={classNames(s.inputWrapper, className)}>
      {before && <div className={classNames(s.before, s[dimension])}>{before}</div>}
      <input type="text" id={inputId} className={classNames(s.input, s[dimension])} {...rest} />
    </label>
  );
};
