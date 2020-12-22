import React from 'react';
import * as Antd from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import * as ReCharts from 'recharts';
import moment from 'moment';
import { Moment } from 'moment';

import Form from 'components/form';
import DatePicker from 'components/datepicker';
import GasFeeList from 'components/gas-fee-list';
import Button from 'components/button';

import { getFormattedDuration, isValidAddress } from 'utils';
import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';

type LockFormData = {
  lockEndDate?: Moment;
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
  const [, setValues] = React.useState<{}>({});
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const minAllowedDate = moment(Math.max(web3c.daoBarn.userLockedUntil ?? 0, Date.now())).add(1, 'second');
  const maxAllowedDate = moment().add(365, 'days');
  const currentMultiplier = web3c.daoBarn.multiplier ?? 1;

  const disabledSubmit = React.useMemo<boolean>(() => {
    if (isValidAddress(web3c.daoBarn.userDelegatedTo)) {
      return true;
    }

    return false;
  }, [web3c.daoBarn.userDelegatedTo]);

  function handleDurationChange(ev: RadioChangeEvent) {
    const duration = ev.target.value;
    const now = moment();
    let lockEndDate = undefined;

    switch (duration) {
      case '1w':
        lockEndDate = now.add(7, 'days');
        break;
      case '1m':
        lockEndDate = now.add(1, 'months');
        break;
      case '3m':
        lockEndDate = now.add(3, 'months');
        break;
      case '6m':
        lockEndDate = now.add(6, 'months');
        break;
      case '1y':
        lockEndDate = now.add(365, 'days');
        break;
    }

    form.setFieldsValue({
      lockEndDate,
    });
  }

  function disabledDate(date: Moment) {
    if (date.isBefore(minAllowedDate, 'seconds')) {
      return true;
    }

    if (date.isAfter(maxAllowedDate, 'seconds')) {
      return true;
    }

    return false;
  }

  async function handleSubmit(values: LockFormData) {
    setSubmitting(true);

    try {
      await web3c.daoBarn.actions.lock(values.lockEndDate!.unix(), values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {
      //
    }

    setSubmitting(false);
  }

  const chartData = React.useMemo(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const multiplier = web3c.daoBarn.multiplier ?? 0;

    console.log(multiplier);
    return months.map((month, i) => ({
      month,
      bonus: 1 + ((multiplier - 1) * (months.length - i) / months.length),
    }));
  }, [web3c.daoBarn.multiplier]);

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
            800 vBOND bonus - {currentMultiplier} for {moment(web3c.daoBarn.userLockedUntil).toNow(true)}
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
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={16}
                  stroke="#aaafb3" />
                <ReCharts.YAxis
                  axisLine={false}
                  tickLine={false}
                  ticks={[1, currentMultiplier]}
                  tickFormatter={tick => `${tick}x`}
                  domain={[1, currentMultiplier]}
                  stroke="#aaafb3" />
                <ReCharts.Tooltip formatter={value => `${Number(value).toFixed(2)}x`} />
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
