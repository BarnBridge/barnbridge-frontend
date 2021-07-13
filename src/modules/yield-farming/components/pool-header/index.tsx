import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';

import { useYfPool } from '../../providers/pool-provider';
import { useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolHeader: FC = () => {
  const { projectToken, convertTokenInUSD } = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYfPool();

  const { poolMeta, poolBalance, effectivePoolBalance, apy } = yfPoolCtx;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!poolMeta) {
    return null;
  }

  const isEnded = poolMeta.contract.isPoolEnded === true;

  return (
    <>
      <Link to="/yield-farming" className="flex inline align-center mb-16">
        <Icon name="arrow-back" width={14} height={14} className="mr-8" />
        <Text type="p1" weight="semibold" color="secondary">
          Pools
        </Text>
      </Link>
      <div className="flex align-center mb-40">
        <IconsSet
          icons={poolMeta.tokens.map(token => (
            <Icon key={token.symbol} name={token.icon!} />
          ))}
          className="mr-16"
        />
        <div>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {poolMeta.label}
          </Text>
          <Text type="small" weight="semibold" color="red">
            Epoch {poolMeta.contract.lastActiveEpoch} / {poolMeta.contract.totalEpochs}
          </Text>
        </div>
      </div>
      <div className="card p-24 flexbox-grid mb-24">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Pool balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSD(poolBalance) ?? '-'}
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Effective pool balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSD(effectivePoolBalance) ?? '-'}
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            APR
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {!isEnded ? formatPercent(apy) ?? '-' : 0}
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Weekly rewards
          </Text>
          <div className="flex align-center">
            <Icon name={projectToken.icon!} width={16} height={16} className="mr-8" />
            <Text type="p1" weight="semibold" color="primary">
              {!isEnded ? formatNumber(poolMeta.contract.epochReward) ?? '-' : 0}
            </Text>
          </div>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Pool distribution
          </Text>
          <div className={s.stakedBar}>
            {poolMeta.tokens.map((token, index) => {
              const stakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(token.address);
              const rate =
                convertTokenInUSD(stakedToken?.nextEpochPoolSize, token.symbol)
                  ?.unscaleBy(token.decimals)
                  ?.dividedBy(poolBalance ?? 0)
                  .multipliedBy(100) ?? 0;

              return (
                <Tooltip
                  key={token.symbol}
                  title={formatToken(stakedToken?.nextEpochPoolSize?.unscaleBy(token.decimals), {
                    tokenName: token.symbol,
                    decimals: token.decimals,
                  })}>
                  <div
                    style={{
                      background: token.color || 'var(--theme-red-color)',
                      width: `${rate}%`,
                    }}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolHeader;
