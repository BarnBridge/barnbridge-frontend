import React, { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, getHumanValue, getNonHumanValue } from 'web3/utils';

import Form from 'components/antd/form';
import Spin from 'components/antd/spin';
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
  const { rewardPool } = useRewardPool();

  const [confirmVisible, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  function submitHandler() {
    setConfirm(true);
  }

  const confirmStake = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirm(false);
    setSaving(true);

    try {
      const values = form.getFieldsValue();
      const value = getNonHumanValue(values.amount, rewardPool?.poolToken.decimals!);
      await rewardPool?.pool.sendDeposit(value, args.gasPrice).then(() => rewardPool?.poolToken.loadBalance());
      form.resetFields();
    } catch {}

    setSaving(false);
  };

  const canStake = rewardPool?.poolToken.isAllowed === true;

  return (
    <>
      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={submitHandler}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Required' }]}
          className="mb-32"
          extra={
            <Text type="small" weight="semibold" color="secondary">
              Portfolio balance:{' '}
              {formatToken(getHumanValue(rewardPool?.poolToken.balance, rewardPool?.poolToken.decimals), {
                tokenName: rewardPool?.poolToken.symbol,
              })}
            </Text>
          }>
          <TokenAmount
            tokenIcon="bond-token"
            max={getHumanValue(rewardPool?.poolToken.balance, rewardPool?.poolToken.decimals)?.toNumber()}
            maximumFractionDigits={rewardPool?.poolToken.decimals}
            displayDecimals={4}
            disabled={saving || !canStake}
            slider
          />
        </Form.Item>
        <div className="flex col-gap-24">
          <button type="submit" className="button-primary" disabled={saving || !canStake}>
            {saving && <Spin type="circle" />}
            Stake
          </button>
        </div>
      </Form>
      {confirmVisible && (
        <TxConfirmModal
          title="Confirm your stake"
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                -
              </Text>
            </div>
          }
          submitText="Stake"
          onCancel={() => setConfirm(false)}
          onConfirm={confirmStake}
        />
      )}
    </>
  );
};

const UnstakeForm: React.FC = () => {
  const [form] = Antd.Form.useForm<FormStateType>();
  const { rewardPool } = useRewardPool();

  const [isClaimUnstake, setClaimUnstake] = useState(false);
  const [confirmVisible, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleUnstake() {
    setClaimUnstake(false);
    setConfirm(true);
  }

  function handleClaimUnstake() {
    setClaimUnstake(true);
    setConfirm(true);
  }

  const handleConfirm = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirm(false);
    setSaving(true);

    try {
      const values = form.getFieldsValue();
      const value = getNonHumanValue(values.amount, rewardPool?.poolToken.decimals!);

      if (isClaimUnstake) {
        await rewardPool?.pool
          .sendWithdrawAndClaim(value, args.gasPrice)
          .then(() => rewardPool?.poolToken.loadBalance());
      } else {
        await rewardPool?.pool.sendWithdraw(value, args.gasPrice).then(() => rewardPool?.poolToken.loadBalance());
      }

      form.resetFields();
    } catch {}

    setSaving(false);
  };

  return (
    <>
      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Required' }]}
          className="mb-32"
          extra={
            <Text type="small" weight="semibold" color="secondary">
              Staked balance:{' '}
              {formatToken(getHumanValue(rewardPool?.pool.balance, rewardPool?.poolToken.decimals), {
                tokenName: rewardPool?.poolToken.symbol,
              })}
            </Text>
          }>
          <TokenAmount
            tokenIcon="bond-token"
            max={getHumanValue(rewardPool?.pool.balance, rewardPool?.poolToken.decimals)?.toNumber()}
            maximumFractionDigits={rewardPool?.poolToken.decimals}
            displayDecimals={4}
            disabled={saving}
            slider
          />
        </Form.Item>
        <div className="flex col-gap-24">
          <button type="button" className="button-primary" disabled={saving} onClick={handleUnstake}>
            {saving && !isClaimUnstake && <Spin type="circle" />}
            Unstake
          </button>
          <button type="button" className="button-ghost" disabled={saving} onClick={handleClaimUnstake}>
            {saving && isClaimUnstake && <Spin type="circle" />}
            Claim & Unstake
          </button>
        </div>
      </Form>

      {confirmVisible && (
        <TxConfirmModal
          title={isClaimUnstake ? 'Confirm your claim and unstake' : 'Confirm your unstake'}
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                -
              </Text>
            </div>
          }
          submitText={isClaimUnstake ? 'Claim and unstake' : 'Unstake'}
          onCancel={() => setConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
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
