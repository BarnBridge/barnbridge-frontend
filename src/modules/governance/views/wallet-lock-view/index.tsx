import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';
import {
  addSeconds,
  addDays,
  isBefore,
  isAfter,
  getUnixTime,
} from 'date-fns';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import DatePicker from 'components/antd/datepicker';
import Button from 'components/antd/button';
import Alert from 'components/antd/alert';
import Grid from 'components/custom/grid';
import GasFeeList from 'components/custom/gas-fee-list';
import { Paragraph, Small } from 'components/custom/typography';
import Icons from 'components/custom/icon';
import WalletLockConfirmModal from './components/wallet-lock-confirm-modal';
import WalletLockChart from './components/wallet-lock-chart';

import { getFormattedDuration, isValidAddress } from 'utils';
import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';
import { DURATION_OPTIONS, getLockEndDate } from 'utils/date';

import s from './styles.module.scss';

type WalletLockViewState = {
  showLockConfirmModal: boolean;
  saving: boolean;
};

const InitialState: WalletLockViewState = {
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

const WalletLockView: React.FunctionComponent = () => {
  const [form] = Antd.Form.useForm<LockFormData>();

  const web3c = useWeb3Contracts();
  const [state, setState] = useMergeState<WalletLockViewState>(InitialState);

  const { balance: stakedBalance, userLockedUntil, userDelegatedTo } = web3c.daoBarn;

  const hasStakedBalance = stakedBalance?.gt(ZERO_BIG_NUMBER);
  const hasDelegation = isValidAddress(userDelegatedTo);
  const formDisabled = !hasStakedBalance || hasDelegation;

  const minAllowedDate = React.useMemo(() => {
    const min = Math.max(userLockedUntil ?? 0, Date.now());

    return addSeconds(min, 1);
  }, [userLockedUntil]);

  const maxAllowedDate = addSeconds(addDays(Date.now(), 365), 1);

  function handleFinish() {
    setState({ showLockConfirmModal: true });
  }

  async function handleSubmit(values: LockFormData) {
    setState({ saving: true });

    const { lockEndDate, gasPrice } = values;
    const gasFee = gasPrice?.value!;

    try {
      await web3c.daoBarn.actions.lock(
        getUnixTime(lockEndDate!),
        gasFee,
      );
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {
    }

    setState({ saving: false });
  }

  React.useEffect(() => {
    form.setFieldsValue({
      lockEndDate: userLockedUntil && userLockedUntil > Date.now()
        ? new Date(userLockedUntil)
        : undefined,
    });
  }, [userLockedUntil]);

  const CardTitle = (
    <Grid flow="col" gap={24} colsTemplate="auto" align="start">
      <Grid flow="col" gap={12}>
        <Icons name="bond-token" width={40} height={40} />
        <Paragraph type="p1" semiBold color="primary">
          BOND
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="secondary">
          Staked Balance
        </Small>
        <Paragraph type="p1" semiBold color="primary">
          {formatBONDValue(stakedBalance)}
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="secondary">
          Lock Duration
        </Small>
        <UseLeftTime end={userLockedUntil ?? 0} delay={1_000}>
          {(leftTime) => (
            <Paragraph type="p1" semiBold color="primary">
              {leftTime > 0 ? getFormattedDuration(0, userLockedUntil) : '0s'}
            </Paragraph>
          )}
        </UseLeftTime>
      </Grid>

      <div />
    </Grid>
  );

  return (
    <Card title={CardTitle}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleFinish}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item label="Add lock duration" dependencies={['lockEndDate']}>
                {() => (
                  <Grid flow="col" gap={16} colsTemplate={`repeat(${DURATION_OPTIONS.length}, 1fr)`}>
                    {DURATION_OPTIONS.map(opt => {
                      const targetDate = getLockEndDate(new Date(), opt)!;
                      const { lockEndDate } = form.getFieldsValue();
                      const isActive = lockEndDate?.valueOf() === targetDate?.valueOf();

                      return (
                        <Button
                          key={opt}
                          type="select"
                          className={cx(isActive && s.activeOption)}
                          disabled={formDisabled || state.saving || targetDate > maxAllowedDate}
                          onClick={() => {
                            form.setFieldsValue({
                              lockEndDate: getLockEndDate(new Date(), opt),
                            });
                            setState({});
                          }}>
                          <Paragraph type="p1" semiBold color="primary">{opt}</Paragraph>
                        </Button>
                      );
                    })}
                  </Grid>
                )}
              </Form.Item>
              <Paragraph type="p1">OR</Paragraph>
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
              <Alert
                message="All locked balances will be unavailable for withdrawal until the lock timer ends. All future deposits will be locked for the same time." />
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

          <Form.Item shouldUpdate>
            {({ getFieldsValue }) => {
              const { lockEndDate } = getFieldsValue();

              return lockEndDate ? (
                <WalletLockChart lockEndDate={lockEndDate} />
              ) : null;
            }}
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
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
    </Card>
  );
};

export default WalletLockView;
