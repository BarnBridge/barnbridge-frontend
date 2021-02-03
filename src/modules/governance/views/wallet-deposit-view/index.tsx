import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Paragraph, Small } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';

import { formatBONDValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { CONTRACT_DAO_BARN_ADDR } from 'web3/contracts/daoBarn';
import useMergeState from 'hooks/useMergeState';

type DepositFormData = {
  amount?: BigNumber;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: DepositFormData = {
  amount: undefined,
  gasPrice: undefined,
};

type WalletDepositViewState = {
  enabling: boolean;
  enabled?: boolean;
  saving: boolean;
  expanded: boolean;
};

const InitialState: WalletDepositViewState = {
  enabling: false,
  enabled: undefined,
  saving: false,
  expanded: false,
};

const WalletDepositView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<DepositFormData>();

  const [state, setState] = useMergeState<WalletDepositViewState>(InitialState);

  async function handleSwitchChange(checked: boolean) {
    const value = checked ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    setState({ enabling: true });

    try {
      await web3c.bond.approveSend(CONTRACT_DAO_BARN_ADDR, value);
    } catch {}

    setState({ enabling: false });
  }

  async function handleSubmit(values: DepositFormData) {
    setState({ saving: true });

    const { gasPrice, amount } = values;
    const gasFee = gasPrice?.value!;

    try {
      await web3c.daoBarn.actions.deposit(amount!, gasFee);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
      web3c.bond.reload();
    } catch {}

    setState({ saving: false });
  }

  React.useEffect(() => {
    const isEnabled = web3c.bond.barnAllowance?.gt(ZERO_BIG_NUMBER) ?? false;

    setState({
      enabled: isEnabled,
      expanded: isEnabled,
    });
  }, [web3c]);

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

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Enable Token
        </Small>
        <Antd.Switch
          style={{ justifySelf: 'flex-start' }}
          checked={state.enabled}
          loading={state.enabled === undefined || state.enabling}
          onChange={handleSwitchChange}
        />
      </Grid>
    </Grid>
  );

  return (
    <Card
      title={CardTitle}
      showExpandButton={state.enabled}
      expanded={state.expanded}>
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
                  max={web3c.bond.balance}
                  maximumFractionDigits={4}
                  displayDecimals={4}
                  disabled={state.saving}
                  slider
                />
              </Form.Item>
              <Alert message="Deposits made after you have an ongoing lock will be added to the locked balance and will be subjected to the same lock timer." />
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
            style={{ justifySelf: 'start' }}>
            Deposit
          </Button>
        </Grid>
      </Form>
    </Card>
  );
};

export default WalletDepositView;
