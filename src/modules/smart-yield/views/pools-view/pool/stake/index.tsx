import { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';

import Form from 'components/antd/form';
import Tabs from 'components/antd/tabs';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

type FormStateType = {
  amount: number;
};

const InitialFormValues: FormStateType = {
  amount: 0,
};

const StakeForm: React.FC = () => {
  const [form] = Antd.Form.useForm<FormStateType>();

  const submitHandler = (values: FormStateType) => {
    console.log(values);
  };

  return (
    <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={submitHandler}>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Required' }]}
        className="mb-32"
        extra={
          <Text type="small" weight="semibold" color="secondary">
            Portfolio balance: 10,221.31
          </Text>
        }>
        <TokenAmount
          tokenIcon="bond-token"
          max={200}
          maximumFractionDigits={4}
          displayDecimals={4}
          disabled={false}
          slider
        />
      </Form.Item>
      <div className="flex col-gap-24">
        <button type="submit" className="button-primary">
          Stake
        </button>
      </div>
    </Form>
  );
};

const UnstakeForm: React.FC = () => {
  const [form] = Antd.Form.useForm<FormStateType>();

  const submitHandler = (values: FormStateType) => {
    console.log(values);
  };

  return (
    <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={submitHandler}>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Required' }]}
        className="mb-32"
        extra={
          <Text type="small" weight="semibold" color="secondary">
            Staked balance: 10,221.31
          </Text>
        }>
        <TokenAmount
          tokenIcon="bond-token"
          max={200}
          maximumFractionDigits={4}
          displayDecimals={4}
          disabled={false}
          slider
        />
      </Form.Item>
      <div className="flex col-gap-24">
        <button type="button" className="button-primary">
          Unstake
        </button>
        <button type="button" className="button-ghost">
          Claim & Unstake
        </button>
      </div>
    </Form>
  );
};

type TabsType = 'stake' | 'unstake';

type Props = {
  className?: string;
};

const Stake: React.FC<Props> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<TabsType>('stake');

  function handleTabChange(tabKey: TabsType) {
    setActiveTab(tabKey);
    // history.push(`/smart-yield/${tabKey}`);
  }

  return (
    <div className={cn('card', className)}>
      <Tabs className={s.tabs} activeKey={activeTab} onChange={handleTabChange as (tabKey: string) => void}>
        <Tabs.Tab key="stake" tab="Stake" />
        <Tabs.Tab key="unstake" tab="Unstake" />
      </Tabs>
      <div className="p-24">{activeTab === 'stake' ? <StakeForm /> : <UnstakeForm />}</div>
    </div>
  );
};

export default Stake;
