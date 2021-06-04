import React from 'react';
import cn from 'classnames';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken, formatUSD } from 'web3/utils';

import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { BondToken, convertTokenInUSD } from 'components/providers/known-tokens-provider';
import { UseLeftTime } from 'hooks/useLeftTime';
import { APIOverviewData, fetchOverviewData } from 'modules/governance/api';
import { useDAO } from 'modules/governance/components/dao-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export type VotingStatListProps = {
  className?: string;
};

const VotingStatList: React.FC<VotingStatListProps> = props => {
  const { className } = props;

  const daoCtx = useDAO();
  const [overview, setOverview] = React.useState<APIOverviewData | undefined>();

  React.useEffect(() => {
    fetchOverviewData().then(setOverview);
  }, []);

  return (
    <div className={cn(s.cards, className)}>
      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This number shows the amount of $BOND (and their USD value) currently staked in the DAO.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Bond Staked
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Text type="h2" weight="bold" color="primary">
                {formatToken(daoCtx.daoBarn.bondStaked)}
              </Text>
              <Text type="p1" color="secondary">
                BOND
              </Text>
            </Grid>
            <Text type="p1" color="secondary">
              {formatUSD(convertTokenInUSD(daoCtx.daoBarn.bondStaked, BondToken.symbol))}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This number shows the amount of vBOND currently minted. This number may differ from the amount of
                  $BOND staked because of the multiplier mechanic
                </Text>
                <ExternalLink
                  href="https://integrations.barnbridge.com/specs/dao-specifications#multiplier-and-voting-power"
                  className="link-blue"
                  style={{ fontWeight: 600 }}>
                  Learn more
                </ExternalLink>
              </Grid>
            }>
            <Text type="lb2" weight="semibold" color="red">
              VBond
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatToken(overview?.totalVbond)}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This counter shows the average amount of time $BOND stakers locked their deposits in order to take
                  advantage of the voting power bonus.
                </Text>
                <ExternalLink
                  href="https://integrations.barnbridge.com/specs/dao-specifications#users-can-lock-bond-for-vbond"
                  className="link-blue"
                  style={{ fontWeight: 600 }}>
                  Learn more
                </ExternalLink>
              </Grid>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Avg. Lock Time
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {overview?.avgLockTimeSeconds ? getFormattedDuration(overview?.avgLockTimeSeconds) : '-'}
            </Text>
            <Text type="p1" color="secondary">
              average time
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This number shows the $BOND token rewards distributed so far out of the total of{' '}
                {formatToken(daoCtx.daoReward.poolFeature?.totalAmount)} that are going to be available for the DAO
                Staking.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Bond Rewards
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <UseLeftTime end={(daoCtx.daoReward.poolFeature?.endTs ?? 0) * 1000} delay={5_000}>
              {() => (
                <Text type="h2" weight="bold" color="primary">
                  {formatToken(daoCtx.daoReward.actions.getBondRewards())}
                </Text>
              )}
            </UseLeftTime>
            <Text type="p1" color="secondary">
              out of {formatToken(daoCtx.daoReward.poolFeature?.totalAmount)}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">This number shows the amount of vBOND that is delegated to other addresses.</Text>
                <ExternalLink
                  href="https://integrations.barnbridge.com/specs/dao-specifications#users-can-delegate-vbond-to-other-users"
                  className="link-blue"
                  style={{ fontWeight: 600 }}>
                  Learn more
                </ExternalLink>
              </Grid>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Delegated
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary">
              {formatToken(overview?.totalDelegatedPower)}
            </Text>
            <Text type="p1" color="secondary">
              out of {formatToken((BondToken.contract as Erc20Contract).totalSupply?.unscaleBy(BondToken.decimals))}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This card shows the number of holders of $BOND and compares it to the number of stakers and voters in
                the DAO.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Addresses
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Text type="h2" weight="bold" color="primary">
                {overview?.holdersStakingExcluded}
              </Text>
              <Text type="p1" color="secondary">
                holders
              </Text>
            </Grid>
            <Text type="p1" color="secondary">
              {overview?.barnUsers} stakers & {overview?.voters} voters
            </Text>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default VotingStatList;
