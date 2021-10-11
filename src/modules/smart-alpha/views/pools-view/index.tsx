import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
import { InfoTooltip } from 'components/custom/tooltip';
// import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
// import { Icon } from 'components/icon';
import { TokenIcon } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { PoolApiType, useFetchSaPools } from 'modules/smart-alpha/api';

import { tillNextEpoch } from 'modules/smart-alpha/utils';
import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const PoolsView = () => {
  const { data } = useFetchSaPools();
  const { getToken } = useTokens();
  const [layout, setLayout] = useState<'cards' | 'list'>('cards');

  const epochTVL = useMemo(() => {
    return data?.reduce((sum, item) => {
      return sum.plus(item.tvl.epochJuniorTVL).plus(item.tvl.epochSeniorTVL);
    }, BigNumber.ZERO);
  }, [data]);

  const entryQueueTVLInUsd = useMemo(() => {
    return data?.reduce((sum, item) => {
      return sum.plus(item.tvl.juniorEntryQueueTVL).plus(item.tvl.seniorEntryQueueTVL);
    }, BigNumber.ZERO);
  }, [data]);

  const exitedTVLInUsd = useMemo(() => {
    return data?.reduce((sum, item) => {
      return sum.plus(item.tvl.juniorExitedTVL).plus(item.tvl.seniorExitedTVL);
    }, BigNumber.ZERO);
  }, [data]);

  return (
    <>
      <div className="flex flow-col wrap col-gap-32 row-gap-16 mb-32">
        <div className="card p-24" style={{ minWidth: '200px' }}>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Epoch TVL
          </Text>
          <Text type="h3" weight="bold" color="primary">
            {formatUSD(epochTVL) ?? '-'}
          </Text>
        </div>

        <div className="card p-24" style={{ minWidth: '200px' }}>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Entry Queue TVL
          </Text>
          <Text type="h3" weight="bold" color="primary">
            {formatUSD(entryQueueTVLInUsd) ?? '-'}
          </Text>
        </div>

        <div className="card p-24" style={{ minWidth: '200px' }}>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Exited TVL
          </Text>
          <Text type="h3" weight="bold" color="primary">
            {formatUSD(exitedTVLInUsd) ?? '-'}
          </Text>
        </div>
      </div>
      <div className="flex align-center mb-32">
        <Text type="h1" weight="bold">
          Pools
        </Text>
        <Button
          variation="ghost-alt"
          icon={layout === 'cards' ? 'list-view' : 'cards-view'}
          iconPosition="only"
          className="ml-auto"
          onClick={() => setLayout(prevLayout => (prevLayout === 'cards' ? 'list' : 'cards'))}
        />
        <Button variation="ghost-alt" icon="filter" iconPosition="left" className="ml-16">
          Filters
        </Button>
      </div>
      {layout === 'cards' ? (
        <div className={s.cards}>
          {data?.map(item => (
            <PoolCard key={item.poolAddress} item={item} />
          ))}
        </div>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>Asset/Epoch</th>
              <th>Epoch ends in</th>
              <th>Epoch senior liquidity</th>
              <th>
                Upside exposure rate{' '}
                <InfoTooltip>
                  Senior positions will only receive this much of every percentage point gain in the underlying asset
                </InfoTooltip>
              </th>
              <th>
                Downside protection rate{' '}
                <InfoTooltip>Senior positions will only start taking losses beyond this decline</InfoTooltip>
              </th>
              <th>Epoch junior liquidity</th>
              <th>
                Upside leverage{' '}
                <InfoTooltip>Junior positions will have their upside amplified by this much</InfoTooltip>
              </th>
              <th>
                Downside leverage{' '}
                <InfoTooltip>
                  How much of every 1% move to the downside in the underlying asset a junior position will have exposure
                  to.
                  <br />
                  <br />
                  The downside leverage is only applicable until senior downside protection is fully covered, and junior
                  losses are fully realized.
                </InfoTooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(function Render(item) {
              const poolToken = getToken(item.poolToken.symbol);
              const oracleToken = getAsset(item.oracleAssetSymbol);

              const seniorLiquidity = new BigNumber(item.state.seniorLiquidity);
              const juniorLiquidity = new BigNumber(item.state.juniorLiquidity);
              const exposure = new BigNumber(item.state.upsideExposureRate);
              const upsideLeverage = juniorLiquidity.gt(0)
                ? seniorLiquidity.div(juniorLiquidity).multipliedBy(new BigNumber(1).minus(exposure)).plus(1)
                : new BigNumber(1);
              const downsideLeverage = juniorLiquidity.gt(0)
                ? seniorLiquidity.div(juniorLiquidity).plus(1)
                : new BigNumber(1);

              return (
                <tr key={item.poolAddress}>
                  <td>
                    <div className="flex align-center">
                      <TokenIcon name={poolToken?.icon} size={40} bubble2Name={oracleToken?.icon} className="mr-16" />
                      <div>
                        <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
                          {item.poolName}
                        </Text>
                        <Text type="small" weight="semibold" color="red" tag="small">
                          Epoch {item.state.epoch}
                        </Text>
                      </div>
                    </div>
                  </td>
                  <td>
                    <UseLeftTime delay={1_000}>
                      {() => {
                        const tne = tillNextEpoch(item);

                        return (
                          <Text type="p1" weight="semibold">
                            {getFormattedDuration(tne)}
                          </Text>
                        );
                      }}
                    </UseLeftTime>
                  </td>
                  <td>
                    <div className="flex align-center">
                      <Text
                        type="p1"
                        weight="semibold"
                        tooltip={
                          <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                            <span>
                              {formatToken(item.state.seniorLiquidity, {
                                tokenName: item.poolToken.symbol,
                                decimals: item.poolToken.decimals,
                              })}
                            </span>
                            <span>
                              {formatUSD(
                                BigNumber.from(item.state.seniorLiquidity)?.multipliedBy(poolToken?.price ?? 0),
                              )}
                            </span>
                          </Text>
                        }>
                        {formatToken(item.state.seniorLiquidity, { compact: true })}
                      </Text>
                      <TokenIcon name={poolToken?.icon} className="ml-8" />
                    </div>
                  </td>
                  <td>
                    <Text type="p1" weight="semibold" color="green">
                      {formatPercent(Number(item.state.upsideExposureRate))}
                    </Text>
                  </td>
                  <td>
                    <Text type="p1" weight="semibold" color="green">
                      {formatPercent(Number(item.state.downsideProtectionRate))}
                    </Text>
                  </td>
                  <td>
                    <div className="flex align-center">
                      <Text
                        type="p1"
                        weight="semibold"
                        tooltip={
                          <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                            <span>
                              {formatToken(item.state.juniorLiquidity, {
                                tokenName: item.poolToken.symbol,
                                decimals: item.poolToken.decimals,
                              })}
                            </span>
                            <span>
                              {formatUSD(
                                BigNumber.from(item.state.juniorLiquidity)?.multipliedBy(poolToken?.price ?? 0),
                              )}
                            </span>
                          </Text>
                        }>
                        {formatToken(item.state.juniorLiquidity, { compact: true })}
                      </Text>
                      <TokenIcon name={poolToken?.icon} className="ml-8" />
                    </div>
                  </td>
                  <td>
                    {' '}
                    <Text type="p1" weight="semibold" color="purple">
                      {upsideLeverage ? `${formatNumber(upsideLeverage)}x` : `-`}
                    </Text>
                  </td>
                  <td>
                    <Text
                      type="p1"
                      weight="semibold"
                      color="purple"
                      tooltip="You have this amount of downside leverage, until the underlying token's price drops by more than the senior downside protection - after which there is no more downside leverage - or you can consider it as being 1x">
                      {downsideLeverage ? `≤${formatNumber(downsideLeverage)}x` : `-`}
                    </Text>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
export default PoolsView;

const PoolCard = ({ item }: { item: PoolApiType }) => {
  const location = useLocation();
  const { getToken } = useTokens();

  const poolToken = getToken(item.poolToken.symbol);
  const oracleToken = getAsset(item.oracleAssetSymbol);

  const seniorLiquidity = new BigNumber(item.state.seniorLiquidity);
  const juniorLiquidity = new BigNumber(item.state.juniorLiquidity);
  const exposure = new BigNumber(item.state.upsideExposureRate);
  const upsideLeverage = juniorLiquidity.gt(0)
    ? seniorLiquidity.div(juniorLiquidity).multipliedBy(new BigNumber(1).minus(exposure)).plus(1)
    : new BigNumber(1);
  const downsideLeverage = juniorLiquidity.gt(0) ? seniorLiquidity.div(juniorLiquidity).plus(1) : new BigNumber(1);

  const tne = tillNextEpoch(item);

  return (
    <section
      className={classNames(s.poolCard, 'card')}
      style={
        { '--pool-card-progress': ((item.epochDuration - tne) / item.epochDuration) * 100 } as React.CSSProperties
      }>
      <header className="card-header flex align-center mb-32">
        <TokenIcon name={poolToken?.icon} size={40} bubble2Name={oracleToken?.icon} className="mr-16" />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
            {item.poolName}
          </Text>
          <Text type="small" weight="semibold" color="red" tag="small">
            Epoch {item.state.epoch}
          </Text>
        </div>
        <div className="ml-auto" style={{ textAlign: 'right' }}>
          <Text type="small" weight="semibold" color="secondary" tag="small" className="mb-4">
            Epoch ends in
          </Text>
          <UseLeftTime delay={1_000}>
            {() => {
              const tne = tillNextEpoch(item);

              return (
                <Text type="p1" weight="semibold">
                  {getFormattedDuration(tne)}
                </Text>
              );
            }}
          </UseLeftTime>
        </div>
      </header>
      <dl>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Epoch senior liquidity
          </Text>
          <dd className="flex align-center">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(item.state.seniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>
                    {formatUSD(BigNumber.from(item.state.seniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}
                  </span>
                </Text>
              }>
              {formatToken(item.state.seniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon} className="ml-8" />
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Upside exposure rate
            <InfoTooltip>
              Senior positions will only receive this much of every percentage point gain in the underlying asset
            </InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.upsideExposureRate))}
            </Text>
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-16')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Downside protection rate
            <InfoTooltip>Senior positions will only start taking losses beyond this decline</InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.downsideProtectionRate))}
            </Text>
          </dd>
        </div>
        <hr className="mb-24" />
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Epoch junior liquidity
          </Text>
          <dd className="flex align-center">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(item.state.juniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>
                    {formatUSD(BigNumber.from(item.state.juniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}
                  </span>
                </Text>
              }>
              {formatToken(item.state.juniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon} className="ml-8" />
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Upside leverage
            <InfoTooltip>Junior positions will have their upside amplified by this much</InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="purple">
              {upsideLeverage ? `${formatNumber(upsideLeverage)}x` : `-`}
            </Text>
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Downside leverage
            <InfoTooltip>
              How much of every 1% move to the downside in the underlying asset a junior position will have exposure to.
              <br />
              <br />
              The downside leverage is only applicable until senior downside protection is fully covered, and junior
              losses are fully realized.
            </InfoTooltip>
          </Text>
          <dd>
            <Text
              type="p1"
              weight="semibold"
              color="purple"
              tooltip="You have this amount of downside leverage, until the underlying token's price drops by more than the senior downside protection - after which there is no more downside leverage - or you can consider it as being 1x">
              {downsideLeverage ? `≤${formatNumber(downsideLeverage)}x` : `-`}
            </Text>
          </dd>
        </div>
      </dl>
      <footer className={s.poolCardFooter}>
        <Link variation="ghost" to={`${location.pathname}/${item.poolAddress}`}>
          View details
        </Link>
      </footer>
    </section>
  );
};
