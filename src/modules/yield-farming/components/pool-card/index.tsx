import React from 'react';
import { useHistory } from 'react-router';
import BigNumber from 'bignumber.js';

import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Label, Paragraph } from 'components/custom/typography';
import PoolStakeShareBar, { PoolTokenShare } from '../pool-stake-share-bar';

import {
  formatBigValue,
  formatBONDValue,
  formatUSDValue,
  getPoolIcons,
  getPoolNames,
  PoolTypes,
} from 'web3/utils';
import { useWallet } from 'wallets/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';

import s from './styles.module.scss';

export type PoolCardProps = {
  stableToken?: boolean;
  unilpToken?: boolean;
  bondToken?: boolean;
};

type PoolCardState = {
  type?: PoolTypes;
  enabled?: boolean;
  isEnded?: boolean;
  currentEpoch?: number;
  totalEpochs?: number;
  epochReward?: BigNumber;
  potentialReward?: BigNumber;
  balance?: BigNumber;
  myBalance?: BigNumber;
  effectiveBalance?: BigNumber;
  myEffectiveBalance?: BigNumber;
  shares?: PoolTokenShare[];
  myShares?: PoolTokenShare[];
};

const PoolCard: React.FunctionComponent<PoolCardProps> = props => {
  const history = useHistory();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const { stableToken = false, unilpToken = false, bondToken = false } = props;

  const [state, setState] = React.useState<PoolCardState>({});

  React.useEffect(() => {
    if (stableToken) {
      setState(prevState => ({
        ...prevState,
        type: PoolTypes.STABLE,
        enabled: true,
        isEnded: web3c.yfBOND.isEnded,
        currentEpoch: web3c.yf.currentEpoch,
        totalEpochs: web3c.yf.totalEpochs,
        epochReward: web3c.yf.epochReward,
        potentialReward: web3c.yf.potentialReward,
        balance: web3c.aggregated.yfStakedValue,
        myBalance: web3c.yf.nextEpochStake,
        effectiveBalance: web3c.aggregated.yfEffectiveStakedValue,
        myEffectiveBalance: web3c.yf.epochStake,
        shares: [
          {
            icon: USDCTokenMeta.icon,
            name: USDCTokenMeta.name,
            color: '#4f6ae6',
            value: formatUSDValue(web3c.staking.usdc.nextEpochPoolSize),
            share: web3c.staking.usdc.nextEpochPoolSize
              ?.multipliedBy(100)
              .div(web3c.yf.nextPoolSize ?? 1)
              .toNumber(),
          },
          {
            icon: DAITokenMeta.icon,
            name: DAITokenMeta.name,
            color: '#ffd160',
            value: formatUSDValue(web3c.staking.dai.nextEpochPoolSize),
            share: web3c.staking.dai.nextEpochPoolSize
              ?.multipliedBy(100)
              .div(web3c.yf.nextPoolSize ?? 1)
              .toNumber(),
          },
          {
            icon: SUSDTokenMeta.icon,
            name: SUSDTokenMeta.name,
            color: '#1e1a31',
            value: formatUSDValue(web3c.staking.susd.nextEpochPoolSize),
            share: web3c.staking.susd.nextEpochPoolSize
              ?.multipliedBy(100)
              .div(web3c.yf.nextPoolSize ?? 1)
              .toNumber(),
          },
        ],
        myShares: [
          {
            icon: USDCTokenMeta.icon,
            name: USDCTokenMeta.name,
            color: '#4f6ae6',
            value: formatUSDValue(web3c.staking.usdc.nextEpochUserBalance),
            share: web3c.staking.usdc.nextEpochUserBalance
              ?.multipliedBy(100)
              .div(web3c.yf.nextEpochStake ?? 1)
              .toNumber(),
          },
          {
            icon: DAITokenMeta.icon,
            name: DAITokenMeta.name,
            color: '#ffd160',
            value: formatUSDValue(web3c.staking.dai.nextEpochUserBalance),
            share: web3c.staking.dai.nextEpochUserBalance
              ?.multipliedBy(100)
              .div(web3c.yf.nextEpochStake ?? 1)
              .toNumber(),
          },
          {
            icon: SUSDTokenMeta.icon,
            name: SUSDTokenMeta.name,
            color: '#1e1a31',
            value: formatUSDValue(web3c.staking.susd.nextEpochUserBalance),
            share: web3c.staking.susd.nextEpochUserBalance
              ?.multipliedBy(100)
              .div(web3c.yf.nextEpochStake ?? 1)
              .toNumber(),
          },
        ],
      }));
    } else if (unilpToken) {
      setState(prevState => ({
        ...prevState,
        type: PoolTypes.UNILP,
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfBOND.isEnded,
        currentEpoch: web3c.yfLP.currentEpoch,
        totalEpochs: web3c.yfLP.totalEpochs,
        epochReward: web3c.yfLP.epochReward,
        potentialReward: web3c.yfLP.potentialReward,
        balance: web3c.aggregated.yfLPStakedValue,
        myBalance: web3c.aggregated.myLPStakedValue,
        effectiveBalance: web3c.aggregated.yfLPEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myLPEffectiveStakedValue,
        shares: [
          {
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            color: 'var(--text-color-3)',
            value: formatBigValue(
              web3c.yfLP.nextPoolSize,
              UNISWAPTokenMeta.decimals,
            ),
            share:
              web3c.staking.uniswap.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: UNISWAPTokenMeta.icon,
            name: UNISWAPTokenMeta.name,
            color: 'var(--text-color-3)',
            value: formatBigValue(
              web3c.yfLP.nextEpochStake,
              UNISWAPTokenMeta.decimals,
            ),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      }));
    } else if (bondToken) {
      setState(prevState => ({
        ...prevState,
        type: PoolTypes.BOND,
        enabled: true,
        isEnded: web3c.yfBOND.isEnded,
        currentEpoch: web3c.yfBOND.currentEpoch,
        totalEpochs: web3c.yfBOND.totalEpochs,
        epochReward: web3c.yfBOND.epochReward,
        potentialReward: web3c.yfBOND.potentialReward,
        balance: web3c.aggregated.yfBONDStakedValue,
        myBalance: web3c.aggregated.myBONDStakedValue,
        effectiveBalance: web3c.aggregated.yfBONDEffectiveStakedValue,
        myEffectiveBalance: web3c.aggregated.myBondEffectiveStakedValue,
        shares: [
          {
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            color: 'var(--text-color-3)',
            value: formatBigValue(
              web3c.yfBOND.nextPoolSize,
              BONDTokenMeta.decimals,
            ),
            share:
              web3c.staking.bond.nextEpochPoolSize
                ?.multipliedBy(100)
                .div(web3c.yfBOND.nextPoolSize ?? 1)
                .toNumber() ?? 0,
          },
        ],
        myShares: [
          {
            icon: BONDTokenMeta.icon,
            name: BONDTokenMeta.name,
            color: 'var(--text-color-3)',
            value: formatBigValue(
              web3c.yfBOND.nextEpochStake,
              BONDTokenMeta.decimals,
            ),
            share:
              web3c.staking.bond.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfBOND.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      }));
    }
  }, [stableToken, unilpToken, bondToken, web3c]);

  function handleStaking() {
    if (stableToken) {
      history.push('/yield-farming/stable');
    } else if (unilpToken) {
      history.push('/yield-farming/unilp');
    } else if (bondToken) {
      history.push('/yield-farming/bond');
    }
  }

  function handleDaoStaking() {
    history.push('/governance/wallet');
  }

  return (
    <div className={s.component}>
      {state.type && (
        <div className={s.header}>
          <IconsSet className={s.iconSet} icons={getPoolIcons(state.type)} />
          <div className={s.infoWrap}>
            <Paragraph type="p1" semiBold className={s.nameLabel}>
              {getPoolNames(state.type).join('/')}
            </Paragraph>
            <Label type="lb2" semiBold className={s.epochLabel}>
              EPOCH {state.currentEpoch ?? '-'}/{state.totalEpochs ?? '-'}
            </Label>
          </div>
          {wallet.isActive && (
            <Button
              type="primary"
              className={s.stakingBtn}
              disabled={!state.enabled}
              onClick={handleStaking}>
              Staking
            </Button>
          )}
        </div>
      )}

      <div className={s.body}>
        {!state.isEnded && (
          <>
            <div className={s.row}>
              <Label type="lb2" semiBold className={s.label}>
                Reward
              </Label>
              <Paragraph type="p1" semiBold className={s.value}>
                {formatBONDValue(state.epochReward)} BOND
              </Paragraph>
            </div>
            {wallet.isActive && (
              <div className={s.row}>
                <Label type="lb2" semiBold className={s.label}>
                  My Potential Reward
                </Label>
                <Paragraph type="p1" semiBold className={s.value}>
                  {formatBONDValue(state.potentialReward)} BOND
                </Paragraph>
              </div>
            )}

            <div className={s.row}>
              <div className={s.labelWrap}>
                <Label type="lb2" semiBold className={s.label}>
                  Pool Balance
                </Label>
                <Tooltip
                  type="info"
                  title={
                    <span>
                  This number shows the total staked balance of the pool, and
                  the effective balance of the pool.
                  <br />
                  <br />
                  When staking tokens during an epoch that is currently running,
                  your effective deposit amount will be proportionally reduced
                  by the time that has passed from that epoch. Once an epoch
                  ends, your staked balance and effective staked balance will be
                  the equal, therefore pool balance and effective pool balance
                  will differ in most cases.
                </span>
                  }
                />
              </div>
              <Paragraph type="p1" semiBold className={s.value}>
                {formatUSDValue(state.balance)}
              </Paragraph>
              <Paragraph type="p2" className={s.hint}>
                {formatUSDValue(state.effectiveBalance)} effective balance
              </Paragraph>
              <PoolStakeShareBar shares={state.shares} />
            </div>
          </>
        )}
        {wallet.isActive && (
          <div className={s.row}>
            <div className={s.labelWrap}>
              <Label type="lb2" semiBold className={s.label}>
                My Pool Balance
              </Label>
              <Tooltip
                type="info"
                title={
                  <span>
                    This number shows your total staked balance in the pool, and
                    your effective staked balance in the pool.
                    <br />
                    <br />
                    When staking tokens during an epoch that is currently
                    running, your effective deposit amount will be
                    proportionally reduced by the time that has passed from that
                    epoch. Once an epoch ends, your staked balance and effective
                    staked balance will be the equal, therefore your pool
                    balance and your effective pool balance will differ in most
                    cases.
                  </span>
                }
              />
            </div>
            <Paragraph type="p1" semiBold className={s.value}>
              {formatUSDValue(state.myBalance)}
            </Paragraph>
            <Paragraph type="p2" className={s.hint}>
              {formatUSDValue(state.myEffectiveBalance)} effective balance
            </Paragraph>

            {!state.isEnded && (
              <PoolStakeShareBar shares={state.myShares} />
            )}

            {state.isEnded && (
              <div className={s.box}>
                <Grid flow="row" align="start">
                  <Paragraph type="p2" semiBold color="grey500">
                    The $BOND staking pool ended after 12 epochs on Feb 08, 00:00 UTC. Deposits are now disabled, but
                    you
                    can
                    still withdraw your tokens and collect any unclaimed rewards. To continue to stake $BOND
                  </Paragraph>
                  <Button type="link" onClick={handleDaoStaking}>Go to governance staking</Button>
                </Grid>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolCard;
