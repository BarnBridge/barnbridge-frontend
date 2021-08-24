import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';

import { Text } from 'components/custom/typography';

import SimulateEpoch from '../simulate-epoch';

import s from './s.module.scss';

const Launch = ({ launchDate }: { launchDate: Date }) => {
  return (
    <>
      <div className="flex align-center mb-64">
        <div>
          <Text type="h1" weight="bold" color="primary" className="mb-8">
            We are launching soon!
          </Text>
          <Text type="p2" weight="semibold" color="secondary">
            You can play with the simulator in the meantime
          </Text>
        </div>
        <Countdown launchDate={launchDate} />
      </div>
      <SimulateEpoch />
    </>
  );
};

export default Launch;

const Countdown = ({ launchDate }: { launchDate: Date }) => {
  const [countdown, setCountdown] = useState(
    intervalToDuration({
      start: new Date(),
      end: launchDate,
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(
        intervalToDuration({
          start: new Date(),
          end: launchDate,
        }),
      );
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <dl className="flex align-top col-gap-24 ml-auto">
      <div className={s.timeCard}>
        <dd>{countdown.days}</dd>
        <dt>days</dt>
      </div>
      <div className={s.timeCard}>
        <dd>{countdown.hours}</dd>
        <dt>hours</dt>
      </div>
      <div className={s.timeCard}>
        <dd>{countdown.minutes}</dd>
        <dt>minutes</dt>
      </div>
      <div className={s.timeCard}>
        <dd>{countdown.seconds}</dd>
        <dt>seconds</dt>
      </div>
    </dl>
  );
};
