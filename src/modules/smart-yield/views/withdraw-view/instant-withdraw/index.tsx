import React from 'react';
import { useHistory } from 'react-router';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';
import { useWallet } from 'wallets/wallet';

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
  const wallet = useWallet();
  const poolCtx = useTokenPool();
  const [form] = Antd.Form.useForm<FormData>();

  const [withdrawModalVisible, showWithdrawModal] = React.useState<boolean>();

  const { pool, marketId, tokenId } = poolCtx;

  function handleCancel() {
    history.push({
      pathname: `/smart-yield/withdraw`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  function handleSubmit() {
    showWithdrawModal(true);
  }

  function handleWithdrawCancel() {
    showWithdrawModal(false);
  }

  async function handleWithdrawConfirm(args: ConfirmTxModalArgs) {
    const { from = ZERO_BIG_NUMBER, to = ZERO_BIG_NUMBER } = form.getFieldsValue();
    const { pool } = poolCtx;

    if (!pool) {
      return;
    }

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    try {
      // uint256 debtShare = tokenAmount_ * 1e18 / SY.totalSupply();
      // uint256 forfeits = (SY.abondDebt() * debtShare) / 1e18;
      // uint256 toPay = (tokenAmount_ * SY.price()) / 1e18 - forfeits;
      // minUnderlying => toPay - slippage

      const decimals = pool.underlyingDecimals;
      const tokenAmount = getNonHumanValue(new BigNumber(from), decimals);
      const totalSupply = await smartYieldContract.getTotalSupply();
      const abondDebt = await smartYieldContract.getAbondDebt();
      const price = await smartYieldContract.getPrice();
      const debtShare = tokenAmount.dividedBy(totalSupply);
      const forfeits = abondDebt.multipliedBy(debtShare).dividedBy(1e18);
      const toPay = tokenAmount.multipliedBy(price).dividedBy(1e18).minus(forfeits);
      const minUnderlying = new BigNumber(toPay.multipliedBy(1 - 0.005).toFixed(0)); // slippage / rounding mode
      const deadline = Math.round(Date.now() / 1_000) + 1200;

      await smartYieldContract.sellTokensSend(tokenAmount, minUnderlying, deadline, args.gasPrice);
    } catch {}
  }

  if (!pool) {
    return null;
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
            max={getHumanValue(pool.smartYieldBalance, pool.underlyingDecimals)}
            maximumFractionDigits={pool.underlyingDecimals}
            displayDecimals={pool.underlyingDecimals}
            disabled={false}
          />
        </Form.Item>
        <Form.Item className="mb-32" name="to" label="To" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon="usdc-token"
            max={getHumanValue(pool.smartYieldBalance, pool.underlyingDecimals)}
            maximumFractionDigits={pool.underlyingDecimals}
            displayDecimals={pool.underlyingDecimals}
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

      {withdrawModalVisible && (
        <TxConfirmModal
          visible
          title="Confirm your withdrawal"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Minimum received
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Withdrawal type
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  Instant
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Wait time
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
            </div>
          }
          submitText="Withdraw"
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </Card>
  );
};

export default InstantWithdraw;
