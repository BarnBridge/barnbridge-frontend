import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { addMonths, differenceInDays, isAfter, isBefore, startOfDay } from 'date-fns';

import Form from 'components/antd/form';
import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Input from 'components/antd/input';
import Icon from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import { DURATION_1_MONTH, DURATION_1_WEEK, DURATION_2_WEEK, DURATION_3_MONTH, getLockEndDate } from 'utils/date';
import { getNonHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import useMergeState from 'hooks/useMergeState';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';
import { useWeb3Contracts } from 'web3/contracts';

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

const DURATION_OPTIONS = [
  DURATION_1_WEEK,
  DURATION_2_WEEK,
  DURATION_1_MONTH,
  DURATION_3_MONTH,
];

export default function SeniorTranche() {
  const history = useHistory();
  const [form] = Antd.Form.useForm<FormData>();

  const tokenPool = useTokenPool();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<State>(InitialState);

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  const handleFinish = React.useCallback(async (values: FormData) => {
    const { amount, lockEndDate, gasPrice, slippageTolerance, deadline } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState({
      saving: true,
    });

    const amountScaled = getNonHumanValue(amount, tokenPool.erc20?.state.decimals);

    const deadlineTs = Math.floor((Date.now() / 1_000) + (Number(deadline ?? 0) * 60));
    const lockDays = differenceInDays(lockEndDate ?? startOfDay(new Date()), startOfDay(new Date()));

    try {
      const minGain = await web3c.sy.getBondGain(amountScaled, lockDays) ?? ZERO_BIG_NUMBER;
      const minGainMFee = new BigNumber(1).minus(new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100))
        .multipliedBy(minGain);

      await tokenPool.actions.seniorDeposit(amountScaled, minGainMFee, deadlineTs, lockDays ?? 0, gasPrice.value);
      form.resetFields();
    } catch {
    }

    setState({
      saving: false,
    });
  }, [tokenPool.actions.seniorDeposit, form.resetFields, setState]);

  return (
    <Form
      form={form}
      initialValues={InitialFormValues}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}
      className="grid flow-row row-gap-32">
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Required' }]}>
        <TokenAmount
          tokenIcon="usdc-token"
          max={tokenPool.erc20?.computed.maxAllowed ?? ZERO_BIG_NUMBER}
          maximumFractionDigits={4}
          displayDecimals={4}
          disabled={state.saving}
          slider
        />
      </Form.Item>
      <Form.Item
        name="lockEndDate"
        label="Lock end date"
        rules={[{ required: true, message: 'Required' }]}>
        <DatePicker
          showNow={false}
          disabledDate={
            (date: Date) => isBefore(date, new Date()) || isAfter(date, addMonths(new Date(), 3))
          }
          format="DD/MM/YYYY"
          size="large"
          disabled={state.saving}
        />
      </Form.Item>
      <Form.Item label="Add lock duration" shouldUpdate>
        {() => (
          <Grid
            flow="col"
            gap={16}
            colsTemplate={`repeat(${DURATION_OPTIONS.length}, 1fr)`}>
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
              onChange={handleTxDetailsChange} />
          );
        }}
      </Form.Item>
      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <Button
          type="light"
          disabled={state.saving}
          onClick={() => history.push(`/smart-yield/${tokenPool.tokenAddress}/deposit`)}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={state.saving}>
          Deposit
        </Button>
      </div>
    </Form>
  );
}
