import add from 'date-fns/add';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import { isAddress } from 'web3-utils';

const env = process.env.REACT_APP_ENV;
export const isDevelopmentMode = env === 'development';
export const isProductionMode = env === 'production';

export function getNowTs(): number {
  return Math.floor(Date.now() / 1_000);
}

export function inRange(value: number, min: number, max: number): boolean {
  return min < value && value < max;
}

export namespace DateUtils {
  const FORMAT_DURATION_FORMATS = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
  const FORMAT_DURATION_SHORTS = ['y', 'mo', 'd', 'h', 'm', 's'];

  export function formatDurationNew(value: number | undefined): string | undefined {
    if (value === undefined) {
      return undefined;
    }

    const start = new Date().getTime();
    const duration = intervalToDuration({
      start,
      end: start + value,
    });

    return FORMAT_DURATION_FORMATS.map((key, index) => {
      const val = duration[key];
      return val > 0 ? `${val}${FORMAT_DURATION_SHORTS[index]}` : undefined;
    })
      .filter(Boolean)
      .join(' ');
  }
}

export function getFormattedDuration(
  value?: number,
  endValue?: number,
  { format = ['months', 'days', 'hours', 'minutes', 'seconds'] } = {},
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const start = new Date().getTime();
  const end = endValue !== undefined ? endValue : add(start, { seconds: value }).valueOf();

  const duration = intervalToDuration({
    start,
    end: start > end ? start : end,
  });

  return formatDuration(duration, {
    format,
    delimiter: ' ',
    zero: true,
    locale: {
      formatDistance(token, val) {
        let v: number | undefined;

        switch (token) {
          case 'xMonths':
            return val > 0 ? `${val}mo` : '';
          case 'xDays':
            v = duration.months ?? 0;
            return val > 0 || v > 0 ? `${val}d` : '';
          case 'xHours':
            v = (duration.months ?? 0) + (duration.days ?? 0);
            return val > 0 || v > 0 ? `${val}h` : '';
          case 'xMinutes':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0);
            return val > 0 || v > 0 ? `${val}m` : '';
          case 'xSeconds':
            v = (duration.months ?? 0) + (duration.days ?? 0) + (duration.hours ?? 0) + (duration.minutes ?? 0);
            return val > 0 || v > 0 ? `${val}s` : '';
          default:
        }

        return undefined;
      },
    },
  });
}

export function isValidAddress(value: string | undefined): boolean {
  return !!value && isAddress(value) && value !== '0x0000000000000000000000000000000000000000';
}

export function doSequential<T, K = any>(
  tasks: T[],
  callback: (task: T, index: number) => Promise<K>,
): Promise<(K | undefined)[]> {
  const results: (K | undefined)[] = [];

  return tasks
    .reduce(
      (p, task, index) =>
        p
          .then(() => callback(task, index))
          .then(result => results.push(result))
          .catch(() => results.push(undefined)) as Promise<any>,
      Promise.resolve(),
    )
    .then(() => results);
}

export function getRelativeTime(seconds: number) {
  return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }));
}

export function numberFormat(number: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(navigator.language, options).format(number);
}
