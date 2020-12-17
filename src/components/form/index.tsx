import React from 'react';
import * as Antd from 'antd';
import { FormProps as AntdFormProps, FormItemProps as AntdFormItemProps } from 'antd/lib/form';
import cx from 'classnames';

import { ReactComponent as InfoCircleSvg } from 'resources/svg/icons/info-circle.svg';

import s from './styles.module.scss';

export type FormItemProps = AntdFormItemProps<any> & {
  hint?: string;
};

const FormItem: React.FunctionComponent<FormItemProps> = props => {
  const { className, hint, children, ...itemProps } = props;

  return (
    <Antd.Form.Item
      className={cx(s.item, className)}
      tooltip={hint ? {
        icon: <InfoCircleSvg />,
        title: hint,
      } : undefined}
      {...itemProps}>
      {children}
    </Antd.Form.Item>
  );
};

export type FormProps = AntdFormProps & {};

const Form: React.FunctionComponent<FormProps> = props => {
  const { className, children, ...formProps } = props;

  return (
    <Antd.Form
      className={cx(s.form, className)}
      layout="vertical"
      requiredMark={false}
      {...formProps}>
      {children}
    </Antd.Form>
  );
};

export type StaticFormProps = {
  Item: React.FunctionComponent<FormItemProps>;
};

(Form as any as StaticFormProps).Item = FormItem;

export default Form as React.FunctionComponent<FormProps> & StaticFormProps;
