import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import format from 'date-fns/format';

import { Badge } from 'components/custom/badge';
import Icon from 'components/custom/icon';
import { ColumnType, Table } from 'components/custom/table';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import config from 'config';

type TokenTypeApi = {
  address: string;
  symbol: string;
  decimals: number;
};

export type PoolType = {
  poolAddress: string;
  poolName: string;
  tokenA: TokenTypeApi;
  tokenB: TokenTypeApi;
};

type TrancheTypeApi = {
  eTokenAddress: string;
  sFactorE: string;
  state: {
    blockNumber: number;
    blockTimestamp: string;
    eTokenPrice: string;
    tokenALiquidity: string;
    tokenBLiquidity: string;
  };
  targetRatio: string;
  tokenARatio: string;
  tokenBRatio: string;
};

type Props = {
  pool: PoolType;
};

export const PairsTable: React.FC<Props> = ({ pool }) => {
  const [tranches, setTranches] = useState<TrancheTypeApi[]>([]);

  useEffect(() => {
    const url = new URL(`/api/smartexposure/pools/${pool.poolAddress}/tranches`, config.api.baseUrl);

    fetch(url.toString())
      .then(result => result.json())
      .then(result => {
        setTranches(result.data);
        console.log('tranches', result.data);
      });
  }, [pool.poolAddress]);

  const tableColumns: ColumnType<TrancheTypeApi>[] = useMemo(
    () => [
      {
        heading: 'Target / current ratio',
        render: item => {
          const tokenA = getTokenBySymbol(pool.tokenA.symbol);
          const tokenB = getTokenBySymbol(pool.tokenB.symbol);

          return (
            <>
              <div className="flex col-gap-32 mb-8">
                <div className="flex">
                  <Icon name={tokenA?.icon!} className="mr-8" />
                  <div>
                    <div className="text-p1 fw-semibold color-primary">{Number(item.tokenARatio) * 100}%</div>
                    <div className="text-sm fw-semibold color-red flex">
                      {Number(item.tokenARatio) * 100}%
                      <Icon name="arrow-bottom-right-thin" className="mr-8" width={16} height={16} color="red" />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <Icon name={tokenB?.icon!} className="mr-8" />
                    <div>
                      <div className="text-p1 fw-semibold color-primary">{Number(item.tokenBRatio) * 100}%</div>
                      <div className="text-sm fw-semibold color-green flex">
                        {Number(item.tokenBRatio) * 100}%
                        <Icon name="arrow-top-right-thin" className="mr-8" width={16} height={16} color="green" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <progress
                max="100"
                value="75"
                className="progress"
                style={{ '--background-color': '#627EEA', '--progress-color': '#F7931A' } as React.CSSProperties}>
                75%
              </progress>
            </>
          );
        },
      },
      {
        heading: 'Last rebalance',
        render: item => {
          const date = new Date();
          return (
            <time dateTime={date.toJSON()}>
              <div className="text-p1 fw-semibold color-primary">{format(date, 'dd.MM.yyyy')}</div>
              <div className="text-sm fw-semibold color-secondary">{format(date, 'HH:mm')}</div>
            </time>
          );
        },
      },
      {
        heading: 'Tranche liquidity',
        render: item => <div className="text-p1 fw-semibold color-primary">asd</div>,
      },
      {
        heading: 'Performance since inception',
        render: item => <Badge color="green">+ 32.14%</Badge>,
      },
      {
        heading: 'Exposure token conversion rate',
        render: item => (
          <>
            <div className="text-p1 fw-semibold color-primary">$ 48,813.31</div>
            <div className="text-sm fw-semibold color-secondary">per bb_ET_WBTC75/ETH25</div>
          </>
        ),
      },
      {
        heading: '',
        render: item => (
          <NavLink to={`/smart-exposure/pools/${pool.poolAddress}/${item.eTokenAddress}`} className="button-ghost">
            View details
          </NavLink>
        ),
      },
    ],
    [pool],
  );

  return <Table<TrancheTypeApi> columns={tableColumns} data={tranches} />;
};
