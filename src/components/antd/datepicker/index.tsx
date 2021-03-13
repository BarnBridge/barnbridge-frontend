import React from 'react';
import generatePicker, { PickerProps as AntdPickerProps } from 'antd/lib/date-picker/generatePicker';
import cn from 'classnames';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

import s from './s.module.scss';

export type DatePickerProps = AntdPickerProps<Date>;

const DateFNSPicker = generatePicker<Date>(dateFnsGenerateConfig);

const DatePicker: React.FC<DatePickerProps> = props => {
  const { className, ...datePickerProps } = props;

  return <DateFNSPicker className={cn(s.component, className)} dropdownClassName={s.dropdown} {...datePickerProps} />;
};

export default DatePicker;
