import React from 'react';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue, formatUSDValue } from 'web3/utils';

import Card from 'components/antd/card';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { APIOverviewData, fetchOverviewData } from 'modules/governance/api';

import { getFormattedDuration } from 'utils';

export type VotingStatListProps = {
  className?: string;
};

const VotingStatList: React.FC<VotingStatListProps> = props => {
  const { className } = props;

  const web3c = useWeb3Contracts();
  const [overview, setOverview] = React.useState<APIOverviewData | undefined>();

  React.useEffect(() => {
    fetchOverviewData().then(setOverview);
  }, []);

  return (
    <Grid className={className} gap={[32, 32]} justify="start" colsTemplate="repeat(auto-fit, minmax(392px, 1fr))">
      <Card>
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
                {formatBONDValue(web3c.daoBarn.bondStaked)}
              </Text>
              <Text type="p1" color="secondary">
                BOND
              </Text>
            </Grid>
            <Text type="p1" color="secondary">
              {formatUSDValue(web3c.aggregated.bondLockedPrice)}
            </Text>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This number shows the amount of vBOND currently minted. This number may differ from the amount of
                  $BOND staked because of the multiplier mechanic
                </Text>
                <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
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
              {formatBONDValue(overview?.totalVbond)}
            </Text>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This counter shows the average amount of time $BOND stakers locked their deposits in order to take
                  advantage of the voting power bonus.
                </Text>
                <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
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
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This number shows the $BOND token rewards distributed so far out of the total of{' '}
                {formatBONDValue(web3c.daoReward.poolFeature?.totalAmount)} that are going to be available for the DAO
                Staking.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Bond Rewards
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <UseLeftTime end={(web3c.daoReward.poolFeature?.endTs ?? 0) * 1000} delay={5_000}>
              {() => (
                <Text type="h2" weight="bold" color="primary">
                  {formatBONDValue(web3c.daoReward.actions.getBondRewards())}
                </Text>
              )}
            </UseLeftTime>
            <Text type="p1" color="secondary">
              out of {formatBONDValue(web3c.daoReward.poolFeature?.totalAmount)}
            </Text>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">This number shows the amount of vBOND that is delegated to other addresses.</Text>
                <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power#3-you-can-delegate-vbonds-to-other-users">
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
              {formatBONDValue(overview?.totalDelegatedPower)}
            </Text>
            <Text type="p1" color="secondary">
              out of {formatBONDValue(web3c.bond.totalSupply)}
            </Text>
          </Grid>
        </Grid>
      </Card>

      <Card>
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
      </Card>
    </Grid>
  );
};

export default VotingStatList;
