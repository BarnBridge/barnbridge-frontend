import React from 'react';
import cx from 'classnames';

import Card from 'components/antd/card';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import { Heading, Label, Paragraph } from 'components/custom/typography';
import ExternalLink from 'components/custom/externalLink';

import { formatBONDValue, formatUSDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { useWeekCountdown } from 'hooks/useCountdown';

import s from './styles.module.scss';

const UNISWAP_EXCHANGE_LINK = `https://app.uniswap.org/#/swap?inputCurrency=${BONDTokenMeta.address}&outputCurrency=${USDCTokenMeta.address}`;

const PoolStats: React.FunctionComponent = () => {
  const { aggregated, uniswap, staking } = useWeb3Contracts();
  const epochEnd = React.useMemo<number | undefined>(() => {
    const [, end] = staking.getEpochPeriod(staking.currentEpoch!) ?? [];
    return end;
  }, [staking]);
  const [untilNextEpoch] = useWeekCountdown(epochEnd);

  const totalBondReward = formatBONDValue(aggregated.totalBondReward);

  return (
    <div className={cx(s.component, 'grid gap-32 sm-gap-8 justify-start')}>
      <Card>
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Label type="lb2" semiBold color="red">
              Total Value Locked
            </Label>
            <Tooltip
              type="info"
              title={
                <span>
                  This number shows the Total Value Locked across the staking
                  pool(s), and the effective Total Value Locked.
                  <br />
                  <br />
                  When staking tokens during an epoch that is currently running,
                  your effective deposit amount will be proportionally reduced
                  by the time that has passed from that epoch. Once an epoch
                  ends, your staked balance and effective staked balance will be
                  the equal, therefore TVL and effective TVL will differ in most
                  cases.
                </span>
              }
            />
          </Grid>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {formatUSDValue(aggregated.totalStaked)}
            </Heading>
            <Paragraph type="p1" color="secondary">
              {formatUSDValue(aggregated.totalEffectiveStaked)} effective locked
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Label type="lb2" semiBold color="red">
              Bond Rewards
            </Label>
            <Tooltip
              type="info"
              title={`This number shows the $BOND token rewards distributed so far out of the total of ${totalBondReward} that are going to be available for Yield Farming.`}
            />
          </Grid>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {formatBONDValue(aggregated.bondReward)}
            </Heading>
            <Paragraph type="p1" color="secondary">
              out of {totalBondReward}
            </Paragraph>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Label type="lb2" semiBold color="red">
              Bond Price
            </Label>
          </Grid>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {formatUSDValue(uniswap.bondPrice)}
            </Heading>
            <ExternalLink
              href={UNISWAP_EXCHANGE_LINK}>
              <Paragraph type="p1" semiBold color="blue">Uniswap market</Paragraph>
            </ExternalLink>
          </Grid>
        </Grid>
      </Card>

      <Card>
        <Grid flow="row" gap={48}>
          <Grid flow="col" align="center" justify="space-between">
            <Label type="lb2" semiBold color="red">
              Time Left
            </Label>
            <Tooltip
              type="info"
              title="This counter shows the time left in the current epoch. The pool(s) below are synchronized and have epochs that last a week. You can deposit to the pool(s) during the duration of an epoch and receive rewards proportional to the time they are staked, but the funds must stay staked until the clock runs out and the epoch ends in order to be able to harvest the rewards."
            />
          </Grid>
          <Grid flow="row" gap={4}>
            <Heading type="h2" bold color="primary">
              {untilNextEpoch}
            </Heading>
            <Paragraph type="p1" color="secondary">
              until next epoch
            </Paragraph>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default PoolStats;
