import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';
import {
  addSeconds,
  addDays,
  addMonths,
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

import { getFormattedDuration, isValidAddress } from 'utils';
import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';

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

const WalletLockView: React.FunctionComponent = () => {
  const [form] = Antd.Form.useForm<LockFormData>();

  const web3c = useWeb3Contracts();
  const [state, setState] = useMergeState<WalletLockViewState>(InitialState);

  const { balance: stakedBalance, userLockedUntil, userDelegatedTo, multiplier = 1 } = web3c.daoBarn;

  const hasStakedBalance = stakedBalance?.gt(ZERO_BIG_NUMBER);
  const hasDelegation = isValidAddress(userDelegatedTo);
  const formDisabled = !hasStakedBalance || hasDelegation;

  const minAllowedDate = React.useMemo(() => {
    const min = Math.max(userLockedUntil ?? 0, Date.now());

    return addSeconds(min, 1);
  }, [userLockedUntil]);

  const maxAllowedDate = addSeconds(addDays(Date.now(), 365), 1);

  function handleFinish(values: LockFormData) {
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

  // const chartData = React.useMemo(() => {
  //   const arr: any[] = [];
  //
  //   const now = new Date();
  //   const start = new Date();
  //   const end = values.lockEndDate;
  //   const duration = moment.duration(end.diff(start));
  //   const bonus = 2;
  //
  //   const months = Math.floor(duration.asMonths());
  //   const weeks = Math.floor(duration.asWeeks());
  //   const days = Math.floor(duration.asDays());
  //   const hours = Math.floor(duration.asHours());
  //   const minutes = Math.floor(duration.asMinutes());
  //
  //   let unit: string = 'day';
  //   let step: number = 0;
  //   let ticks: number = 0;
  //   let format: string = 'YYYY-MM-DD HH:mm';
  //
  //   if (months > 3) {
  //     unit = 'month';
  //     step = Math.round(months / 12);
  //     ticks = Math.ceil(months / step);
  //   } else if (weeks > 3) {
  //     unit = 'week';
  //     step = Math.round(weeks / 12);
  //     ticks = Math.ceil(weeks / step);
  //   } else if (days > 3) {
  //     unit = 'day';
  //     step = Math.round(days / 12);
  //     ticks = Math.ceil(days / step);
  //   } else if (hours > 3) {
  //     unit = 'hour';
  //     step = Math.round(hours / 12);
  //     ticks = Math.ceil(hours / step);
  //   } else if (minutes > 3) {
  //     unit = 'minute';
  //     step = Math.round(minutes / 12);
  //     ticks = Math.ceil(minutes / step);
  //   } else {
  //     unit = 'minute';
  //     step = 1;
  //     ticks = minutes;
  //   }
  //
  //   for (let i = 0; i < ticks; i += step) {
  //     const value = moment(now).add(i, unit);
  //
  //     arr.push({
  //       date: value.unix(),
  //       bonus: 1 + ((bonus - 1) * ((ticks - i) / ticks)),
  //     });
  //   }
  //
  //   arr.push({
  //     date: end.unix(),
  //     bonus: 1,
  //   });
  //
  //   return arr;
  // }, []);

  const CardTitle = (
    <Grid flow="col" gap={24} colsTemplate="auto" align="start">
      <Grid flow="col" gap={12}>
        <Icons name="bond-token" width={40} height={40} />
        <Paragraph type="p1" semiBold color="grey900">
          BOND
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Staked Balance
        </Small>
        <Paragraph type="p1" semiBold color="grey900">
          {formatBONDValue(stakedBalance)}
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Lock Duration
        </Small>
        <UseLeftTime end={userLockedUntil ?? 0} delay={1_000}>
          {(leftTime) => (
            <Paragraph type="p1" semiBold color="grey900">
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
                      const targetDate = getLockEndDate(minAllowedDate, opt) ?? new Date();
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
                              lockEndDate: getLockEndDate(minAllowedDate, opt),
                            });
                            setState({});
                          }}>
                          <Paragraph type="p1" semiBold color="grey900">{opt}</Paragraph>
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

          {/*<div className={s.chart}>*/}
          {/*  <div className={s.chartHeader}>*/}
          {/*    <Small semiBold color="grey500" hint={(*/}
          {/*      <>*/}
          {/*        <Paragraph type="p2">*/}
          {/*          The multiplier mechanic allows users to lock $BOND for a period up to 1 year and get a bonus of up*/}
          {/*          to 2x vBOND. The bonus is linear, as per the following example:*/}
          {/*        </Paragraph>*/}
          {/*        <ul>*/}
          {/*          <li>*/}
          {/*            <Paragraph type="p2">lock 1000 $BOND for 1 year → get back 2000 vBOND</Paragraph>*/}
          {/*          </li>*/}
          {/*          <li>*/}
          {/*            <Paragraph type="p2">lock 1000 $BOND for 6 months → get back 1500 vBOND</Paragraph>*/}
          {/*          </li>*/}
          {/*        </ul>*/}
          {/*        <ExternalLink href="#">Learn more</ExternalLink>*/}
          {/*      </>*/}
          {/*    )}>*/}
          {/*      {formatBONDValue(stakedBalance?.multipliedBy(multiplier - 1))}{' '}*/}
          {/*      vBOND bonus*/}
          {/*      {multiplier > 1 && userLockedUntil && (*/}
          {/*        <>*/}
          {/*          <span> | </span>*/}
          {/*          <span>{inRange(multiplier, 1, 1.01) ? '>' : ''}</span>*/}
          {/*          <span> {formatBigValue(multiplier, 2, '-', 2)}x</span>*/}
          {/*          <span>*/}
          {/*          {' '}*/}
          {/*            for {formatDistanceToNow(userLockedUntil)}*/}
          {/*        </span>*/}
          {/*        </>*/}
          {/*      )}*/}
          {/*    </Small>*/}
          {/*  </div>*/}
          {/*  <div className={s.chartContent}>*/}
          {/*    <ReCharts.ResponsiveContainer width="100%" height={154}>*/}
          {/*      <ReCharts.AreaChart*/}
          {/*        data={chartData}*/}
          {/*        margin={{ top: 0, right: 10, left: 0, bottom: 5 }}>*/}
          {/*        <defs>*/}
          {/*          <linearGradient*/}
          {/*            id="chart-gradient"*/}
          {/*            gradientTransform="rotate(180)">*/}
          {/*            <stop offset="0%" stopColor="rgba(255, 67, 57, 0.08)" />*/}
          {/*            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />*/}
          {/*          </linearGradient>*/}
          {/*        </defs>*/}
          {/*        <ReCharts.XAxis*/}
          {/*          dataKey="date"*/}
          {/*          axisLine={false}*/}
          {/*          tickLine={false}*/}
          {/*          tickMargin={16}*/}
          {/*          tickFormatter={tick => format(tick, 'YYYY-MM-DD')}*/}
          {/*          domain={[0, 2 ** 32]}*/}
          {/*          stroke="#aaafb3"*/}
          {/*        />*/}
          {/*        <ReCharts.YAxis*/}
          {/*          axisLine={false}*/}
          {/*          tickLine={false}*/}
          {/*          ticks={[1, multiplier]}*/}
          {/*          tickFormatter={tick => `${tick}x`}*/}
          {/*          domain={[1, multiplier]}*/}
          {/*          stroke="#aaafb3"*/}
          {/*        />*/}
          {/*        <ReCharts.Tooltip*/}
          {/*          labelFormatter={value => format(Number(value), 'YYYY-MM-DD')}*/}
          {/*          formatter={value => `${Number(value).toFixed(2)}x`}*/}
          {/*        />*/}
          {/*        <ReCharts.Area*/}
          {/*          dataKey="bonus"*/}
          {/*          name="Bonus"*/}
          {/*          fill="url(#chart-gradient)"*/}
          {/*          strokeWidth={2}*/}
          {/*          stroke="#ff4339"*/}
          {/*        />*/}
          {/*      </ReCharts.AreaChart>*/}
          {/*    </ReCharts.ResponsiveContainer>*/}
          {/*  </div>*/}
          {/*</div>*/}

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
          visible
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
