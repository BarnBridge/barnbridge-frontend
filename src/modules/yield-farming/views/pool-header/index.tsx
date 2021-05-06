import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/known-tokens-provider';
import { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useYFPools } from 'modules/yield-farming/providers/pools-provider';

import s from './s.module.scss';

const PoolHeader: FC = () => {
  const knownTokensCtx = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();

  const { poolMeta, poolBalance, effectivePoolBalance, apy } = yfPoolCtx;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!poolMeta) {
    return null;
  }

  return (
    <>
<<<<<<< Updated upstream
      <Link to="/yield-farming" className="flex inline align-center mb-16">
        <Icon name="arrow-back" width={14} height={14} className="mr-8" />
        <Text type="p1" weight="semibold" color="secondary">
=======
      <Link to="/yield-farming" className="button-text mb-16">
        <Icon name="arrow-back" width={14} height={14} className="mr-8" color="inherit" />
        <Text type="p1" weight="semibold">
>>>>>>> Stashed changes
          Pools
        </Text>
      </Link>
      <div className="flex align-center mb-40">
        <IconsSet
          icons={poolMeta.icons.map(icon => (
            <Icon key={icon} name={icon as IconNames} />
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
            APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatPercent(apy) ?? '-'}
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Weekly rewards
          </Text>
          <div className="flex align-center">
            <Icon name="bond-circle-token" width={16} height={16} className="mr-8" />
            <Text type="p1" weight="semibold" color="primary">
              {formatNumber(poolMeta.contract.epochReward) ?? '-'}
            </Text>
          </div>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Pool distribution
          </Text>
          <div className={s.stakedBar}>
            {poolMeta.tokens.map((token, index) => {
              const tokenMeta = knownTokensCtx.getTokenBySymbol(token);
              const stakedToken = yfPoolsCtx.stakingContract?.stakedTokensBySymbol.get(token);
              let rate =
                knownTokensCtx
                  .convertTokenInUSD(stakedToken?.nextEpochPoolSize, token)
                  ?.unscaleBy(tokenMeta?.decimals)
                  ?.dividedBy(poolBalance ?? 0)
                  .multipliedBy(100) ?? 0;

              return (
                <Tooltip
                  key={token}
                  title={formatToken(stakedToken?.nextEpochPoolSize?.unscaleBy(tokenMeta?.decimals), {
                    tokenName: token,
                  })}>
                  <div style={{ background: poolMeta.colors[index], width: `${rate}%` }} />
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
