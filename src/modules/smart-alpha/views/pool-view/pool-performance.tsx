import { useState } from 'react';
import classNames from 'classnames';
import { formatToken } from 'web3/utils';

import { Chart } from 'components/chart';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { EpochFilterTypeKey, useFetchPoolPerformance } from 'modules/smart-alpha/api';

import { formatDate, formatDateTime, formatTime } from 'utils/date';

export enum TrancheFilterTypeKey {
  senior = 'senior',
  junior = 'junior',
}

const trancheTabs = [
  {
    id: TrancheFilterTypeKey.senior,
    children: 'Senior',
  },
  {
    id: TrancheFilterTypeKey.junior,
    children: 'Junior',
  },
];

const epochTabs = [
  {
    id: EpochFilterTypeKey.current,
    children: 'Current epoch',
  },
  {
    id: EpochFilterTypeKey.last,
    children: 'Last epoch',
  },
];

export const PoolPerformance: React.FC<{ poolAddress: string; oracleAssetSymbol: string; className?: string }> = ({
  poolAddress,
  oracleAssetSymbol,
  className,
}) => {
  const [trancheFilter, setTrancheFilter] = useState<TrancheFilterTypeKey>(TrancheFilterTypeKey.senior);
  const [epochFilter, setEpochFilter] = useState<EpochFilterTypeKey>(EpochFilterTypeKey.current);
  const { data = [], loading } = useFetchPoolPerformance(poolAddress, epochFilter);

  const decimals = data.some(item =>
    trancheFilter === TrancheFilterTypeKey.senior
      ? (item.seniorWithSA > 0 && item.seniorWithSA < 0.001) ||
        (item.seniorWithoutSA > 0 && item.seniorWithoutSA < 0.001)
      : (item.juniorWithSA > 0 && item.juniorWithSA < 0.001) ||
        (item.juniorWithoutSA > 0 && item.juniorWithoutSA < 0.001),
  )
    ? 8
    : 4;

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="body1" weight="semibold">
          Pool performance
        </Text>
        <Tabs<TrancheFilterTypeKey>
          tabs={trancheTabs}
          activeKey={trancheFilter}
          onClick={setTrancheFilter}
          variation="elastic"
          size="small"
          className="ml-auto mr-16"
        />
        <Tabs<EpochFilterTypeKey>
          tabs={epochTabs}
          activeKey={epochFilter}
          onClick={setEpochFilter}
          variation="elastic"
          size="small"
        />
      </div>
      <div className="p-24">
        <Chart
          loading={loading}
          data={data ?? []}
          x={{
            key: 'point',
            format: item => `${formatDate(item, { weekday: 'short' })} ${formatTime(item)}`,
            itemFormat: item => formatDateTime(item),
          }}
          y={{
            format: value =>
              `${
                formatToken(value, {
                  compact: true,
                  decimals,
                }) ?? value
              } ${oracleAssetSymbol}`,
            itemsFormat: value => `${formatToken(value, { decimals }) ?? value} ${oracleAssetSymbol}`,
            domain: [
              (dataMin, domain = [dataMin, dataMin]) => dataMin - (domain[1] - dataMin) * 0.1,
              (dataMax, domain = [dataMax, dataMax]) => dataMax + (dataMax - domain[0]) * 0.1,
            ],
            width: decimals === 8 ? 100 : undefined,
            items:
              trancheFilter === TrancheFilterTypeKey.senior
                ? [
                    {
                      key: 'seniorWithSA',
                      title: 'Senior value',
                      color: 'green',
                    },
                    {
                      key: 'seniorWithoutSA',
                      title: 'Senior value (without SMART Alpha)',
                      color: 'yellow',
                    },
                    {
                      key: 'underlyingPrice',
                      title: 'Price (Right axis)',
                      color: 'grey',
                      yAxisId: 'right',
                    },
                  ]
                : [
                    {
                      key: 'juniorWithSA',
                      title: 'Junior value',
                      color: 'purple',
                    },
                    {
                      key: 'juniorWithoutSA',
                      title: 'Junior value (without SMART Alpha)',
                      color: 'yellow',
                    },
                    {
                      key: 'underlyingPrice',
                      title: 'Price (Right axis)',
                      color: 'grey',
                      yAxisId: 'right',
                    },
                  ],
          }}
        />
      </div>
    </div>
  );
};
