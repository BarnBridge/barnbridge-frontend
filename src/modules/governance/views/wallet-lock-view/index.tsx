import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addSeconds from 'date-fns/addSeconds';
import getUnixTime from 'date-fns/getUnixTime';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Form from 'components/antd/form';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { ProjectToken } from 'components/providers/known-tokens-provider';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';
import { useDAO } from 'modules/governance/components/dao-provider';

// import WalletLockChart from './components/wallet-lock-chart';
import WalletLockConfirmModal from './components/wallet-lock-confirm-modal';

import { getFormattedDuration, isValidAddress } from 'utils';

type WalletLockViewState = {
  lockDurationOption?: string;
  showLockConfirmModal: boolean;
  saving: boolean;
};

const InitialState: WalletLockViewState = {
  lockDurationOption: undefined,
  showLockConfirmModal: false,
  saving: false,
};

type LockFormData = {
  lockEndDate?: Date;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: LockFormData = {
  lockEndDate: undefined,
  gasPrice: undefined,
};

const DURATION_1_WEEK = '1w';
const DURATION_1_MONTH = '1mo';
const DURATION_3_MONTH = '3mo';
const DURATION_6_MONTH = '6mo';
const DURATION_1_YEAR = '1y';

const DURATION_OPTIONS: string[] = [
  DURATION_1_WEEK,
  DURATION_1_MONTH,
  DURATION_3_MONTH,
  DURATION_6_MONTH,
  DURATION_1_YEAR,
];

function getLockEndDate(startDate: Date, duration: string): Date | undefined {
  switch (duration) {
    case DURATION_1_WEEK:
      return addDays(startDate, 7);
    case DURATION_1_MONTH:
      return addMonths(startDate, 1);
    case DURATION_3_MONTH:
      return addMonths(startDate, 3);
    case DURATION_6_MONTH:
      return addMonths(startDate, 6);
    case DURATION_1_YEAR:
      return addDays(startDate, 365);
    default:
      return undefined;
  }
}

const WalletLockView: React.FC = () => {
  const [form] = Antd.Form.useForm<LockFormData>();

  const daoCtx = useDAO();
  const [state, setState] = useMergeState<WalletLockViewState>(InitialState);

  const { balance: stakedBalance, userLockedUntil, userDelegatedTo } = daoCtx.daoBarn;

  const hasStakedBalance = stakedBalance?.gt(BigNumber.ZERO);
  const hasDelegation = isValidAddress(userDelegatedTo);
  const formDisabled = !hasStakedBalance || hasDelegation;

  const minAllowedDate = React.useMemo(() => {
    const min = Math.max(userLockedUntil ?? 0, Date.now());

    return addSeconds(min, 1);
  }, [userLockedUntil]);

  const maxAllowedDate = addSeconds(addDays(Date.now(), 365), 1);

  function handleValuesChange(changedValues: Partial<LockFormData>) {
    if (changedValues.lockEndDate !== undefined) {
      setState({
        lockDurationOption: undefined,
      });
    }
  }

  function handleFinish() {
    setState({ showLockConfirmModal: true });
  }

  async function handleSubmit(values: LockFormData) {
    const { lockEndDate, gasPrice } = values;

    if (!lockEndDate || !gasPrice) {
      return;
    }

    setState({ saving: true });

    try {
      await daoCtx.daoBarn.actions.lock(getUnixTime(lockEndDate), gasPrice.value);
      form.setFieldsValue(InitialFormValues);
      daoCtx.daoBarn.reload();
    } catch {}

    setState({ saving: false });
  }

  React.useEffect(() => {
    form.setFieldsValue({
      lockEndDate: userLockedUntil && userLockedUntil > Date.now() ? new Date(userLockedUntil) : undefined,
    });
  }, [userLockedUntil]);

  return (
    <div className="card">
      <Grid className="card-header" flow="col" gap={24} colsTemplate="1fr 1fr 1fr 1fr 42px" align="start">
        <Grid flow="col" gap={12}>
          <Icon name={ProjectToken.icon!} width={40} height={40} />
          <Text type="p1" weight="semibold" color="primary">
            BOND
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Staked Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(stakedBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Lock Duration
          </Text>
          <UseLeftTime end={userLockedUntil ?? 0} delay={1_000}>
            {leftTime => (
              <Text type="p1" weight="semibold" color="primary">
                {leftTime > 0 ? getFormattedDuration(0, userLockedUntil) : '0s'}
              </Text>
            )}
          </UseLeftTime>
        </Grid>

        <div />
      </Grid>

      <Form
        className="p-24"
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onValuesChange={handleValuesChange}
        onFinish={handleFinish}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item label="Add lock duration" dependencies={['lockEndDate']}>
                {() => (
                  <div className="flexbox-list" style={{ '--gap': '8px' } as React.CSSProperties}>
                    {DURATION_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        className={cn('button-ghost-monochrome ph-24 pv-16', {
                          selected: state.lockDurationOption === opt,
                        })}
                        disabled={
                          formDisabled ||
                          state.saving ||
                          (getLockEndDate(minAllowedDate, opt) ?? new Date()) > maxAllowedDate
                        }
                        onClick={() => {
                          form.setFieldsValue({
                            lockEndDate: getLockEndDate(new Date(), opt),
                          });
                          setState({
                            lockDurationOption: opt,
                          });
                        }}>
                        <Text type="p1" weight="semibold" color="primary">
                          {opt}
                        </Text>
                      </button>
                    ))}
                  </div>
                )}
              </Form.Item>
              <Text type="p1">OR</Text>
              <Form.Item
                name="lockEndDate"
                label="Manual choose your lock end date"
                rules={[{ required: true, message: 'Required' }]}>
                <DatePicker
                  showTime
                  showNow={false}
                  disabledDate={(date: Date) => isBefore(date, minAllowedDate) || isAfter(date, maxAllowedDate)}
                  format="DD/MM/YYYY HH:mm"
                  size="large"
                  disabled={formDisabled || state.saving}
                />
              </Form.Item>
              <Alert message="All locked balances will be unavailable for withdrawal until the lock timer ends. All future deposits will be locked for the same time." />
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasPrice"
                label="Gas Fee (Gwei)"
                hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                rules={[{ required: true, message: 'Required' }]}>
                <GasFeeList disabled={state.saving} />
              </Form.Item>
            </Grid>
          </Grid>

          {/* <Form.Item shouldUpdate> */}
          {/*  {({ getFieldsValue }) => { */}
          {/*    const { lockEndDate } = getFieldsValue(); */}
          {/*    return lockEndDate ? <WalletLockChart lockEndDate={lockEndDate} /> : null; */}
          {/*  }} */}
          {/* </Form.Item> */}

          <Button
            type="primary"
            htmlType="submit"
            loading={state.saving}
            disabled={formDisabled}
            style={{ justifySelf: 'start' }}>
            Lock
          </Button>
        </Grid>
      </Form>

      {state.showLockConfirmModal && (
        <WalletLockConfirmModal
          balance={stakedBalance}
          duration={form.getFieldsValue().lockEndDate!.valueOf()}
          onCancel={() => setState({ showLockConfirmModal: false })}
          onOk={() => {
            setState({ showLockConfirmModal: false });
            return handleSubmit(form.getFieldsValue());
          }}
        />
      )}
    </div>
  );
};

export default WalletLockView;
