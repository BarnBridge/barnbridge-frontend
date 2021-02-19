import React from 'react';
import * as Antd from 'antd';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import useMergeState from 'hooks/useMergeState';
import { getNonHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useTokenPool } from 'modules/smart-yield/providers/token-pool-provider';
import Input from 'components/antd/input';
import { useWeb3Contracts } from 'web3/contracts';

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

export default function JuniorTranche() {
  const history = useHistory();
  const [form] = Antd.Form.useForm<FormData>();

  const tokenPool = useTokenPool();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<State>(InitialState);

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  const handleFinish = React.useCallback(async (values: FormData) => {
    const { amount, gasPrice, slippageTolerance, deadline } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState({
      saving: true,
    });

    const rate = new BigNumber(1e18)
      .minus((web3c.syController.juniorFee ?? ZERO_BIG_NUMBER)
        .plus(getNonHumanValue(slippageTolerance ?? ZERO_BIG_NUMBER, 18).dividedBy(100)));

    const amountScaled = getNonHumanValue(amount, tokenPool.erc20?.state.decimals);

    const minTokens = new BigNumber(amountScaled
      .multipliedBy(rate)
      .dividedBy(web3c.sy.price ?? 1)
      .toFixed(0));

    const deadlineTs = Math.floor((Date.now() / 1_000) + (Number(deadline ?? 0) * 60));

    try {
      await tokenPool.actions.juniorDeposit(amountScaled, minTokens, deadlineTs, gasPrice.value);
      form.resetFields();
    } catch {
    }

    setState({
      saving: false,
    });
  }, [tokenPool.actions.juniorDeposit, form.resetFields, setState]);

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
