import React from 'react';
import * as Antd from 'antd';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import { RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import cx from 'classnames';

import s from './styles.module.scss';

export type YesNoSelectorProps = AntdRadioGroupProps & {};

const YesNoOptions: CheckboxOptionType[] = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

const YesNoSelector: React.FC<YesNoSelectorProps> = props => {
  const { className, ...groupProps } = props;

  return (
    <Antd.Radio.Group
      className={cx(s.component, className)}
      options={YesNoOptions}
      optionType="button"
      buttonStyle="outline"
      {...groupProps}
    />
  );
};

export default YesNoSelector;
