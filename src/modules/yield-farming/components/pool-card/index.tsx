import React from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { formatBONDValue, formatBigValue, formatUSDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Hint, Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';

import PoolStakeShareBar, { PoolTokenShare } from '../pool-stake-share-bar';

import { PoolTypes, getPoolIcons, getPoolNames } from '../../utils';

import s from './s.module.scss';

export type PoolCardProps = {
  pool: PoolTypes;
};

type State = {
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

const PoolCard: React.FC<PoolCardProps> = props => {
  const { pool } = props;

  const history = useHistory();
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<State>({});

  React.useEffect(() => {
    if (pool === PoolTypes.STABLE) {
      setState({
        enabled: true,
        isEnded: web3c.yf.isEnded,
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
      });
    } else if (pool === PoolTypes.UNILP) {
      setState({
        enabled: web3c.yfLP.currentEpoch! > 0,
        isEnded: web3c.yfLP.isEnded,
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
            color: 'var(--theme-red-color)',
            value: formatBigValue(web3c.yfLP.nextPoolSize, UNISWAPTokenMeta.decimals),
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
            color: 'var(--theme-red-color)',
            value: formatBigValue(web3c.yfLP.nextEpochStake, UNISWAPTokenMeta.decimals),
            share:
              web3c.staking.uniswap.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfLP.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    } else if (pool === PoolTypes.BOND) {
      setState({
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
            color: 'var(--theme-red-color)',
            value: formatBigValue(web3c.yfBOND.nextPoolSize, BONDTokenMeta.decimals),
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
            color: 'var(--theme-red-color)',
            value: formatBigValue(web3c.yfBOND.nextEpochStake, BONDTokenMeta.decimals),
            share:
              web3c.staking.bond.nextEpochUserBalance
                ?.multipliedBy(100)
                .div(web3c.yfBOND.nextEpochStake ?? 1)
                .toNumber() ?? 0,
          },
        ],
      });
    }
  }, [pool, web3c]);

  function handleStaking() {
    switch (pool) {
      case PoolTypes.STABLE:
        history.push('/yield-farming/stable');
        break;
      case PoolTypes.UNILP:
        history.push('/yield-farming/unilp');
        break;
      case PoolTypes.BOND:
        history.push('/yield-farming/bond');
        break;
      default:
    }
  }

  function handleDaoStaking() {
    history.push('/governance/wallet');
  }

  const CardTitle = (
    <div className={s.cardTitleContainer}>
      <IconsSet icons={getPoolIcons(pool)} />
      <div className={s.cardTitleTexts}>
        <Text type="p1" weight="semibold" color="primary" className={'truncate'} title={getPoolNames(pool).join('/')}>
          {getPoolNames(pool).join('/')}
        </Text>
        <Text
          type="lb2"
          weight="semibold"
          color="red"
          className={'truncate'}
          title={`EPOCH ${state.currentEpoch ?? '-'}/${state.totalEpochs ?? '-'}`}>
          EPOCH {state.currentEpoch ?? '-'}/{state.totalEpochs ?? '-'}
        </Text>
      </div>
      {wallet.isActive && (
        <button
          type="button"
          disabled={!state.enabled}
          onClick={handleStaking}
          className="button-primary">
          Staking
        </button>
      )}
    </div>
  );

  return (
    <Card title={CardTitle} noPaddingBody className={s.card}>
      {!state.isEnded && (
        <>
          <Grid flow="row" gap={4} padding={24}>
            <Text type="lb2" weight="semibold" color="secondary">
              Reward
            </Text>
            <Grid flow="col" gap={4}>
              <Text type="p1" weight="semibold" color="primary">
                {formatBONDValue(state.epochReward)}
              </Text>
              <Text type="p2" color="secondary">
                BOND
              </Text>
            </Grid>
          </Grid>
          {wallet.isActive && (
            <Grid flow="row" gap={4} padding={24}>
              <Text type="lb2" weight="semibold" color="secondary">
                My Potential Reward
              </Text>
              <Grid flow="col" gap={4}>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBONDValue(state.potentialReward)}
                </Text>
                <Text type="p2" color="secondary">
                  BOND
                </Text>
              </Grid>
            </Grid>
          )}
          <Grid flow="row" gap={4} padding={24}>
            <Hint
              text={
                <span>
                  This number shows the total staked balance of the pool, and the effective balance of the pool.
                  <br />
                  <br />
                  When staking tokens during an epoch that is currently running, your effective deposit amount will be
                  proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked
                  balance and effective staked balance will be the equal, therefore pool balance and effective pool
                  balance will differ in most cases.
                </span>
              }>
              <Text type="lb2" weight="semibold" color="secondary">
                Pool Balance
              </Text>
            </Hint>

            <Text type="p1" weight="semibold" color="primary">
              {formatUSDValue(state.balance)}
            </Text>
            <Text type="p2" color="secondary">
              {formatUSDValue(state.effectiveBalance)} effective balance
            </Text>
            <PoolStakeShareBar shares={state.shares} />
          </Grid>
        </>
      )}
      {wallet.isActive && (
        <Grid flow="row" gap={4} padding={24}>
          <Hint
            text={
              <span>
                This number shows your total staked balance in the pool, and your effective staked balance in the pool.
                <br />
                <br />
                When staking tokens during an epoch that is currently running, your effective deposit amount will be
                proportionally reduced by the time that has passed from that epoch. Once an epoch ends, your staked
                balance and effective staked balance will be the equal, therefore your pool balance and your effective
                pool balance will differ in most cases.
              </span>
            }>
            <Text type="lb2" weight="semibold" color="secondary">
              My Pool Balance
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSDValue(state.myBalance)}
          </Text>
          {!state.isEnded && (
            <>
              <Text type="p2" color="secondary">
                {formatUSDValue(state.myEffectiveBalance)} effective balance
              </Text>
              <PoolStakeShareBar shares={state.myShares} />
            </>
          )}
        </Grid>
      )}
      {state.isEnded && (
        <div className={s.box}>
          <Grid flow="row" align="start">
            <Text type="p2" weight="semibold" color="secondary">
              The $BOND staking pool ended after 12 epochs on Feb 08, 00:00 UTC. Deposits are now disabled, but you can
              still withdraw your tokens and collect any unclaimed rewards. To continue to stake $BOND
            </Text>
            <Button type="link" onClick={handleDaoStaking}>
              Go to governance staking
            </Button>
          </Grid>
        </div>
      )}
    </Card>
  );
};

export default PoolCard;
