import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Form from 'components/antd/form';
import Card from 'components/antd/card';
import Slider from 'components/antd/slider';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Paragraph, Small } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';

import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';

type WithdrawFormData = {
  amount?: BigNumber;
  gasFee?: number;
};

const InitialFormValues: WithdrawFormData = {
  amount: undefined,
  gasFee: undefined,
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

  async function handleSubmit(values: WithdrawFormData) {
    setState({ saving: true });

    try {
      await web3c.daoBarn.actions.withdraw(values.amount!, values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
      web3c.bond.reload();
    } catch {}

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
                  tokenLabel="BOND"
                  placeholder={`0 (Max ${formatBONDValue(
                    web3c.daoBarn.balance ?? ZERO_BIG_NUMBER,
                  )})`}
                  disabled={state.saving}
                  maximumFractionDigits={2}
                  maxProps={{
                    disabled: state.saving,
                    onClick: () => {
                      form.setFieldsValue({
                        amount: web3c.daoBarn.balance ?? ZERO_BIG_NUMBER,
                      });
                    },
                  }}
                />
              </Form.Item>
              <Form.Item name="amount">
                <Slider
                  min={0}
                  max={web3c.daoBarn.balance?.toNumber() ?? 0}
                  step={1}
                  disabled={state.saving}
                  tipFormatter={value => (
                    <span>
                      {value ? formatBONDValue(new BigNumber(value)) : 0}
                    </span>
                  )}
                  tooltipPlacement="bottom"
                />
              </Form.Item>
              <Alert message="Withdrawal before the end of the epoch means you can't harvest the rewards." />
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasFee"
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
            style={{ width: 121 }}>
            Withdraw
          </Button>
        </Grid>
      </Form>
    </Card>
  );
};

export default WalletWithdrawView;
