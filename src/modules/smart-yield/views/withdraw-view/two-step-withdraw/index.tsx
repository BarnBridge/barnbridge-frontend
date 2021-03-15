import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, formatBigValue, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TokenAmount from 'components/custom/token-amount';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/wallet';

import { getFormattedDuration } from 'utils';

type FormData = {
  to?: BigNumber;
};

const InitialFormValues: FormData = {
  to: undefined,
};

const TwoStepWithdraw: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useSYPool();
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
    const { to = ZERO_BIG_NUMBER } = form.getFieldsValue();

    if (!pool) {
      return;
    }

    showWithdrawModal(false);

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    try {
      const abond = await smartYieldContract.getAbond();
      const decimals = pool.underlyingDecimals;
      const tokenAmount = getNonHumanValue(new BigNumber(to), decimals);
      const maxMaturesAt = 1 + abond.maturesAt;
      const deadline = Math.round(Date.now() / 1_000) + 1200;

      await poolCtx.actions.twoStepWithdraw(tokenAmount, maxMaturesAt, deadline, args.gasPrice);
      form.resetFields();
    } catch {}
  }

  if (!pool) {
    return null;
  }

  return (
    <Card>
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        2 step withdraw
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of junior tokens you want to redeem through the 2 step process. Make sure you understand what
        this purchase of a junior bond means, and double check the amount and wait time. &nbsp;
        <ExternalLink href="https://docs.barnbridge.com/sy-specs/junior-tranches#steps-for-exit">
          Learn more
        </ExternalLink>
      </Text>

      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
        <Form.Item className="mb-32" name="to" label="Amount" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={
              <IconBubble
                name={pool.meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={pool.market?.icon}
                width={36}
                height={36}
              />
            }
            max={getHumanValue(pool.contracts.smartYield.balance, pool.underlyingDecimals)}
            maximumFractionDigits={pool.underlyingDecimals}
            displayDecimals={pool.underlyingDecimals}
            disabled={false}
          />
        </Form.Item>

        <div className="card mb-32">
          <div className="pv-24 ph-24">
            <div className="grid flow-col justify-space-between">
              <Hint text="Your transaction will revert if it isn't mined in this amount of time.">
                <Text type="small" weight="semibold" color="secondary">
                  Transaction deadline
                </Text>
              </Hint>
              <Text type="p2" weight="semibold" color="primary">
                20 minutes
              </Text>
            </div>
          </div>
        </div>

        <div className="card mb-32">
          <div className="pv-24 ph-24">
            <Text type="p2" weight="semibold" color="secondary">
              Transaction summary
            </Text>
          </div>
          <Divider />
          <div className="pv-24 ph-24">
            <div className="grid flow-col justify-space-between mb-16">
              <Text type="small" weight="semibold" color="secondary">
                Wait time
              </Text>
              <UseLeftTime end={(pool.contracts.smartYield.abond?.maturesAt ?? 0) * 1_000} delay={1_000}>
                {leftTime => (
                  <Text type="p2" weight="semibold" color="primary">
                    {leftTime > 0
                      ? getFormattedDuration(0, (pool.contracts.smartYield.abond?.maturesAt ?? 0) * 1_000)
                      : '0s'}
                  </Text>
                )}
              </UseLeftTime>
            </div>
            <div className="grid flow-col justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                Transaction fees
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                0 {pool.underlyingSymbol} (0%)
              </Text>
            </div>
          </div>
        </div>

        <Grid flow="col" gap={64} align="center" justify="space-between">
          <button type="button" className="button-text" onClick={handleCancel}>
            <Icon name="left-arrow" width={9} height={8} className="mr-12" color="inherit" />
            Cancel
          </button>
          <Button type="primary" htmlType="submit">
            Initiate withdraw
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
                  Token amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(form.getFieldsValue().to)} {pool.contracts.smartYield.symbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Withdrawal type
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  2 step
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Wait time
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {getFormattedDuration(0, (pool.contracts.smartYield.abond?.maturesAt ?? 0) * 1_000)}
                </Text>
              </div>
            </div>
          }
          submitText="Confirm withdrawal initiation"
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </Card>
  );
};

export default TwoStepWithdraw;
