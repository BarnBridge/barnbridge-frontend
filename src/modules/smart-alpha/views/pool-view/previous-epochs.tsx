import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { formatNumber, formatPercent } from 'web3/utils';

import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { Tokens, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { EpochApiType, useFetchPreviousEpochs } from 'modules/smart-alpha/api';

const getColumns = ({
  poolTokenSymbol,
  oracleAssetSymbol,
}: {
  poolTokenSymbol?: Tokens;
  oracleAssetSymbol?: Tokens;
}): ColumnType<EpochApiType>[] => [
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
    heading: `Upside/Downside Junior leverages`,
    align: 'right',
    render: item => {
      const upsideLeverage =
        1 + ((1 - Number(item.upsideExposureRate)) * Number(item.seniorLiquidity)) / Number(item.juniorLiquidity);

      return (
        <div className="text-nowrap">
          <Text type="p2" weight="semibold" color="purple" className="mb-4">
            {formatNumber(upsideLeverage || 1, { decimals: 2 })}x
          </Text>
          <Text type="p2" weight="semibold" color="purple">
            TBD
          </Text>
        </div>
      );
    },
  },
  {
    heading: `Upside/Downside Senior rates`,
    align: 'right',
    render: item => (
      <div className="text-nowrap">
        <Text type="p2" weight="semibold" color="green" className="mb-4">
          {formatPercent(Number(item.upsideExposureRate))}
        </Text>
        <Text type="p2" weight="semibold" color="green">
          {formatPercent(Number(item.downsideProtectionRate))}
        </Text>
      </div>
    ),
  },
  {
    heading: `${poolTokenSymbol} epoch entry price`,
    align: 'right',
    render: function Render(item) {
      return (
        <div className="flex justify-end align-center col-gap-4">
          <Text type="p2" weight="semibold" className="text-nowrap" tooltip={item.entryPrice}>
            {formatNumber(Number(item.entryPrice), { decimals: 4 })}
          </Text>
          <Text type="p2" weight="semibold" className="text-nowrap">
            {oracleAssetSymbol}
          </Text>
        </div>
      );
    },
  },
  {
    heading: 'Senior/Junior Liquidity',
    align: 'right',
    render: function Render(item) {
      const { getToken } = useTokens();
      const poolToken = getToken(poolTokenSymbol);
      return (
        <div className="text-nowrap">
          <div className="flex justify-end align-center mb-4">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.seniorLiquidity}>
              {formatNumber(Number(item.seniorLiquidity), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
          <div className="flex justify-end align-center">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.juniorLiquidity}>
              {formatNumber(Number(item.juniorLiquidity), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Senior/Junior Profits',
    align: 'right',
    render: function Render(item) {
      const { getToken } = useTokens();
      const poolToken = getToken(poolTokenSymbol);

      return (
        <div className="text-nowrap">
          <div className="flex justify-end align-center">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.juniorProfits}>
              {formatNumber(Number(item.juniorProfits), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
          <div className="flex justify-end align-center">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.seniorProfits}>
              {formatNumber(Number(item.seniorProfits), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Junior/Senior Token price start',
    align: 'right',
    render: function Render(item) {
      const { getToken } = useTokens();
      const poolToken = getToken(poolTokenSymbol);

      return (
        <div className="text-nowrap">
          <div className="flex justify-end align-center">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.juniorTokenPriceStart}>
              {formatNumber(Number(item.juniorTokenPriceStart), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
          <div className="flex justify-end align-center">
            <Text type="p2" weight="semibold" className="mr-4" tooltip={item.seniorTokenPriceStart}>
              {formatNumber(Number(item.seniorTokenPriceStart), { decimals: 4 })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Start date/End date',
    align: 'right',
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
    pageSize: 4,
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
        columns={getColumns({
          poolTokenSymbol: data?.data.poolToken.symbol,
          oracleAssetSymbol: data?.data.oracleAssetSymbol,
        })}
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
