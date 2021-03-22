import { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';
import { formatToken, getHumanValue, getNonHumanValue } from 'web3/utils';

import Form from 'components/antd/form';
import Tabs from 'components/antd/tabs';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';

import s from './s.module.scss';

type FormStateType = {
  amount: number;
};

const InitialFormValues: FormStateType = {
  amount: 0,
};

const StakeForm: React.FC = () => {
  const [form] = Antd.Form.useForm<FormStateType>();
  const { pool } = useRewardPool();

  const submitHandler = (values: FormStateType) => {
    const value = getNonHumanValue(values.amount, pool?.poolToken.decimals!);

    return pool?.pool.sendDeposit(value, 1);
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
            Portfolio balance:{' '}
            {formatToken(getHumanValue(pool?.poolToken.balance, pool?.poolToken.decimals), {
              tokenName: pool?.poolToken.symbol,
            })}
          </Text>
        }>
        <TokenAmount
          tokenIcon="bond-token"
          max={getHumanValue(pool?.poolToken.balance, pool?.poolToken.decimals)?.toNumber()}
          maximumFractionDigits={pool?.poolToken.decimals}
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
  const { pool } = useRewardPool();

  function handleUnstake() {
    const values = form.getFieldsValue();
    const value = getNonHumanValue(values.amount, pool?.poolToken.decimals!);

    return pool?.pool.sendWithdraw(value, 1);
  }

  function handleClaimAndUnstake() {
    const values = form.getFieldsValue();
    const value = getNonHumanValue(values.amount, pool?.poolToken.decimals!);

    return pool?.pool.sendWithdrawAndClaim(value, 1);
  }

  return (
    <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']}>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Required' }]}
        className="mb-32"
        extra={
          <Text type="small" weight="semibold" color="secondary">
            Staked balance:
            {formatToken(getHumanValue(pool?.pool.balance, pool?.poolToken.decimals), {
              tokenName: pool?.poolToken.symbol,
            })}
          </Text>
        }>
        <TokenAmount
          tokenIcon="bond-token"
          max={getHumanValue(pool?.pool.balance, pool?.poolToken.decimals)?.toNumber()}
          maximumFractionDigits={pool?.poolToken.decimals}
          displayDecimals={4}
          disabled={false}
          slider
        />
      </Form.Item>
      <div className="flex col-gap-24">
        <button type="button" className="button-primary" onClick={handleUnstake}>
          Unstake
        </button>
        <button type="button" className="button-ghost" onClick={handleClaimAndUnstake}>
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
