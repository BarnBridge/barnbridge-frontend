import React, { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { formatToken, formatUSD } from 'web3/utils';

import { Badge } from 'components/custom/badge';
import Icon from 'components/custom/icon';
import { TranchePercentageProgress } from 'components/custom/progress';
import { ColumnType, Table } from 'components/custom/table';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import { PoolApiType, TranchesItemApiType, fetchTranches } from 'modules/smart-exposure/api';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

import { calcTokensRatio } from 'modules/smart-exposure/utils';
import { numberFormat } from 'utils';

type Props = {
  pool: PoolApiType;
};

export const PairsTable: React.FC<Props> = ({ pool }) => {
  const [tranches, setTranches] = useState<TranchesItemApiType[]>([]);

  useEffect(() => {
    fetchTranches(pool.poolAddress).then(setTranches);
  }, [pool.poolAddress]);

  const tableColumns: ColumnType<TranchesItemApiType>[] = useMemo(
    () => [
      {
        heading: 'Target / current ratio',
        render: item => {
          const tokenA = getTokenBySymbol(pool.tokenA.symbol);
          const tokenB = getTokenBySymbol(pool.tokenB.symbol);
          const [tokenARatio, tokenBRatio] = calcTokensRatio(item.targetRatio);

          return (
            <>
              <div className="flex col-gap-32 mb-8">
                <div className="flex">
                  <Icon name={tokenA?.icon!} className="mr-8" />
                  <div>
                    <div className="text-p1 fw-semibold color-primary">
                      {numberFormat(tokenARatio, { minimumFractionDigits: 2 })}%
                    </div>
                    <RatioLabel current={Number(item.tokenARatio) * 100} target={tokenARatio} />
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <Icon name={tokenB?.icon!} className="mr-8" />
                    <div>
                      <div className="text-p1 fw-semibold color-primary">
                        {numberFormat(tokenBRatio, { minimumFractionDigits: 2 })}%
                      </div>
                      <RatioLabel current={Number(item.tokenBRatio) * 100} target={tokenBRatio} />
                    </div>
                  </div>
                </div>
              </div>
              <TranchePercentageProgress target={Number(item.tokenARatio) * 100} value={tokenARatio} />
            </>
          );
        },
      },
      {
        heading: 'Tranche liquidity',
        render: item => (
          <div className="text-p1 fw-semibold color-primary">
            {formatUSD(Number(item.state.tokenALiquidity) + Number(item.state.tokenBLiquidity))}
          </div>
        ),
      },
      {
        heading: 'Performance since inception',
        render: function PerformanceSinceInception(item) {
          const { ePoolHelperContract } = useSEPools();
          const [value, setValue] = useState<BigNumber | undefined>();

          useEffect(() => {
            ePoolHelperContract
              .getETokenForTokenATokenB(
                pool.poolAddress,
                item.eTokenAddress,
                BigNumber.from(item.state.tokenALiquidity)?.multipliedBy(item.sFactorE) ?? BigNumber.ZERO,
                BigNumber.from(item.state.tokenALiquidity)?.multipliedBy(item.sFactorE) ?? BigNumber.ZERO,
              )
              .then(setValue);
          }, [ePoolHelperContract, item.eTokenAddress, item.sFactorE, item.state.tokenALiquidity]);

          let color: 'green' | 'red' | 'grey' = 'grey';
          let sign = '';
          if (value?.isGreaterThan(0)) {
            color = 'green';
            sign = '+';
          }
          if (value?.isLessThan(0)) {
            color = 'red';
            sign = '-';
          }

          return (
            <Badge color={color}>
              {`${sign} ${formatToken(value?.dividedBy(item.sFactorE), { maxDecimals: 2, minDecimals: 2 })}` ?? '-'}
            </Badge>
          );
        },
      },
      {
        heading: 'Exposure token conversion rate',
        render: item => (
          <>
            <div className="text-p1 fw-semibold color-primary">{formatUSD(item.state.eTokenPrice)}</div>
            <div className="text-sm fw-semibold color-secondary">per {item.eTokenSymbol}</div>
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

  return <Table<TranchesItemApiType> columns={tableColumns} data={tranches} />;
};

type RatioLabelPropsType = {
  current: number;
  target: number;
};

const RatioLabel: React.FC<RatioLabelPropsType> = ({ current, target }) => {
  const currentLabel = numberFormat(current, {
    minimumFractionDigits: 2,
  });

  if (current < target) {
    return (
      <div className="text-sm fw-semibold color-red flex">
        {currentLabel}%
        <Icon name="arrow-bottom-right-thin" className="mr-8" width={16} height={16} color="red" />
      </div>
    );
  }
  if (current > target) {
    return (
      <div className="text-sm fw-semibold color-green flex">
        {currentLabel}%
        <Icon name="arrow-top-right-thin" className="mr-8" width={16} height={16} color="green" />
      </div>
    );
  }

  return <div className="text-sm fw-semibold color-secondary flex">{currentLabel}%</div>;
};
