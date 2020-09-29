import React from 'react';
import { endOfWeek, formatDuration, intervalToDuration } from 'date-fns';

export function useWeekCountdown(): string[] {
  const [countdown, setCountdown] = React.useState<string>('');

  React.useEffect(() => {
    let end = endOfWeek(new Date(), {
      weekStartsOn: 1,
    });

    const intervalID = setInterval(() => {
      const start = new Date();

      let duration = intervalToDuration({
        start,
        end,
      });

      if (duration < 0) {
        end = endOfWeek(start, {
          weekStartsOn: 1,
        });

        duration = intervalToDuration({
          start,
          end,
        });
      }

      setCountdown(formatDuration(duration, {
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
        }
      }));
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return [countdown];
}
