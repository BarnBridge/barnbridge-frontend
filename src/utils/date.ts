import { addDays, addMonths } from 'date-fns';

const DURATION_1_WEEK = '1w';
const DURATION_1_MONTH = '1mo';
const DURATION_3_MONTH = '3mo';
const DURATION_6_MONTH = '6mo';
const DURATION_1_YEAR = '1y';

export const DURATION_OPTIONS: string[] = [
  DURATION_1_WEEK,
  DURATION_1_MONTH,
  DURATION_3_MONTH,
  DURATION_6_MONTH,
  DURATION_1_YEAR,
];

export function getLockEndDate(startDate: Date, duration: string): Date | undefined {
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
