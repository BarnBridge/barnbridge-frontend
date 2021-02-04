import React from 'react';
import * as Antd from 'antd';
import {
  SelectProps as AntdSelectProps,
  SelectValue as AntdSelectValue,
  OptionProps as AntdOptionProps,
} from 'antd/lib/select';
import cx from 'classnames';

import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Paragraph } from 'components/custom/typography';

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
    <div className={s.component}>
      {loading && <Antd.Spin className={s.spin} />}
      <Antd.Select<T>
        className={cx(s.select, className, loading && s.loading)}
        dropdownClassName={s.dropdown}
        suffixIcon={<Icons name="dropdown-arrow" />}
        optionLabelProp="label"
        getPopupContainer={fixScroll ? trigger => trigger.parentNode : undefined}
        {...selectProps}>
        {options.map(option => (
          <Antd.Select.Option
            {...option}
            key={option.value}
            label={
              <Grid flow="col" gap={12}>
                {label && <Paragraph type="p2">{label}</Paragraph>}
                <Paragraph type="p2" semiBold>
                  {option.label}
                </Paragraph>
              </Grid>
            }
            value={option.value}>
            {option.label}
          </Antd.Select.Option>
        ))}
      </Antd.Select>
    </div>
  );
};

export default Select;
