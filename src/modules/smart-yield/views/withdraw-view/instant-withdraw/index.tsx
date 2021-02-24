import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import ConfirmWithdrawalModal from 'modules/smart-yield/views/withdraw-view/confirm-withdrawal-modal';
import { WITHDRAW_INSTANT_KEY } from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';

type FormData = {
  from?: BigNumber;
  to?: BigNumber;
};

const InitialFormValues: FormData = {
  from: undefined,
  to: undefined,
};

const InstantWithdraw: React.FC = () => {
  const history = useHistory();
  const tokenPool = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const [withdrawModal, setWithdrawModal] = React.useState<any>();

  function handleCancel() {
    history.push(`/smart-yield/${tokenPool.address}/withdraw`);
  }

  function handleSubmit(values: FormData) {
    setWithdrawModal(values);
  }

  function handleWithdrawCancel() {
    setWithdrawModal(undefined);
  }

  async function handleWithdrawConfirm(gasFee: number) {
    const { from = ZERO_BIG_NUMBER, to = ZERO_BIG_NUMBER } = form.getFieldsValue();

    try {
      const amount = getNonHumanValue(new BigNumber(from), tokenPool.sy?.decimals);
      const debtShare = amount.dividedBy(tokenPool.sy?.totalSupply ?? 1);
      const forfeits = tokenPool.sy?.abondDebt?.multipliedBy(debtShare).dividedBy(1e18) ?? ZERO_BIG_NUMBER;
      const toPay = amount
        .multipliedBy(tokenPool.sy?.price ?? 1)
        .dividedBy(1e18)
        .minus(forfeits);
      const minUnderlying = new BigNumber(toPay.multipliedBy(1 - 0.005).toFixed(0)); // slippage ?? rounding mode
      const deadline = Math.round(Date.now() / 1_000) + 1200;

      // uint256 debtShare = tokenAmount_ * 1e18 / SY.totalSupply();
      // uint256 forfeits = (SY.abondDebt() * debtShare) / 1e18;
      // uint256 toPay = (tokenAmount_ * SY.price()) / 1e18 - forfeits;
      // minUnderlying => toPay - slippage

      await tokenPool.actions.juniorInstantWithdraw(amount, minUnderlying, deadline, gasFee);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Card>
      <Text type="h3" weight="semibold" color="primary">
        Instant withdraw
      </Text>
      <Text type="p2" weight="semibold">
        You can choose between fixed, or variable interest. Be aware of the risk involved and read the warnings before
        going further
      </Text>

      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
        <Form.Item className="mb-32" name="from" label="From" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon="usdc-token"
            max={tokenPool.uToken?.maxAllowed}
            maximumFractionDigits={tokenPool.uToken?.decimals}
            displayDecimals={4}
            disabled={false}
          />
        </Form.Item>
        <Form.Item className="mb-32" name="to" label="To" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon="usdc-token"
            max={tokenPool.uToken?.maxAllowed}
            maximumFractionDigits={tokenPool.uToken?.decimals}
            displayDecimals={4}
            disabled={false}
          />
        </Form.Item>

        <Grid flow="col" gap={64} align="center" justify="space-between">
          <Button type="light" onClick={handleCancel}>
            <Icon name="left-arrow" width={9} height={8} />
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Withdraw
          </Button>
        </Grid>
      </Form>

      {withdrawModal && (
        <ConfirmWithdrawalModal
          visible
          type={WITHDRAW_INSTANT_KEY}
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </Card>
  );
};

export default InstantWithdraw;
