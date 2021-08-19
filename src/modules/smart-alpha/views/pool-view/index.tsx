import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { formatPercent, formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useFetchPool } from 'modules/smart-alpha/api';
import ChainlinkOracleContract from 'modules/smart-alpha/contracts/chainlinkOracleContract';
import SeniorRateModelContract from 'modules/smart-alpha/contracts/SeniorRateModelContract';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

import { TransactionsTable } from '../../components/transactions';
import { PoolPerformance } from './pool-performance';
import { TokensPrice } from './tokens-price';

import s from './s.module.scss';

const PoolView = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const location = useLocation();
  const { data } = useFetchPool(poolAddress);
  const { getToken } = useTokens();
  const wallet = useWallet();

  const pool = data?.[0];

  const { getOrCreateContract } = useContractFactory();

  const smartAlphaContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(
      pool.poolAddress,
      () => {
        return new SmartAlphaContract(pool.poolAddress);
      },
      {
        afterInit: async contract => {
          await contract.loadCommon();
          console.log('SA', contract, pool);
        },
      },
    );
  }, [pool]);

  const chainlinkOracleContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(
      pool.oracleAddress,
      () => {
        return new ChainlinkOracleContract(pool.oracleAddress);
      },
      {
        afterInit: async contract => {
          await contract.loadCommon();
        },
      },
    );
  }, [pool]);

  const seniorRateModelContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(pool.seniorRateModelAddress, () => {
      return new SeniorRateModelContract(pool.seniorRateModelAddress);
    });
  }, [pool]);

  const [nextEpochDownsideProtectionRate, setNextEpochDownsideProtectionRate] = useState<BigNumber | undefined>();
  const [nextEpochUpsideExposureRate, setNextEpochUpsideExposureRate] = useState<BigNumber | undefined>();

  useEffect(() => {
    (async () => {
      if (
        !seniorRateModelContract ||
        !smartAlphaContract?.nextEpochSeniorLiquidity ||
        !smartAlphaContract?.nextEpochSeniorLiquidity
      ) {
        return;
      }
      const [exposure, protection] = await seniorRateModelContract.getRates(
        smartAlphaContract.nextEpochSeniorLiquidity,
        smartAlphaContract.nextEpochSeniorLiquidity,
      );

      setNextEpochUpsideExposureRate(BigNumber.from(exposure));
      setNextEpochDownsideProtectionRate(BigNumber.from(protection));
    })();
  }, [
    seniorRateModelContract,
    smartAlphaContract?.nextEpochSeniorLiquidity?.toNumber(),
    smartAlphaContract?.nextEpochSeniorLiquidity?.toNumber(),
  ]);

  if (!pool) {
    return <Spinner style={{ margin: 'auto' }} />;
  }

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);

  return (
    <>
      <div className="mb-16">
        <Link to="/smart-alpha" variation="text-alt" icon="arrow" iconPosition="left" iconRotate={180}>
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-40">
        <div className="flex align-center">
          <TokenIcon
            name={poolToken?.icon ?? 'unknown'}
            size={40}
            bubble2Name={oracleToken?.icon ?? 'unknown'}
            className="mr-16"
          />
          <div>
            <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
              {pool.poolName}
            </Text>
            <Text type="small" weight="semibold" color="red">
              Epoch {smartAlphaContract?.epoch ?? pool.state.epoch ?? '-'}
            </Text>
          </div>
        </div>
        <div className="flex col-gap-24 ml-auto">
          <Link to={`${location.pathname}/simulate`} variation="ghost" aria-disabled={!wallet.account}>
            Simulate
          </Link>
          <Link to={`${location.pathname}/deposit`} variation="primary" aria-disabled={!wallet.account}>
            Deposit
          </Link>
        </div>
      </div>
      <div className={classNames(s.cards, 'mb-12')}>
        <section className={classNames(s.epochCard, s.epochCardPrimary)}>
          <div className={s.epochCardTitleWrap}>
            <Text type="lb2" weight="bold" tag="h3" color="red" className={s.epochCardTitle}>
              EPOCH {smartAlphaContract?.epoch ?? '-'} - IN PROGRESS
            </Text>
          </div>
          <header className={classNames(s.epochCardHeader, 'mb-24')}>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                {formatPercent(smartAlphaContract?.epochUpsideExposureRate?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Upside exposure rate
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                {formatPercent(smartAlphaContract?.epochDownsideProtectionRate?.unscaleBy(pool.poolToken.decimals)) ??
                  '-'}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Downside protection rate
              </Text>
            </div>
          </header>
          <dl>
            <div className={s.epochCardDlRow}>
              <dt>
                <Text type="small" weight="semibold" color="secondary">
                  wETH epoch entry price
                </Text>
              </dt>
              <dd>
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(smartAlphaContract?.epochEntryPrice?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    compact: true,
                  })}>
                  {formatUSD(smartAlphaContract?.epochEntryPrice?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Senior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(
                    smartAlphaContract?.epochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                      BigNumber.from(pool.state.seniorLiquidity),
                    {
                      decimals: pool.poolToken.decimals,
                      compact: true,
                    },
                  )}>
                  {formatUSD(
                    smartAlphaContract?.epochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                      BigNumber.from(pool.state.seniorLiquidity),
                  ) ?? '-'}
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Junior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(
                    smartAlphaContract?.epochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                      BigNumber.from(pool.state.juniorLiquidity),
                    {
                      decimals: pool.poolToken.decimals,
                      compact: true,
                    },
                  )}>
                  {formatUSD(smartAlphaContract?.epochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              </dd>
            </div>
          </dl>
          <div
            className={classNames(s.progress, 'mb-8')}
            style={
              {
                '--pool-epoch-tranche-percentage': (smartAlphaContract?.epochSeniorLiquidityRate ?? 0) * 100,
              } as React.CSSProperties
            }
          />
          <div className="flex align-center">
            <Text type="small" weight="semibold" color="green">
              {formatPercent(smartAlphaContract?.epochSeniorLiquidityRate) ?? '-'}
            </Text>
            <Text type="small" weight="semibold" color="purple" className="ml-auto">
              {formatPercent(smartAlphaContract?.epochJuniorLiquidityRate) ?? '-'}
            </Text>
          </div>
          <div className="flex justify-center mt-8">
            <Button variation="text" color="red">
              View queue state
            </Button>
          </div>
        </section>
        <section className={classNames(s.epochCard, s.epochCardSecondary)}>
          <div className={s.epochCardTitleWrap}>
            <Text type="lb2" weight="bold" tag="h3" color="secondary" className={s.epochCardTitle}>
              EPOCH {smartAlphaContract?.epoch ? smartAlphaContract.epoch + 1 : '-'} - ESTIMATES
            </Text>
          </div>
          <header className={classNames(s.epochCardHeader, 'mb-24')}>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                {formatPercent(nextEpochUpsideExposureRate?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Upside exposure rate
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                {formatPercent(nextEpochDownsideProtectionRate?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Downside protection rate
              </Text>
            </div>
          </header>
          <dl>
            <div className={s.epochCardDlRow}>
              <dt>
                <Text type="small" weight="semibold" color="secondary">
                  wETH epoch entry price
                </Text>
              </dt>
              <dd>
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(chainlinkOracleContract?.price?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    compact: true,
                  })}>
                  {formatUSD(chainlinkOracleContract?.price?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Senior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(smartAlphaContract?.nextEpochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    compact: true,
                  })}>
                  {formatUSD(smartAlphaContract?.nextEpochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Junior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text
                  type="p1"
                  weight="semibold"
                  color="primary"
                  tooltip={formatUSD(smartAlphaContract?.nextEpochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    compact: true,
                  })}>
                  {formatUSD(smartAlphaContract?.nextEpochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              </dd>
            </div>
          </dl>
          <div
            className={classNames(s.progress, 'mb-8')}
            style={
              {
                '--pool-epoch-tranche-percentage': (smartAlphaContract?.nextEpochSeniorLiquidityRate ?? 0) * 100,
              } as React.CSSProperties
            }
          />
          <div className="flex align-center">
            <Text type="small" weight="semibold" color="green">
              {formatPercent(smartAlphaContract?.nextEpochSeniorLiquidityRate) ?? '-'}
            </Text>
            <Text type="small" weight="semibold" color="purple" className="ml-auto">
              {formatPercent(smartAlphaContract?.nextEpochJuniorLiquidityRate) ?? '-'}
            </Text>
          </div>
        </section>
      </div>
      <TokensPrice poolAddress={poolAddress} className="mb-32" />
      <PoolPerformance poolAddress={poolAddress} className="mb-32" />
      <TransactionsTable poolAddress={poolAddress} />
    </>
  );
};

export default PoolView;
