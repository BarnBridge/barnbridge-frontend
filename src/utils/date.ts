import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';

export const DAY_IN_SECONDS = 24 * 60 * 60;

export const DURATION_1_DAY = '1 day';
export const DURATION_30_DAYS = '30 days';
export const DURATION_1_WEEK = '1 week';
export const DURATION_2_WEEKS = '2 weeks';
export const DURATION_3_WEEKS = '3 weeks';
export const DURATION_4_WEEKS = '4 weeks';
export const DURATION_1_MONTH = '1 month';
export const DURATION_3_MONTHS = '3 months';
export const DURATION_6_MONTHS = '6 months';
export const DURATION_1_YEAR = '1 year';

export function getDurationDate(startDate: Date, duration: string): Date | undefined {
  switch (duration) {
    case DURATION_1_DAY:
      return addDays(startDate, 1);
    case DURATION_30_DAYS:
      return addDays(startDate, 30);
    case DURATION_1_WEEK:
      return addWeeks(startDate, 1);
    case DURATION_2_WEEKS:
      return addWeeks(startDate, 2);
    case DURATION_3_WEEKS:
      return addWeeks(startDate, 3);
    case DURATION_4_WEEKS:
      return addWeeks(startDate, 4);
    case DURATION_1_MONTH:
      return addMonths(startDate, 1);
    case DURATION_3_MONTHS:
      return addMonths(startDate, 3);
    case DURATION_6_MONTHS:
      return addMonths(startDate, 6);
    case DURATION_1_YEAR:
      return addDays(startDate, 365);
    default:
      return undefined;
  }
}
