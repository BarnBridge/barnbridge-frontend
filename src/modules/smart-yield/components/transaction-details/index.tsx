import React, { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Popover from 'components/antd/popover';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';

import s from './s.module.scss';

type FormData = {
  slippageTolerance?: number;
  deadline?: number;
};

type TransactionCustomizationProps = {
  slippageTolerance?: number;
  deadline?: number;
  onChange?: (values: FormData) => void;
};

const SLIPPAGE_OPTIONS = [0.1, 0.3, 0.5];

const TransactionCustomization: React.FC<TransactionCustomizationProps> = props => {
  const { slippageTolerance, deadline, onChange } = props;

  const [form] = Antd.Form.useForm<FormData>();

  const handleValuesChange = React.useCallback((values: FormData) => {
    if (values.deadline) {
      const strValue = String(values.deadline);

      if (strValue.length > 6) {
        form.setFieldsValue({
          deadline: Number(strValue.slice(0, 6)),
        });
      }
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
        slippageTolerance,
        deadline,
      }}
      validateTrigger={['onSubmit']}
      onValuesChange={handleValuesChange}
      onFinish={handleFinish}>
      <div className="grid flow-row row-gap-32">
        <Form.Item label="Slippage tolerance">
          <div className="grid flow-col col-gap-16">
            {SLIPPAGE_OPTIONS.map(opt => (
              <Button
                key={opt}
                type="ghost"
                style={{ width: 70 }}
                onClick={() => {
                  form.setFieldsValue({
                    slippageTolerance: opt,
                  });
                }}>
                {opt}%
              </Button>
            ))}
            <Form.Item
              name="slippageTolerance"
              rules={[
                { required: true, message: 'Required' },
                { min: 0, message: 'Required' },
                { max: 100, message: 'Enter a valid slippage percentage' },
              ]}
              noStyle>
              <Input type="number" />
            </Form.Item>
          </div>
        </Form.Item>
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
  slippageTolerance?: number;
  deadline?: number;
  onChange?: (values: FormData) => void;
};

const TransactionDetails: React.FC<TransactionDetailsProps> = props => {
  const { className, slippageTolerance, deadline, onChange } = props;

  const [visible, setVisible] = useState<boolean>(false);

  const handleChange = React.useCallback((values: FormData) => {
    setVisible(false);
    onChange?.(values);
  }, []);

  return (
    <section className={cn(s.container, className)}>
      <header className="flex ph-24 pv-24">
        <Text type="p2" weight="semibold" color="secondary">
          Transaction details
        </Text>
        <Popover
          title="Customize transaction"
          overlayStyle={{ width: 423 }}
          content={
            <TransactionCustomization
              slippageTolerance={slippageTolerance}
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
      <div className="p-24">
        <div className="flex mb-24">
          <Hint text="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage.">
            <Text type="small" weight="semibold" color="secondary">
              Slippage tolerance
            </Text>
          </Hint>
          <Text type="small" weight="semibold" color="primary" className="ml-auto">
            {slippageTolerance}%
          </Text>
        </div>
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
      </div>
    </section>
  );
};

export default TransactionDetails;
