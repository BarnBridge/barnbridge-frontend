import React from 'react';
import BigNumber from 'bignumber.js';
import addDays from 'date-fns/addDays';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import addYears from 'date-fns/addYears';
import differenceInDays from 'date-fns/differenceInDays';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInWeeks from 'date-fns/differenceInWeeks';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import startOfDay from 'date-fns/startOfDay';
import startOfHour from 'date-fns/startOfHour';
import startOfMinute from 'date-fns/startOfMinute';
import startOfMonth from 'date-fns/startOfMonth';
import startOfWeek from 'date-fns/startOfWeek';
import flow from 'lodash/fp/flow';
import * as ReCharts from 'recharts';
import { formatBigValue, formatToken } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useDAO } from 'modules/governance/components/dao-provider';

import { inRange } from 'utils';

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
    let dateFlow = flow();

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
      default:
    }

    for (let i = 1; i <= ticks; i += step) {
      const date = dateFlow(now, i);
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

  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();
  const { balance: stakedBalance } = daoCtx.daoBarn;

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
    <div className="card">
      <div className="card-header">
        <Hint
          text={
            <>
              <Text type="p2">
                The multiplier mechanic allows users to lock ${projectToken.symbol} for a period up to 1 year and get a
                bonus of up to 2x v{projectToken.symbol}. The bonus is linear, as per the following example:
              </Text>
              <ul>
                <li>
                  <Text type="p2">lock 1000 ${projectToken.symbol} for 1 year → get back 2000 vBOND</Text>
                </li>
                <li>
                  <Text type="p2">lock 1000 ${projectToken.symbol} for 6 months → get back 1500 vBOND</Text>
                </li>
              </ul>
              <ExternalLink href="#">Learn more</ExternalLink>
            </>
          }>
          <Text type="small" weight="semibold">
            {formatToken(myBonus)}
            <span> v{projectToken.symbol} bonus - </span>
            {inRange(multiplier, 1, 1.01) ? '>' : ''}
            {formatBigValue(multiplier, 2)}x<span> for </span>
            {formatDistanceToNow(lockEndDate)}
          </Text>
        </Hint>
      </div>
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
            formatter={(value: any) => `${formatBigValue(BigNumber.from(value), 6, '-')}x`}
          />
          <ReCharts.Area dataKey="bonus" name="Bonus" fill="url(#chart-gradient)" strokeWidth={2} stroke="#ff4339" />
        </ReCharts.AreaChart>
      </ReCharts.ResponsiveContainer>
    </div>
  );
};

export default WalletLockChart;
