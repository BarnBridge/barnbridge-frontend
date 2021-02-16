import React from 'react';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Heading, Hint, Label, Paragraph } from 'components/custom/typography';
import ExternalLink from 'components/custom/externalLink';

import { APIOverviewData, fetchOverviewData } from 'modules/governance/api';
import { getFormattedDuration } from 'utils';
import { formatBONDValue, formatUSDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { UseLeftTime } from 'hooks/useLeftTime';

export type VotingStatListProps = {
  className?: string;
};

const VotingStatList: React.FunctionComponent<VotingStatListProps> = props => {
  const { className } = props;

  const web3c = useWeb3Contracts();
  const [overview, setOverview] = React.useState<APIOverviewData | undefined>();

  React.useEffect(() => {
    fetchOverviewData().then(setOverview);
  }, []);

  return (
    <Grid
      className={className}
      gap={[32, 32]}
      justify="start"
      colsTemplate="repeat(auto-fit, minmax(392px, 1fr))">
      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Paragraph type="p2">
              This number shows the amount of $BOND (and their USD value) currently staked in the DAO.
            </Paragraph>
          )}>
            <Label type="lb2" semiBold color="red">
              Bond Staked
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Heading type="h2" bold color="primary">
                {formatBONDValue(web3c.daoBarn.bondStaked)}
              </Heading>
              <Paragraph type="p1" color="secondary">
                BOND
              </Paragraph>
            </Grid>
            <Paragraph type="p1" color="secondary">
              {formatUSDValue(web3c.aggregated.bondLockedPrice)}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This number shows the amount of vBOND currently minted. This number may differ from the amount of $BOND
                staked because of the multiplier mechanic
              </Paragraph>
              <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
                Learn more
              </ExternalLink>
            </Grid>
          )}>
            <Label type="lb2" semiBold color="red">
              VBond
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {formatBONDValue(overview?.totalVbond)}
            </Heading>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This counter shows the average amount of time $BOND stakers locked their deposits in order to take
                advantage of the voting power bonus.
              </Paragraph>
              <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power">
                Learn more
              </ExternalLink>
            </Grid>
          )}>
            <Label type="lb2" semiBold color="red">
              Avg. Lock Time
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {overview?.avgLockTimeSeconds ? getFormattedDuration(overview?.avgLockTimeSeconds) : '-'}
            </Heading>
            <Paragraph type="p1" color="secondary">
              average time
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Paragraph type="p2">
              This number shows the $BOND token rewards distributed so far out of the total
              of {formatBONDValue(web3c.daoReward.poolFeature?.totalAmount)} that are going to be available for the
              DAO Staking.
            </Paragraph>
          )}>
            <Label type="lb2" semiBold color="red">
              Bond Rewards
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <UseLeftTime end={(web3c.daoReward.poolFeature?.endTs ?? 0) * 1000} delay={5_000}>
              {() => (
                <Heading type="h2" bold color="primary">
                  {formatBONDValue(web3c.daoReward.actions.getBondRewards())}
                </Heading>
              )}
            </UseLeftTime>
            <Paragraph type="p1" color="secondary">
              out of {formatBONDValue(web3c.daoReward.poolFeature?.totalAmount)}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This number shows the amount of vBOND that is delegated to other addresses.
              </Paragraph>
              <ExternalLink
                href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power#3-you-can-delegate-vbonds-to-other-users">
                Learn more
              </ExternalLink>
            </Grid>
          )}>
            <Label type="lb2" semiBold color="red">
              Delegated
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {formatBONDValue(overview?.totalDelegatedPower)}
            </Heading>
            <Paragraph type="p1" color="secondary">
              out of {formatBONDValue(web3c.bond.totalSupply)}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Hint text={(
            <Paragraph type="p2">
              This card shows the number of holders of $BOND and compares it to the number of stakers and voters in the
              DAO.
            </Paragraph>
          )}>
            <Label type="lb2" semiBold color="red">
              Addresses
            </Label>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Heading type="h2" bold color="primary">
                {overview?.holdersStakingExcluded}
              </Heading>
              <Paragraph type="p1" color="secondary">
                holders
              </Paragraph>
            </Grid>
            <Paragraph type="p1" color="secondary">
              {overview?.barnUsers} stakers & {overview?.voters} voters
            </Paragraph>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default VotingStatList;
