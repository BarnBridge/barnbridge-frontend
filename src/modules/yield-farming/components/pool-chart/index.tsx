import React, { FC, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import format from 'date-fns/format';
import getUnixTime from 'date-fns/getUnixTime';
import * as ReCharts from 'recharts';
import { formatUSD, formatUSDValue } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Select from 'components/antd/select';
import Icon from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useReload } from 'hooks/useReload';
import { useYfAPI } from 'modules/yield-farming/api';
import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import { YFPoolID, useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

type HistoryChartItem = {
  label: string;
  deposits: BigNumber;
  withdrawals: BigNumber;
};

type Props = {
  className?: string;
};

const PoolChart: FC<Props> = props => {
  const [reload, version] = useReload();
  const yfAPI = useYfAPI();
  const knownTokensCtx = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const { yfPools } = yfPoolsCtx;

  const unilpYfPool = yfPoolsCtx.getYFKnownPoolByName(YFPoolID.UNILP);
  const [selectedYfPool, setSelectedYfPool] = useState<string>(unilpYfPool?.name!);
  const [selectedYfEpoch, setSelectedYfEpoch] = useState('all');
  const [selectedYfType, setSelectedYfType] = useState('all');

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const activeYfPool = yfPoolsCtx.getYFKnownPoolByName(selectedYfPool);

  const tokenOptions = useMemo(() => {
    return yfPools.map(yfPool => ({
      value: yfPool.name,
      label: <div className="flex col-gap-8 align-center">{yfPool.label}</div>,
    }));
  }, [yfPools]);

  const epochFilters = useMemo(() => {
    if (!activeYfPool) {
      return [{ value: 'all', label: 'All epochs' }];
    }

    const { lastActiveEpoch } = activeYfPool.contract;

    if (!lastActiveEpoch) {
      return [{ value: 'all', label: 'All epochs' }];
    }

    return [
      { value: 'all', label: 'All epochs' },
      ...([YFPoolID.STABLE, YFPoolID.BOND].includes(activeYfPool.name) ? [{ value: '-1', label: 'Epoch 0' }] : []),
      ...Array.from({ length: lastActiveEpoch }).map((_, epoch) => ({
        value: String(epoch),
        label: `Epoch ${epoch + 1}`,
      })),
    ];
  }, [activeYfPool, version]);

  const typeFilters = useMemo(() => {
    return [
      { value: 'all', label: 'All pool transactions' },
      { value: 'deposits', label: 'Deposits' },
      { value: 'withdrawals', label: 'Withdrawals' },
    ];
  }, []);

  useEffect(() => {
    activeYfPool?.contract.once(Web3Contract.UPDATE_DATA, reload);
  }, [activeYfPool]);

  useEffect(() => {
    if (!activeYfPool) {
      return;
    }

    const isAll = selectedYfEpoch === 'all';
    const scale = isAll ? 'week' : 'day';
    const { epoch1Start, epochDuration, lastActiveEpoch } = activeYfPool.contract;

    if (epoch1Start === undefined || epochDuration === undefined || lastActiveEpoch === undefined) {
      return;
    }

    let epochStart = epoch1Start;
    let epochEnd = Math.ceil(Date.now() / 1_000);

    if (selectedYfEpoch !== 'all') {
      epochStart = epoch1Start + Number(selectedYfEpoch) * epochDuration;
      epochEnd = epochStart + epochDuration;
    }

    const addresses = activeYfPool.tokens.map(token => token.address);

    (async () => {
      setLoading(true);

      try {
        const result = await yfAPI.fetchYFPoolChart(addresses, epochStart, epochEnd, scale);

        const historyMap = new Map<string, HistoryChartItem>();

        activeYfPool.tokens.forEach(token => {
          const tokenHistory = result[token.address]; /// TODO: discuss

          Object.entries(tokenHistory).forEach(([timestamp, item]) => {
            const dt = getUnixTime(new Date(timestamp));
            const epoch = Math.floor((dt - epoch1Start) / epochDuration);

            if (epoch > lastActiveEpoch!) {
              return;
            }

            const prevItem = historyMap.get(timestamp);
            const prevDeposits = prevItem?.deposits ?? BigNumber.ZERO;
            const deposits = knownTokensCtx.convertTokenInUSD(
              new BigNumber(item.sumDeposits).unscaleBy(token.decimals),
              token.symbol,
            );
            const prevWithdrawals = prevItem?.withdrawals ?? BigNumber.ZERO;
            const withdrawals = knownTokensCtx
              .convertTokenInUSD(new BigNumber(item.sumWithdrawals).unscaleBy(token.decimals), token.symbol)
              ?.multipliedBy(-1);

            historyMap.set(timestamp, {
              label: isAll ? `Epoch ${epoch + 1}` : format(new Date(timestamp), 'dd-MM-yyyy'),
              deposits: prevDeposits.plus(deposits ?? BigNumber.ZERO),
              withdrawals: prevWithdrawals.plus(withdrawals ?? BigNumber.ZERO),
            });
          });
        });

        setChartData(Array.from(historyMap.values()) as any);
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    })();
  }, [activeYfPool, selectedYfEpoch, selectedYfType, version]);

  return (
    <div className={cn('card', props.className)} style={{ overflowX: 'auto' }}>
      <div className={cn('card-header flex align-center justify-space-between', s.chartTitleContainer)}>
        <div className="flex">
          {activeYfPool && (
            <IconsSet
              className="mr-8"
              icons={activeYfPool.tokens.map(token => (
                <Icon key={token.symbol} name={token.icon!} />
              ))}
            />
          )}
          <Select
            options={tokenOptions}
            value={selectedYfPool}
            disabled={loading}
            onSelect={value => {
              setSelectedYfPool(String(value));
              setSelectedYfEpoch('all');
              setSelectedYfType('all');
            }}
          />
        </div>
        <div className={cn('flex', s.chartTitleFilters)}>
          <Select
            className="mr-16"
            label="Period"
            options={epochFilters}
            value={selectedYfEpoch}
            disabled={loading}
            onSelect={value => {
              setSelectedYfEpoch(String(value));
            }}
          />
          <Select
            label="Show"
            options={typeFilters}
            value={selectedYfType}
            disabled={loading}
            onSelect={value => {
              setSelectedYfType(String(value));
            }}
          />
        </div>
      </div>

      <div className="p-24">
        <Spin spinning={loading}>
          {chartData.length === 0 && (
            <div className="flex flow-row row-gap-24 align-center justify-center pv-48">
              <EmptyChartSvg />
              <Text type="p1" color="secondary">
                Not enough data to plot a graph
              </Text>
            </div>
          )}
          {chartData.length > 0 && (
            <div className="flex flow-row row-gap-16">
              <ReCharts.ResponsiveContainer width="100%" height={350}>
                <ReCharts.BarChart
                  data={chartData}
                  stackOffset="sign"
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 12,
                  }}>
                  <ReCharts.CartesianGrid vertical={false} stroke="var(--theme-border-color)" strokeDasharray="3 3" />
                  <ReCharts.XAxis dataKey="label" stroke="var(--theme-default-color)" />
                  <ReCharts.YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="var(--theme-default-color)"
                    tickFormatter={value =>
                      formatUSD(value, {
                        compact: true,
                        decimals: 0,
                      }) ?? '-'
                    }
                  />
                  <ReCharts.Tooltip
                    cursor={false}
                    wrapperClassName={s.chartTooltip}
                    formatter={(value: any) => formatUSDValue(value)}
                    content={({ label, payload }) => (
                      <div className="card flex flow-row row-gap-4 p-4" style={{ minWidth: 250 }}>
                        <div
                          className="p-8 text-center"
                          style={{ minHeight: 40, background: 'var(--theme-body-color)' }}>
                          <Text type="p2" weight="semibold" color="primary">
                            {label}
                          </Text>
                        </div>
                        <div className="flex flow-row row-gap-12 p-16">
                          <div className="flex align-center justify-space-between">
                            <div
                              className="chart-label"
                              style={
                                {
                                  '--bg-color': 'transparent',
                                  '--dot-color': 'var(--theme-red-color)',
                                } as React.CSSProperties
                              }>
                              Deposits
                            </div>
                            <Text type="p2" weight="semibold" color="primary">
                              {formatUSD(payload?.[0]?.value as any)}
                            </Text>
                          </div>
                          <div className="flex align-center justify-space-between">
                            <div
                              className="chart-label"
                              style={
                                {
                                  '--bg-color': 'transparent',
                                  '--dot-color': 'var(--theme-blue-color)',
                                } as React.CSSProperties
                              }>
                              Withdrawals
                            </div>
                            <Text type="p2" weight="semibold" color="primary">
                              {formatUSD(payload?.[1]?.value as any)}
                            </Text>
                          </div>
                        </div>
                      </div>
                    )}
                  />
                  <ReCharts.ReferenceLine y={0} stroke="var(--theme-border-color)" />
                  {['all', 'deposits'].includes(selectedYfType) && (
                    <ReCharts.Bar
                      dataKey="deposits"
                      name="Deposits"
                      stackId="stack"
                      fill="var(--theme-red-color)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  )}
                  {['all', 'withdrawals'].includes(selectedYfType) && (
                    <ReCharts.Bar
                      dataKey="withdrawals"
                      name="Withdrawals"
                      stackId="stack"
                      fill="var(--theme-blue-color)"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={50}
                    />
                  )}
                </ReCharts.BarChart>
              </ReCharts.ResponsiveContainer>
              <footer className="flex flow-col justify-center col-gap-24 row-gap-16">
                <div className="chart-label" style={{ '--dot-color': 'var(--theme-red-color)' } as React.CSSProperties}>
                  Deposits
                </div>
                <div
                  className="chart-label"
                  style={{ '--dot-color': 'var(--theme-blue-color)' } as React.CSSProperties}>
                  Withdrawals
                </div>
              </footer>
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default PoolChart;
