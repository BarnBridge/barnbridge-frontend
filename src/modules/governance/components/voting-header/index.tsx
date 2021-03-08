import React from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { formatBONDValue, formatBigValue, isSmallBONDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Skeleton from 'components/antd/skeleton';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';

import VotingDetailedModal from '../voting-detailed-modal';

import { getFormattedDuration, inRange } from 'utils';

import s from './s.module.scss';

type VotingHeaderState = {
  claiming: boolean;
  showDetailedView: boolean;
};

const InitialState: VotingHeaderState = {
  claiming: false,
  showDetailedView: false,
};

const VotingHeader: React.FC = () => {
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<VotingHeaderState>(InitialState);

  const { claimValue } = web3c.daoReward;
  const { balance: bondBalance } = web3c.bond;
  const { votingPower, userLockedUntil, multiplier = 1 } = web3c.daoBarn;

  const loadedUserLockedUntil = (userLockedUntil ?? Date.now()) - Date.now();

  function handleLeftTimeEnd() {
    web3c.daoBarn.reload();
  }

  function handleClaim() {
    setState({ claiming: true });

    web3c.daoReward.actions
      .claim()
      .catch(Error)
      .then(() => {
        web3c.daoReward.reload();
        web3c.bond.reload();
        setState({ claiming: false });
      });
  }

  return (
    <div className={cn(s.component, 'pv-24 ph-64 sm-ph-24')}>
      <Text type="lb2" weight="semibold" color="red" className="mb-16">
        My Voting Power
      </Text>
      <Grid flow="col" gap={24} className={s.items}>
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            Current reward
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Tooltip title={<Text type="p2">{formatBigValue(claimValue, BONDTokenMeta.decimals)}</Text>}>
              <Skeleton loading={claimValue === undefined}>
                <Text type="h3" weight="bold" color="primary">
                  {isSmallBONDValue(claimValue) && '> '}
                  {formatBONDValue(claimValue)}
                </Text>
              </Skeleton>
            </Tooltip>
            <Icon name="bond-square-token" />
            <Button type="light" disabled={claimValue?.isZero()} onClick={handleClaim}>
              {!state.claiming ? 'Claim' : <Spin spinning />}
            </Button>
          </Grid>
        </Grid>
        <Divider type="vertical" />
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            Bond Balance
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Skeleton loading={bondBalance === undefined}>
              <Text type="h3" weight="bold" color="primary">
                {formatBONDValue(bondBalance)}
              </Text>
            </Skeleton>
            <Icon name="bond-square-token" />
          </Grid>
        </Grid>
        <Divider type="vertical" />
        <Grid flow="row" gap={4}>
          <Text type="p2" color="secondary">
            Total voting power
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Skeleton loading={votingPower === undefined}>
              <Text type="h3" weight="bold" color="primary">
                {formatBONDValue(votingPower)}
              </Text>
            </Skeleton>
            <Button type="light" onClick={() => setState({ showDetailedView: true })}>
              Detailed view
            </Button>

            {state.showDetailedView && <VotingDetailedModal onCancel={() => setState({ showDetailedView: false })} />}
          </Grid>
        </Grid>

        <UseLeftTime end={userLockedUntil ?? 0} delay={1_000} onEnd={handleLeftTimeEnd}>
          {leftTime => {
            const leftMultiplier = new BigNumber(multiplier - 1)
              .multipliedBy(leftTime)
              .div(loadedUserLockedUntil)
              .plus(1);

            return leftMultiplier.gt(1) ? (
              <>
                <Divider type="vertical" />
                <Grid flow="row" gap={4}>
                  <Hint
                    text={
                      <>
                        <Text type="p2">
                          The multiplier mechanic allows users to lock $BOND for a period up to 1 year and get a bonus
                          of up to 2x vBOND. The bonus is linear, as per the following example:
                        </Text>
                        <ul>
                          <li>
                            <Text type="p2">lock 1000 $BOND for 1 year → get back 2000 vBOND</Text>
                          </li>
                          <li>
                            <Text type="p2">lock 1000 $BOND for 6 months → get back 1500 vBOND</Text>
                          </li>
                        </ul>
                        <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
                          Learn more
                        </ExternalLink>
                      </>
                    }>
                    <Text type="p2" color="secondary">
                      Multiplier & Lock timer
                    </Text>
                  </Hint>

                  <Grid flow="col" gap={8} align="center">
                    <Tooltip title={`x${leftMultiplier}`}>
                      <Text type="lb1" weight="bold" color="red" className={s.ratio}>
                        {inRange(multiplier, 1, 1.01) ? '>' : ''} {formatBigValue(leftMultiplier, 2, '-', 2)}x
                      </Text>
                    </Tooltip>
                    <Text type="p2" color="secondary">
                      for
                    </Text>
                    <Text type="h3" weight="bold" color="primary">
                      {getFormattedDuration(0, userLockedUntil)}
                    </Text>
                  </Grid>
                </Grid>
              </>
            ) : undefined;
          }}
        </UseLeftTime>
      </Grid>
    </div>
  );
};

export default VotingHeader;
