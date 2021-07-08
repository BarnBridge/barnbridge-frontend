import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import useMergeState from 'hooks/useMergeState';
import { useDAO } from 'modules/governance/components/dao-provider';

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

const PortfolioWithdraw: React.FC = () => {
  const daoCtx = useDAO();
  const { projectToken } = useKnownTokens();
  const [form] = Antd.Form.useForm<WithdrawFormData>();

  const [state, setState] = useMergeState<WalletWithdrawViewState>(InitialState);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const bondBalance = (projectToken.contract as Erc20Contract).balance?.unscaleBy(projectToken.decimals);
  const isLocked = (userLockedUntil ?? 0) > Date.now();
  const hasStakedBalance = stakedBalance?.gt(BigNumber.ZERO);
  const formDisabled = !hasStakedBalance || isLocked;

  async function handleSubmit(values: WithdrawFormData) {
    const { amount, gasPrice } = values;

    if (!amount || !gasPrice) {
      return;
    }

    setState({ saving: true });

    try {
      await daoCtx.daoBarn.withdraw(amount, gasPrice.value);
      form.setFieldsValue(InitialFormValues);
      // daoCtx.daoBarn.reload(); /// TODO: check
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
    } catch {}

    setState({ saving: false });
  }

  return (
    <div className="card">
      <Grid className="card-header" flow="col" gap={24} colsTemplate="1fr 1fr 1fr 1fr 42px" align="start">
        <Grid flow="col" gap={12}>
          <Icon name={projectToken.icon!} width={40} height={40} />
          <Text type="p1" weight="semibold" color="primary">
            {projectToken.symbol}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Staked Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(stakedBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Wallet Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(bondBalance)}
          </Text>
        </Grid>

        <div />
      </Grid>
      <Form
        className="p-24"
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32}>
          <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
            <TokenAmount
              tokenIcon={projectToken.icon!}
              max={stakedBalance}
              maximumFractionDigits={projectToken.decimals}
              displayDecimals={4}
              disabled={formDisabled || state.saving}
              slider
            />
          </Form.Item>
          <Alert message="Locked balances are not available for withdrawal until the timer ends. Withdrawal means you will stop earning staking rewards for the amount withdrawn." />
          <Button
            type="primary"
            htmlType="submit"
            loading={state.saving}
            disabled={formDisabled}
            style={{ justifySelf: 'start' }}>
            Withdraw
          </Button>
        </Grid>
      </Form>
    </div>
  );
};

export default PortfolioWithdraw;
