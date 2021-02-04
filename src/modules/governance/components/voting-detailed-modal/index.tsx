import React from 'react';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Icons from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';

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

const VotingDetailedModal: React.FunctionComponent<VotingDetailedModalProps> = props => {
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
      const bonus = votingPower
        ?.minus(myBondBalance ?? ZERO_BIG_NUMBER)
        .minus(delegatedPower ?? ZERO_BIG_NUMBER);

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
              <Paragraph type="p1" semiBold color="grey500">
                My staked balance
              </Paragraph>
            </Grid>
            <Grid flow="col" gap={16}>
              <Paragraph type="p1" semiBold color="grey900">
                {formatBONDValue(myBondBalance)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green500" />
              </Paragraph>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="wallet-outlined" width={20} height={20} />
              <Paragraph type="p1" semiBold color="grey500">
                Delegated by me
              </Paragraph>
            </Grid>
            <Grid flow="col" gap={16}>
              <Paragraph type="p1" semiBold color="grey900">
                {isDelegated ? formatBONDValue(myBondBalance) : 0}
                <Icons name="circle-minus-outlined" width={18} height={18} color="red500" />
              </Paragraph>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="rate-outlined" width={20} height={20} />
              <Paragraph type="p1" semiBold color="grey500">
                Locked balance bonus
              </Paragraph>
            </Grid>
            <Grid flow="col" gap={16}>
              <Paragraph type="p1" semiBold color="grey900">
                {state.leftBonus?.gt(ZERO_BIG_NUMBER) ? '> ' : ''}
                {formatBONDValue(state.leftBonus)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green500" />
              </Paragraph>
            </Grid>
          </Grid>

          <Grid flow="col" justify="space-between" padding={[16, 32]}>
            <Grid flow="col" gap={16}>
              <Icons name="handshake-outlined" width={20} height={20} />
              <Paragraph type="p1" semiBold color="grey500">
                Delegated to me
              </Paragraph>
            </Grid>
            <Grid flow="col" gap={16}>
              <Paragraph type="p1" semiBold color="grey900">
                {formatBONDValue(delegatedPower)}
                <Icons name="circle-plus-outlined" width={18} height={18} color="green500" />
              </Paragraph>
            </Grid>
          </Grid>
        </Grid>
        <div className={s.separator} />
        <Grid flow="col" justify="space-between" padding={[32]}>
          <Grid flow="col" gap={16}>
            <Icons name="stamp-outlined" width={20} height={20} />
            <Paragraph type="p1" semiBold color="grey500">
              My total voting power
            </Paragraph>
          </Grid>
          <Grid flow="col" gap={16}>
            <Heading type="h3" bold color="grey900">
              {formatBONDValue(state.leftTotalVotingPower)}
            </Heading>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default VotingDetailedModal;
