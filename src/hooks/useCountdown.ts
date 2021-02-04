import React from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';

export function useWeekCountdown(endDate?: number): string[] {
  const [countdown, setCountdown] = React.useState<string>('');

  React.useEffect(() => {
    if (!endDate) {
      return;
    }

    if (endDate < Date.now()) {
      setCountdown(`0d 0h 0m`);
      return;
    }

    const intervalID = setInterval(() => {
      const start = new Date();

      let duration = intervalToDuration({
        start,
        end: new Date(endDate),
      });

      if (duration < 0) {
        duration = intervalToDuration({
          start,
          end: new Date(endDate),
        });
      }

      setCountdown(
        formatDuration(duration, {
          format: ['days', 'hours', 'minutes'],
          delimiter: ' ',
          zero: true,
          locale: {
            formatDistance: (token, value) => {
              switch (token) {
                case 'xDays':
                  return `${String(value).padStart(2, '0')}d`;
                case 'xHours':
                  return `${String(value).padStart(2, '0')}h`;
                case 'xMinutes':
                  return `${String(value).padStart(2, '0')}m`;
              }
            },
          },
        }),
      );
    }, 1_000);

    return () => {
      clearInterval(intervalID);
    };
  }, [endDate]);

  return [countdown];
}
