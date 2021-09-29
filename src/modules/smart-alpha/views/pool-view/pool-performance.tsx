import { useState } from 'react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { formatToken } from 'web3/utils';

import { Chart } from 'components/chart';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { EpochFilterTypeKey, useFetchPoolPerformance } from 'modules/smart-alpha/api';

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

  return (
    <div className={classNames('card', className)}>
      <div className="card-header flex align-center">
        <Text type="p1" weight="semibold">
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
            format: item => format(new Date(item), 'EEE HH:mm'),
            itemFormat: item => format(new Date(item), 'MM.dd.yyyy HH:mm'),
          }}
          y={{
            format: value =>
              `${
                formatToken(value, {
                  compact: true,
                }) ?? value
              } ${oracleAssetSymbol}`,
            itemsFormat: value => `${formatToken(value) ?? value} ${oracleAssetSymbol}`,
            domain: [
              (dataMin, domain = [dataMin, dataMin]) => dataMin - (domain[1] - dataMin) * 0.1,
              (dataMax, domain = [dataMax, dataMax]) => dataMax + (dataMax - domain[0]) * 0.1,
            ],
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
