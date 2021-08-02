import React from 'react';
import AntdSelect, {
  OptionProps as AntdOptionProps,
  SelectProps as AntdSelectProps,
  SelectValue as AntdSelectValue,
} from 'antd/lib/select';
import AntdSpin from 'antd/lib/spin';
import cn from 'classnames';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';

import s from './s.module.scss';

export type SelectOption = Partial<AntdOptionProps> & {
  label: React.ReactNode;
  value: string | number;
};

export type SelectProps<T> = AntdSelectProps<T> & {
  label?: React.ReactNode;
  options: SelectOption[];
  fixScroll?: boolean;
};

const Select: React.FC<SelectProps<AntdSelectValue>> = <T extends AntdSelectValue>(
  props: React.PropsWithChildren<SelectProps<T>>,
) => {
  const { className, label, loading, options, fixScroll, ...selectProps } = props;

  return (
    <AntdSelect<T>
      className={cn(s.component, className)}
      dropdownClassName={s.dropdown}
      suffixIcon={loading ? <AntdSpin size="small" /> : <Icon name="dropdown" />}
      optionLabelProp="label"
      getPopupContainer={fixScroll ? trigger => trigger.parentNode : undefined}
      {...selectProps}>
      {options.map(option => (
        <AntdSelect.Option
          {...option}
          className={s.option}
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
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
};

export default Select;
