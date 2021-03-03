import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, formatBigValue, getEtherscanTxUrl, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Icon from 'components/custom/icon';
import Icons, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
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

const InitialFormValues: FormData = {
  from: undefined,
  to: undefined,
  slippageTolerance: 0.5,
  deadline: 20,
};

type State = {
  isSaving: boolean;
  depositModalVisible: boolean;
  statusModalVisible: boolean;
  txState: 'progress' | 'success' | 'failure';
  txHash?: string;
};

const InitialState: State = {
  isSaving: false,
  depositModalVisible: false,
  statusModalVisible: false,
  txState: 'progress',
  txHash: undefined,
};

const JuniorTranche: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useSYPool();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool, marketId, tokenId } = poolCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const formDisabled = !pool?.underlyingIsAllowed;

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

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

  function handleStatusModalCancel() {
    setState(
      mergeState<State>({
        statusModalVisible: false,
      }),
    );
  }

  function handleTxSuccess() {
    history.push({
      pathname: `/smart-yield/portfolio/junior`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  async function handleDepositConfirm({ gasPrice }: any) {
    if (!pool) {
      return;
    }

    const { from, slippageTolerance, deadline } = form.getFieldsValue();

    if (!from) {
      return;
    }

    setState(
      mergeState<State>({
        isSaving: true,
      }),
    );

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);
    const price = await smartYieldContract.getPrice();

    const controllerContract = new SYControllerContract(pool.controllerAddress);
    controllerContract.setProvider(wallet.provider);
    const juniorFee = await controllerContract.getJuniorBuyFee();

    const decimals = pool.underlyingDecimals;
    const slippage = new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100);
    const minAmount = from.multipliedBy(new BigNumber(1).minus(juniorFee.dividedBy(1e18)).minus(slippage));
    const minTokens = minAmount.dividedBy(price);
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

    smartYieldContract
      .on('tx:transactionHash', (txHash: string) => {
        setState(
          mergeState<State>({
            depositModalVisible: false,
            statusModalVisible: true,
            txState: 'progress',
            txHash,
          }),
        );
      })
      .on('tx:complete', () => {
        setState(
          mergeState<State>({
            txState: 'success',
          }),
        );
      })
      .on('tx:failure', () => {
        setState(
          mergeState<State>({
            depositModalVisible: false,
            txState: 'failure',
          }),
        );
      });

    try {
      await smartYieldContract.buyTokensSend(
        getNonHumanValue(from, decimals),
        getNonHumanValue(new BigNumber(minTokens.toFixed(0)), decimals),
        deadlineTs,
        gasPrice,
      );
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
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Form.Item name="from" label="From" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={pool?.meta?.icon as TokenIconNames}
            max={getHumanValue(pool?.underlyingMaxAllowed, pool?.underlyingDecimals)}
            maximumFractionDigits={pool?.underlyingDecimals}
            displayDecimals={4}
            disabled={formDisabled || state.isSaving}
            slider
          />
        </Form.Item>
        <Icons name="down-arrow-circle" width={32} height={32} className="mh-auto" />
        <Form.Item
          className="mb-32"
          label="To"
          extra={
            <div className="grid flow-col col-gap-8 justify-center">
              <Icons name="refresh" width={16} height={16} />
              <Text type="small" weight="semibold" color="secondary">
                {formatBigValue(pool?.state.jTokenPrice)} j{pool?.underlyingSymbol} per {pool?.underlyingSymbol}
              </Text>
            </div>
          }
          dependencies={['from']}>
          {() => {
            const { from } = form.getFieldsValue();
            const to = from && pool ? new BigNumber(from.multipliedBy(pool.state.jTokenPrice).toFixed(4)) : undefined;

            return (
              <TokenAmount
                tokenIcon={pool?.meta?.icon as TokenIconNames}
                maximumFractionDigits={pool?.underlyingDecimals}
                displayDecimals={4}
                value={to}
                disabled
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
                Transaction fees
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                -
              </Text>
            </div>
            <div className="grid flow-col justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                You will get
              </Text>
              <Text type="p2" weight="semibold" color="primary">
                -
              </Text>
            </div>
          </div>
        </div>
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
        <div className="grid flow-col col-gap-32 align-center justify-space-between">
          <Button type="light" disabled={state.isSaving} onClick={handleCancel}>
            <Icon name="left-arrow" width={9} height={8} />
            Cancel
          </Button>
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
                  - j{pool?.underlyingSymbol}
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
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleDepositCancel}
          onConfirm={handleDepositConfirm}
        />
      )}

      {state.statusModalVisible && (
        <TxStatusModal
          visible
          state={state.txState}
          txLink={state.txHash && getEtherscanTxUrl(state.txHash)}
          onSuccessClick={handleTxSuccess}
          onCancel={handleStatusModalCancel}
        />
      )}
    </>
  );
};

export default JuniorTranche;
