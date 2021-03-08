import React from 'react';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import AntdRadio, { RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import cn from 'classnames';

import s from './s.module.scss';

export type YesNoSelectorProps = AntdRadioGroupProps;

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
    <AntdRadio.Group
      className={cn(s.component, className)}
      options={YesNoOptions}
      optionType="button"
      buttonStyle="outline"
      {...groupProps}
    />
  );
};

export default YesNoSelector;
