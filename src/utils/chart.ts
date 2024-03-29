import { PeriodTabsKey } from 'components/custom/tabs';

import { formatDate, formatTime } from './date';

export function formatTick(value: string, filter: string) {
  if (typeof value !== 'string') {
    return '';
  }

  const date = new Date(value);

  if (date.toString() === 'Invalid Date') {
    return '';
  }

  switch (filter) {
    case PeriodTabsKey.day:
      return formatTime(date);
    case PeriodTabsKey.week:
      return formatDate(date, { weekday: 'short' });
    case PeriodTabsKey.month:
      return formatDate(date, { month: '2-digit', day: '2-digit' });
    default:
      return '';
  }
}

export function generateTicks(items: { point: string }[], filter: string): number[] {
  const dates = items.map(d => new Date(d.point).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  if (!Number.isFinite(minDate) || !Number.isFinite(maxDate)) {
    return [];
  }

  let count = 0;
  let range = 0;

  switch (filter) {
    case '24h':
      count = 3;
      range = 8 * 60 * 60 * 1_000; // 8 hours
      break;
    case '1w':
      count = 7;
      range = 24 * 60 * 60 * 1_000; // 24 hours
      break;
    case '30d':
      count = 4;
      range = 7 * 24 * 60 * 60 * 1_000; // 7 days
      break;
    default:
      return [];
  }

  const minDt = maxDate - count * range;

  return Array.from({ length: count + 1 }).map((_, index) => minDt + range * index);
  // .map(tick => new Date(tick).toJSON());
}
