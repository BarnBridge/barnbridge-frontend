import { useMemo } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import { Text } from 'components/custom/typography';

import s from './s.module.scss';

type PropsType = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  indeterminate?: boolean;
  size?: 'normal' | 'small';
};

export const Checkbox: React.FC<PropsType> = ({ checked, onChange, indeterminate, size = 'normal', children }) => {
  const id = useMemo(() => nanoid(), []);
  return (
    <label
      className={classNames(s.checkbox, s[`size-${size}`], {
        [s.checked]: checked,
        [s.hasChildren]: !!children,
      })}
      htmlFor={id}>
      <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      <svg fill="none" viewBox="0 0 24 24" width={24} height={24}>
        <path
          stroke={checked ? '#fff' : 'transparent'}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M19 7.667l-8.626 8.626a1 1 0 01-1.414 0L5 12.333"
        />
      </svg>
      {children ? (
        <Text type="p2" weight="semibold">
          {children}
        </Text>
      ) : null}
    </label>
  );
};
