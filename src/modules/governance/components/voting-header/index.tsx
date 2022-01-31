import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import Erc20Contract from 'web3/erc20Contract';
import { formatBigValue, formatToken } from 'web3/utils';

import Button from 'components/antd/button';
import Modal from 'components/antd/modal';
import Skeleton from 'components/antd/skeleton';
import Tooltip from 'components/antd/tooltip';
import { ExternalLink } from 'components/button';
import Grid from 'components/custom/grid';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useDAO } from 'modules/governance/components/dao-provider';
import DaoRewardContract from 'modules/governance/contracts/daoReward';
import { useWallet } from 'wallets/walletProvider';

import VotingDetailedModal from '../voting-detailed-modal';

import { getFormattedDuration, getNowTs, inRange } from 'utils';

import s from './s.module.scss';

const VotingHeader: React.FC = () => {
  const daoCtx = useDAO();
  const walletCtx = useWallet();
  const { projectToken } = useKnownTokens();

  const [showDetailedView, setShowDetailedView] = useState(false);
  const [claimModalVisible, setClaimModalVisible] = useState(false);
  const [claimingReward, setClaimingReward] = useState<DaoRewardContract | undefined>();

  const { toClaim: toClaimReward } = daoCtx.daoReward;
  const { toClaim: toClaimReward2 } = daoCtx.daoReward2 ?? {};
  const totalToClaim = toClaimReward?.plus(toClaimReward2 ?? 0);

  const projectTokenBalance = (projectToken.contract as Erc20Contract).balance?.unscaleBy(projectToken.decimals);
  const { votingPower, userLockedUntil } = daoCtx.daoBarn;
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    if (walletCtx.account) {
      daoCtx.daoBarn.getMultiplierAtTs(walletCtx.account, getNowTs()).then(value => setMultiplier(value.toNumber()));
    }
  }, [walletCtx.account]);

  const loadedUserLockedUntil = (userLockedUntil ?? Date.now()) - Date.now();

  function handleLeftTimeEnd() {
    // daoCtx.daoBarn.reload(); /// TODO: check
  }

  function handleClaim() {
    if (toClaimReward?.gt(0) && toClaimReward2?.gt(0)) {
      setClaimModalVisible(true);
    } else if (daoCtx.activeDaoReward) {
      handleRewardClaim(daoCtx.activeDaoReward);
    } else if (toClaimReward?.gt(0)) {
      handleRewardClaim(daoCtx.daoReward);
    } else if (toClaimReward2?.gt(0) && daoCtx.daoReward2) {
      handleRewardClaim(daoCtx.daoReward2);
    }
  }

  function handleRewardClaim(reward: DaoRewardContract) {
    setClaimingReward(reward);

    reward
      .claim()
      .catch(Error)
      .then(() => reward.loadUserData())
      .catch(Error)
      .then(() => (projectToken.contract as Erc20Contract).loadBalance())
      .catch(Error)
      .then(() => {
        setClaimingReward(undefined);
        setClaimModalVisible(false);
      });
  }

  return (
    <div className={cn(s.component, 'pv-24 ph-64 sm-ph-16')}>
      <Text type="lb2" weight="semibold" color="red" className="mb-16">
        My Voting Power
      </Text>
      <div className={s.items}>
        <div>
          <Text type="p2" color="secondary" className="mb-4">
            Current reward
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Tooltip
              title={formatToken(totalToClaim ?? 0, {
                decimals: projectToken.decimals,
              })}>
              <Text type="h3" weight="bold" color="primary">
                {formatToken(totalToClaim ?? 0, {
                  hasLess: true,
                })}
              </Text>
            </Tooltip>
            <TokenIcon name={projectToken.icon} />
            <Button type="light" disabled={!totalToClaim?.gt(0)} onClick={handleClaim}>
              {claimingReward ? <Spin spinning /> : 'Claim'}
            </Button>
          </Grid>
        </div>
        <div>
          <Text type="p2" color="secondary" className="mb-4">
            {projectToken.symbol} Balance
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Skeleton loading={projectTokenBalance === undefined}>
              <Text type="h3" weight="bold" color="primary">
                {formatToken(projectTokenBalance)}
              </Text>
            </Skeleton>
            <TokenIcon name={projectToken.icon} />
          </Grid>
        </div>
        <div>
          <Text type="p2" color="secondary" className="mb-4">
            Total voting power
          </Text>
          <Grid flow="col" gap={16} align="center">
            <Skeleton loading={votingPower === undefined}>
              <Text type="h3" weight="bold" color="primary">
                {formatToken(votingPower)}
              </Text>
            </Skeleton>
            <Button type="light" onClick={() => setShowDetailedView(true)}>
              Detailed view
            </Button>

            {showDetailedView && <VotingDetailedModal onCancel={() => setShowDetailedView(false)} />}
          </Grid>
        </div>

        <UseLeftTime end={userLockedUntil ?? 0} delay={1_000} onEnd={handleLeftTimeEnd}>
          {leftTime => {
            const leftMultiplier = (multiplier - 1) * (leftTime / loadedUserLockedUntil) + 1;

            return leftMultiplier > 1 ? (
              <div>
                <Hint
                  text={
                    <>
                      <Text type="p2">
                        The multiplier mechanic allows users to lock ${projectToken.symbol} for a period up to 1 year
                        and get a bonus of up to 2x v{projectToken.symbol}. The bonus is linear, as per the following
                        example:
                      </Text>
                      <ul>
                        <li>
                          <Text type="p2">
                            lock 1000 ${projectToken.symbol} for 1 year → get back 2000 v{projectToken.symbol}
                          </Text>
                        </li>
                        <li>
                          <Text type="p2">
                            lock 1000 ${projectToken.symbol} for 6 months → get back 1500 v{projectToken.symbol}
                          </Text>
                        </li>
                      </ul>
                      <ExternalLink
                        href="https://docs.barnbridge.com/governance/barnbridge-dao/multiplier-and-voting-power"
                        variation="link">
                        Learn more
                      </ExternalLink>
                    </>
                  }
                  className="mb-4">
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
              </div>
            ) : undefined;
          }}
        </UseLeftTime>
      </div>

      {claimModalVisible && (
        <Modal visible onCancel={() => setClaimModalVisible(false)}>
          <div className="flex flow-row">
            <div className="flex flow-row mb-32">
              <Text type="h3" weight="semibold" color="primary" className="mb-8">
                Claim your reward
              </Text>
              <Text type="p2" weight="semibold" color="secondary">
                Select the reward contract you want to claim your reward from
              </Text>
            </div>
            <div className="flex flow-row row-gap-24">
              {[daoCtx.daoReward, daoCtx.daoReward2].map((reward, rewardIndex) =>
                reward ? (
                  <Spin key={reward.address} spinning={claimingReward === reward}>
                    <button
                      type="button"
                      className="button-ghost p-24"
                      style={{ width: '100%' }}
                      disabled={!!claimingReward || !reward?.toClaim?.gt(BigNumber.ZERO)}
                      onClick={() => handleRewardClaim(reward)}>
                      <div className="flex flow-col align-center justify-space-between full-width">
                        <Text type="p1" weight="semibold" color="primary">
                          Reward contract {rewardIndex + 1}
                        </Text>
                        <div className="flex flow-row align-end">
                          <Text type="lb2" weight="semibold" color="secondary" className="mb-8">
                            Reward
                          </Text>
                          <Text type="p1" weight="semibold" color="primary" className="mr-4">
                            {formatToken(reward?.toClaim, {
                              tokenName: projectToken.symbol,
                            })}
                          </Text>
                        </div>
                      </div>
                    </button>
                  </Spin>
                ) : null,
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VotingHeader;
