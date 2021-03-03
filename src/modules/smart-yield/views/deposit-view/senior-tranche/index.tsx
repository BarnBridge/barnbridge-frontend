import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { differenceInDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { ZERO_BIG_NUMBER, formatBigValue, getEtherscanTxUrl, getHumanValue, getNonHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Icon, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';
import TransactionSummary from 'modules/smart-yield/components/transaction-summary';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import TxStatusModal from 'modules/smart-yield/components/tx-status-modal';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/wallet';

import { DURATION_1_WEEK, DURATION_2_WEEK, DURATION_3_WEEK, DURATION_4_WEEK, getLockEndDate } from 'utils/date';

type FormData = {
  amount?: BigNumber;
  maturityDate?: Date;
  slippageTolerance?: number;
  deadline?: number;
};

const InitialFormValues: FormData = {
  amount: undefined,
  maturityDate: undefined,
  slippageTolerance: 0.5,
  deadline: 20,
};

const DURATION_OPTIONS = [DURATION_1_WEEK, DURATION_2_WEEK, DURATION_3_WEEK, DURATION_4_WEEK];

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

const SeniorTranche: React.FC = () => {
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
      pathname: `/smart-yield/portfolio/senior`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  async function handleDepositConfirm({ gasPrice }: any) {
    if (!pool) {
      return;
    }

    const { amount, maturityDate, slippageTolerance, deadline } = form.getFieldsValue();

    if (!amount) {
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

    try {
      const decimals = pool.underlyingDecimals;
      const amountScaled = getNonHumanValue(amount, decimals);
      const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);
      const lockDays = differenceInDays(maturityDate ?? startOfDay(new Date()), startOfDay(new Date()));

      const minGain = await smartYieldContract.getBondGain(amountScaled, lockDays);
      const minGainMFee = new BigNumber(1)
        .minus(new BigNumber(slippageTolerance ?? ZERO_BIG_NUMBER).dividedBy(100))
        .multipliedBy(minGain);
      const gain = new BigNumber(Math.round(minGainMFee.toNumber()));

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

      await smartYieldContract.buyBondSend(amountScaled, gain, deadlineTs, lockDays ?? 0, gasPrice);
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
        Senior deposit
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of tokens you want to deposit in the senior bond. Make sure you double check the amounts,
        including reward at maturity and maturity date.
      </Text>
      <Form
        className="grid flow-row row-gap-32"
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Form.Item name="amount" label="Amount" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon={pool?.meta?.icon as TokenIconNames}
            max={getHumanValue(pool?.underlyingMaxAllowed, pool?.underlyingDecimals)}
            maximumFractionDigits={pool?.underlyingDecimals}
            displayDecimals={4}
            disabled={formDisabled || state.isSaving}
            slider
          />
        </Form.Item>
        <Form.Item
          name="maturityDate"
          label="Maturity date"
          hint="You can select a maturity date between 1 and 30 days, in increments of 1 day."
          rules={[{ required: true, message: 'Required' }]}>
          <DatePicker
            showNow={false}
            disabledDate={(date: Date) =>
              isBefore(date, new Date()) || isAfter(date, getLockEndDate(new Date(), DURATION_4_WEEK)!)
            }
            format="DD/MM/YYYY"
            size="large"
            disabled={formDisabled || state.isSaving}
          />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => (
            <div className="flexbox-list">
              {DURATION_OPTIONS.map(opt => (
                <Button
                  key={opt}
                  type="select"
                  disabled={formDisabled || state.isSaving}
                  onClick={() => {
                    form.setFieldsValue({
                      maturityDate: getLockEndDate(startOfDay(new Date()), opt),
                    });
                  }}>
                  <Text type="p1" weight="semibold" color="primary">
                    {opt}
                  </Text>
                </Button>
              ))}
            </div>
          )}
        </Form.Item>
        <Form.Item name="slippageTolerance" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item name="deadline" noStyle hidden>
          <Input />
        </Form.Item>
        <TransactionSummary apy={0} reward={100} symbol={pool?.underlyingSymbol} />
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { slippageTolerance, deadline } = form.getFieldsValue();

            return (
              <TransactionDetails
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
                  Redeemable amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(form.getFieldValue('amount'))} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity in
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - days
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  - %
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

export default SeniorTranche;
