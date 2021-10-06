import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { AprLabel } from 'components/custom/label';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import Stake from 'modules/smart-yield/views/pool-view/stake';
import Statistics from 'modules/smart-yield/views/pool-view/statistics';
import Transactions from 'modules/smart-yield/views/pool-view/transactions';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

const PoolView: FC = () => {
  const walletCtx = useWallet();
  const rewardPoolCtx = useRewardPool();
  const { projectToken, bondToken, stkAaveToken } = useKnownTokens();

  const { market: poolMarket, uToken, pool } = rewardPoolCtx;
  const rewardTokens = pool ? Array.from(pool.rewardTokens.values()) : [];

  if (!pool) {
    return null;
  }

  const { rewardPool, smartYield, apr, apy } = pool;

  const hasZeroBondRewardLeft = rewardTokens.find(
    rewardToken => !!(rewardToken === bondToken && rewardPool.getRewardLeftFor(rewardToken.address)?.isZero()),
  );

  return (
    <div className="container-limit">
      <div className="mb-16">
        <Link to="/smart-yield/pools" className="button-text" style={{ display: 'inline-flex' }}>
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-32">
        <TokenIcon
          name={uToken?.icon as TokenIconNames}
          bubble1Name={projectToken.icon}
          bubble2Name={poolMarket?.icon.active as TokenIconNames}
          size={36}
          className="mr-16"
        />
        <Text type="p1" weight="semibold" color="primary">
          {smartYield.symbol}
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Pool balance</dt>
            <dd>
              <TokenIcon
                name={uToken?.icon as TokenIconNames}
                bubble1Name={projectToken.icon}
                bubble2Name={poolMarket?.icon.active as TokenIconNames}
                size={16}
                className="mr-8"
              />
              {formatToken(rewardPool.poolSize, {
                scale: smartYield.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.headerTermRow}>
            <dt>APR</dt>
            <dd>
              <AprLabel
                icons={pool.meta.poolType === 'MULTI' ? [bondToken.icon!, stkAaveToken.icon!] : ['bond']}
                size="large">
                {formatPercent((apy ?? BigNumber.ZERO).plus(hasZeroBondRewardLeft ? 0 : apr ?? 0))}
              </AprLabel>
            </dd>
          </div>
          {rewardTokens.map(rewardToken => (
            <React.Fragment key={rewardToken.address}>
              {rewardToken.symbol === KnownTokens.BOND ? (
                <div className={s.headerTermRow}>
                  <dt>{rewardToken.symbol} daily rewards</dt>
                  <dd>
                    <TokenIcon name={rewardToken.icon} className="mr-8" size="16" />
                    {rewardPool.getRewardLeftFor(rewardToken.address)?.isZero()
                      ? '0'
                      : formatToken(rewardPool.getDailyRewardFor(rewardToken.address), {
                          scale: rewardToken.decimals,
                        }) ?? '-'}
                  </dd>
                </div>
              ) : null}
              {rewardToken.symbol === KnownTokens.BOND ? (
                <div className={s.headerTermRow}>
                  <dt>{rewardToken.symbol} rewards left</dt>
                  <dd>
                    <TokenIcon name={rewardToken.icon} className="mr-8" size="16" />
                    {formatToken(rewardPool.getRewardLeftFor(rewardToken.address), {
                      scale: rewardToken.decimals,
                    }) ?? '-'}
                  </dd>
                </div>
              ) : (
                <div className={s.headerTermRow}>
                  <dt>{rewardToken.symbol} rewards balance</dt>
                  <dd>
                    <TokenIcon name={rewardToken.icon} className="mr-8" size="16" />
                    {formatToken((rewardToken.contract as Erc20Contract).getBalanceOf(pool?.meta.poolAddress), {
                      scale: rewardToken.decimals,
                    }) ?? '-'}
                  </dd>
                </div>
              )}
            </React.Fragment>
          ))}
        </dl>
      </div>
      {walletCtx.isActive && (
        <div className={s.stakeStatisticsContainer}>
          <Stake className={s.stake} />
          <Statistics className={s.statistics} />
        </div>
      )}
      <Transactions />
    </div>
  );
};

export default PoolView;
