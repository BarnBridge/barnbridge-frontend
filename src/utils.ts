import { add, formatDuration, intervalToDuration } from 'date-fns';
import Web3 from 'web3';

import { DEFAULT_ADDRESS } from 'web3/utils';

export function getNowTs(): number {
  return Math.floor(Date.now() / 1000);
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
  const duration = intervalToDuration({ start, end });

  return formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    delimiter: ' ',
    zero: true,
    locale: {
      formatDistance: (token, value) => {
        switch (token) {
          case 'xDays':
            return `${value}d`;
          case 'xHours':
            return `${value}h`;
          case 'xMinutes':
            return `${value}m`;
        }
      },
    },
  });
}

export function isValidAddress(value: string | undefined) {
  return value && Web3.utils.isAddress(value) && value !== DEFAULT_ADDRESS;
}
