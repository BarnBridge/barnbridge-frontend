import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import addDays from 'date-fns/addDays';
import differenceInDays from 'date-fns/differenceInDays';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import startOfDay from 'date-fns/startOfDay';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { formatBigValue, formatPercent, getHumanValue, getNonHumanValue } from 'web3/utils';

import DatePicker from 'components/antd/datepicker';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Spin from 'components/antd/spin';
import { Button } from 'components/button';
import { TokenAmount } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { mergeState } from 'hooks/useMergeState';
import TransactionSummary from 'modules/smart-yield/components/transaction-summary';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { SYPool, useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { DURATION_1_MONTH, DURATION_1_YEAR, DURATION_3_MONTHS, DURATION_6_MONTHS, getDurationDate } from 'utils/date';

type FormData = {
  maturityDate?: Date;
  slippage?: number;
  deadline?: number;
};

const InitialFormValues: FormData = {
  maturityDate: undefined,
  slippage: 0.5,
  deadline: 20,
};

const DURATION_OPTIONS = [DURATION_1_MONTH, DURATION_3_MONTHS, DURATION_6_MONTHS, DURATION_1_YEAR];

type State = {
  isSaving: boolean;
  depositModalVisible: boolean;
};

const InitialState: State = {
  isSaving: false,
  depositModalVisible: false,
};

const SeniorTranche: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();
  const { getContract } = useContractManager();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool, marketId, tokenId } = poolCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [bondGain, setBondGain] = React.useState<BigNumber | undefined>();

  const [formState, setFormState] = React.useState<FormData>(InitialFormValues);
  const [bondMaxLife, setBondMaxLife] = React.useState<number | undefined>();
  const [seniorRedeemFee, setSeniorRedeemFee] = React.useState<BigNumber | undefined>();
  const [isApproving, setApproving] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState('');
  const { getOrCreateContract, getContract: getContractNew } = useContractFactory();

  const uToken = pool?.contracts.underlying;
  const uBalance = uToken?.balance;
  const uAllowed = uToken?.isAllowedOf(pool?.providerAddress!);
  const uAllowance = uToken?.getAllowanceOf(pool?.providerAddress!);
  const maxAmount = BigNumber.min(uAllowance ?? 0, uBalance ?? 0).unscaleBy(pool?.underlyingDecimals);
  const formDisabled = !uAllowed;
  const bnAmount = amount ? BigNumber.from(amount) : undefined;

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const controllerContract = getContract<SYControllerContract>(pool.controllerAddress, () => {
      return new SYControllerContract(pool.controllerAddress);
    });
    controllerContract.getBondLifeMax().then(setBondMaxLife);
    controllerContract.getSeniorRedeemFee().then(setSeniorRedeemFee);
  }, [pool?.controllerAddress]);

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
  }, []);

  function handleCancel() {
    history.push({
      pathname: `/smart-yield/deposit`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  async function handleTokenEnable() {
    setApproving(true);

    try {
      await poolCtx.actions.approveUnderlying(true);
    } catch {}

    setApproving(false);
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
    if (!pool) {
      return;
    }

    const amount = bnAmount;
    const maturityDate = form.getFieldValue('maturityDate');
    const slippage = form.getFieldValue('slippage');
    const deadline = form.getFieldValue('deadline');

    if (!amount) {
      return;
    }

    setState(
      mergeState<State>({
        depositModalVisible: false,
        isSaving: true,
      }),
    );

    const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
      return new SYSmartYieldContract(pool.smartYieldAddress);
    });

    try {
      const decimals = pool.underlyingDecimals;
      const amountScaled = getNonHumanValue(amount, decimals);
      const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);
      const lockDays = differenceInDays(maturityDate ?? startOfDay(new Date()), startOfDay(new Date()));

      const minGain = await smartYieldContract.getBondGain(amountScaled, lockDays);
      const minGainMFee = minGain.multipliedBy(1 - (slippage ?? 0) / 100);
      const gain = new BigNumber(Math.round(minGainMFee.toNumber()));

      await poolCtx.actions.seniorDeposit(amountScaled, gain, deadlineTs, lockDays ?? 0, gasPrice);
      form.resetFields();
    } catch {}

    setState(
      mergeState<State>({
        isSaving: false,
      }),
    );
  }

  React.useEffect(() => {
    setBondGain(undefined);
  }, [amount]);

  useEffect(() => {
    if (pool?.smartYieldAddress) {
      getOrCreateContract(pool.smartYieldAddress, () => new SYSmartYieldContract(pool.smartYieldAddress));
    }
  }, [pool?.smartYieldAddress]);

  const getBondGain = useDebounce((pPool: SYPool, pAmount: BigNumber, pMaturityDate: number) => {
    const smartYieldContract = getContractNew<SYSmartYieldContract>(pPool.smartYieldAddress);

    const decimals = pPool.underlyingDecimals;
    const amount = pAmount?.multipliedBy(10 ** decimals) ?? BigNumber.ZERO;
    const today = startOfDay(new Date());
    const days = differenceInDays(pMaturityDate ?? today, today);

    smartYieldContract?.getBondGain(amount, days).then(setBondGain).catch(Error);
  }, 400);

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    if (!bnAmount || !bnAmount.gt(BigNumber.ZERO)) {
      setBondGain(undefined);
      return;
    }

    getBondGain(pool, bnAmount, formState.maturityDate);
  }, [pool, amount, formState.maturityDate]);

  const maturityDays = React.useMemo(() => {
    const today = startOfDay(new Date());
    return differenceInDays(formState.maturityDate ?? today, today);
  }, [formState.maturityDate]);

  const apy = React.useMemo(() => {
    if (maturityDays <= 0 || !bnAmount || !bnAmount?.gt(BigNumber.ZERO)) {
      return BigNumber.ZERO;
    }

    return (
      bondGain
        ?.unscaleBy(pool?.underlyingDecimals)
        ?.dividedBy(bnAmount ?? 1)
        .dividedBy(maturityDays)
        .multipliedBy(365) ?? BigNumber.ZERO
    );
  }, [pool, bondGain, amount, maturityDays]);

  const reward = bnAmount
    ?.multipliedBy(10 ** (pool?.underlyingDecimals ?? 0))
    ?.plus(bondGain?.multipliedBy(1 - (seniorRedeemFee?.dividedBy(1e18)?.toNumber() ?? 0)) ?? BigNumber.ZERO);

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
        <Form.Item label="Amount" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            className="mb-24"
            before={<TokenIcon name={pool?.token?.icon as TokenIconNames} />}
            placeholder={`0 (Max ${maxAmount?.toNumber() ?? 0})`}
            max={maxAmount}
            disabled={state.isSaving}
            decimals={pool?.underlyingDecimals}
            value={amount}
            onChange={ev => {
              setAmount(ev);
            }}
            slider
          />
        </Form.Item>
        <Form.Item
          label="Maturity date"
          extra={bondMaxLife ? `Max ${bondMaxLife} days` : ''}
          hint="You can select a maturity date between 1 and 30 days, in increments of 1 day."
          rules={[{ required: true, message: 'Required' }]}>
          <DatePicker
            showNow={false}
            disabledDate={(date: Date) =>
              isBefore(date, new Date()) || isAfter(date, addDays(new Date(), bondMaxLife ?? 0))
            }
            format="DD/MM/YYYY"
            size="large"
            disabled={state.isSaving}
            value={formState.maturityDate}
            onChange={date => {
              form.setFieldsValue({
                maturityDate: date ?? undefined,
              });
              setFormState(
                mergeState<FormData>({
                  maturityDate: date ?? undefined,
                }),
              );
              setBondGain(undefined);
            }}
          />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            return (
              <div className="flexbox-list" style={{ '--gap': '8px' } as React.CSSProperties}>
                {DURATION_OPTIONS.map(opt => {
                  const today = startOfDay(new Date());
                  const date = getDurationDate(today, opt);
                  const maturityDate = form.getFieldValue('maturityDate');

                  if ((date ?? today) > addDays(today, bondMaxLife ?? 0)) {
                    return undefined;
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      className={cn('button-ghost-monochrome ph-24 pv-16', {
                        selected: date?.valueOf() === maturityDate?.valueOf(),
                      })}
                      disabled={state.isSaving}
                      onClick={() => {
                        form.setFieldsValue({
                          maturityDate: date,
                        });
                        setFormState(
                          mergeState<FormData>({
                            maturityDate: date,
                          }),
                        );
                        setBondGain(undefined);
                      }}>
                      <Text type="p2" weight="semibold" color="primary">
                        {opt}
                      </Text>
                    </button>
                  );
                })}
              </div>
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
                showSlippage
                slippage={slippage}
                slippageHint="Your transaction will revert if the gains for your senior bonds you actually receive are smaller by this percentage."
                showDeadline
                deadline={deadline}
                onChange={handleTxDetailsChange}>
                Transaction details
              </TransactionDetails>
            );
          }}
        </Form.Item>
        <TransactionSummary
          apy={bondGain ? apy : undefined}
          gain={getHumanValue(bondGain, pool?.underlyingDecimals)}
          gainFee={seniorRedeemFee?.dividedBy(1e18)}
          reward={bondGain ? getHumanValue(reward, pool?.underlyingDecimals) ?? BigNumber.ZERO : undefined}
          symbol={pool?.underlyingSymbol}
        />
        <div className="grid flow-col col-gap-32 align-center justify-space-between">
          <Button
            type="button"
            variation="text-alt"
            icon="arrow"
            iconPosition="left"
            iconRotate={180}
            disabled={state.isSaving}
            onClick={handleCancel}>
            Cancel
          </Button>
          <div className="flex">
            {uAllowed === false && (
              <button type="button" className="button-ghost mr-24" disabled={isApproving} onClick={handleTokenEnable}>
                <Spin spinning={isApproving} />
                Enable {pool?.underlyingSymbol}
              </button>
            )}
            <Button type="submit" variation="primary" disabled={formDisabled} loading={state.isSaving}>
              Deposit
            </Button>
          </div>
        </div>
      </Form>

      {state.depositModalVisible && (
        <TxConfirmModal
          title="Confirm your deposit"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(getHumanValue(reward, pool?.underlyingDecimals))} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(bnAmount)} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity in
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {maturityDays} days
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="green">
                  {formatPercent(apy)}
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

export default SeniorTranche;
