import React from 'react';
import cx from 'classnames';

import Modal, { ModalProps } from 'components/antd/modal';
import Icons from 'components/custom/icon';

import { isValidAddress } from 'utils';
import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

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
        <div className={s.icon}>
          <Icons name="wallet-outlined" />
        </div>
        <div className={s.label}>My staked balance</div>
        <div className={s.value}>{formatBONDValue(myBondBalance)}</div>
      </div>
      <div className={s.row}>
        <div className={s.icon}>
          <Icons name="wallet-outlined" />
        </div>
        <div className={s.label}>Delegated by me</div>
        <div className={s.value}>
          {isDelegated ? formatBONDValue(myBondBalance) : 0}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.icon}>
          <Icons name="rate-outlined" />
        </div>
        <div className={s.label}>Locked balance bonus</div>
        <div className={s.value}>{formatBONDValue(myBonus)}</div>
      </div>
      <div className={s.row}>
        <div className={s.icon}>
          <Icons name="add-user" />
        </div>
        <div className={s.label}>Delegated to me</div>
        <div className={s.value}>{formatBONDValue(delegatedPower)}</div>
      </div>
      <div className={s.row}>
        <div className={s.icon}>
          <Icons name="bank-outlined" />
        </div>
        <div className={s.label}>My total voting power</div>
        <div className={cx(s.value, s.activeValue)}>
          {formatBONDValue(votingPower)}
        </div>
      </div>
    </Modal>
  );
};

export default VotingDetailedModal;
