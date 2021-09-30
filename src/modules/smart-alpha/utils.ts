import { getUnixTime } from 'date-fns';

import { PoolApiType } from 'modules/smart-alpha/api';

function getCurrentEpoch(pool: PoolApiType) {
  const now = getUnixTime(Date.now());

  if (now < pool.epoch1Start) {
    return 0;
  }

  return Math.floor((now - pool.epoch1Start) / pool.epochDuration + 1);
}

export function tillNextEpoch(pool: PoolApiType): number {
  const now = getUnixTime(Date.now());
  const currentEpoch = getCurrentEpoch(pool);
  const nextEpochStart = pool.epoch1Start + currentEpoch * pool.epochDuration;

  return now < nextEpochStart ? nextEpochStart - now : 0;
}
