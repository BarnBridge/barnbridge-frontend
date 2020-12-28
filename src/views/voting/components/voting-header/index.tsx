import React from 'react';
import * as Antd from 'antd';

import Button from 'components/button';
import Field from 'components/field';
import Identicon from 'components/identicon';
import VotingDetailedModal from '../voting-detailed-modal';

import { inRange, isValidAddress } from 'utils';
import { formatBigValue, formatBONDValue, shortenAddr } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { useWeekCountdown } from 'hooks/useCountdown';

import { ReactComponent as BondSquareSvg } from 'resources/svg/tokens/bond-square.svg';

import s from './styles.module.scss';

const VotingHeader: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [detailedView, showDetailedView] = React.useState<boolean>(false);

  const { claim: reward } = web3c.daoReward;
  const { balance: bondBalance } = web3c.bond;
  const {
    votingPower,
    userLockedUntil,
    userDelegatedTo,
    multiplier = 1,
    balance: myBondBalance,
  } = web3c.daoBarn;

  const [countdown] = useWeekCountdown(userLockedUntil);
  const isDelegated = isValidAddress(userDelegatedTo);

  return (
    <div className={s.component}>
      <div className={s.header}>
        MY VOTING POWER
      </div>
      <div className={s.list}>
        <Field
          label="Current reward"
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(reward)}</span>
            <BondSquareSvg className={s.bondIcon} />
            <Button
              type="link"
              disabled={reward?.isZero()}
              onClick={() => web3c.daoReward.claimSend()}
            >
              Claim
            </Button>
          </div>
        </Field>

        <Field
          label="Bond Balance"
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(bondBalance)}</span>
            <BondSquareSvg className={s.bondIcon} />
          </div>
        </Field>

        <Field
          label={isDelegated ? 'Total delegated voting power' : 'Total voting power'}
          hint={isDelegated ? undefined : ' '}
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{isDelegated
              ? formatBONDValue(myBondBalance)
              : formatBONDValue(votingPower)
            }</span>
            <Button type="link" onClick={() => showDetailedView(true)}>
              Detailed view
            </Button>
            <VotingDetailedModal
              visible={detailedView}
              onCancel={() => showDetailedView(false)} />
          </div>
        </Field>

        {isDelegated && (
          <Field
            label="Delegated to"
            hint=" "
            className={s.field}>
            <div className={s.fieldContent}>
              <Identicon className={s.identicon} address={userDelegatedTo!} />
              <span>{shortenAddr(userDelegatedTo!)}</span>
            </div>
          </Field>
        )}

        <Field
          label="Multiplier & Lock timer"
          hint=" "
          className={s.field}>
          <div className={s.fieldContent}>
            <Antd.Tooltip title={`${multiplier}x`}>
            <span className={s.ratio}>
              {inRange(multiplier, 1, 1.01) ? '>' : ''} {formatBigValue(multiplier, 2, '-', 2)}x
            </span>
            </Antd.Tooltip>
            <span className={s.regular}>for</span>
            <span className={s.timer}>{countdown}</span>
          </div>
        </Field>
      </div>
    </div>
  );
};

export default VotingHeader;
