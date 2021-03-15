import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, formatBigValue, formatPercent, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Icon, { TokenIconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/wallet';

type FormData = {
  from?: BigNumber;
  to?: BigNumber;
  slippageTolerance?: number;
  deadline?: number;
};

type State = {
  formValues: FormData;
  isSaving: boolean;
  depositModalVisible: boolean;
};

const InitialState: State = {
  formValues: {
    from: undefined,
    to: undefined,
    slippageTolerance: 0.5,
    deadline: 20,
  },
  isSaving: false,
  depositModalVisible: false,
};

const JuniorTranche: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useSYPool();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool, marketId, tokenId } = poolCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [priceReversible, setPriceReversible] = React.useState(false);
  const formDisabled = !pool?.contracts.underlying.isAllowed;

  function handlePriceReverse() {
    setPriceReversible(prevState => !prevState);
  }

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
    setState(prevState => ({
      ...prevState,
    }));
  }, []);

  const [juniorFee, setJuniorFee] = React.useState<BigNumber | undefined>();
  const [price, setPrice] = React.useState<BigNumber | undefined>();

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const controllerContract = new SYControllerContract(pool.controllerAddress);
    controllerContract.setProvider(wallet.provider);
    controllerContract.getJuniorBuyFee().then(setJuniorFee);
  }, [pool?.controllerAddress]);

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    smartYieldContract.getPrice().then(setPrice);
  }, [pool?.smartYieldAddress]);

  function getAmount() {
    if (!pool || !juniorFee || !price) {
      return undefined;
    }

    const { from } = form.getFieldsValue();

    if (!from) {
      return undefined;
    }

    /// to = (from - fee) * price
    const minAmount = from.multipliedBy(new BigNumber(1).minus(juniorFee.dividedBy(1e18)));

    return minAmount.dividedBy(price.dividedBy(1e18));
  }

  function getMinAmount() {
    if (!pool || !juniorFee || !price) {
      return undefined;
    }

    const { from, slippageTolerance } = form.getFieldsValue();

    if (!from) {
      return undefined;
    }

    /// minTo = (from - fee) * price - slippage
    const minAmount = from.multipliedBy(new BigNumber(1).minus(juniorFee.dividedBy(1e18)));

    return minAmount.dividedBy(price.dividedBy(1e18)).multipliedBy(1 - (slippageTolerance ?? 0) / 100);
  }

  function handleFormValuesChange(_: any, values: FormData) {
    setState(
      mergeState<State>({
        formValues: values,
      }),
    );
  }

  function handleCancel() {
    history.push({
      pathname: `/smart-yield/deposit`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  function handleSubmit() {
    setState(
      mergeState<State>({
        depositModalVisible: true,
      }),
    );
  }

  function handleDepositCancel() {
    setState(
      mergeState<State>({
        depositModalVisible: false,
      }),
    );
  }

  async function handleDepositConfirm({ gasPrice }: any) {
    if (!pool || !juniorFee) {
      return;
    }

    const { from, deadline } = form.getFieldsValue();

    if (!from) {
      return;
    }

    setState(
      mergeState<State>({
        depositModalVisible: false,
        isSaving: true,
      }),
    );

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    const decimals = pool.underlyingDecimals;
    const amount = from.multipliedBy(10 ** decimals);
    const minTokens = new BigNumber((getMinAmount() ?? ZERO_BIG_NUMBER).multipliedBy(10 ** decimals).toFixed(0));
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

    try {
      await poolCtx.actions.juniorDeposit(amount, minTokens, deadlineTs, gasPrice);
      form.resetFields();
    } catch {}

    setState(
      mergeState<State>({
        isSaving: false,
      }),
    );
  }

  return (
    <>
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        Junior deposit
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of junior tokens you want to purchase.
      </Text>
      <Form
        className="grid flow-row"
        form={form}
        initialValues={state.formValues}
        onValuesChange={handleFormValuesChange}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Form.Item name="from" label="From" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={pool?.meta?.icon as TokenIconNames}
            max={getHumanValue(pool?.contracts.underlying.maxAllowed, pool?.underlyingDecimals)}
            maximumFractionDigits={pool?.underlyingDecimals}
            displayDecimals={4}
            disabled={formDisabled || state.isSaving}
            slider
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
                  {formatBigValue(1 / (pool?.state.jTokenPrice ?? 1))} {pool?.contracts.smartYield.symbol} per{' '}
                  {pool?.underlyingSymbol}
                </Text>
              ) : (
                <Text type="small" weight="semibold" color="secondary">
                  {formatBigValue(pool?.state.jTokenPrice)} {pool?.underlyingSymbol} per{' '}
                  {pool?.contracts.smartYield.symbol}
                </Text>
              )}
              <button type="button" className="button-text" onClick={handlePriceReverse}>
                <Icon name="refresh" width={16} height={16} />
              </button>
            </div>
          }
          dependencies={['from', 'slippageTolerance']}>
          {() => (
            <TokenAmount
              tokenIcon={
                <IconBubble
                  name={pool?.meta?.icon}
                  bubbleName="bond-circle-token"
                  secondBubbleName={pool?.market?.icon}
                  width={36}
                  height={36}
                />
              }
              maximumFractionDigits={pool?.underlyingDecimals}
              displayDecimals={pool?.underlyingDecimals}
              value={new BigNumber(getAmount()?.toFixed(pool?.underlyingDecimals ?? 0) ?? ZERO_BIG_NUMBER)}
              disabled
            />
          )}
        </Form.Item>
        <Form.Item name="slippageTolerance" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item name="deadline" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { slippageTolerance, deadline } = form.getFieldsValue();

            return (
              <TransactionDetails
                className="mb-32"
                slippageTolerance={slippageTolerance}
                deadline={deadline}
                onChange={handleTxDetailsChange}
              />
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
                Protocol fees
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                <Form.Item dependencies={['from']} noStyle>
                  {() => (
                    <>
                      {formatBigValue(
                        new BigNumber(form.getFieldValue('from') ?? ZERO_BIG_NUMBER)
                          .multipliedBy(juniorFee ?? 0)
                          .dividedBy(1e18),
                      )}{' '}
                    </>
                  )}
                </Form.Item>
                {pool?.underlyingSymbol} ({formatPercent(juniorFee?.dividedBy(1e18))})
              </Text>
            </div>
            <div className="grid flow-col justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                Minimum received
              </Text>
              <Form.Item dependencies={['from', 'slippageTolerance']} noStyle>
                {() => (
                  <Text type="p2" weight="semibold" color="primary">
                    {formatBigValue(getMinAmount() ?? ZERO_BIG_NUMBER)} {pool?.contracts.smartYield.symbol}
                  </Text>
                )}
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="grid flow-col col-gap-32 align-center justify-space-between">
          <button type="button" className="button-text" disabled={state.isSaving} onClick={handleCancel}>
            <Icon name="left-arrow" width={9} height={8} className="mr-12" color="inherit" />
            Cancel
          </button>
          <Button type="primary" htmlType="submit" disabled={formDisabled} loading={state.isSaving}>
            Deposit
          </Button>
        </div>
      </Form>

      {state.depositModalVisible && (
        <TxConfirmModal
          visible
          title="Confirm your deposit"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Minimum received
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(getMinAmount())} {pool?.contracts.smartYield.symbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(form.getFieldValue('from'))} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Transaction fees
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(
                    new BigNumber(form.getFieldValue('from') ?? ZERO_BIG_NUMBER)
                      .multipliedBy(juniorFee ?? 0)
                      .dividedBy(1e18),
                  )}{' '}
                  {pool?.underlyingSymbol} ({formatPercent(juniorFee?.dividedBy(1e18))})
                </Text>
              </div>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleDepositCancel}
          onConfirm={handleDepositConfirm}
        />
      )}
    </>
  );
};

export default JuniorTranche;
