import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addWeeks,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  format,
  formatDistanceToNow,
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { flow } from 'lodash/fp';
import * as ReCharts from 'recharts';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue, formatBigValue } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import { Hint, Text } from 'components/custom/typography';

import { inRange } from 'utils';

import s from './styles.module.scss';

enum GranularityType {
  NONE,
  MONTHS,
  WEEKS,
  DAYS,
  HOURS,
  MINUTES,
}

type GranularPeriod = {
  date: Date;
  bonus: number;
};

function getGranularityType(endDate?: Date): GranularityType {
  if (!endDate) {
    return GranularityType.NONE;
  }

  const now = new Date();

  const months = differenceInMonths(endDate, now);

  if (months >= 4) {
    return GranularityType.MONTHS;
  }

  const weeks = differenceInWeeks(endDate, now);

  if (weeks >= 4) {
    return GranularityType.WEEKS;
  }

  const days = differenceInDays(endDate, now);

  if (days >= 4) {
    return GranularityType.DAYS;
  }

  const hours = differenceInHours(endDate, now);

  if (hours >= 4) {
    return GranularityType.HOURS;
  }

  return GranularityType.MINUTES;
}

function getPeriodRate(startDate: Date, endDate: Date, targetDate: Date): number {
  const endDiff = endDate.valueOf() - startDate.valueOf();
  const targetDiff = targetDate.valueOf() - startDate.valueOf();

  return 1.0 + (endDiff - targetDiff) / endDiff;
}

function getGranularPeriods(granularity: GranularityType, endDate?: Date): GranularPeriod[] {
  const periods: GranularPeriod[] = [];
  const now = new Date();

  if (endDate && endDate > now) {
    let ticks = 0;
    let step = 1;
    let dateFlow: Function | undefined;

    periods.push({
      date: now,
      bonus: getPeriodRate(now, endDate, now),
    });

    switch (granularity) {
      case GranularityType.MONTHS:
        ticks = differenceInMonths(endDate, now);
        step = 1;
        dateFlow = flow(addMonths, startOfMonth);
        break;
      case GranularityType.WEEKS:
        ticks = differenceInWeeks(endDate, now);
        step = 1;
        dateFlow = flow(addWeeks, startOfWeek);
        break;
      case GranularityType.DAYS:
        ticks = differenceInDays(endDate, now);
        step = 1;
        dateFlow = flow(addDays, startOfDay);
        break;
      case GranularityType.HOURS:
        ticks = differenceInHours(endDate, now);
        step = Math.max(1, Math.round(ticks / 12));
        dateFlow = flow(addHours, startOfHour);
        break;
      case GranularityType.MINUTES:
        ticks = differenceInMinutes(endDate, now);
        step = Math.max(1, Math.round(ticks / 12));
        dateFlow = flow(addMinutes, startOfMinute);
        break;
    }

    for (let i = 1; i <= ticks; i += step) {
      const date = dateFlow?.(now, i);
      const bonus = getPeriodRate(now, endDate, date);
      periods.push({ date, bonus });
    }

    periods.push({
      date: endDate,
      bonus: 1.0,
    });
  }

  return periods;
}

export type WalletLockChartProps = {
  lockEndDate: Date;
};

const WalletLockChart: React.FC<WalletLockChartProps> = props => {
  const { lockEndDate } = props;

  const web3c = useWeb3Contracts();
  const { balance: stakedBalance } = web3c.daoBarn;

  const multiplier = React.useMemo<number>(() => getPeriodRate(addYears(new Date(), 1), new Date(), lockEndDate), [
    lockEndDate,
  ]);

  const myBonus = React.useMemo<BigNumber | undefined>(() => stakedBalance?.multipliedBy(multiplier - 1), [
    stakedBalance,
    multiplier,
  ]);

  const granularity = React.useMemo<GranularityType>(() => getGranularityType(lockEndDate), [lockEndDate]);

  const data = React.useMemo<GranularPeriod[]>(() => getGranularPeriods(granularity, lockEndDate), [
    granularity,
    lockEndDate,
  ]);

  return (
    <Antd.Card
      className={s.card}
      title={
        <Hint
          text={
            <>
              <Text type="p2">
                The multiplier mechanic allows users to lock $BOND for a period up to 1 year and get a bonus of up to 2x
                vBOND. The bonus is linear, as per the following example:
              </Text>
              <ul>
                <li>
                  <Text type="p2">lock 1000 $BOND for 1 year → get back 2000 vBOND</Text>
                </li>
                <li>
                  <Text type="p2">lock 1000 $BOND for 6 months → get back 1500 vBOND</Text>
                </li>
              </ul>
              <ExternalLink href="#">Learn more</ExternalLink>
            </>
          }>
          <Text type="small" weight="semibold">
            {formatBONDValue(myBonus)}
            <span> vBOND bonus - </span>
            {inRange(multiplier, 1, 1.01) ? '>' : ''}
            {formatBigValue(multiplier, 2)}x<span> for </span>
            {formatDistanceToNow(lockEndDate)}
          </Text>
        </Hint>
      }>
      <ReCharts.ResponsiveContainer width="100%" height={154}>
        <ReCharts.AreaChart data={data} margin={{ top: 0, right: 10, left: 0, bottom: 5 }}>
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
            tickFormatter={tick => {
              switch (granularity) {
                case GranularityType.MONTHS:
                  return format(tick, 'MMM yyyy');
                case GranularityType.WEEKS:
                  return format(tick, 'dd MMM');
                case GranularityType.DAYS:
                  return format(tick, 'dd MMM');
                case GranularityType.HOURS:
                  return format(tick, 'dd MMM HH:mm');
                case GranularityType.MINUTES:
                  return format(tick, 'HH:mm');
                default:
                  return format(tick, 'yyyy-MM-dd HH:mm');
              }
            }}
            // domain={[0, 2 ** 32]}
            stroke="#aaafb3"
          />
          <ReCharts.YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={tick => `${tick}x`}
            ticks={[1, multiplier]}
            domain={[1, multiplier]}
            stroke="#aaafb3"
          />
          <ReCharts.Tooltip
            labelFormatter={value => {
              if (!(value instanceof Date)) {
                return '-';
              }

              switch (granularity) {
                case GranularityType.MONTHS:
                  return format(value, 'yyyy-MM-dd');
                case GranularityType.WEEKS:
                  return format(value, 'yyyy-MM-dd');
                case GranularityType.DAYS:
                  return format(value, 'yyyy-MM-dd');
                case GranularityType.HOURS:
                  return format(value, 'yyyy-MM-dd HH:mm');
                case GranularityType.MINUTES:
                  return format(value, 'yyyy-MM-dd HH:mm');
                default:
                  return format(value, 'yyyy-MM-dd HH:mm');
              }
            }}
            formatter={(value: any) => `${formatBigValue(new BigNumber(value), 6, '-')}x`}
          />
          <ReCharts.Area dataKey="bonus" name="Bonus" fill="url(#chart-gradient)" strokeWidth={2} stroke="#ff4339" />
        </ReCharts.AreaChart>
      </ReCharts.ResponsiveContainer>
    </Antd.Card>
  );
};

export default WalletLockChart;
