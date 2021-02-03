import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Form from 'components/antd/form';
import Card from 'components/antd/card';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Paragraph, Small } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';

import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';

type WithdrawFormData = {
  amount?: BigNumber;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: WithdrawFormData = {
  amount: undefined,
  gasPrice: undefined,
};

type WalletWithdrawViewState = {
  saving: boolean;
};

const InitialState: WalletWithdrawViewState = {
  saving: false,
};

const WalletWithdrawView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<WithdrawFormData>();

  const [state, setState] = useMergeState<WalletWithdrawViewState>(
    InitialState,
  );

  const isLocked = (web3c.daoBarn.userLockedUntil ?? 0) > Date.now();

  async function handleSubmit(values: WithdrawFormData) {
    setState({ saving: true });

    const { gasPrice, amount } = values;
    const gasFee = gasPrice?.value!;

    try {
      await web3c.daoBarn.actions.withdraw(amount!, gasFee);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
      web3c.bond.reload();
    } catch {
    }

    setState({ saving: false });
  }

  const CardTitle = (
    <Grid flow="col" gap={24} colsTemplate="auto" align="center">
      <Grid flow="col" gap={12} align="center">
        <Icons name="bond-token" width={40} height={40} />
        <Paragraph type="p1" semiBold color="grey900">
          BOND
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Staked Balance
        </Small>
        <Paragraph type="p1" semiBold color="grey900">
          {formatBONDValue(web3c.daoBarn.balance)}
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Wallet Balance
        </Small>
        <Paragraph type="p1" semiBold color="grey900">
          {formatBONDValue(web3c.bond.balance)}
        </Paragraph>
      </Grid>

      <div />
    </Grid>
  );

  return (
    <Card title={CardTitle}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Required' }]}>
                <TokenAmount
                  tokenIcon="bond-token"
                  max={web3c.daoBarn.balance}
                  maximumFractionDigits={4}
                  displayDecimals={4}
                  disabled={state.saving}
                  slider
                />
              </Form.Item>
              <Alert message="Locked balances are not available for withdrawal until the timer ends. Withdrawal means you will stop earning staking rewards for the amount withdrawn." />
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasPrice"
                label="Gas Fee (Gwei)"
                hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                rules={[{ required: true, message: 'Required' }]}>
                <GasFeeList disabled={state.saving} />
              </Form.Item>
            </Grid>
          </Grid>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={state.saving}
            disabled={isLocked}
            style={{ justifySelf: 'start' }}>
            Withdraw
          </Button>
        </Grid>
      </Form>
    </Card>
  );
};

export default WalletWithdrawView;
