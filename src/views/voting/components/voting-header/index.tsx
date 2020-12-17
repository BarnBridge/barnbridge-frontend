import React from 'react';
import cx from 'classnames';

import Button from 'components/button';
import Field from 'components/field';
import Modal from 'components/modal';
import Identicon from 'components/identicon';

import { isValidAddress } from 'utils';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue, shortenAddr } from 'web3/utils';
import { useWeekCountdown } from 'hooks/useCountdown';

import { ReactComponent as BondSquareSvg } from 'resources/svg/tokens/bond-square.svg';
import { ReactComponent as WalletSvg } from 'resources/svg/icons/wallet.svg';
import { ReactComponent as PercentageSvg } from 'resources/svg/icons/percentage.svg';
import { ReactComponent as UserPlusSvg } from 'resources/svg/icons/user-plus.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/voting.svg';

import s from './styles.module.scss';

export type VotingHeaderProps = {};

const VotingHeader: React.FunctionComponent<VotingHeaderProps> = props => {
  const web3c = useWeb3Contracts();
  const [countdown] = useWeekCountdown(web3c.daoDiamond.userLockedUntil);
  const [detailedView, showDetailedView] = React.useState<boolean>(false);
  const isDelegated = isValidAddress(web3c.daoDiamond.userDelegatedTo);

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
          hint={isDelegated ? undefined : ' '}
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{isDelegated
              ? formatBONDValue(web3c.daoDiamond.bondStaked)
              : formatBONDValue(web3c.daoDiamond.votingPower)
            }</span>
            <Button type="link" onClick={() => showDetailedView(true)}>
              Detailed view
            </Button>
            <Modal
              className={s.detailedViewModal}
              title="Voting power detailed view"
              visible={detailedView}
              onCancel={() => showDetailedView(false)}>
              <div className={s.row}>
                <div className={s.icon}><WalletSvg /></div>
                <div className={s.label}>My balance</div>
                <div className={s.value}>{formatBONDValue(web3c.daoDiamond.bondStaked)}</div>
              </div>
              <div className={s.row}>
                <div className={s.icon}><PercentageSvg /></div>
                <div className={s.label}>My bonus</div>
                <div className={s.value}>0</div>
              </div>
              <div className={s.row}>
                <div className={s.icon}><UserPlusSvg /></div>
                <div className={s.label}>Delegated to me</div>
                <div className={s.value}>{web3c.daoDiamond.delegatedPower}</div>
              </div>
              <div className={s.row}>
                <div className={s.icon}><VotingSvg /></div>
                <div className={s.label}>My total voting power</div>
                <div className={cx(s.value, s.activeValue)}>{formatBONDValue(web3c.daoDiamond.votingPower)}</div>
              </div>
            </Modal>
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
