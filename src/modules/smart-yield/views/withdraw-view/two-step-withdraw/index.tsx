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
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import ConfirmWithdrawalModal from 'modules/smart-yield/views/withdraw-view/confirm-withdrawal-modal';
import { WITHDRAW_TWO_STEP_KEY } from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';
import { useWallet } from 'wallets/wallet';

type FormData = {
  to?: BigNumber;
};

const InitialFormValues: FormData = {
  to: undefined,
};

const TwoStepWithdraw: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const [withdrawModal, setWithdrawModal] = React.useState<boolean>();

  const { pool } = poolCtx;

  function handleCancel() {
    history.push(`/smart-yield/${pool?.smartYieldAddress}/withdraw`);
  }

  function handleSubmit() {
    setWithdrawModal(true);
  }

  function handleWithdrawCancel() {
    setWithdrawModal(false);
  }

  async function handleWithdrawConfirm(gasFee: number) {
    const { to = ZERO_BIG_NUMBER } = form.getFieldsValue();

    const { pool } = poolCtx;

    if (!pool) {
      return;
    }

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    try {
      const abond = await smartYieldContract.getAbond();
      const decimals = pool.underlyingDecimals;
      const tokenAmount = getNonHumanValue(new BigNumber(to), decimals);
      const maxMaturesAt = 1 + abond.maturesAt;
      const deadline = Math.round(Date.now() / 1_000) + 1200;

      await smartYieldContract.buyJuniorBondSend(tokenAmount, maxMaturesAt, deadline, gasFee);
    } catch {}
  }

  if (!pool) {
    return null;
  }

  return (
    <Card>
      <Text type="h3" weight="semibold" color="primary">
        Two-step withdraw
      </Text>
      <Text type="p2" weight="semibold">
        You can choose between fixed, or variable interest. Be aware of the risk involved and read the warnings before
        going further
      </Text>

      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
        <Form.Item className="mb-32" name="to" label="To" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon="usdc-token"
            max={pool?.underlyingMaxAllowed}
            maximumFractionDigits={pool.underlyingDecimals}
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
            Initiate withdraw
          </Button>
        </Grid>
      </Form>

      {withdrawModal && (
        <ConfirmWithdrawalModal
          visible
          type={WITHDRAW_TWO_STEP_KEY}
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </Card>
  );
};

export default TwoStepWithdraw;
