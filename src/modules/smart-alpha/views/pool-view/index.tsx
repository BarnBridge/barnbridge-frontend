import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
import { Badge } from 'components/custom/badge';
import { Spinner } from 'components/custom/spinner';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { Modal } from 'components/modal';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useFetchPool } from 'modules/smart-alpha/api';
import ChainlinkOracleContract from 'modules/smart-alpha/contracts/chainlinkOracleContract';
import SeniorRateModelContract from 'modules/smart-alpha/contracts/seniorRateModelContract';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

import { TransactionsTable } from '../../components/transactions';
import { PoolPerformance } from './pool-performance';
import { PreviousEpochs } from './previous-epochs';
import { TokensPrice } from './tokens-price';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const PoolView = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const location = useLocation();
  const { data: pool } = useFetchPool(poolAddress);
  const { getToken } = useTokens();
  const wallet = useWallet();
  const [previousEpochVisible, setPreviousEpochVisible] = useState<boolean>(false);

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
    <div className="container-limit">
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
          <Link to={`${location.pathname}/simulate-epoch`} variation="ghost">
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
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  TBD
                </Text>
                <Badge color="purple" size="small">
                  Junior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Upside leverage
                <InfoTooltip>Junior positions will have their upside amplified by this much</InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  TBD
                </Text>
                <Badge color="purple" size="small">
                  Junior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Downside leverage
                <InfoTooltip>Junior positions will have their downsides amplified by this much</InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  {formatPercent(smartAlphaContract?.epochUpsideExposureRate?.unscaleBy(pool.poolToken.decimals)) ??
                    '-'}
                </Text>
                <Badge color="green" size="small">
                  Senior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Upside exposure rate
                <InfoTooltip>
                  How much of every 1% move to the upside in the underlying asset a senior position will have exposure
                  to.
                </InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  {formatPercent(smartAlphaContract?.epochDownsideProtectionRate?.unscaleBy(pool.poolToken.decimals)) ??
                    '-'}
                </Text>
                <Badge color="green" size="small">
                  Senior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Downside protection rate
                <InfoTooltip>
                  How much the underlying asset can decline before a senior position takes on losses.
                </InfoTooltip>
              </Text>
            </div>
          </header>
          <div className="ph-24 pb-16">
            <dl>
              <div className={s.epochCardDlRow}>
                <dt>
                  <Text type="small" weight="semibold" color="secondary">
                    {pool.poolToken.symbol} epoch entry price
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
                  <Text
                    type="p1"
                    weight="semibold"
                    color="primary"
                    tooltip={formatToken(
                      smartAlphaContract?.epochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                        BigNumber.from(pool.state.seniorLiquidity),
                    )}
                    className="mr-8">
                    {formatToken(
                      smartAlphaContract?.epochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                        BigNumber.from(pool.state.seniorLiquidity),
                      {
                        decimals: pool.poolToken.decimals,
                        compact: true,
                      },
                    ) ?? '-'}
                  </Text>
                  <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
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
                  <Text
                    type="p1"
                    weight="semibold"
                    color="primary"
                    tooltip={formatToken(
                      smartAlphaContract?.epochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals) ??
                        BigNumber.from(pool.state.juniorLiquidity),
                    )}
                    className="mr-8">
                    {formatToken(smartAlphaContract?.epochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals), {
                      decimals: pool.poolToken.decimals,
                      compact: true,
                    }) ?? '-'}
                  </Text>
                  <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
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
          </div>
        </section>
        <section className={classNames(s.epochCard, s.epochCardSecondary)}>
          <div className={s.epochCardTitleWrap}>
            <Text type="lb2" weight="bold" tag="h3" color="secondary" className={s.epochCardTitle}>
              EPOCH {smartAlphaContract?.currentEpoch ? smartAlphaContract.currentEpoch + 1 : '-'} - ESTIMATES
            </Text>
          </div>
          <header className={classNames(s.epochCardHeader, 'mb-24')}>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  TBD
                </Text>
                <Badge color="purple" size="small">
                  Junior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Upside leverage
                <InfoTooltip>Junior positions will have their upside amplified by this much</InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  TBD
                </Text>
                <Badge color="purple" size="small">
                  Junior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Downside leverage
                <InfoTooltip>Junior positions will have their downsides amplified by this much</InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  {formatPercent(nextEpochUpsideExposureRate?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
                <Badge color="green" size="small">
                  Senior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Upside exposure rate
                <InfoTooltip>
                  How much of every 1% move to the upside in the underlying asset a senior position will have exposure
                  to.
                </InfoTooltip>
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <div className="flex align-center col-gap-8">
                <Text type="h3" weight="bold" color="primary" className="mb-4">
                  {formatPercent(nextEpochDownsideProtectionRate?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
                <Badge color="green" size="small">
                  Senior
                </Badge>
              </div>
              <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                Downside protection rate
                <InfoTooltip>
                  How much the underlying asset can decline before a senior position takes on losses.
                </InfoTooltip>
              </Text>
            </div>
          </header>
          <div className="ph-24 pb-16">
            <dl>
              <div className={s.epochCardDlRow}>
                <dt>
                  <Text type="small" weight="semibold" color="secondary">
                    {pool.poolToken.symbol} epoch entry price
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
                  <Text
                    type="p1"
                    weight="semibold"
                    color="primary"
                    tooltip={formatToken(
                      smartAlphaContract?.nextEpochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals),
                    )}
                    className="mr-8">
                    {formatToken(smartAlphaContract?.nextEpochSeniorLiquidity?.unscaleBy(pool.poolToken.decimals), {
                      decimals: pool.poolToken.decimals,
                      compact: true,
                    }) ?? '-'}
                  </Text>
                  <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
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
                  <Text
                    type="p1"
                    weight="semibold"
                    color="primary"
                    tooltip={formatToken(
                      smartAlphaContract?.nextEpochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals),
                    )}
                    className="mr-8">
                    {formatToken(smartAlphaContract?.nextEpochJuniorLiquidity?.unscaleBy(pool.poolToken.decimals), {
                      decimals: pool.poolToken.decimals,
                      compact: true,
                    }) ?? '-'}
                  </Text>
                  <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
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
          </div>
        </section>
      </div>
      <div className={classNames(s.epochProgress, 'mb-4')}>
        <div className={s.epochProgressLineBefore} />
        <div className="flex align-center">
          <span className={s.epochProgressCurrent}>{smartAlphaContract?.epoch ?? '-'}</span>
          <div className={s.epochProgressLineMiddle} style={{ '--epoch-progress': 70 } as React.CSSProperties} />
          <span className={s.epochProgressNext}>
            {smartAlphaContract?.currentEpoch ? smartAlphaContract?.currentEpoch + 1 : '-'}
          </span>
        </div>
        <div className={s.epochProgressLineAfter} />
      </div>
      <div className="flex align-center mb-32">
        <Button variation="text" color="red" onClick={() => setPreviousEpochVisible(true)}>
          View previous epochs
        </Button>
        <UseLeftTime delay={1_000}>
          {() => (
            <Text type="p2" weight="bold" color="primary" className="ml-auto">
              {getFormattedDuration(smartAlphaContract?.tillNextEpoch)}
            </Text>
          )}
        </UseLeftTime>
        <Text type="p2" weight="semibold" color="secondary" className="ml-4">
          until next epoch
        </Text>
      </div>
      <TokensPrice poolAddress={poolAddress} tokenSymbol={pool.poolToken.symbol} className="mb-32" />
      <PoolPerformance poolAddress={poolAddress} className="mb-32" />
      <TransactionsTable poolAddress={poolAddress} />
      {previousEpochVisible && (
        <Modal
          heading={
            <div className="flex align-center">
              <TokenIcon
                name={poolToken?.icon ?? 'unknown'}
                size={40}
                bubble2Name={oracleToken?.icon ?? 'unknown'}
                className="mr-16"
              />
              <div>
                <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
                  Previous epochs
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {pool.poolName}
                </Text>
              </div>
            </div>
          }
          closeHandler={() => setPreviousEpochVisible(false)}
          fullscreen>
          <PreviousEpochs />
        </Modal>
      )}
    </div>
  );
};

export default PoolView;
