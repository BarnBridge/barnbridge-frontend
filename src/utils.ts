import { add, formatDuration, intervalToDuration } from 'date-fns';
import Web3 from 'web3';
import { DEFAULT_ADDRESS } from 'web3/utils';

export function getNowTs(): number {
  return Math.floor(Date.now() / 1_000);
}

export function inRange(value: number, min: number, max: number): boolean {
  return min < value && value < max;
}

export function getFormattedDuration(value?: number, endValue?: number): string | undefined {
  if (value === undefined) {
    return;
  }

  const start = new Date();
  const end = endValue !== undefined ? new Date(endValue!) : add(start, { seconds: value });

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  return formatDuration(duration, {
    format: ['months', 'days', 'hours', 'minutes', 'seconds'],
    delimiter: ' ',
    zero: true,
    locale: {
      formatDistance: function (token, value) {
        let v: number | undefined;

        switch (token) {
          case 'xMonths':
            return value > 0 ? `${value}mo` : '';
          case 'xDays':
            v = duration.months ?? 0;
            return value > 0 || v > 0 ? `${value}d` : '';
          case 'xHours':
            v = (duration.months ?? 0) + (duration.days ?? 0);
            return value > 0 || v > 0 ? `${value}h` : '';
          case 'xMinutes':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0);
            return value > 0 || v > 0 ? `${value}m` : '';
          case 'xSeconds':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0) + (duration.minutes ?? 0);
            return value > 0 || v > 0 ? `${value}s` : '';
        }
      },
    },
  });
}

export function isValidAddress(value: string | undefined): boolean {
  return !!value && Web3.utils.isAddress(value) && value !== DEFAULT_ADDRESS;
}
