import React from 'react';
import * as Antd from 'antd';
import {
  OptionProps as AntdOptionProps,
  SelectProps as AntdSelectProps,
  SelectValue as AntdSelectValue,
} from 'antd/lib/select';
import cx from 'classnames';

import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import s from './styles.module.scss';

export type SelectOption = Partial<AntdOptionProps> & {
  label: React.ReactNode;
  value: string | number;
};

export type SelectProps<T> = AntdSelectProps<T> & {
  label?: React.ReactNode;
  options: SelectOption[];
  fixScroll?: boolean;
};

const Select = <T extends AntdSelectValue>(props: SelectProps<T>) => {
  const { className, label, loading, options, fixScroll, ...selectProps } = props;

  return (
    <Antd.Select<T>
      className={cx(s.component, className)}
      dropdownClassName={s.dropdown}
      suffixIcon={loading ? <Antd.Spin size="small" /> : <Icons name="dropdown-arrow" />}
      optionLabelProp="label"
      getPopupContainer={fixScroll ? trigger => trigger.parentNode : undefined}
      {...selectProps}>
      {options.map(option => (
        <Antd.Select.Option
          {...option}
          key={option.value}
          label={
            <Grid flow="col" gap={12}>
              {label && (
                <Text type="p2" color="secondary">
                  {label}
                </Text>
              )}
              <Text type="p2" weight="semibold" color="primary">
                {option.label}
              </Text>
            </Grid>
          }
          value={option.value}>
          {option.label}
        </Antd.Select.Option>
      ))}
    </Antd.Select>
  );
};

export default Select;
