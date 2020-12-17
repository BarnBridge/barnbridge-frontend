import React from 'react';
import * as Antd from 'antd';
import { DatePickerProps as AntdDatePickerProps } from 'antd/lib/date-picker';
import cx from 'classnames';

import s from './styles.module.scss';

export type DatePickerProps = AntdDatePickerProps & {};

const DatePicker: React.FunctionComponent<DatePickerProps> = props => {
  const { className, ...datePickerProps } = props;

  return (
    <Antd.DatePicker
      className={cx(s.component, className)}
      {...datePickerProps} />
  );
};

export default DatePicker;
