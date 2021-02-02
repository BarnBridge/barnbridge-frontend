import React from 'react';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import { Heading, Label, Paragraph } from 'components/custom/typography';

import { APIOverviewData, fetchOverviewData } from 'modules/governance/api';
import { getFormattedDuration } from 'utils';
import { formatBONDValue, formatUSDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import BigNumber from 'bignumber.js';
import Button from '../../../../../../components/antd/button';

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
          <Label type="lb2" semiBold color="red500" hint={(
            <Paragraph type="p2">
              This number shows the amount of $BOND (and their USD value) currently staked in the DAO.
            </Paragraph>
          )}>
            Bond Locked
          </Label>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Heading type="h2" bold color="grey900">
                {formatBONDValue(web3c.daoBarn.bondStaked)}
              </Heading>
              <Paragraph type="p1" color="grey500">
                BOND
              </Paragraph>
            </Grid>
            <Paragraph type="p1" color="grey500">
              {formatUSDValue(web3c.aggregated.bondLockedPrice)}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Label type="lb2" semiBold color="red500" hint={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This number shows the amount of vBOND currently minted. This number may differ from the amount of $BOND
                staked because of the multiplier mechanic
              </Paragraph>
              <Button type="link">Learn more</Button>
            </Grid>
          )}>
            VBond
          </Label>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="grey900">
              {formatBONDValue(overview?.totalVbond)}
            </Heading>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Label type="lb2" semiBold color="red500" hint={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This counter shows the average amount of time $BOND stakers locked their deposits in order to take
                advantage of the voting power bonus.
              </Paragraph>
              <Button type="link">Learn more</Button>
            </Grid>
          )}>
            Avg. Lock Time
          </Label>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="grey900">
              {getFormattedDuration(overview?.avgLockTimeSeconds) ?? '-'}
            </Heading>
            <Paragraph type="p1" color="grey500">
              average time
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Label type="lb2" semiBold color="red500" hint={(
            <Paragraph type="p2">
              This number shows the $BOND token rewards distributed so far out of the total of xxx that are going to be
              available for the DAO Staking.
            </Paragraph>
          )}>
            Bond Rewards
          </Label>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="grey900">
              0
            </Heading>
            <Paragraph type="p1" color="grey500">
              out of 0
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Label type="lb2" semiBold color="red500" hint={(
            <Grid flow="row" gap={8} align="start">
              <Paragraph type="p2">
                This number shows the amount of vBOND that is delegated to other addresses.
              </Paragraph>
              <Button type="link">Learn more</Button>
            </Grid>
          )}>
            Delegated
          </Label>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="grey900">
              {formatBONDValue(overview?.totalDelegatedPower)}
            </Heading>
            <Paragraph type="p1" color="grey500">
              out of {formatBONDValue(web3c.bond.totalSupply)}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Label type="lb2" semiBold color="red500" hint={(
            <Paragraph type="p2">
              This card shows the number of holders of $BOND and compares it to the number of stakers and voters in the
              DAO.
            </Paragraph>
          )}>
            Addresses
          </Label>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Heading type="h2" bold color="grey900">
                {overview?.holders}
              </Heading>
              <Paragraph type="p1" color="grey500">
                holders
              </Paragraph>
            </Grid>
            <Paragraph type="p1" color="grey500">
              {overview?.voters} voters
            </Paragraph>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default VotingStatList;
