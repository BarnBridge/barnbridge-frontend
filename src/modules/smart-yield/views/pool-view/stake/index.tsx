import React, { useState } from 'react';
import * as Antd from 'antd';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, getHumanValue, getNonHumanValue } from 'web3/utils';

import Form from 'components/antd/form';
import Spin from 'components/antd/spin';
import Tabs from 'components/antd/tabs';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { Markets, Pools } from 'modules/smart-yield/api';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';

import s from './s.module.scss';

type FormStateType = {
  amount: number;
};

const StakeForm: React.FC = () => {
  const [form] = Antd.Form.useForm<FormStateType>();
  const { rewardPool, sendDeposit } = useRewardPool();

  const [values, setValues] = useState<FormStateType>({
    amount: 0,
  });
  const [confirmVisible, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const enabled = rewardPool?.poolToken.isAllowedOf(rewardPool?.poolAddress) === true;
  const canStake = values.amount > 0;

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  function handleValuesChange(_: any, formValues: FormStateType) {
    setValues(formValues);
  }

  function submitHandler() {
    setConfirm(true);
  }

  const confirmStake = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirm(false);
    setSaving(true);

    try {
      const amount = getNonHumanValue(values.amount, rewardPool?.poolToken.decimals!);
      await sendDeposit(amount, args.gasPrice);
      form.resetFields();
    } catch {}

    setSaving(false);
  };

  return (
    <>
      <Form
        className={s.form}
        form={form}
        initialValues={{
          amount: 0,
        }}
        validateTrigger={['onSubmit']}
        onValuesChange={handleValuesChange}
        onFinish={submitHandler}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Required' }]}
          className="mb-32"
          extra={
            <Text type="small" weight="semibold" color="secondary">
              Portfolio balance:{' '}
              {formatToken(rewardPool?.poolToken.balance, {
                scale: rewardPool?.poolToken.decimals,
                tokenName: rewardPool?.poolToken.symbol,
              }) ?? '-'}
            </Text>
          }>
          <TokenAmount
            tokenIcon={
              <IconBubble
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={32}
                height={32}
                className="mr-8"
              />
            }
            max={getHumanValue(rewardPool?.poolToken.balance, rewardPool?.poolToken.decimals)}
            maximumFractionDigits={rewardPool?.poolToken.decimals}
            displayDecimals={4}
            disabled={saving || !enabled}
            slider
          />
        </Form.Item>
        <div className="flex col-gap-24 mt-auto">
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
                {formatToken(values.amount, {}) ?? '-'}
              </Text>
              <IconBubble
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={32}
                height={32}
                className="mr-8"
              />
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
  const { rewardPool, sendWithdraw, sendWithdrawAndClaim } = useRewardPool();

  const [values, setValues] = useState<FormStateType>({
    amount: 0,
  });
  const [isClaimUnstake, setClaimUnstake] = useState(false);
  const [confirmVisible, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const canUnstake = values.amount > 0;

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  function handleValuesChange(_: any, formValues: FormStateType) {
    setValues(formValues);
  }

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
      const amount = getNonHumanValue(values.amount, rewardPool?.poolToken.decimals!);

      if (isClaimUnstake) {
        await sendWithdrawAndClaim(amount, args.gasPrice);
      } else {
        await sendWithdraw(amount, args.gasPrice);
      }

      form.resetFields();
    } catch {}

    setSaving(false);
  };

  return (
    <>
      <Form
        className={s.form}
        form={form}
        initialValues={{
          amount: 0,
        }}
        onValuesChange={handleValuesChange}
        validateTrigger={['onSubmit']}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Required' }]}
          className="mb-32"
          extra={
            <Text type="small" weight="semibold" color="secondary">
              Staked balance:{' '}
              {formatToken(rewardPool?.pool.balance, {
                scale: rewardPool?.poolToken.decimals,
                tokenName: rewardPool?.poolToken.symbol,
              }) ?? '-'}
            </Text>
          }>
          <TokenAmount
            tokenIcon={
              <IconBubble
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={32}
                height={32}
                className="mr-8"
              />
            }
            max={getHumanValue(rewardPool?.pool.balance, rewardPool?.poolToken.decimals)}
            maximumFractionDigits={rewardPool?.poolToken.decimals}
            displayDecimals={4}
            disabled={saving}
            slider
          />
        </Form.Item>
        <div className="flex col-gap-24 mt-auto">
          <button type="button" className="button-primary" disabled={saving || !canUnstake} onClick={handleUnstake}>
            {saving && !isClaimUnstake && <Spin type="circle" />}
            Unstake
          </button>
          <button type="button" className="button-ghost" disabled={saving || !canUnstake} onClick={handleClaimUnstake}>
            {saving && isClaimUnstake && <Spin type="circle" />}
            Claim & Unstake
          </button>
        </div>
      </Form>

      {confirmVisible && (
        <TxConfirmModal
          title={isClaimUnstake ? 'Confirm your claim and unstake' : 'Confirm your unstake'}
          header={
            <div className="flex col-gap-64 align-center justify-center">
              <div>
                <Text type="p1" weight="semibold" color="secondary">
                  Unstake
                </Text>
                <div className="flex col-gap-8 align-center justify-center">
                  <Text type="h2" weight="semibold" color="primary">
                    {formatToken(values.amount, {}) ?? '-'}
                  </Text>
                  <IconBubble
                    name={meta?.icon}
                    bubbleName="bond-circle-token"
                    secondBubbleName={market?.icon}
                    width={32}
                    height={32}
                    className="mr-8"
                  />
                </div>
              </div>

              {isClaimUnstake && (
                <div>
                  <Text type="p1" weight="semibold" color="secondary">
                    Claim
                  </Text>
                  <div className="flex col-gap-8 align-center justify-center">
                    <Text type="h2" weight="semibold" color="primary">
                      {formatToken(rewardPool?.pool.toClaim, {
                        scale: rewardPool?.rewardToken.decimals,
                      }) ?? '-'}
                    </Text>
                    <Icon name="bond-circle-token" width={32} height={32} />
                  </div>
                </div>
              )}
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
      <div className="p-24 full-height">{activeTab === 'stake' ? <StakeForm /> : <UnstakeForm />}</div>
    </div>
  );
};

export default Stake;
