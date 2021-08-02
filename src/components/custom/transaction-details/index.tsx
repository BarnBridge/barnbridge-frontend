import React, { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Popover from 'components/antd/popover';
import { Hint, Text } from 'components/custom/typography';
import { Icon } from 'components/icon';

import s from './s.module.scss';

type FormData = {
  slippage?: number;
  deadline?: number;
};

type TransactionCustomizationProps = {
  showSlippage?: boolean;
  slippage?: number;
  showDeadline?: boolean;
  deadline?: number;
  onChange?: (values: FormData) => void;
};

const SLIPPAGE_OPTIONS = [0.1, 0.3, 0.5];

const TransactionCustomization: React.FC<TransactionCustomizationProps> = props => {
  const { showSlippage, slippage, showDeadline, deadline, onChange } = props;

  const [form] = Antd.Form.useForm<FormData>();

  const handleValuesChange = React.useCallback((values: FormData) => {
    if (values.deadline) {
      const strValue = String(values.deadline).slice(0, 6);

      form.setFieldsValue({
        deadline: Number(strValue),
      });
    }
  }, []);

  const handleReset = React.useCallback(() => {
    form.resetFields();
  }, []);

  const handleFinish = React.useCallback((values: FormData) => {
    onChange?.(values);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        slippage,
        deadline,
      }}
      validateTrigger={['onSubmit']}
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}>
      <div className="grid flow-row row-gap-32">
        {showSlippage && (
          <Form.Item label="Slippage tolerance">
            <div className="grid flow-col col-gap-16">
              {SLIPPAGE_OPTIONS.map(opt => (
                <Button
                  key={opt}
                  type="ghost"
                  style={{ width: 70 }}
                  onClick={() => {
                    form.setFieldsValue({
                      slippage: Number(opt),
                    });
                  }}>
                  {opt}%
                </Button>
              ))}
              <Form.Item
                name="slippage"
                rules={[
                  { required: true, message: 'Required' },
                  {
                    validator: (_: any, value: number) => {
                      return value > 0 && value <= 100 ? Promise.resolve() : Promise.reject();
                    },
                    message: 'Enter a valid slippage percentage',
                  },
                ]}
                noStyle>
                <Input type="number" />
              </Form.Item>
            </div>
          </Form.Item>
        )}
        {showDeadline && (
          <Form.Item name="deadline" label="Transaction deadline" rules={[{ required: true, message: 'Required' }]}>
            <Input
              type="number"
              className={s.deadlineInput}
              suffix={
                <Text type="p1" weight="semibold" color="primary">
                  minutes
                </Text>
              }
            />
          </Form.Item>
        )}
        <div className="grid flow-col align-center justify-space-between">
          <Button type="light" onClick={handleReset}>
            Reset changes
          </Button>
          <Button type="primary" htmlType="submit">
            Apply changes
          </Button>
        </div>
      </div>
    </Form>
  );
};

type TransactionDetailsProps = {
  className?: string;
  showSlippage?: boolean;
  slippage?: number;
  slippageHint?: string;
  showDeadline?: boolean;
  deadline?: number;
  onChange?: (values: FormData) => void;
};

const TransactionDetails: React.FC<TransactionDetailsProps> = props => {
  const { className, showSlippage = false, slippage, slippageHint, showDeadline = false, deadline, onChange } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = React.useCallback((values: FormData) => {
    setVisible(false);
    onChange?.(values);
  }, []);

  return (
    <section className={cn(s.container, className)}>
      <header className="flex ph-24 pv-16">
        <Text type="p2" weight="semibold" color="secondary">
          {props.children}
        </Text>
        <Popover
          title="Customize transaction"
          overlayStyle={{ width: 423 }}
          content={
            <TransactionCustomization
              showSlippage={showSlippage}
              slippage={slippage}
              showDeadline={showDeadline}
              deadline={deadline}
              onChange={handleChange}
            />
          }
          visible={visible}
          onVisibleChange={setVisible}>
          <Button type="light" className="ml-auto">
            <Icon name="gear" />
          </Button>
        </Popover>
      </header>
      <Divider />
      <div className="ph-24 pv-16">
        {showSlippage && (
          <div className="flex mb-24">
            <Hint text={slippageHint}>
              <Text type="small" weight="semibold" color="secondary">
                Slippage tolerance
              </Text>
            </Hint>
            <Text type="small" weight="semibold" color="primary" className="ml-auto">
              {slippage}%
            </Text>
          </div>
        )}
        {showDeadline && (
          <div className="flex">
            <Hint text="Your transaction will revert if it isn't mined in this amount of time.">
              <Text type="small" weight="semibold" color="secondary">
                Transaction deadline
              </Text>
            </Hint>
            <Text type="small" weight="semibold" color="primary" className="ml-auto">
              {deadline} minutes
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionDetails;
