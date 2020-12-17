import React from 'react';

import ConnectedWallet from 'components/connected-wallet';
import Button from 'components/button';
import Field from 'components/field';

import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue, shortenAddr, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeekCountdown } from 'hooks/useCountdown';

import { ReactComponent as BondSquareSvg } from 'resources/svg/tokens/bond-square.svg';

import s from './styles.module.scss';
import { isValidAddress } from 'utils';
import Identicon from 'components/identicon';

export type VotingHeaderProps = {};

const VotingHeader: React.FunctionComponent<VotingHeaderProps> = props => {
  const web3c = useWeb3Contracts();
  const [countdown] = useWeekCountdown(web3c.daoDiamond.userLockedUntil);

  const isDelegated = isValidAddress(web3c.daoDiamond.userDelegatedTo);

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.headerTitle}>
          MY VOTING POWER
        </div>
        <ConnectedWallet />
      </div>
      <div className={s.list}>
        <Field
          label="Current reward"
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(web3c.daoReward.claim)}</span>
            <BondSquareSvg className={s.bondIcon} />
            <Button
              type="link"
              disabled={web3c.daoReward.claim?.isZero()}
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
            <span>{formatBONDValue(web3c.bond.balance)}</span>
            <BondSquareSvg className={s.bondIcon} />
          </div>
        </Field>

        <Field
          label={isDelegated ? 'Total delegated voting power' : 'Total voting power'}
          hint=" "
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{isDelegated
              ? formatBONDValue(web3c.daoDiamond.bondStaked)
              : formatBONDValue(web3c.daoDiamond.votingPower)
            }</span>
            <Button type="link" onClick={() => null}>
              Detailed view
            </Button>
          </div>
        </Field>

        {isDelegated && (
          <Field
            label="Delegated to"
            hint=" "
            className={s.field}>
            <div className={s.fieldContent}>
              <Identicon className={s.identicon} address={web3c.daoDiamond.userDelegatedTo!} />
              <span>{shortenAddr(web3c.daoDiamond.userDelegatedTo!)}</span>
            </div>
          </Field>
        )}

        <Field
          label="Multiplier & Lock timer"
          hint=" "
          className={s.field}>
          <div className={s.fieldContent}>
            <span className={s.ratio}>{web3c.daoDiamond.multiplier}x</span>
            <span className={s.regular}>for</span>
            <span className={s.timer}>{countdown}</span>
          </div>
        </Field>
      </div>
    </div>
  );
};

export default VotingHeader;
