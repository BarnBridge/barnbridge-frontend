import { useMemo } from 'react';
import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import s from './s.module.scss';

interface PropsType<X = number, Y = number> {
  data: Object[];
  x: {
    key: string;
    format?: (item: any) => string;
    itemFormat?: (item: any) => string;
  };
  y: {
    format?: (item: any) => string;
    itemsFormat?: (item: any) => string;
    items: {
      key: string;
      title: string;
      color: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
    }[];
  };
  className?: string;
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

export const Chart: React.FC<PropsType> = ({ data, x, y, className }) => {
  const areaUniqIds = useMemo(() => {
    return Array.from({ length: y.items.length }).map(() => nanoid());
  }, [y.items.length]);

  return (
    <ResponsiveContainer width="100%" height={300} className={className}>
      <AreaChart data={data}>
        <defs>
          {areaUniqIds.map((areaId, idx) => (
            <linearGradient key={areaId} id={areaId} gradientTransform="rotate(180)">
              <stop offset="0%" stopColor={`rgba(var(--theme-${y.items[idx].color}-color-rgb), 0.08)`} />
              <stop offset="100%" stopColor={`rgba(var(--theme-${y.items[idx].color}-color-rgb), 0)`} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 0" stroke="var(--theme-border-color)" />
        <XAxis dataKey={x.key} axisLine={false} tickLine={false} tickFormatter={x.format} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={y.format} />

        {y.items.map((areaItem, idx) => (
          <Area
            key={idx}
            name={areaItem.title}
            dataKey={areaItem.key}
            type="monotone"
            fill={`url(#${areaUniqIds[idx]})`}
            stroke={`var(--theme-${y.items[idx].color}-color)`}
            strokeWidth={2}
          />
        ))}
        <Tooltip
          // separator=""
          labelFormatter={value => (
            <div className={s.tooltipTitle}>{value ? format(new Date(value), 'MM.dd.yyyy HH:mm') : ''}</div>
          )}
          // formatter={(value: number, _: any, { dataKey }: any) => <span style={{ marginLeft: 8 }}>{value}</span>}
          content={ttprops => renderTooltip(ttprops, x.itemFormat, y.itemsFormat)}
        />
        <Legend content={renderLegend} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
