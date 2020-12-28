import React from 'react';
import { DatePickerProps as AntdDatePickerProps } from 'antd/lib/date-picker';
import generatePicker from 'antd/lib/date-picker/generatePicker';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

import cx from 'classnames';

import s from './styles.module.scss';

export type DatePickerProps = AntdDatePickerProps & {};

const DateFNSPicker = generatePicker<Date>(dateFnsGenerateConfig);

const DatePicker: React.FunctionComponent<DatePickerProps> = props => {
  const { className, ...datePickerProps } = props;

  return (
    <DateFNSPicker
      className={cx(s.component, className)}
      {...datePickerProps} />
  );
};

export default DatePicker;
