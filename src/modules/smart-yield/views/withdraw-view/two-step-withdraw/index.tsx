import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { formatBigValue, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { getFormattedDuration } from 'utils';

type FormData = {
  to?: BigNumber;
  deadline?: number;
};

const InitialFormValues: FormData = {
  to: undefined,
  deadline: 20,
};

const TwoStepWithdraw: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();
  const { projectToken } = useKnownTokens();
  const { getContract } = useContractManager();
  const [reload] = useReload();
  const [form] = Antd.Form.useForm<FormData>();

  const [withdrawModalVisible, showWithdrawModal] = React.useState<boolean>();

  const { pool, marketId, tokenId } = poolCtx;

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
    reload();
  }, []);

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
    const { to = BigNumber.ZERO, deadline = 20 } = form.getFieldsValue();

    if (!pool) {
      return;
    }

    showWithdrawModal(false);

    const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
      return new SYSmartYieldContract(pool.smartYieldAddress);
    });

    try {
      const abond = await smartYieldContract.getAbond();
      const decimals = pool.underlyingDecimals;
      const tokenAmount = getNonHumanValue(new BigNumber(to), decimals);
      const maxMaturesAt = 1 + abond.maturesAt;
      const deadlineMs = Math.round(Date.now() / 1_000) + deadline * 60;

      await poolCtx.actions.twoStepWithdraw(tokenAmount, maxMaturesAt, deadlineMs, args.gasPrice);
      form.resetFields();
    } catch {}
  }

  if (!pool) {
    return null;
  }

  return (
    <div className="card p-24">
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        2 step withdraw
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of junior tokens you want to redeem through the 2 step process. Make sure you understand what
        this purchase of a junior bond means, and double check the amount and wait time. &nbsp;
        <ExternalLink href="https://integrations.barnbridge.com/specs/smart-yield-specifications#steps-for-exit">
          Learn more
        </ExternalLink>
      </Text>

      <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
        <Form.Item className="mb-32" name="to" label="Amount" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={
              <TokenIcon
                name={pool.token?.icon as TokenIconNames}
                bubble1Name={projectToken.icon}
                bubble2Name={pool.market?.icon.active as TokenIconNames}
                size={36}
              />
            }
            max={getHumanValue(pool.contracts.smartYield.balance, pool.underlyingDecimals)}
            maximumFractionDigits={pool.underlyingDecimals}
            displayDecimals={pool.underlyingDecimals}
            disabled={false}
          />
        </Form.Item>

        <Form.Item name="deadline" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { deadline } = form.getFieldsValue();

            return (
              <TransactionDetails className="mb-32" showDeadline deadline={deadline} onChange={handleTxDetailsChange}>
                Transaction details
              </TransactionDetails>
            );
          }}
        </Form.Item>

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
          <button type="button" className="button-back" onClick={handleCancel}>
            <Icon name="arrow-back" width={9} height={8} className="mr-8" color="inherit" />
            Cancel
          </button>
          <Button type="primary" htmlType="submit">
            Initiate withdraw
          </Button>
        </Grid>
      </Form>

      {withdrawModalVisible && (
        <TxConfirmModal
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
    </div>
  );
};

export default TwoStepWithdraw;
