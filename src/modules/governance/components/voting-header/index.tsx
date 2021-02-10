import React from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Label, Paragraph } from 'components/custom/typography';
import ExternalLink from 'components/custom/externalLink';
import VotingDetailedModal from '../voting-detailed-modal';

import { getFormattedDuration, inRange, isValidAddress } from 'utils';
import { formatBigValue, formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';
import { BONDTokenMeta } from 'web3/contracts/bond';

import s from './styles.module.scss';

type VotingHeaderState = {
  claiming: boolean;
  showDetailedView: boolean;
};

const InitialState: VotingHeaderState = {
  claiming: false,
  showDetailedView: false,
}

const VotingHeader: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<VotingHeaderState>(InitialState);

  const { claimValue } = web3c.daoReward;
  const { balance: bondBalance } = web3c.bond;
  const {
    votingPower,
    userLockedUntil,
    userDelegatedTo,
    multiplier = 1,
    balance: stakedBalance,
  } = web3c.daoBarn;

  const isDelegated = isValidAddress(userDelegatedTo);
  const loadedUserLockedUntil = (userLockedUntil ?? Date.now()) - Date.now();

  function handleLeftTimeEnd() {
    web3c.daoBarn.reload();
  }

  function handleClaim() {
    setState({ claiming: true });

    web3c.daoReward.actions.claim()
      .catch(Error)
      .then(() => {
        web3c.daoReward.reload();
        web3c.bond.reload();
        setState({ claiming: false });
      });
  }

  return (
    <Grid flow="row" gap={16} padding={[24, 64]} className={s.component}>
      <Label type="lb2" semiBold color="red500">
        My Voting Power
      </Label>
      <Grid flow="col" gap={24}>
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">
            Current reward
          </Paragraph>
          <Grid flow="col" gap={16} align="center">
            <Tooltip title={(
              <Paragraph type="p2">
                {formatBigValue(claimValue, BONDTokenMeta.decimals)}
              </Paragraph>
            )}>
              <Heading
                type="h3"
                bold
                color="grey900"
                loading={claimValue === undefined}>
                {claimValue?.lt(0.0001) && '> '}
                {formatBigValue(claimValue, BONDTokenMeta.decimals).slice(0, 6)}
              </Heading>
            </Tooltip>
            <Icons name="bond-square-token" />
            <Button
              type="light"
              disabled={claimValue?.isZero()}
              onClick={handleClaim}>
              {!state.claiming
                ? 'Claim'
                : <Spin spinning />
              }
            </Button>
          </Grid>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">
            Bond Balance
          </Paragraph>
          <Grid flow="col" gap={16} align="center">
            <Heading
              type="h3"
              bold
              color="grey900"
              loading={bondBalance === undefined}>
              {formatBONDValue(bondBalance)}
            </Heading>
            <Icons name="bond-square-token" />
          </Grid>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={4}>
          <Paragraph type="p2" color="grey500">
            Total voting power
          </Paragraph>
          <Grid flow="col" gap={16} align="center">
            <Heading
              type="h3"
              bold
              color="grey900"
              loading={
                (isDelegated ? stakedBalance : votingPower) === undefined
              }>
              {formatBONDValue(votingPower)}
            </Heading>
            <Button type="light" onClick={() => setState({ showDetailedView: true })}>
              Detailed view
            </Button>

            {state.showDetailedView && (
              <VotingDetailedModal
                visible
                onCancel={() => setState({ showDetailedView: false })}
              />
            )}
          </Grid>
        </Grid>

        <UseLeftTime end={userLockedUntil ?? 0} delay={1_000} onEnd={handleLeftTimeEnd}>
          {(leftTime) => {
            const leftMultiplier = (new BigNumber(multiplier - 1))
              .multipliedBy(leftTime)
              .div(loadedUserLockedUntil)
              .plus(1);

            return leftMultiplier.gt(1)
              ? (
                <>
                  <div className={s.delimiter} />
                  <Grid flow="row" gap={4}>
                    <Paragraph type="p2" color="grey500" hint={(
                      <>
                        <Paragraph type="p2">
                          The multiplier mechanic allows users to lock $BOND for a period up to 1 year and get a bonus
                          of
                          up
                          to 2x vBOND. The bonus is linear, as per the following example:
                        </Paragraph>
                        <ul>
                          <li>
                            <Paragraph type="p2">lock 1000 $BOND for 1 year → get back 2000 vBOND</Paragraph>
                          </li>
                          <li>
                            <Paragraph type="p2">lock 1000 $BOND for 6 months → get back 1500 vBOND</Paragraph>
                          </li>
                        </ul>
                        <ExternalLink
                          href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
                          Learn more
                        </ExternalLink>
                      </>
                    )}>
                      Multiplier & Lock timer
                    </Paragraph>

                    <Grid flow="col" gap={8} align="center">
                      <Tooltip title={`x${leftMultiplier}`}>
                        <Label type="lb1" bold color="red500" className={s.ratio}>
                          {inRange(multiplier, 1, 1.01) ? '>' : ''}{' '}
                          {formatBigValue(leftMultiplier, 2, '-', 2)}x
                        </Label>
                      </Tooltip>
                      <Paragraph type="p2" color="grey500">
                        for
                      </Paragraph>
                      <Heading type="h3" bold color="grey900">
                        {getFormattedDuration(0, userLockedUntil)}
                      </Heading>
                    </Grid>
                  </Grid>
                </>
              )
              : undefined;
          }}
        </UseLeftTime>
      </Grid>
    </Grid>
  );
};

export default VotingHeader;
