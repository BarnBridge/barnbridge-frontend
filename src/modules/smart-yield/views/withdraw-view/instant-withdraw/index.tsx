import React, { useState } from 'react';
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
import Icon, { TokenIconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TokenAmount from 'components/custom/token-amount';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

type FormData = {
  from?: BigNumber;
  to?: BigNumber;
  slippage?: number;
  deadline?: number;
};

const InitialFormValues: FormData = {
  from: undefined,
  to: undefined,
  slippage: 0.5,
  deadline: 20,
};

const InstantWithdraw: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();
  const { projectToken } = useKnownTokens();
  const { getContract } = useContractManager();
  const [form] = Antd.Form.useForm<FormData>();

  const [withdrawModalVisible, showWithdrawModal] = React.useState<boolean>();
  const [forfeits, setForfeits] = useState<BigNumber | undefined>();
  const [formValues, setFormValues] = useState(InitialFormValues);
  const [priceReversible, setPriceReversible] = useState(false);

  const { pool, marketId, tokenId } = poolCtx;

  function handleFormValuesChange(_: any, values: FormData) {
    setFormValues(values);
  }

  React.useEffect(() => {
    if (!pool || !formValues.from) {
      return;
    }

    poolCtx.actions.getForfeitsFor(formValues.from).then(setForfeits);
  }, [formValues.from]);

  function handlePriceReverse() {
    setPriceReversible(prevState => !prevState);
  }

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
    setFormValues(prevState => ({
      ...prevState,
      ...values,
    }));
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
    const { from = BigNumber.ZERO, slippage, deadline } = form.getFieldsValue();

    if (!pool) {
      return;
    }

    showWithdrawModal(false);

    const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
      return new SYSmartYieldContract(pool.smartYieldAddress);
    });

    try {
      // uint256 debtShare = tokenAmount_ * 1e18 / SY.totalSupply();
      // uint256 forfeits = (SY.abondDebt() * debtShare) / 1e18;
      // uint256 toPay = (tokenAmount_ * SY.price()) / 1e18 - forfeits;
      // minUnderlying => toPay - slippage

      const decimals = pool.underlyingDecimals;
      const tokenAmount = getNonHumanValue(new BigNumber(from), decimals);
      const forfeitsValue = await poolCtx.actions.getForfeitsFor(tokenAmount);
      const price = await smartYieldContract.getPrice();
      const toPay = tokenAmount
        .multipliedBy(price)
        .div(1e18)
        .minus(forfeitsValue ?? BigNumber.ZERO);
      const minUnderlying = new BigNumber(toPay.multipliedBy(1 - (slippage ?? 0) / 100).toFixed(0)); // slippage / rounding mode
      const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

      await poolCtx.actions.instantWithdraw(tokenAmount, minUnderlying, deadlineTs, args.gasPrice);
      form.resetFields();
    } catch {}
  }

  const minimumReceived = React.useMemo(() => {
    if (!pool || !forfeits) {
      return undefined;
    }

    return formValues.from
      ?.multipliedBy(pool.state.jTokenPrice)
      .minus(forfeits)
      .multipliedBy(1 - (formValues.slippage ?? 0) / 100);
  }, [formValues.from, pool?.state.jTokenPrice, forfeits, formValues.slippage]);

  if (!pool) {
    return null;
  }

  return (
    <div className="card p-24">
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        Instant withdraw
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of junior tokens you want to redeem. Make sure you double check the amounts, including the
        amount you forfeit. &nbsp;
        <ExternalLink href="#">Learn more</ExternalLink>
      </Text>

      <Form
        className="grid flow-row"
        form={form}
        initialValues={formValues}
        onValuesChange={handleFormValuesChange}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Form.Item className="mb-32" name="from" label="From" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={
              <IconBubble
                name={pool.meta?.icon}
                bubbleName={projectToken.icon!}
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
        <Icon name="down-arrow-circle" width={32} height={32} className="mh-auto" />
        <Form.Item
          className="mb-32"
          label="To"
          extra={
            <div className="grid flow-col col-gap-8 justify-center">
              {priceReversible ? (
                <Text type="small" weight="semibold" color="secondary">
                  {formatBigValue(1 / pool.state.jTokenPrice)} {pool.contracts.smartYield.symbol} per{' '}
                  {pool.underlyingSymbol}
                </Text>
              ) : (
                <Text type="small" weight="semibold" color="secondary">
                  {formatBigValue(pool.state.jTokenPrice)} {pool.underlyingSymbol} per{' '}
                  {pool.contracts.smartYield.symbol}
                </Text>
              )}
              <button type="button" className="button-text" onClick={handlePriceReverse}>
                <Icon name="refresh" width={16} height={16} />
              </button>
            </div>
          }
          dependencies={['from']}>
          {() => {
            const { from } = form.getFieldsValue();
            const to =
              from && pool
                ? BigNumber.from(from.multipliedBy(pool.state.jTokenPrice).toFixed(pool.underlyingDecimals))
                : undefined;

            return (
              <TokenAmount
                tokenIcon={pool.meta?.icon as TokenIconNames}
                maximumFractionDigits={pool.underlyingDecimals}
                displayDecimals={pool.underlyingDecimals}
                value={to}
                disabled
              />
            );
          }}
        </Form.Item>

        <Form.Item name="slippage" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item name="deadline" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { slippage, deadline } = form.getFieldsValue();

            return (
              <TransactionDetails
                className="mb-32"
                showSlippage
                slippage={slippage}
                showDeadline
                deadline={deadline}
                onChange={handleTxDetailsChange}>
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
                Forfeited balance
              </Text>
              <Text type="p2" weight="semibold" color="red">
                {formatBigValue(forfeits ?? BigNumber.ZERO, pool.underlyingDecimals)} {pool.underlyingSymbol}
              </Text>
            </div>
            <div className="grid flow-col justify-space-between mb-16">
              <Text type="small" weight="semibold" color="secondary">
                Transaction fees
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                0 {pool.underlyingSymbol} (0%)
              </Text>
            </div>
            <div className="grid flow-col justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                Minimum received
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                {formatBigValue(minimumReceived ?? BigNumber.ZERO)} {pool.underlyingSymbol}
              </Text>
            </div>
          </div>
        </div>

        <Grid flow="col" gap={64} align="center" justify="space-between">
          <button type="button" className="button-back" onClick={handleCancel}>
            <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
            Cancel
          </button>
          <Button type="primary" htmlType="submit">
            Withdraw
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
                  Minimum received
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(minimumReceived ?? BigNumber.ZERO)} {pool.underlyingSymbol}
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
                  None
                </Text>
              </div>
            </div>
          }
          submitText="Withdraw"
          onCancel={handleWithdrawCancel}
          onConfirm={handleWithdrawConfirm}
        />
      )}
    </div>
  );
};

export default InstantWithdraw;
