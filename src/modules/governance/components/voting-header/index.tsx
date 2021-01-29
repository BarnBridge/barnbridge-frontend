import React from 'react';
import * as Antd from 'antd';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Label, Paragraph } from 'components/custom/typography';
import VotingDetailedModal from '../voting-detailed-modal';

import { inRange, isValidAddress } from 'utils';
import { formatBigValue, formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { useWeekCountdown } from 'hooks/useCountdown';

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
      <Label type="lb2" semiBold color="red500" className="mb-16">My Voting Power</Label>

      <Grid flow="col" gap={24}>
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">Current reward</Paragraph>
          <Grid flow="col" gap={16}>
            <Heading type="h3" bold color="grey900">{formatBONDValue(reward)}</Heading>
            <Icons name="bond-square-token" />
            <Button
              type="link"
              disabled={reward?.isZero()}
              onClick={() => web3c.daoReward.claimSend()}>Claim</Button>
          </Grid>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">Bond Balance</Paragraph>
          <Grid flow="col" gap={16}>
            <Heading type="h3" bold color="grey900">{formatBONDValue(bondBalance)}</Heading>
            <Icons name="bond-square-token" />
          </Grid>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">
            {isDelegated ? 'Total delegated voting power' : 'Total voting power'}
          </Paragraph>
          <Grid flow="col" gap={16}>
            <Heading type="h3" bold color="grey900">
              {isDelegated
                ? formatBONDValue(myBondBalance)
                : formatBONDValue(votingPower)}
            </Heading>
            <Button
              type="link"
              onClick={() => showDetailedView(true)}>Detailed view</Button>
            <VotingDetailedModal
              visible={detailedView}
              onCancel={() => showDetailedView(false)} />
          </Grid>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">Multiplier & Lock timer</Paragraph>
          <Grid flow="col" gap={16}>
            <Antd.Tooltip title={`${multiplier}x`}>
              <Label type="lb1" bold color="red500" className={s.ratio}>
                {inRange(multiplier, 1, 1.01) ? '>' : ''} {formatBigValue(multiplier, 2, '-', 2)}x
              </Label>
            </Antd.Tooltip>
            {countdown && (
              <>
                <Paragraph type="p2" color="grey500">for</Paragraph>
                <Heading type="h3" bold color="grey900">{countdown}</Heading>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VotingHeader;
