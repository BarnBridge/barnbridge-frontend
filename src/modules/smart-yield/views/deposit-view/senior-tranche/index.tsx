import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { addMonths, differenceInDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { ZERO_BIG_NUMBER, formatBigValue, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import ConfirmTxModal from 'modules/smart-yield/components/confirm-tx-modal';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import { useWallet } from 'wallets/wallet';

import { DURATION_1_MONTH, DURATION_1_WEEK, DURATION_2_WEEK, DURATION_3_MONTH, getLockEndDate } from 'utils/date';

type FormData = {
  amount?: BigNumber;
  lockEndDate?: Date;
  gasPrice?: {
    value: number;
  };
  slippageTolerance?: number;
  deadline?: number;
};

const InitialFormValues: FormData = {
  amount: undefined,
  lockEndDate: undefined,
  gasPrice: undefined,
  slippageTolerance: 0.5,
  deadline: 20,
};

const DURATION_OPTIONS = [DURATION_1_WEEK, DURATION_2_WEEK, DURATION_1_MONTH, DURATION_3_MONTH];

const SeniorTranche: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool } = poolCtx;

  const [isSaving, setSaving] = React.useState<boolean>(false);
  const [depositModalVisible, showDepositModal] = React.useState<boolean>();

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  function handleCancel() {
    history.push(`/smart-yield/${pool?.smartYieldAddress}/deposit`);
  }

  function handleSubmit() {
    showDepositModal(true);
  }

  function handleDepositCancel() {
    showDepositModal(false);
  }

  async function handleDepositConfirm({ gasPrice }: any) {
    if (!pool) {
      return;
    }

    const { amount, lockEndDate, slippageTolerance, deadline } = form.getFieldsValue();

    if (!amount) {
      return;
    }

    setSaving(true);

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    try {
      const decimals = pool.underlyingDecimals;
      const amountScaled = getNonHumanValue(amount, decimals);
      const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);
      const lockDays = differenceInDays(lockEndDate ?? startOfDay(new Date()), startOfDay(new Date()));

      const minGain = await smartYieldContract.getBondGain(amountScaled, lockDays);
      const minGainMFee = new BigNumber(1)
        .minus(new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100))
        .multipliedBy(minGain);
      const gain = new BigNumber(Math.round(minGainMFee.toNumber()));

      await smartYieldContract.buyBondSend(amountScaled, gain, deadlineTs, lockDays ?? 0, gasPrice.value);
      form.resetFields();
    } catch {}

    setSaving(false);
  }

  return (
    <Form
      className="grid flow-row row-gap-32"
      form={form}
      initialValues={InitialFormValues}
      validateTrigger={['onSubmit']}
      onFinish={handleSubmit}>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
        <TokenAmount
          tokenIcon={pool?.meta?.icon as TokenIconNames}
          max={getHumanValue(pool?.underlyingMaxAllowed, pool?.underlyingDecimals)}
          maximumFractionDigits={pool?.underlyingDecimals}
          displayDecimals={4}
          disabled={isSaving}
          slider
        />
      </Form.Item>
      <Form.Item name="lockEndDate" label="Lock end date" rules={[{ required: true, message: 'Required' }]}>
        <DatePicker
          showNow={false}
          disabledDate={(date: Date) => isBefore(date, new Date()) || isAfter(date, addMonths(new Date(), 3))}
          format="DD/MM/YYYY"
          size="large"
          disabled={isSaving}
        />
      </Form.Item>
      <Form.Item label="Add lock duration" shouldUpdate>
        {() => (
          <Grid flow="col" gap={16} colsTemplate={`repeat(${DURATION_OPTIONS.length}, 1fr)`}>
            {DURATION_OPTIONS.map(opt => (
              <Button
                key={opt}
                type="select"
                disabled={isSaving}
                onClick={() => {
                  form.setFieldsValue({
                    lockEndDate: getLockEndDate(startOfDay(new Date()), opt),
                  });
                }}>
                <Text type="p1" weight="semibold" color="primary">
                  {opt}
                </Text>
              </Button>
            ))}
          </Grid>
        )}
      </Form.Item>
      <Form.Item
        name="gasPrice"
        label="Gas Fee (Gwei)"
        hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
        rules={[{ required: true, message: 'Required' }]}>
        <GasFeeList disabled={isSaving} />
      </Form.Item>
      <Form.Item name="slippageTolerance" noStyle hidden>
        <Input />
      </Form.Item>
      <Form.Item name="deadline" noStyle hidden>
        <Input />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => {
          const { slippageTolerance, deadline } = form.getFieldsValue();

          return (
            <TransactionDetails
              slippageTolerance={slippageTolerance}
              deadline={deadline}
              onChange={handleTxDetailsChange}
            />
          );
        }}
      </Form.Item>
      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <Button type="light" disabled={isSaving} onClick={handleCancel}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={isSaving}>
          Deposit
        </Button>
      </div>

      {depositModalVisible && (
        <ConfirmTxModal
          visible
          title="Confirm your deposit"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(form.getFieldValue('amount'))} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity in
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - days
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - %
                </Text>
              </div>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleDepositCancel}
          onConfirm={handleDepositConfirm}
        />
      )}
    </Form>
  );
};

export default SeniorTranche;
