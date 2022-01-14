import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowSize from '@rooks/use-window-size';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Select from 'components/antd/select';
import { Button, Link } from 'components/button';
import { ColumnType, Table } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Tabs } from 'components/custom/tabs';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import { PoolApiType, useFetchSaPools } from 'modules/smart-alpha/api';
import SmartAlphaContract, { SMART_ALPHA_DECIMALS } from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useNextEpochEstimate } from 'modules/smart-alpha/hooks/next-epoch-estimate';

import { tillNextEpoch } from 'modules/smart-alpha/utils';
import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export enum EpochTypeKey {
  current = 'current',
  estimates = 'estimates',
}

const epochTabs = [
  {
    id: EpochTypeKey.current,
    children: 'Current',
  },
  {
    id: EpochTypeKey.estimates,
    children: 'Estimates',
  },
];

type TreasuryFilterType = {
  token: string;
};

const PoolsView = () => {
  const { data, loading } = useFetchSaPools();
  const [layout, setLayout] = useState<'cards' | 'list'>('list');
  const [epochType, setEpochType] = useState<EpochTypeKey>(EpochTypeKey.current);

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

  const exitQueueTVLInUsd = useMemo(() => {
    return data?.reduce((sum, item) => {
      return sum.plus(item.tvl.juniorExitQueueTVL).plus(item.tvl.seniorExitQueueTVL);
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
            Exit Queue TVL
          </Text>
          <Text type="h3" weight="bold" color="primary">
            {formatUSD(exitQueueTVLInUsd) ?? '-'}
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
      <div className="flex wrap col-gap-16 row-gap-16 align-center justify-space-between mb-32">
        <Text type="h1" weight="bold">
          Pools
        </Text>
        <div className="flex wrap col-gap-16 row-gap-16 align-center">
          <Tabs<EpochTypeKey> tabs={epochTabs} activeKey={epochType} onClick={setEpochType} variation="elastic" />
          {forceCardsView ? null : (
            <Button
              variation="ghost-alt"
              icon={layout === 'cards' ? 'list-view' : 'cards-view'}
              iconPosition="only"
              onClick={() => setLayout(prevLayout => (prevLayout === 'cards' ? 'list' : 'cards'))}
            />
          )}
          <TableFilter<TreasuryFilterType>
            filters={filters}
            value={filterValue}
            onChange={(filters: TreasuryFilterType) => setTokenFilter(filters.token)}
          />
        </div>
      </div>
      {forceCardsView || layout === 'cards' ? (
        <Cards items={items} epochType={epochType} />
      ) : (
        <TableLayout items={items} epochType={epochType} loading={loading} />
      )}
    </>
  );
};
export default PoolsView;

const Cards = ({ items, epochType }: { items: PoolApiType[]; epochType: EpochTypeKey }) => {
  return (
    <div className={s.cards}>
      {items.map(function Render(item) {
        return epochType === EpochTypeKey.current ? (
          <PoolCardCurrent key={item.poolAddress} item={item} />
        ) : (
          <PoolCardEstimate key={item.poolAddress} item={item} />
        );
      })}
    </div>
  );
};

const PoolCardCurrent = ({ item }: { item: PoolApiType }) => {
  const seniorLiquidity = new BigNumber(item.state.seniorLiquidity);
  const juniorLiquidity = new BigNumber(item.state.juniorLiquidity);
  const upsideRate = new BigNumber(item.state.upsideExposureRate);
  const downsideRate = new BigNumber(item.state.downsideProtectionRate);
  const upsideLeverage = juniorLiquidity.gt(0)
    ? seniorLiquidity.div(juniorLiquidity).multipliedBy(new BigNumber(1).minus(upsideRate)).plus(1)
    : new BigNumber(1);
  const downsideLeverage = juniorLiquidity.gt(0) ? seniorLiquidity.div(juniorLiquidity).plus(1) : new BigNumber(1);

  return (
    <PoolCardInner
      item={item}
      epoch={item.state.epoch}
      juniorLiquidity={juniorLiquidity}
      seniorLiquidity={seniorLiquidity}
      upsideRate={upsideRate}
      downsideRate={downsideRate}
      upsideLeverage={upsideLeverage}
      downsideLeverage={downsideLeverage}
      isEstimate={false}
    />
  );
};

const PoolCardEstimate = ({ item }: { item: PoolApiType }) => {
  const [reload] = useReload();
  const { getOrCreateContract } = useContractFactory();
  const { nextEpochEstimates, nextEpochUpsideLeverage, nextEpochDownsideLeverage } = useNextEpochEstimate(
    item.poolAddress,
  );

  const smartAlphaContract = useMemo(() => {
    return getOrCreateContract(
      item.poolAddress,
      () => {
        return new SmartAlphaContract(item.poolAddress);
      },
      {
        afterInit: async contract => {
          contract.onUpdateData(reload);
          await contract.loadCommon();
        },
      },
    );
  }, [item]);

  return (
    <PoolCardInner
      item={item}
      epoch={smartAlphaContract.currentEpoch ? smartAlphaContract.currentEpoch + 1 : undefined}
      juniorLiquidity={nextEpochEstimates[0]?.unscaleBy(item.poolToken.decimals)}
      seniorLiquidity={nextEpochEstimates[1]?.unscaleBy(item.poolToken.decimals)}
      upsideRate={nextEpochEstimates[2]?.unscaleBy(SMART_ALPHA_DECIMALS)}
      downsideRate={nextEpochEstimates[3]?.unscaleBy(SMART_ALPHA_DECIMALS)}
      upsideLeverage={nextEpochUpsideLeverage}
      downsideLeverage={nextEpochDownsideLeverage}
      isEstimate
    />
  );
};

const PoolCardInner = ({
  item,
  epoch,
  juniorLiquidity,
  seniorLiquidity,
  upsideRate,
  downsideRate,
  upsideLeverage,
  downsideLeverage,
  isEstimate,
}: {
  item: PoolApiType;
  epoch?: number;
  juniorLiquidity: BigNumber | undefined;
  seniorLiquidity: BigNumber | undefined;
  upsideRate: BigNumber | undefined;
  downsideRate: BigNumber | undefined;
  upsideLeverage: BigNumber | undefined;
  downsideLeverage: BigNumber | undefined;
  isEstimate: boolean;
}) => {
  const location = useLocation();
  const { getToken, getAsset } = useTokens();
  const poolToken = getToken(item.poolToken.symbol);
  const oracleToken = getAsset(item.oracleAssetSymbol);

  const tokenInOracleValueLeverage =
    downsideRate && poolToken?.price && oracleToken?.price
      ? poolToken.price?.multipliedBy(new BigNumber(1).minus(downsideRate))?.dividedBy(oracleToken.price)
      : undefined;

  const tokenInOracleValue =
    poolToken?.price && oracleToken?.price ? poolToken.price?.dividedBy(oracleToken.price) : undefined;

  return (
    <section
      className={classNames(s.poolCard, 'card')}
      style={
        (!isEstimate
          ? { '--pool-card-progress': ((item.epochDuration - tillNextEpoch(item)) / item.epochDuration) * 100 }
          : {}) as React.CSSProperties
      }>
      <header className="card-header flex align-center mb-32">
        <TokenIcon name={poolToken?.icon} size={40} bubble2Name={oracleToken?.icon} />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
            {item.poolName}
          </Text>
          <Text type="small" weight="semibold" color="red" tag="small">
            Epoch {epoch ?? '-'}
          </Text>
        </div>
        {!isEstimate && (
          <div className="ml-auto" style={{ textAlign: 'right' }}>
            <Text type="small" weight="semibold" color="secondary" tag="small" className="mb-4">
              Epoch ends in
            </Text>
            <UseLeftTime delay={1_000}>
              {() => (
                <Text type="p1" weight="semibold">
                  {getFormattedDuration(tillNextEpoch(item))}
                </Text>
              )}
            </UseLeftTime>
          </div>
        )}
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
                    {formatToken(seniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>{formatUSD(BigNumber.from(seniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}</span>
                </Text>
              }>
              {formatToken(seniorLiquidity, { compact: true })}
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
              {formatPercent(upsideRate)}
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
              {formatPercent(downsideRate)}
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
                    {formatToken(juniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>{formatUSD(BigNumber.from(juniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}</span>
                </Text>
              }>
              {formatToken(juniorLiquidity, { compact: true })}
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
              {`How much of every 1% move to the downside in ${item.poolToken.symbol} price a junior position will have exposure to.`}
              <br />
              The downside leverage is only applicable until senior downside protection is fully covered, and junior
              losses are fully realized.
              <br />
              {`Below that, is the ${item.poolToken.symbol} price after which there is no more senior downside protection to cover.`}
            </InfoTooltip>
          </Text>
          <dd>
            <Text
              type="p1"
              weight="semibold"
              color="purple"
              tooltip={`You have this amount of downside leverage, until the ${
                item.poolToken.symbol
              } price drops under ${formatToken(tokenInOracleValueLeverage, {
                tokenName: oracleToken?.symbol,
              })} - after which there is no more downside leverage - or you can consider it as being 1x`}
              className="mb-4">
              {downsideLeverage ? `≤${formatNumber(downsideLeverage)}x` : `-`}
            </Text>
            <div className="flex align-center justify-end">
              <Text type="small" weight="semibold" color="secondary">
                {formatToken(tokenInOracleValueLeverage) ?? '-'}
              </Text>
              <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
            </div>
          </dd>
        </div>
        <hr className="mb-24" />
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            {poolToken?.symbol} current price
          </Text>
          <dd className="flex align-center justify-end">
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(tokenInOracleValue) ?? '-'}
            </Text>
            <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
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

function getColumns(epochType: EpochTypeKey): ColumnType<PoolApiType>[] {
  if (epochType === EpochTypeKey.current) {
    return [
      {
        heading: 'Asset/Epoch',
        render: function Render(item) {
          const { getToken, getAsset } = useTokens();

          const poolToken = getToken(item.poolToken.symbol);
          const oracleToken = getAsset(item.oracleAssetSymbol);
          return (
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
          );
        },
      },
      {
        heading: 'Epoch ends in',
        render: item => {
          return (
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
          );
        },
      },
      {
        heading: 'Epoch senior liquidity',
        render: function Render(item) {
          const { getToken } = useTokens();
          const poolToken = getToken(item.poolToken.symbol);

          return (
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
          );
        },
      },
      {
        heading: (
          <div className="flex align-center justify-end">
            Upside
            <br />
            exposure rate{' '}
            <InfoTooltip className="ml-4">
              Senior positions will only receive this much of every percentage point gain in the underlying asset
            </InfoTooltip>
          </div>
        ),
        align: 'right',
        render: item => {
          return (
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.upsideExposureRate))}
            </Text>
          );
        },
      },
      {
        heading: (
          <div className="flex align-center justify-end">
            Downside
            <br />
            protection rate{' '}
            <InfoTooltip className="ml-4">
              Senior positions will only start taking losses beyond this decline
            </InfoTooltip>
          </div>
        ),
        align: 'right',
        render: item => {
          return (
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.downsideProtectionRate))}
            </Text>
          );
        },
      },
      {
        heading: 'Epoch junior liquidity',
        align: 'right',
        render: function Render(item) {
          const { getToken } = useTokens();
          const poolToken = getToken(item.poolToken.symbol);

          return (
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
          );
        },
      },
      {
        heading: (
          <div className="flex align-center justify-end">
            Upside
            <br />
            leverage{' '}
            <InfoTooltip className="ml-4">Junior positions will have their upside amplified by this much</InfoTooltip>
          </div>
        ),
        align: 'right',
        render: item => {
          const seniorLiquidity = new BigNumber(item.state.seniorLiquidity);
          const juniorLiquidity = new BigNumber(item.state.juniorLiquidity);
          const exposure = new BigNumber(item.state.upsideExposureRate);
          const upsideLeverage = juniorLiquidity.gt(0)
            ? seniorLiquidity.div(juniorLiquidity).multipliedBy(new BigNumber(1).minus(exposure)).plus(1)
            : new BigNumber(1);

          return (
            <Text type="p1" weight="semibold" color="purple">
              {upsideLeverage ? `${formatNumber(upsideLeverage)}x` : `-`}
            </Text>
          );
        },
      },
      {
        heading: (
          <div className="flex align-center justify-end">
            Downside
            <br />
            leverage{' '}
            <InfoTooltip className="ml-4">
              How much of every 1% move to the downside in underlying token price a junior position will have exposure
              to.
              <br />
              The downside leverage is only applicable until senior downside protection is fully covered, and junior
              losses are fully realized.
              <br />
              Below that, is the underlying token price after which there is no more senior downside protection to
              cover.
            </InfoTooltip>
          </div>
        ),
        align: 'right',
        render: function Render(item) {
          const seniorLiquidity = new BigNumber(item.state.seniorLiquidity);
          const juniorLiquidity = new BigNumber(item.state.juniorLiquidity);
          const downsideLeverage = juniorLiquidity.gt(0)
            ? seniorLiquidity.div(juniorLiquidity).plus(1)
            : new BigNumber(1);

          const { getToken, getAsset } = useTokens();
          const poolToken = getToken(item.poolToken.symbol);
          const oracleToken = getAsset(item.oracleAssetSymbol);

          const tokenInOracleValueLeverage =
            poolToken?.price && oracleToken?.price
              ? poolToken.price
                  ?.multipliedBy(new BigNumber(1).minus(Number(item.state.downsideProtectionRate)))
                  ?.dividedBy(oracleToken.price)
              : undefined;

          return (
            <>
              <Text
                type="p1"
                weight="semibold"
                color="purple"
                tooltip={`You have this amount of downside leverage, until the ${
                  item.poolToken.symbol
                } price drops under ${formatToken(tokenInOracleValueLeverage, {
                  tokenName: oracleToken?.symbol,
                })} - after which there is no more downside leverage - or you can consider it as being 1x`}
                className="mb-4">
                {downsideLeverage ? `≤${formatNumber(downsideLeverage)}x` : `-`}
              </Text>

              <div className="flex align-center justify-end">
                <Text type="small" weight="semibold" color="secondary">
                  {formatToken(tokenInOracleValueLeverage) ?? '-'}
                </Text>
                <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
              </div>
            </>
          );
        },
      },
      {
        heading: 'Pool token current price',
        align: 'right',
        render: function Render(item) {
          const { getToken, getAsset } = useTokens();
          const poolToken = getToken(item.poolToken.symbol);
          const oracleToken = getAsset(item.oracleAssetSymbol);

          const tokenInOracleValue =
            poolToken?.price && oracleToken?.price ? poolToken.price?.dividedBy(oracleToken.price) : undefined;

          return (
            <div className="flex align-center justify-end">
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(tokenInOracleValue) ?? '-'}
              </Text>
              <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
            </div>
          );
        },
      },
    ];
  }

  return [
    {
      heading: 'Asset/Epoch',
      render: function Render(item) {
        const { getToken, getAsset } = useTokens();

        const poolToken = getToken(item.poolToken.symbol);
        const oracleToken = getAsset(item.oracleAssetSymbol);
        return (
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
        );
      },
    },
    {
      heading: 'Epoch senior liquidity',
      render: function Render(item) {
        const { getToken } = useTokens();
        const poolToken = getToken(item.poolToken.symbol);

        const { nextEpochEstimates } = useNextEpochEstimate(item.poolAddress);
        const seniorLiquidity = nextEpochEstimates[1]?.unscaleBy(item.poolToken.decimals);

        return (
          <div className="flex align-center justify-end">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(seniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>{formatUSD(BigNumber.from(seniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}</span>
                </Text>
              }>
              {formatToken(seniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon} className="ml-8" />
          </div>
        );
      },
    },
    {
      heading: (
        <div className="flex align-center justify-end">
          Upside
          <br />
          exposure rate{' '}
          <InfoTooltip className="ml-4">
            Senior positions will only receive this much of every percentage point gain in the underlying asset
          </InfoTooltip>
        </div>
      ),
      align: 'right',
      render: function Render(item) {
        const { nextEpochEstimates } = useNextEpochEstimate(item.poolAddress);
        const upsideRate = nextEpochEstimates[2]?.unscaleBy(SMART_ALPHA_DECIMALS);

        return (
          <Text type="p1" weight="semibold" color="green">
            {formatPercent(upsideRate)}
          </Text>
        );
      },
    },
    {
      heading: (
        <div className="flex align-center justify-end">
          Downside
          <br />
          protection rate{' '}
          <InfoTooltip className="ml-4">Senior positions will only start taking losses beyond this decline</InfoTooltip>
        </div>
      ),
      align: 'right',
      render: function Render(item) {
        const { nextEpochEstimates } = useNextEpochEstimate(item.poolAddress);

        const downsideRate = nextEpochEstimates[3]?.unscaleBy(SMART_ALPHA_DECIMALS);

        return (
          <Text type="p1" weight="semibold" color="green">
            {formatPercent(downsideRate)}
          </Text>
        );
      },
    },
    {
      heading: 'Epoch junior liquidity',
      align: 'right',
      render: function Render(item) {
        const { getToken } = useTokens();
        const poolToken = getToken(item.poolToken.symbol);
        const { nextEpochEstimates } = useNextEpochEstimate(item.poolAddress);
        const juniorLiquidity = nextEpochEstimates[0]?.unscaleBy(item.poolToken.decimals);

        return (
          <div className="flex align-center justify-end">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(juniorLiquidity, {
                      tokenName: item.poolToken.symbol,
                      decimals: item.poolToken.decimals,
                    })}
                  </span>
                  <span>{formatUSD(BigNumber.from(juniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}</span>
                </Text>
              }>
              {formatToken(juniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon} className="ml-8" />
          </div>
        );
      },
    },
    {
      heading: (
        <div className="flex align-center justify-end">
          Upside
          <br />
          leverage{' '}
          <InfoTooltip className="ml-4">Junior positions will have their upside amplified by this much</InfoTooltip>
        </div>
      ),
      align: 'right',
      render: function Render(item) {
        const { nextEpochUpsideLeverage } = useNextEpochEstimate(item.poolAddress);

        return (
          <Text type="p1" weight="semibold" color="purple">
            {nextEpochUpsideLeverage ? `${formatNumber(nextEpochUpsideLeverage)}x` : `-`}
          </Text>
        );
      },
    },
    {
      heading: (
        <div className="flex align-center justify-end">
          Downside
          <br />
          leverage{' '}
          <InfoTooltip className="ml-4">
            How much of every 1% move to the downside in underlying token price a junior position will have exposure to.
            <br />
            The downside leverage is only applicable until senior downside protection is fully covered, and junior
            losses are fully realized.
            <br />
            Below that, is the underlying token price after which there is no more senior downside protection to cover.
          </InfoTooltip>
        </div>
      ),
      align: 'right',
      render: function Render(item) {
        const { getToken, getAsset } = useTokens();
        const { nextEpochEstimates, nextEpochDownsideLeverage } = useNextEpochEstimate(item.poolAddress);

        const poolToken = getToken(item.poolToken.symbol);
        const oracleToken = getAsset(item.oracleAssetSymbol);

        const downsideRate = nextEpochEstimates[3]?.unscaleBy(SMART_ALPHA_DECIMALS);

        const tokenInOracleValueLeverage =
          downsideRate && poolToken?.price && oracleToken?.price
            ? poolToken.price?.multipliedBy(new BigNumber(1).minus(downsideRate))?.dividedBy(oracleToken.price)
            : undefined;

        return (
          <>
            <Text
              type="p1"
              weight="semibold"
              color="purple"
              tooltip={`You have this amount of downside leverage, until the ${
                item.poolToken.symbol
              } price drops under ${formatToken(tokenInOracleValueLeverage, {
                tokenName: oracleToken?.symbol,
              })} - after which there is no more downside leverage - or you can consider it as being 1x`}
              className="mb-4">
              {nextEpochDownsideLeverage ? `≤${formatNumber(nextEpochDownsideLeverage)}x` : `-`}
            </Text>

            <div className="flex align-center justify-end">
              <Text type="small" weight="semibold" color="secondary">
                {formatToken(tokenInOracleValueLeverage) ?? '-'}
              </Text>
              <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
            </div>
          </>
        );
      },
    },
    {
      heading: 'Pool token current price',
      align: 'right',
      render: function Render(item) {
        const { getToken, getAsset } = useTokens();
        const poolToken = getToken(item.poolToken.symbol);
        const oracleToken = getAsset(item.oracleAssetSymbol);

        const tokenInOracleValue =
          poolToken?.price && oracleToken?.price ? poolToken.price?.dividedBy(oracleToken.price) : undefined;

        return (
          <div className="flex align-center justify-end">
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(tokenInOracleValue) ?? '-'}
            </Text>
            <TokenIcon name={oracleToken?.icon} size={16} className="ml-4" />
          </div>
        );
      },
    },
  ];
}

const TableLayout = ({
  items,
  epochType,
  loading,
}: {
  items: PoolApiType[];
  epochType: EpochTypeKey;
  loading: boolean;
}) => {
  const location = useLocation();

  const columns = useMemo(() => getColumns(epochType), [epochType]);

  return (
    <Table<PoolApiType>
      columns={columns}
      data={items}
      variation="separated"
      link={item => `${location.pathname}/${item.poolAddress}`}
      loading={loading}
    />
  );
};
