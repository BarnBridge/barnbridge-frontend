import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { intervalToDuration } from 'date-fns';

import { Text } from 'components/custom/typography';
import { useFetchSaPools } from 'modules/smart-alpha/api';

import { Simulate } from '../simulate-epoch/simulate';

import s from './s.module.scss';

const Countdown = ({ launchDate, className }: { launchDate: Date; className?: string }) => {
  const history = useHistory();

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

      if (new Date() >= launchDate) {
        clearTimeout(timer);

        history.push(`/smart-alpha`);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <dl className={classNames(className, 'flex align-top col-gap-24')}>
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

const Launch = ({ launchDate }: { launchDate: Date }) => {
  const { data: pools } = useFetchSaPools();

  return (
    <div className="container-limit">
      <div className={classNames(s.slogan, 'mb-64')}>
        <div>
          <Text type="h1" weight="bold" color="primary" className="mb-8">
            We are launching soon!
          </Text>
          <Text type="p2" weight="semibold" color="secondary">
            You can play with the simulator in the meantime
          </Text>
        </div>
        <Countdown launchDate={launchDate} className={s.countdown} />
      </div>
      {Array.isArray(pools) && pools.length ? <Simulate pool={pools[0]} /> : null}
    </div>
  );
};

export default Launch;
