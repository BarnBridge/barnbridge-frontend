import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import StatusTag from 'components/custom/status-tag';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { YfPoolContract } from 'modules/yield-farming/contracts/yfPool';
import { useWallet } from 'wallets/walletProvider';

import { YFPoolID, useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

type Props = {
  poolId: YFPoolID;
};

const PoolCard: FC<Props> = props => {
  const { poolId } = props;

  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();
  const { convertTokenInUSD, projectToken } = useKnownTokens();

  const poolMeta = yfPoolsCtx.getYFKnownPoolByName(poolId);
  const isEnded = poolMeta?.contract.isPoolEnded === true;

  const [activeTab, setActiveTab] = useState('pool');
  const [claiming, setClaiming] = useState(false);
  const [confirmClaimVisible, setConfirmClaimVisible] = useState(false);

  const { totalEpochs, lastActiveEpoch, epochReward, potentialReward, poolEndDate = 0, toClaim } =
    poolMeta?.contract ?? {};

  const formattedEndDate = format(
    addMinutes(fromUnixTime(poolEndDate), fromUnixTime(poolEndDate).getTimezoneOffset()),
    'MMM dd yyyy, HH:mm',
  );

  const poolBalanceInUSD = yfPoolsCtx.getPoolBalanceInUSD(poolId);
  const poolEffectiveBalanceInUSD = yfPoolsCtx.getPoolEffectiveBalanceInUSD(poolId);
  const myPoolBalanceInUSD = yfPoolsCtx.getMyPoolBalanceInUSD(poolId);
  const myPoolEffectiveBalanceInUSD = yfPoolsCtx.getMyPoolEffectiveBalanceInUSD(poolId);

  const apy =
    poolBalanceInUSD?.isGreaterThan(BigNumber.ZERO) && epochReward
      ? convertTokenInUSD(epochReward * 52, KnownTokens.BOND)?.dividedBy(poolBalanceInUSD)
      : undefined;

  function handleClaim() {
    setConfirmClaimVisible(true);
  }

  const confirmClaim = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaimVisible(false);
    setClaiming(true);

    try {
      await poolMeta?.contract.claim(args.gasPrice);
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
      (poolMeta?.contract as YfPoolContract).loadUserData().catch(Error);
    } catch {}

    setClaiming(false);
  };

  return (
    <div className="card flex flow-row">
      <div className="flex align-center justify-space-between p-24">
        <div className="flex align-center">
          <IconsSet
            icons={poolMeta?.tokens.map(token => <Icon key={token.symbol} name={token.icon!} />) ?? []}
            className="mr-16"
          />
          <div>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              {poolMeta?.label ?? '-'}
            </Text>
            <Text type="small" weight="semibold" color="red">
              Epoch {lastActiveEpoch ?? '-'} / {totalEpochs ?? '-'}
            </Text>
          </div>
        </div>
        {isEnded && (
          <StatusTag
            text={
              <Text type="lb2" weight="bold" color="secondary">
                ENDED
              </Text>
            }
            color="green"
            style={{ backgroundColor: 'rgba(113, 121, 128, 0.08)' }}
          />
        )}
      </div>
      <div className="flex flow-row flex-grow ph-24 pb-24">
        <ElasticTabs
          tabs={[
            { id: 'pool', children: 'Pool statistics' },
            { id: 'my', children: 'My statistics', disabled: !walletCtx.isActive },
          ]}
          activeKey={activeTab}
          onClick={setActiveTab}
          variation="elastic"
          className="mb-24"
          style={{
            width: '100%',
            height: 40,
          }}
        />

        {isEnded === false && activeTab === 'pool' && (
          <div className="flex flow-row">
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                APR
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatPercent(apy) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Weekly reward
              </Text>
              <div className="flex align-center">
                <Icon name={projectToken.icon!} width={16} height={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(epochReward) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(poolBalanceInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Hint text="When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore pool balance and effective pool balance will differ in most cases.">
                <Text type="small" weight="semibold" color="secondary">
                  Effective pool balance
                </Text>
              </Hint>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(poolEffectiveBalanceInUSD) ?? '-'}
              </Text>
            </div>
          </div>
        )}

        {isEnded === false && activeTab === 'my' && walletCtx.isActive && (
          <div className="flex flow-row">
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                APR
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatPercent(apy) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Hint text="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake.">
                <Text type="small" weight="semibold" color="secondary">
                  My potential reward
                </Text>
              </Hint>
              <div className="flex align-center">
                <Icon name={projectToken.icon!} width={16} height={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(potentialReward) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                My pool balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(myPoolBalanceInUSD) ?? '-'}
              </Text>
            </div>
            <div className="flex align-center justify-space-between mb-24">
              <Hint text="When staking tokens during an epoch that is currently running, your effective deposit amount will be proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will be the equal, therefore pool balance and effective pool balance will differ in most cases.">
                <Text type="small" weight="semibold" color="secondary">
                  My effective pool balance
                </Text>
              </Hint>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(myPoolEffectiveBalanceInUSD) ?? '-'}
              </Text>
            </div>
          </div>
        )}

        {isEnded && (
          <>
            {poolId === YFPoolID.STABLE && (
              <div className={cn(s.box, 'mb-24')}>
                <Grid flow="row" align="start">
                  <Text type="p2" weight="semibold" color="secondary">
                    The stablecoin staking pool ended after {totalEpochs} epochs on {formattedEndDate} UTC. Deposits are
                    now disabled but you can still withdraw your tokens and collect any unclaimed rewards.
                  </Text>
                  <Link to="/smart-yield" className="link-blue">
                    Go to SMART yield
                  </Link>
                </Grid>
              </div>
            )}
            {poolId === YFPoolID.UNILP && (
              <div className={cn(s.box, 'mb-24')}>
                <Grid flow="row" align="start">
                  <Text type="p2" weight="semibold" color="secondary">
                    The unilp staking pool ended after {totalEpochs} epochs on {formattedEndDate} UTC. Deposits are now
                    disabled but you can still withdraw your tokens and collect any unclaimed rewards.
                  </Text>
                </Grid>
              </div>
            )}
            {poolId === YFPoolID.BOND && (
              <div className={cn(s.box, 'mb-24')}>
                <Grid className="card-row" flow="row" align="start">
                  <Text type="p2" weight="semibold" color="secondary">
                    The $BOND staking pool ended after {totalEpochs} epochs on {formattedEndDate} UTC. Deposits are now
                    disabled, but you can still withdraw your tokens and collect any unclaimed rewards. To continue to
                    stake $BOND
                  </Text>
                  <Link to="/governance" className="link-blue">
                    Go to governance staking
                  </Link>
                </Grid>
              </div>
            )}
          </>
        )}

        <div className="flex flow-row justify-end mt-auto">
          {isEnded && (
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Your balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(myPoolBalanceInUSD) ?? '-'}
              </Text>
            </div>
          )}
          <div className="flex align-center justify-space-between col-gap-16">
            <Link to={`/yield-farming/${poolId}`} className="button-primary flex-grow">
              View pool
            </Link>
            {walletCtx.isActive && activeTab === 'my' && (
              <button
                type="button"
                className="button-ghost flex-grow"
                disabled={!toClaim?.gt(BigNumber.ZERO) || claiming}
                onClick={handleClaim}>
                {claiming && <Spin type="circle" />}
                Claim
              </button>
            )}
          </div>
        </div>

        {confirmClaimVisible && (
          <TxConfirmModal
            title="Confirm your claim"
            header={
              <div className="flex col-gap-8 align-center justify-center">
                <Text type="h2" weight="semibold" color="primary">
                  {formatToken(toClaim?.unscaleBy(projectToken.decimals)) ?? '-'}
                </Text>
                <Icon name={projectToken.icon!} width={32} height={32} />
              </div>
            }
            submitText="Claim"
            onCancel={() => setConfirmClaimVisible(false)}
            onConfirm={confirmClaim}
          />
        )}
      </div>
    </div>
  );
};

export default PoolCard;
