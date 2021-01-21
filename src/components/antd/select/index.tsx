import React from 'react';
import * as Antd from 'antd';
import {
  SelectProps as AntdSelectProps,
  SelectValue as AntdSelectValue,
  OptionProps as AntdOptionProps,
} from 'antd/lib/select';
import { CaretDownOutlined } from '@ant-design/icons';
import cx from 'classnames';

import s from './styles.module.scss';

export type SelectProps<T> = AntdSelectProps<T> & {
  options: (Partial<AntdOptionProps> & {
    label: React.ReactNode;
    value: string | number;
  })[];
};

const Select = <T extends AntdSelectValue, >(props: SelectProps<T>) => {
  const { className, loading, options, ...selectProps } = props;

  return (
    <div className={s.component}>
      {loading && <Antd.Spin className={s.spin} />}
      <Antd.Select<T>
        className={cx(s.select, className, loading && s.loading)}
        suffixIcon={<CaretDownOutlined className={s.caret} />}
        {...selectProps}>
        {options.map(({ label, value, ...optProps }) => (
          <Antd.Select.Option key={value} value={value} {...optProps}>
            {label}
          </Antd.Select.Option>
        ))}
      </Antd.Select>
    </div>
  );
};

export default Select;
