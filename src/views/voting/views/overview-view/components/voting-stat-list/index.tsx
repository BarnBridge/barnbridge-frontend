import React from 'react';
import BigNumber from 'bignumber.js';

import { getFormattedDuration } from 'utils';
import { formatBONDValue, formatUSDValue, getHumanValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';

import s from './styles.module.scss';

const API_URL = String(process.env.REACT_APP_TOKEN_API_URL);

type OverviewData = {
  avgLockTimeSeconds?: number;
  bondCirculatingSupply?: BigNumber;
  holders?: number;
  totalDelegatedPower?: BigNumber;
  totalVbond?: BigNumber;
  voters?: number;
};

function fetchOverview() {
  const url = new URL('/governance/overview', API_URL);

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => ({
      ...result,
      bondCirculatingSupply: new BigNumber(result.bondCirculatingSupply),
      totalDelegatedPower: getHumanValue(new BigNumber(result.totalDelegatedPower), BONDTokenMeta.decimals),
      totalVbond: getHumanValue(new BigNumber(result.totalVbond), BONDTokenMeta.decimals),
    }));
}

const VotingStatList: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [overview, setOverview] = React.useState<OverviewData>({
    avgLockTimeSeconds: undefined,
    bondCirculatingSupply: undefined,
    holders: undefined,
    totalDelegatedPower: undefined,
    totalVbond: undefined,
    voters: undefined,
  });

  React.useEffect(() => {
    fetchOverview().then(setOverview);
  }, []);

  return (
    <div className={s.component}>
      <div className={s.list}>
        <div className={s.card}>
          <div className={s.cardHeader}>BOND LOCKED</div>
          <div className={s.cardValue}>
            <strong>{formatBONDValue(web3c.daoBarn.bondStaked)}</strong> BOND
          </div>
          <div className={s.cardHint}>{formatUSDValue(web3c.aggregated.bondLockedPrice)}</div>
        </div>
        <div className={s.card}>
          <div className={s.cardHeader}>VBOND</div>
          <div className={s.cardValue}>
            <strong>{formatBONDValue(overview.totalVbond)}</strong>
          </div>
        </div>
        <div className={s.card}>
          <div className={s.cardHeader}>AVG. LOCK TIME</div>
          <div className={s.cardValue}>
            <strong>{getFormattedDuration(overview.avgLockTimeSeconds) ?? '-'}</strong>
          </div>
          <div className={s.cardHint}>average time</div>
        </div>
        <div className={s.card}>
          <div className={s.cardHeader}>BOND REWARDS</div>
          <div className={s.cardValue}>
            <strong>{0}</strong>
          </div>
          <div className={s.cardHint}>out of {0}</div>
        </div>
        <div className={s.card}>
          <div className={s.cardHeader}>DELEGATED</div>
          <div className={s.cardValue}>
            <strong>{formatBONDValue(overview.totalDelegatedPower)}</strong>
          </div>
          <div className={s.cardHint}>out of {formatBONDValue(web3c.bond.totalSupply)}</div>
        </div>
        <div className={s.card}>
          <div className={s.cardHeader}>ADDRESSES</div>
          <div className={s.cardValue}>
            <strong>{overview.holders}</strong> holders
          </div>
          <div className={s.cardHint}>{overview.voters} voters</div>
        </div>
      </div>
    </div>
  );
};

export default VotingStatList;
