import React from 'react';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Icons from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

import { isValidAddress } from 'utils';
import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { useLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export type VotingDetailedModalProps = ModalProps & {};

type VotingDetailedModalState = {
  leftBonus?: BigNumber;
  leftTotalVotingPower?: BigNumber;
};

const InitialState: VotingDetailedModalState = {
  leftBonus: undefined,
  leftTotalVotingPower: undefined,
};

const VotingDetailedModal: React.FC<VotingDetailedModalProps> = props => {
  const web3c = useWeb3Contracts();
  const {
    votingPower,
    userDelegatedTo,
    delegatedPower,
    userLockedUntil,
    balance: myBondBalance,
  } = web3c.daoBarn;

  const [state, setState] = useMergeState<VotingDetailedModalState>(InitialState);

  const isDelegated = isValidAddress(userDelegatedTo);
  const loadedUserLockedUntil = (userLockedUntil ?? Date.now()) - Date.now();

  const [startLeftTime] = useLeftTime({
    end: userLockedUntil ?? 0,
    delay: 1_000,
    onTick: leftTime => {
      let bonus = votingPower
        ?.minus(delegatedPower ?? ZERO_BIG_NUMBER);

      if (!isDelegated) {
        bonus = bonus?.minus(myBondBalance ?? ZERO_BIG_NUMBER);
      }

      const leftBonus = bonus?.multipliedBy(leftTime).div(loadedUserLockedUntil);
      const leftTotalVotingPower = votingPower
        ?.minus(bonus ?? ZERO_BIG_NUMBER)
        .plus(leftBonus ?? ZERO_BIG_NUMBER);

      setState({
        leftBonus,
        leftTotalVotingPower,
      });
    },
  });

  React.useEffect(() => {
    setState({
      leftBonus: isDelegated ? ZERO_BIG_NUMBER : votingPower
        ?.minus(myBondBalance ?? ZERO_BIG_NUMBER)
        .minus(delegatedPower ?? ZERO_BIG_NUMBER),
      leftTotalVotingPower: votingPower,
    });

    if (!isDelegated) {
      startLeftTime();
    }
  }, [isDelegated]);

  return (
    <Modal
      className={s.component}
      title="Voting power detailed view"
      {...props}>
      <Grid flow="row">
        <Grid flow="row" padding={[16, 0]}>
          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="wallet-outlined" width={20} height={20} />
              <Text type="p1" weight="semibold" color="secondary">
                My staked balance
              </Text>
            </Grid>
            <Grid flow="col" gap={16}>
              <Text type="p1" weight="semibold" color="primary">
                {formatBONDValue(myBondBalance)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green" />
              </Text>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="wallet-outlined" width={20} height={20} />
              <Text type="p1" weight="semibold" color="secondary">
                Delegated by me
              </Text>
            </Grid>
            <Grid flow="col" gap={16}>
              <Text type="p1" weight="semibold" color="primary">
                {isDelegated ? formatBONDValue(myBondBalance) : 0}
                <Icons name="circle-minus-outlined" width={18} height={18} color="red" />
              </Text>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="rate-outlined" width={20} height={20} />
              <Text type="p1" weight="semibold" color="secondary">
                Locked balance bonus
              </Text>
            </Grid>
            <Grid flow="col" gap={16}>
              <Text type="p1" weight="semibold" color="primary">
                {state.leftBonus?.gt(ZERO_BIG_NUMBER) ? '> ' : ''}
                {formatBONDValue(state.leftBonus)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green" />
              </Text>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="handshake-outlined" width={20} height={20} />
              <Text type="p1" weight="semibold" color="secondary">
                Delegated to me
              </Text>
            </Grid>
            <Grid flow="col" gap={16}>
              <Text type="p1" weight="semibold" color="primary">
                {formatBONDValue(delegatedPower)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green" />
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <div className={s.separator} />
        <Grid flow="col" justify="space-between" padding={[32]}>
          <Grid flow="col" gap={16}>
            <Icons name="stamp-outlined" width={20} height={20} />
            <Text type="p1" weight="semibold" color="secondary">
              My total voting power
            </Text>
          </Grid>
          <Grid flow="col" gap={16}>
            <Text type="h3" weight="bold" color="primary">
              {formatBONDValue(state.leftTotalVotingPower)}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default VotingDetailedModal;
