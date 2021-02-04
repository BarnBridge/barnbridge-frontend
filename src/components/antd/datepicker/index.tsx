import React from 'react';
import generatePicker, {
  PickerProps as AntdPickerProps,
} from 'antd/lib/date-picker/generatePicker';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

import cx from 'classnames';

import s from './styles.module.scss';

export type DatePickerProps = AntdPickerProps<Date> & {};

const DateFNSPicker = generatePicker<Date>(dateFnsGenerateConfig);

const DatePicker: React.FunctionComponent<DatePickerProps> = props => {
  const { className, ...datePickerProps } = props;

  return (
    <DateFNSPicker
      className={cx(s.component, className)}
      dropdownClassName={s.dropdown}
      {...datePickerProps}
    />
  );
};

export default DatePicker;
