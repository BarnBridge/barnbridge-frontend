import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { formatPercent, formatUSD } from 'web3/utils';

import { Badge } from 'components/custom/badge';
import Icon from 'components/custom/icon';
import { TranchePercentageProgress } from 'components/custom/progress';
import { ColumnType, Table } from 'components/custom/table';
import { InfoTooltip } from 'components/custom/tooltip';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import { PoolApiType, TranchesItemApiType, fetchTranches } from 'modules/smart-exposure/api';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

import { calcTokensRatio } from 'modules/smart-exposure/utils';
import { numberFormat } from 'utils';

const tableColumns: ColumnType<TranchesItemApiType>[] = [
  {
    heading: (
      <div className="flex align-center col-gap-4">
        Target & current ratio{' '}
        <InfoTooltip>The target funds ratio (top) and the current actual ratio (bottom)</InfoTooltip>
      </div>
    ),
    render: item => {
      const tokenA = getTokenBySymbol(item.tokenA.symbol);
      const tokenB = getTokenBySymbol(item.tokenB.symbol);
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
    heading: (
      <div className="flex align-center col-gap-4">
        Tranche liquidity <InfoTooltip>Total value locked in the tranche</InfoTooltip>
      </div>
    ),
    render: item => (
      <div className="text-p1 fw-semibold color-primary">
        {formatUSD(Number(item.state.tokenALiquidity) + Number(item.state.tokenBLiquidity))}
      </div>
    ),
  },
  {
    heading: (
      <div className="flex align-center col-gap-4">
        Performance since inception{' '}
        <InfoTooltip>Overall performance of a hypothetical investment made at inception of the tranche</InfoTooltip>
      </div>
    ),
    render: function PerformanceSinceInception(item) {
      const { ePoolHelperContract } = useSEPools();
      const [value, setValue] = useState<BigNumber | undefined>();

      useEffect(() => {
        ePoolHelperContract
          .getTokenATokenBForEToken(item.poolAddress, item.eTokenAddress, new BigNumber(item.sFactorE))
          .then(({ amountA, amountB }) => {
            const tokenBTransformedInTokenA = amountB
              .dividedBy(10 ** item.tokenB.decimals)
              .multipliedBy(item.tokenB.state.price)
              .dividedBy(item.tokenA.state.price);
            setValue(
              amountA
                .dividedBy(10 ** item.tokenA.decimals)
                .plus(tokenBTransformedInTokenA)
                .minus(1),
            );
          });
      }, [
        ePoolHelperContract,
        item.eTokenAddress,
        item.poolAddress,
        item.sFactorE,
        item.tokenA.decimals,
        item.tokenA.state.price,
        item.tokenB.decimals,
        item.tokenB.state.price,
      ]);

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

      return <Badge color={color}>{`${sign} ${formatPercent(value?.abs(), 2) ?? '-'}`}</Badge>;
    },
  },
  {
    heading: (
      <div className="flex align-center col-gap-4">
        Exposure token conversion rate{' '}
        <InfoTooltip>1 token of this tranche can be redeemed for this amount</InfoTooltip>
      </div>
    ),
    render: item => (
      <>
        <div className="text-p1 fw-semibold color-primary">{formatUSD(item.state.eTokenPrice)}</div>
        <div className="text-sm fw-semibold color-secondary text-nowrap">per {item.eTokenSymbol}</div>
      </>
    ),
  },
  {
    heading: '',
    render: item => (
      <NavLink to={`/smart-exposure/pools/${item.poolAddress}/${item.eTokenAddress}`} className="button-ghost">
        View details
      </NavLink>
    ),
  },
];

type Props = {
  pool: PoolApiType;
};

export const PairsTable: React.FC<Props> = ({ pool }) => {
  const [tranches, setTranches] = useState<TranchesItemApiType[]>([]);

  useEffect(() => {
    fetchTranches(pool.poolAddress).then(setTranches);
  }, [pool.poolAddress]);

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
