import { Component, useMemo, useRef } from 'react';
import { format } from 'date-fns';
import { isFunction } from 'lodash';
import { nanoid } from 'nanoid';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CategoricalChartProps, CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { AxisDomain, AxisDomainItem } from 'recharts/types/util/types';

import Spin from 'components/antd/spin';
import { Text } from 'components/custom/typography';
import { ReactComponent as EmptyChartSvg } from 'resources/svg/empty-chart.svg';

import s from './s.module.scss';

interface PropsType {
  data: Object[];
  x: {
    key: string;
    format?: (item: any) => string;
    itemFormat?: (item: any) => string;
    ticks?: number[];
  };
  y: {
    format?: (item: any) => string;
    itemsFormat?: (item: any) => string;
    items: {
      key: string;
      title: string;
      color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'grey';
      yAxisId?: 'left' | 'right';
    }[];
    domain?: AxisDomain;
    domainRight?: AxisDomain;
  };
  className?: string;
  loading?: boolean;
}

const renderTooltip = (
  props: any,
  titleFormat: PropsType['x']['itemFormat'],
  dataFormat: PropsType['y']['itemsFormat'],
) => {
  const { payload, label } = props;
  if (!payload) return null;

  const date = label && titleFormat ? titleFormat(label) : label; // format(new Date(label), 'MM.dd.yyyy HH:mm') : '';

  return (
    <div className={s.tooltip}>
      <div className={s.tooltipTitle}>{date}</div>
      <dl className={s.tooltipItems}>
        {payload.map((item, idx) => {
          return (
            <div className={s.tooltipItem} key={idx}>
              <dt className={s.tooltipName} style={{ '--dot-color': item.color } as React.CSSProperties}>
                {item.name}
              </dt>
              <dd className={s.tooltipValue}>{dataFormat ? dataFormat(item.value) : item.value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

const renderLegend = ({ payload }: any) => {
  if (!payload) return null;
  return (
    <div className={s.legend}>
      {payload.map((entry, idx) => (
        <span key={idx} className={s.legendItem} style={{ '--dot-color': entry.color } as React.CSSProperties}>
          {entry.value}
        </span>
      ))}
    </div>
  );
};

export const Chart: React.FC<PropsType> = ({ data, x, y, className, loading = false }) => {
  const areaUniqIds = useMemo(() => {
    return Array.from({ length: y.items.length }).map(() => nanoid());
  }, [y.items.length]);

  const hasRightYAxis = y.items.some(item => item.yAxisId === 'right');

  const chartRef = useRef<Component<CategoricalChartProps, CategoricalChartState>>();

  const yDomainLeft = useMemo(() => {
    if (!chartRef.current || !y.domain || !Array.isArray(y.domain)) {
      return y.domain;
    }

    const [min, max] = y.domain;
    const { yAxisMap } = chartRef.current.state as CategoricalChartState;

    if (!isFunction(min) || !isFunction(max) || !yAxisMap || !yAxisMap.left) {
      return y.domain;
    }

    const { domain = [] } = yAxisMap.left;

    return [
      dataMin => min(dataMin, domain ?? [dataMin, dataMin]),
      dataMax => max(dataMax, domain ?? [dataMax, dataMax]),
    ] as [AxisDomainItem, AxisDomainItem];
  }, [chartRef.current, y.domain]);

  return (
    <Spin spinning={loading}>
      {data.length === 0 ? (
        <div className="flex flow-row row-gap-24 align-center justify-center pv-48">
          <EmptyChartSvg />
          <Text type="p1" color="secondary">
            Not enough data to plot a graph
          </Text>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300} className={className}>
          <AreaChart ref={chartRef as any} data={data}>
            <defs>
              {areaUniqIds.map((areaId, idx) => (
                <linearGradient key={areaId} id={areaId} gradientTransform="rotate(180)">
                  <stop offset="0%" stopColor={`rgba(var(--theme-${y.items[idx].color}-color-rgb), 0.08)`} />
                  <stop offset="100%" stopColor={`rgba(var(--theme-${y.items[idx].color}-color-rgb), 0)`} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
            <XAxis
              dataKey={x.key}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              minTickGap={0}
              tickFormatter={x.format}
              ticks={x.ticks}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={y.format}
              orientation="left"
              yAxisId="left"
              domain={yDomainLeft}
            />
            {hasRightYAxis && (
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={y.format}
                orientation="right"
                yAxisId="right"
                domain={y.domainRight}
              />
            )}

            {y.items.map((areaItem, idx) => (
              <Area
                key={areaItem.key}
                name={areaItem.title}
                dataKey={areaItem.key}
                type="monotone"
                fill={`url(#${areaUniqIds[idx]})`}
                stroke={`var(--theme-${y.items[idx].color}-color)`}
                strokeWidth={2}
                yAxisId={areaItem.yAxisId ?? 'left'}
                strokeDasharray={areaItem.yAxisId === 'right' ? '3 3' : ''}
              />
            ))}
            <Tooltip
              labelFormatter={value => (
                <div className={s.tooltipTitle}>{value ? format(new Date(value), 'MM.dd.yyyy HH:mm') : ''}</div>
              )}
              content={p => renderTooltip(p, x.itemFormat, y.itemsFormat)}
            />
            <Legend content={renderLegend} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Spin>
  );
};
