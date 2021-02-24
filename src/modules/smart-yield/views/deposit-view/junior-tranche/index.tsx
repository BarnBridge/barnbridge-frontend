import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import { mergeState } from 'hooks/useMergeState';
import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import GasFeeList from 'components/custom/gas-fee-list';
import Icon, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';

import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';
import { getNonHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';

type FormData = {
  amount?: BigNumber;
  gasPrice?: {
    value: number;
  };
  slippageTolerance?: number;
  deadline?: number;
};

const InitialFormValues: FormData = {
  amount: undefined,
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

const JuniorTranche: React.FC = () => {
  const history = useHistory();
  const [form] = Antd.Form.useForm<FormData>();

  const tokenPool = useTokenPool();

  const [state, setState] = React.useState<State>(InitialState);

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  function handleCancel() {
    history.push(`/smart-yield/${tokenPool.address}/deposit`);
  }

  const handleFinish = React.useCallback(
    async (values: FormData) => {
      const { amount, gasPrice, slippageTolerance, deadline } = values;

      if (!amount || !gasPrice) {
        return;
      }

      setState(mergeState<State>({
        saving: true,
      }));

      const juniorFee = tokenPool.controller?.feeBuyJuniorToken ?? ZERO_BIG_NUMBER;
      const slippage = new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100);
      const minAmount = amount.multipliedBy(new BigNumber(1).minus(juniorFee).minus(slippage));
      const jPrice = tokenPool.sy?.price?.toNumber() ?? 1;
      const minTokens = minAmount.dividedBy(jPrice)
      const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);
      const gasFee = gasPrice.value;

      try {
        await tokenPool.actions.juniorDeposit(
          getNonHumanValue(amount, tokenPool.uToken?.decimals),
          getNonHumanValue(new BigNumber(minTokens.toFixed(0)), tokenPool.uToken?.decimals),
          deadlineTs,
          gasFee,
        );
        form.resetFields();
      } catch {
      }

      setState(mergeState<State>({
        saving: false,
      }));
    },
    [tokenPool.actions.juniorDeposit, form.resetFields],
  );

  return (
    <Form
      className="grid flow-row row-gap-32"
      form={form}
      initialValues={InitialFormValues}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Required' }]}>
        <TokenAmount
          tokenIcon={tokenPool.originator?.icon as TokenIconNames}
          max={tokenPool.uToken?.maxAllowed}
          maximumFractionDigits={tokenPool.uToken?.decimals}
          displayDecimals={4}
          disabled={state.saving}
          slider
        />
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
        <Button
          type="light"
          disabled={state.saving}
          onClick={handleCancel}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={state.saving}>
          Deposit
        </Button>
      </div>
    </Form>
  );
};

export default JuniorTranche;
