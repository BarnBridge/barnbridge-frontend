import { addDays, addMonths, addWeeks } from 'date-fns';

export const DURATION_1_WEEK = '1w';
export const DURATION_2_WEEK = '2w';
export const DURATION_3_WEEK = '3w';
export const DURATION_4_WEEK = '4w';
export const DURATION_1_MONTH = '1mo';
export const DURATION_3_MONTH = '3mo';
export const DURATION_6_MONTH = '6mo';
export const DURATION_1_YEAR = '1y';

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
      return addWeeks(startDate, 1);
    case DURATION_2_WEEK:
      return addWeeks(startDate, 2);
    case DURATION_3_WEEK:
      return addWeeks(startDate, 3);
    case DURATION_4_WEEK:
      return addWeeks(startDate, 4);
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
