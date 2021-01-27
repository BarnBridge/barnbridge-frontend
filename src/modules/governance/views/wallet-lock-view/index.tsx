import React from 'react';
import * as Antd from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import * as ReCharts from 'recharts';
import { addSeconds, addDays, addMonths, formatDistanceToNow, format, isBefore, isAfter, getUnixTime } from 'date-fns';

import Form from 'components/antd/form';
import DatePicker from 'components/antd/datepicker';
import Button from 'components/antd/button';
import GasFeeList from 'components/custom/gas-fee-list';
import { Small } from 'components/custom/typography';

import { getFormattedDuration, inRange, isValidAddress } from 'utils';
import { formatBigValue, formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';

type LockFormData = {
  lockEndDate?: Date;
  gasFee?: number;
};

const InitialFormValues: LockFormData = {
  lockEndDate: undefined,
  gasFee: undefined,
};

const DURATION_OPTIONS: string[] = [
  '1w', '1m', '3m', '6m', '1y',
];

const WalletLockView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<LockFormData>();
  const [values, setValues] = React.useState<LockFormData>({});
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const minAllowedDate = addSeconds(Math.max(web3c.daoBarn.userLockedUntil ?? 0, Date.now()), 1);
  const maxAllowedDate = addDays(minAllowedDate, 365);
  const currentMultiplier = web3c.daoBarn.multiplier ?? 1;

  const disabledSubmit = React.useMemo<boolean>(() => {
    if (isValidAddress(web3c.daoBarn.userDelegatedTo)) {
      return true;
    }

    return false;
  }, [web3c.daoBarn.userDelegatedTo]);

  function handleDurationChange(ev: RadioChangeEvent) {
    const duration = ev.target.value;
    const now = new Date();
    let lockEndDate = undefined;

    switch (duration) {
      case '1w':
        lockEndDate = addDays(now, 7);
        break;
      case '1m':
        lockEndDate = addMonths(now, 1);
        break;
      case '3m':
        lockEndDate = addMonths(now, 3);
        break;
      case '6m':
        lockEndDate = addMonths(now, 6);
        break;
      case '1y':
        lockEndDate = addDays(now, 365);
        break;
    }

    form.setFieldsValue({
      lockEndDate,
    });
  }

  function disabledDate(date: Date) {
    return isBefore(date, minAllowedDate) || isAfter(date, maxAllowedDate);
  }

  async function handleSubmit(values: LockFormData) {
    setSubmitting(true);

    try {
      await web3c.daoBarn.actions.lock(getUnixTime(values.lockEndDate!), values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {
      //
    }

    setSubmitting(false);
  }

  const chartData = React.useMemo(() => {
    const arr: any[] = [];

    // const now = new Date();
    // const start = new Date();
    // const end = values.lockEndDate;
    // const duration = moment.duration(end.diff(start));
    // const bonus = 2;
    //
    // const months = Math.floor(duration.asMonths());
    // const weeks = Math.floor(duration.asWeeks());
    // const days = Math.floor(duration.asDays());
    // const hours = Math.floor(duration.asHours());
    // const minutes = Math.floor(duration.asMinutes());
    //
    // let unit: string = 'day';
    // let step: number = 0;
    // let ticks: number = 0;
    // let format: string = 'YYYY-MM-DD HH:mm';
    //
    // if (months > 3) {
    //   unit = 'month';
    //   step = Math.round(months / 12);
    //   ticks = Math.ceil(months / step);
    // } else if (weeks > 3) {
    //   unit = 'week';
    //   step = Math.round(weeks / 12);
    //   ticks = Math.ceil(weeks / step);
    // } else if (days > 3) {
    //   unit = 'day';
    //   step = Math.round(days / 12);
    //   ticks = Math.ceil(days / step);
    // } else if (hours > 3) {
    //   unit = 'hour';
    //   step = Math.round(hours / 12);
    //   ticks = Math.ceil(hours / step);
    // } else if (minutes > 3) {
    //   unit = 'minute';
    //   step = Math.round(minutes / 12);
    //   ticks = Math.ceil(minutes / step);
    // } else {
    //   unit = 'minute';
    //   step = 1;
    //   ticks = minutes;
    // }
    //
    // for (let i = 0; i < ticks; i += step) {
    //   const value = moment(now).add(i, unit);
    //
    //   arr.push({
    //     date: value.unix(),
    //     bonus: 1 + ((bonus - 1) * ((ticks - i) / ticks)),
    //   });
    // }
    //
    // arr.push({
    //   date: end.unix(),
    //   bonus: 1,
    // });

    return arr;
  }, []); /// web3c.daoBarn.multiplier, values.lockEndDate

  return (
    <div className={s.component}>
      <div className={s.headerRow}>
        <div className={s.tokenCol}>
          <BondSvg /> BOND
        </div>
        <div>
          <label>STAKED BALANCE</label>
          <div>{formatBONDValue(web3c.daoBarn.balance)}</div>
        </div>
        <div>
          <label>LOCK DURATION</label>
          <div>{getFormattedDuration(0, web3c.daoBarn.userLockedUntil)}</div>
        </div>
      </div>
      <Form
        className={s.contentRow}
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onValuesChange={setValues}
        onFinish={handleSubmit}>
        <div className={s.body}>
          <div className={s.leftCol}>
            <Form.Item label="Lock duration">
              <Antd.Radio.Group
                className={s.lockOptions}
                disabled={submitting}
                onChange={handleDurationChange}>
                {DURATION_OPTIONS.map(opt => (
                  <Antd.Radio.Button
                    key={opt}
                    className={s.lockOption}
                    value={opt}>{opt}</Antd.Radio.Button>
                ))}
              </Antd.Radio.Group>
            </Form.Item>
            <span className={s.orLabel}>OR</span>
            <Form.Item
              name="lockEndDate"
              label="Manual choose your lock end date"
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <DatePicker
                showTime
                showNow={false}
                disabledDate={disabledDate}
                format="DD/MM/YYYY HH:mm"
                disabled={submitting} />
            </Form.Item>
          </div>
          <div className={s.rightCol}>
            <Form.Item
              name="gasFee"
              label="Gas Fee (Gwei)"
              hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <GasFeeList disabled={submitting} />
            </Form.Item>
          </div>
        </div>
        <div className={s.chart}>
          <div className={s.chartHeader}>
            <Small semiBold color="grey500">
              {formatBONDValue(web3c.daoBarn.balance?.multipliedBy(currentMultiplier - 1))} vBOND bonus

              {currentMultiplier > 1 && web3c.daoBarn.userLockedUntil && (
                <>
                  <span> | </span>
                  <span>{inRange(currentMultiplier, 1, 1.01) ? '>' : ''}</span>
                  <span> {formatBigValue(currentMultiplier, 2, '-', 2)}x</span>
                  <span> for {formatDistanceToNow(web3c.daoBarn.userLockedUntil)}</span>
                </>
              )}
            </Small>
          </div>
          <div className={s.chartContent}>
            <ReCharts.ResponsiveContainer width="100%" height={154}>
              <ReCharts.AreaChart
                data={chartData}
                margin={{ top: 0, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="chart-gradient" gradientTransform="rotate(180)">
                    <stop offset="0%" stopColor="rgba(255, 67, 57, 0.08)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>
                </defs>
                <ReCharts.XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={16}
                  tickFormatter={tick => format(tick, 'YYYY-MM-DD')}
                  domain={[0, 2 ** 32]}
                  stroke="#aaafb3" />
                <ReCharts.YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[1, currentMultiplier]}
                  tickFormatter={tick => `${tick}x`}
                  domain={[1, currentMultiplier]}
                  stroke="#aaafb3" />
                <ReCharts.Tooltip
                  labelFormatter={value => format(Number(value), 'YYYY-MM-DD')}
                  formatter={value => `${Number(value).toFixed(2)}x`} />
                <ReCharts.Area
                  dataKey="bonus"
                  name="Bonus"
                  fill="url(#chart-gradient)"
                  strokeWidth={2}
                  stroke="#ff4339" />
              </ReCharts.AreaChart>
            </ReCharts.ResponsiveContainer>
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          disabled={disabledSubmit}
          className={s.lockBtn}>
          Lock
        </Button>
      </Form>
    </div>
  );
};

export default WalletLockView;
