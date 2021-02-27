import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { addMonths, differenceInDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
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

type State = {
  saving: boolean;
};

const InitialState: State = {
  saving: false,
};

const DURATION_OPTIONS = [DURATION_1_WEEK, DURATION_2_WEEK, DURATION_1_MONTH, DURATION_3_MONTH];

const SeniorTranche: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool } = poolCtx;

  const [state, setState] = useMergeState<State>(InitialState);

  function handleCancel() {
    history.push(`/smart-yield/${pool?.smartYieldAddress}/deposit`);
  }

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  async function handleFinish(values: FormData) {
    if (!pool) {
      return;
    }

    const { amount, lockEndDate, gasPrice, slippageTolerance, deadline } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState({
      saving: true,
    });

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

    setState({
      saving: false,
    });
  }

  return (
    <Form
      form={form}
      initialValues={InitialFormValues}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}
      className="grid flow-row row-gap-32">
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
        <TokenAmount
          tokenIcon="usdc-token"
          max={pool?.underlyingMaxAllowed}
          maximumFractionDigits={pool?.underlyingDecimals}
          displayDecimals={4}
          disabled={state.saving}
          slider
        />
      </Form.Item>
      <Form.Item name="lockEndDate" label="Lock end date" rules={[{ required: true, message: 'Required' }]}>
        <DatePicker
          showNow={false}
          disabledDate={(date: Date) => isBefore(date, new Date()) || isAfter(date, addMonths(new Date(), 3))}
          format="DD/MM/YYYY"
          size="large"
          disabled={state.saving}
        />
      </Form.Item>
      <Form.Item label="Add lock duration" shouldUpdate>
        {() => (
          <Grid flow="col" gap={16} colsTemplate={`repeat(${DURATION_OPTIONS.length}, 1fr)`}>
            {DURATION_OPTIONS.map(opt => {
              return (
                <Button
                  key={opt}
                  type="select"
                  disabled={state.saving}
                  onClick={() => {
                    form.setFieldsValue({
                      lockEndDate: getLockEndDate(startOfDay(new Date()), opt),
                    });
                    setState({});
                  }}>
                  <Text type="p1" weight="semibold" color="primary">
                    {opt}
                  </Text>
                </Button>
              );
            })}
          </Grid>
        )}
      </Form.Item>
      <Form.Item
        name="gasPrice"
        label="Gas Fee (Gwei)"
        hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
        rules={[{ required: true, message: 'Required' }]}>
        <GasFeeList disabled={state.saving} />
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
        <Button type="light" disabled={state.saving} onClick={handleCancel}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={state.saving}>
          Deposit
        </Button>
      </div>
    </Form>
  );
};

export default SeniorTranche;
