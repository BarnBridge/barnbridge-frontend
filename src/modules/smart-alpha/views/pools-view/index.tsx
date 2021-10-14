import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from '@rooks/use-window-size';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Select from 'components/antd/select';
import { Button, Link } from 'components/button';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
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

type TreasuryFilterType = {
  token: string;
};

const PoolsView = () => {
  const { data } = useFetchSaPools();
  const [layout, setLayout] = useState<'cards' | 'list'>('list');

  const { innerWidth } = useWindowSize();

  const forceCardsView = innerWidth ? innerWidth < 1440 : true;

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

  const [tokenFilter, setTokenFilter] = useState('');

  const filters = useMemo(
    () =>
      [
        {
          name: 'token',
          label: 'Token',
          defaultValue: '',
          itemRender: () => {
            const tokenOpts = [
              {
                value: '',
                label: 'All tokens',
              },
              ...uniqBy(
                data?.map(item => ({
                  value: item.poolToken.symbol,
                  label: item.poolToken.symbol,
                })),
                'value',
              ),
            ];

            return <Select options={tokenOpts} className="full-width" />;
          },
        },
      ] as TableFilterType<PoolApiType>[],
    [data],
  );

  const filterValue = useMemo<TreasuryFilterType>(
    () => ({
      token: tokenFilter,
    }),
    [tokenFilter],
  );

  const items = useMemo(() => {
    return (
      data?.filter(dataItem => {
        if (tokenFilter) {
          return dataItem.poolToken.symbol.toUpperCase() === tokenFilter.toUpperCase();
        }

        return true;
      }) ?? []
    );
  }, [data, tokenFilter]);

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
        <div className="flex align-center ml-auto">
          {forceCardsView ? null : (
            <Button
              variation="ghost-alt"
              icon={layout === 'cards' ? 'list-view' : 'cards-view'}
              iconPosition="only"
              onClick={() => setLayout(prevLayout => (prevLayout === 'cards' ? 'list' : 'cards'))}
              className="ml-16"
            />
          )}
          <TableFilter<TreasuryFilterType>
            className="ml-16"
            filters={filters}
            value={filterValue}
            onChange={(filters: TreasuryFilterType) => setTokenFilter(filters.token)}
          />
        </div>
      </div>
      {forceCardsView || layout === 'cards' ? <Cards items={items} /> : <Table items={items} />}
    </>
  );
};
export default PoolsView;

const Cards = ({ items }: { items: PoolApiType[] }) => {
  return (
    <div className={s.cards}>
      {items.map(item => (
        <PoolCard key={item.poolAddress} item={item} />
      ))}
    </div>
  );
};

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

const Table = ({ items }: { items: PoolApiType[] }) => {
  const location = useLocation();
  const { getToken } = useTokens();

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th>
            <Text type="small" weight="semibold" color="secondary">
              Asset/Epoch
            </Text>
          </th>
          <th>
            <Text type="small" weight="semibold" color="secondary">
              Epoch
              <br />
              ends in
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary">
              Epoch
              <br />
              senior liquidity
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary" className="flex align-center justify-end">
              Upside
              <br />
              exposure rate{' '}
              <InfoTooltip className="ml-4">
                Senior positions will only receive this much of every percentage point gain in the underlying asset
              </InfoTooltip>
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary" className="flex align-center justify-end">
              Downside
              <br />
              protection rate{' '}
              <InfoTooltip className="ml-4">
                Senior positions will only start taking losses beyond this decline
              </InfoTooltip>
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary">
              Epoch
              <br />
              junior liquidity
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary" className="flex align-center justify-end">
              Upside
              <br />
              leverage{' '}
              <InfoTooltip className="ml-4">Junior positions will have their upside amplified by this much</InfoTooltip>
            </Text>
          </th>
          <th className="text-right">
            <Text type="small" weight="semibold" color="secondary" className="flex align-center justify-end">
              Downside
              <br />
              leverage{' '}
              <InfoTooltip className="ml-4">
                How much of every 1% move to the downside in the underlying asset a junior position will have exposure
                to.
                <br />
                <br />
                The downside leverage is only applicable until senior downside protection is fully covered, and junior
                losses are fully realized.
              </InfoTooltip>
            </Text>
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.map(function Render(item) {
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
                        {getFormattedDuration(tne, undefined, {
                          format: ['months', 'days', 'hours', 'minutes'],
                        })}
                      </Text>
                    );
                  }}
                </UseLeftTime>
              </td>
              <td className="text-right">
                <div className="flex align-center justify-end">
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
                </div>
              </td>
              <td className="text-right">
                <Text type="p1" weight="semibold" color="green">
                  {formatPercent(Number(item.state.upsideExposureRate))}
                </Text>
              </td>
              <td className="text-right">
                <Text type="p1" weight="semibold" color="green">
                  {formatPercent(Number(item.state.downsideProtectionRate))}
                </Text>
              </td>
              <td className="text-right">
                <div className="flex align-center justify-end">
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
                </div>
              </td>
              <td className="text-right">
                {' '}
                <Text type="p1" weight="semibold" color="purple">
                  {upsideLeverage ? `${formatNumber(upsideLeverage)}x` : `-`}
                </Text>
              </td>
              <td className="text-right">
                <Text
                  type="p1"
                  weight="semibold"
                  color="purple"
                  tooltip="You have this amount of downside leverage, until the underlying token's price drops by more than the senior downside protection - after which there is no more downside leverage - or you can consider it as being 1x">
                  {downsideLeverage ? `≤${formatNumber(downsideLeverage)}x` : `-`}
                </Text>
              </td>
              <td>
                <Link
                  to={`${location.pathname}/${item.poolAddress}`}
                  variation="text"
                  icon="arrow"
                  iconPosition="only"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
