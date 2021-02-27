import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import GasFeeList from 'components/custom/gas-fee-list';
import Icon, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { mergeState } from 'hooks/useMergeState';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import { useWallet } from 'wallets/wallet';

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
  const wallet = useWallet();
  const poolCtx = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool } = poolCtx;

  const [state, setState] = React.useState<State>(InitialState);

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  function handleCancel() {
    history.push(`/smart-yield/${pool?.smartYieldAddress}/deposit`);
  }

  async function handleFinish(values: FormData) {
    if (!pool) {
      return;
    }

    const { amount, gasPrice, slippageTolerance, deadline } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState(
      mergeState<State>({
        saving: true,
      }),
    );

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    const controllerContract = new SYControllerContract(pool.controllerAddress);
    smartYieldContract.setProvider(wallet.provider);

    const decimals = pool.underlyingDecimals;
    const juniorFee = await controllerContract.getJuniorBuyFee();
    const slippage = new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100);
    const minAmount = amount.multipliedBy(new BigNumber(1).minus(juniorFee.dividedBy(1e18)).minus(slippage));
    const price = await smartYieldContract.getPrice();
    const minTokens = minAmount.dividedBy(price);
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);
    const gasFee = gasPrice.value;

    try {
      await smartYieldContract.buyTokensSend(
        getNonHumanValue(amount, decimals),
        getNonHumanValue(new BigNumber(minTokens.toFixed(0)), decimals),
        deadlineTs,
        gasFee,
      );
      form.resetFields();
    } catch {}

    setState(
      mergeState<State>({
        saving: false,
      }),
    );
  }

  return (
    <Form
      className="grid flow-row row-gap-32"
      form={form}
      initialValues={InitialFormValues}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}>
      <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
        <TokenAmount
          tokenIcon={pool?.meta?.icon as TokenIconNames}
          max={pool?.underlyingMaxAllowed}
          maximumFractionDigits={pool?.underlyingDecimals}
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

export default JuniorTranche;
