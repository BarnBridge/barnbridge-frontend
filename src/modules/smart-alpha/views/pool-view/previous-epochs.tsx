import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { Tokens, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { EpochApiType, useFetchPreviousEpochs } from 'modules/smart-alpha/api';

const getColumns = (poolTokenSymbol?: Tokens): ColumnType<EpochApiType>[] => [
  {
    heading: 'Epoch number',
    render: item => (
      <div className="flex align-center text-nowrap">
        <div
          style={{
            width: 32,
            height: 32,
            background: 'rgba(var(--theme-blue-color-rgb), 0.1)',
            borderRadius: '50%',
            fontSize: 10,
            lineHeight: 1.2,
          }}
          className="flex align-center justify-center fw-bold blue-color mr-12">
          {item.id}
        </div>
        <Text type="p2" weight="semibold">
          Epoch {item.id}
        </Text>
      </div>
    ),
  },
  {
    heading: `Junior leverage`,
    render: item => (
      <Text type="p2" weight="semibold" color="green" className="text-nowrap">
        TBD
      </Text>
    ),
  },
  {
    heading: `Upside/Downside Rates`,
    render: item => (
      <div className="text-nowrap">
        <Text type="p2" weight="semibold" className="mb-4">
          {item.upsideExposureRate}
        </Text>
        <Text type="p2" weight="semibold">
          {item.downsideProtectionRate}
        </Text>
      </div>
    ),
  },
  {
    heading: `${poolTokenSymbol} epoch entry price`,
    render: item => (
      <Text type="p2" weight="semibold" className="text-nowrap">
        {item.entryPrice}
      </Text>
    ),
  },
  {
    heading: 'Senior/Junior Liquidity',
    render: function Render(item) {
      const { getToken } = useTokens();
      const poolToken = getToken(poolTokenSymbol);
      return (
        <div className="text-nowrap">
          <div className="flex align-center mb-4">
            <Text type="p2" weight="semibold" className="mr-4">
              {item.seniorLiquidity}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
          <div className="flex align-center">
            <Text type="p2" weight="semibold" className="mr-4">
              {item.juniorLiquidity}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Senior/Junior Profits',
    render: item => (
      <div className="text-nowrap">
        <Text type="p2" weight="semibold" className="mb-4">
          {item.juniorProfits}
        </Text>
        <Text type="p2" weight="semibold">
          {item.seniorProfits}
        </Text>
      </div>
    ),
  },
  {
    heading: 'Junior/Senior Token price start',
    render: item => (
      <div className="text-nowrap">
        <Text type="p2" weight="semibold" className="mb-4">
          {item.juniorTokenPriceStart}
        </Text>
        <Text type="p2" weight="semibold">
          {item.seniorTokenPriceStart}
        </Text>
      </div>
    ),
  },
  {
    heading: 'Start date/End date',
    render: item => {
      const startDate = new Date(item.startDate * 1000);
      const endDate = new Date(item.endDate * 1000);
      return (
        <div className="text-nowrap">
          <Text type="p2" weight="semibold" className="mb-4">
            {format(startDate, 'dd.MM.yyyy - hh:mm')}
          </Text>
          <Text type="p2" weight="semibold">
            {format(endDate, 'dd.MM.yyyy - hh:mm')}
          </Text>
        </div>
      );
    },
  },
];

export const PreviousEpochs = () => {
  const { id: poolAddress } = useParams<{ id: string }>();

  const [filters, setFilters] = useState<{
    page: number;
    pageSize: number;
  }>({
    page: 1,
    pageSize: 5,
  });

  const { data, loading } = useFetchPreviousEpochs({
    page: filters.page,
    limit: filters.pageSize,
    poolAddress,
  });

  return (
    <section className="card">
      <header className="card-header flex align-center pv-12">
        <Text type="p1" weight="semibold">
          Transaction history
        </Text>
      </header>
      <Table<EpochApiType>
        columns={getColumns(data?.data.poolToken.symbol)}
        data={data?.data.epochs || []}
        loading={loading}
      />
      <TableFooter
        total={data?.meta.count ?? 0}
        current={filters.page}
        pageSize={filters.pageSize}
        onChange={page =>
          setFilters(prevFilters => ({
            ...prevFilters,
            page,
          }))
        }
        text
      />
    </section>
  );
};
