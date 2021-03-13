import React from 'react';
import AntdForm, {
  FormItemProps as AntdFormItemProps,
  FormListProps as AntdFormListProps,
  FormProps as AntdFormProps,
} from 'antd/lib/form';
import cn from 'classnames';

import Icon from 'components/custom/icon';

import Grid from '../../custom/grid';
import Tooltip from '../tooltip';

import s from './s.module.scss';

export type FormListProps = AntdFormListProps;

const FormList: React.FC<FormListProps> = props => {
  const { children, ...listProps } = props;

  return <AntdForm.List {...listProps}>{children}</AntdForm.List>;
};

export type FormItemProps = AntdFormItemProps<any> & {
  hint?: string;
};

const FormItem: React.FC<FormItemProps> = props => {
  const { className, label, hint, extra, children, ...itemProps } = props;

  return (
    <AntdForm.Item
      className={cn(s.item, className)}
      {...itemProps}
      label={
        <>
          <Grid flow="col" gap={4} align="center">
            {label}
            {hint && (
              <Tooltip title={hint}>
                <span>
                  <Icon name="info-outlined" width={15} height={15} />
                </span>
              </Tooltip>
            )}
          </Grid>
          {extra}
        </>
      }>
      {children}
    </AntdForm.Item>
  );
};

export type FormProps = AntdFormProps;

const Form: React.FC<FormProps> = props => {
  const { className, children, ...formProps } = props;

  return (
    <AntdForm className={cn(s.form, className)} layout="vertical" requiredMark={false} {...formProps}>
      {children}
    </AntdForm>
  );
};

export type StaticFormProps = {
  Item: React.FC<FormItemProps>;
  List: React.FC<FormListProps>;
};

((Form as any) as StaticFormProps).Item = FormItem;
((Form as any) as StaticFormProps).List = FormList;

export default Form as React.FC<FormProps> & StaticFormProps;
