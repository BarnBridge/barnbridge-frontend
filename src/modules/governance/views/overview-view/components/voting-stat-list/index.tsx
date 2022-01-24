import React from 'react';
import cn from 'classnames';
import capitalize from 'lodash/capitalize';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import { ExternalLink } from 'components/button';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { ProjectToken } from 'components/providers/tokensProvider';
import { UseLeftTime } from 'hooks/useLeftTime';
import { APIOverviewData, useDaoAPI } from 'modules/governance/api';
import { useDAO } from 'modules/governance/components/dao-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export type VotingStatListProps = {
  className?: string;
};

const VotingStatList: React.FC<VotingStatListProps> = props => {
  const { className } = props;

  const daoAPI = useDaoAPI();
  const daoCtx = useDAO();
  const { projectToken, convertTokenInUSD } = useKnownTokens();
  const [overview, setOverview] = React.useState<APIOverviewData | undefined>();

  React.useEffect(() => {
    daoAPI.fetchOverviewData().then(setOverview);
  }, []);

  const apr = daoCtx.daoBarn.bondStaked
    ? daoCtx.activeDaoReward?.weeklyRewards?.multipliedBy(52).dividedBy(daoCtx.daoBarn.bondStaked)
    : undefined;

  return (
    <div className={cn(s.cards, className)}>
      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This number shows the amount of ${projectToken.symbol} (and their USD value) currently staked in the
                DAO.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              {projectToken.symbol} Staked
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Text type="h2" weight="bold" color="primary" wrap>
                {formatToken(daoCtx.daoBarn.bondStaked)}
              </Text>
              <Text type="p1" color="secondary">
                {projectToken.symbol}
              </Text>
              <Tooltip
                title={
                  <>
                    The BarnBridge Governance contracts are covered by: <br />- Bridge Mutual,{' '}
                    <a
                      href="https://app.bridgemutual.io/user/cover/0xdb9A242cfD588507106919051818e771778202e9"
                      rel="noopener noreferrer"
                      target="_blank">
                      click here
                    </a>{' '}
                    to purchase coverage
                  </>
                }>
                <Icon name="insured" color="green" size={32} />
              </Tooltip>
            </Grid>
            <Text type="p1" color="secondary">
              {formatUSD(convertTokenInUSD(daoCtx.daoBarn.bondStaked, projectToken.symbol))}
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
                  This number shows the amount of v{projectToken.symbol} currently minted. This number may differ from
                  the amount of ${projectToken.symbol} staked because of the multiplier mechanic
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
              V{capitalize(projectToken.symbol)}
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Text type="h2" weight="bold" color="primary" wrap>
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
                  This counter shows the average amount of time ${projectToken.symbol} stakers locked their deposits in
                  order to take advantage of the voting power bonus.
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
            <Text type="h2" weight="bold" color="primary" wrap>
              {overview?.avgLockTimeSeconds ? getFormattedDuration(overview?.avgLockTimeSeconds) : '-'}
            </Text>
            <Text type="p1" color="secondary">
              average time
            </Text>
          </Grid>
        </Grid>
      </div>

      {daoCtx.activeDaoReward && (
        <div className="card p-24">
          <Grid flow="row" gap={48}>
            <Hint
              text={
                <Text type="p2">
                  This number shows the ${projectToken.symbol} token rewards distributed so far out of the total of{' '}
                  {formatToken(daoCtx.activeDaoReward.pullFeature?.totalAmount)} that are going to be available for the
                  DAO Staking.
                </Text>
              }>
              <Text type="lb2" weight="semibold" color="red">
                {projectToken.symbol} Rewards
              </Text>
            </Hint>
            <Grid flow="row" gap={4}>
              <UseLeftTime end={(daoCtx.activeDaoReward.pullFeature?.endTs ?? 0) * 1000} delay={5_000}>
                {() => (
                  <Text type="h2" weight="bold" color="primary" wrap>
                    {formatToken(daoCtx.activeDaoReward?.bondRewards)}
                  </Text>
                )}
              </UseLeftTime>
              <Text type="p1" color="secondary">
                out of {formatToken(daoCtx.activeDaoReward.pullFeature?.totalAmount)}
              </Text>
            </Grid>
          </Grid>
        </div>
      )}

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This number shows the amount of v{projectToken.symbol} that is delegated to other addresses.
                </Text>
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
            <Text type="h2" weight="bold" color="primary" wrap>
              {formatToken(overview?.totalDelegatedPower)}
            </Text>
            <Text type="p1" color="secondary">
              out of{' '}
              {formatToken((projectToken.contract as Erc20Contract).totalSupply?.unscaleBy(projectToken.decimals))}
            </Text>
          </Grid>
        </Grid>
      </div>

      <div className="card p-24">
        <Grid flow="row" gap={48}>
          <Hint
            text={
              <Text type="p2">
                This card shows the number of holders of ${projectToken.symbol} and compares it to the number of stakers
                and voters in the DAO.
              </Text>
            }>
            <Text type="lb2" weight="semibold" color="red">
              Addresses
            </Text>
          </Hint>
          <Grid flow="row" gap={4}>
            <Grid flow="col" gap={4} align="end">
              <Text type="h2" weight="bold" color="primary" wrap>
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

      {daoCtx.activeDaoReward && (
        <>
          <div className="card p-24">
            <Grid flow="row" gap={48}>
              <Text type="lb2" weight="semibold" color="red">
                Annual Percentage Rate (APR)
              </Text>
              <Grid flow="row" gap={4}>
                <Text type="h2" weight="bold" color="primary" wrap>
                  {formatPercent(apr) ?? '-'}
                </Text>
              </Grid>
            </Grid>
          </div>
          <div className="card p-24">
            <Grid flow="row" gap={48}>
              <Text type="lb2" weight="semibold" color="red">
                Weekly {ProjectToken.symbol} Rewards
              </Text>
              <Grid flow="row" gap={4}>
                <Text type="h2" weight="bold" color="primary" wrap>
                  {formatToken(daoCtx.activeDaoReward.weeklyRewards) ?? '-'}
                </Text>
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </div>
  );
};

export default VotingStatList;
