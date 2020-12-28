import React from 'react';
import cx from 'classnames';

import { isValidAddress } from 'utils';
import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import Modal, { ModalProps } from 'components/modal';

import { ReactComponent as WalletSvg } from 'resources/svg/icons/nav-wallet.svg';
import { ReactComponent as PercentageSvg } from 'resources/svg/icons/percentage.svg';
import { ReactComponent as UserPlusSvg } from 'resources/svg/icons/user-plus.svg';
import { ReactComponent as VotingSvg } from 'resources/svg/icons/nav-voting.svg';

import s from './styles.module.scss';

export type VotingDetailedModalProps = ModalProps & {};

const VotingDetailedModal: React.FunctionComponent<VotingDetailedModalProps> = props => {
  const web3c = useWeb3Contracts();
  const {
    votingPower,
    userDelegatedTo,
    delegatedPower,
    balance: myBondBalance,
  } = web3c.daoBarn;

  const isDelegated = isValidAddress(userDelegatedTo);
  const myBonus = isDelegated
    ? ZERO_BIG_NUMBER
    : votingPower
      ?.minus(myBondBalance ?? ZERO_BIG_NUMBER)
      .minus(delegatedPower ?? ZERO_BIG_NUMBER);

  return (
    <Modal
      className={s.component}
      title="Voting power detailed view"
      {...props}>
      <div className={s.row}>
        <div className={s.icon}><WalletSvg /></div>
        <div className={s.label}>My staked balance</div>
        <div className={s.value}>
          {formatBONDValue(myBondBalance)}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.icon}><WalletSvg /></div>
        <div className={s.label}>Delegated by me</div>
        <div className={s.value}>
          {formatBONDValue(myBondBalance)}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.icon}><PercentageSvg /></div>
        <div className={s.label}>Locked balance bonus</div>
        <div className={s.value}>
          {formatBONDValue(myBonus)}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.icon}><UserPlusSvg /></div>
        <div className={s.label}>Delegated to me</div>
        <div className={s.value}>
          {formatBONDValue(delegatedPower)}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.icon}><VotingSvg /></div>
        <div className={s.label}>My total voting power</div>
        <div className={cx(s.value, s.activeValue)}>
          {formatBONDValue(votingPower)}
        </div>
      </div>
    </Modal>
  );
};

export default VotingDetailedModal;
