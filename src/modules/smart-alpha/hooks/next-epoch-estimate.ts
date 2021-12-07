import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'bignumber.js';

import { useConfig } from 'components/providers/configProvider';
import { useContractFactory } from 'hooks/useContract';

import LoupeContract from '../contracts/loupeContract';
import { SMART_ALPHA_DECIMALS } from '../contracts/smartAlphaContract';

type ReturnType = {
  nextEpochEstimates: (BigNumber | undefined)[];
  nextEpochSeniorLiquidityRate: number | undefined;
  nextEpochJuniorLiquidityRate: number | undefined;
  nextEpochUpsideLeverage: BigNumber | undefined;
  nextEpochDownsideLeverage: BigNumber | undefined;
};

export function useNextEpochEstimate(saAddress: string | undefined): ReturnType {
  const config = useConfig();
  const { getOrCreateContract } = useContractFactory();

  const loupeContract = useMemo(() => {
    const loupeAddress = config.contracts.sa?.loupe;

    if (!loupeAddress) {
      return;
    }

    return getOrCreateContract(loupeAddress, () => {
      return new LoupeContract(loupeAddress);
    });
  }, []);

  const [nextEpochEstimates, setNextEpochEstimates] = useState<ReturnType['nextEpochEstimates']>([]);

  useEffect(() => {
    if (!saAddress || !loupeContract) {
      return;
    }

    loupeContract.getEstimateNextEpoch(saAddress).then(result => {
      setNextEpochEstimates(result);
    });
  }, [saAddress, loupeContract]);

  const nextEpochSeniorLiquidityRate = useMemo(() => {
    if (!nextEpochEstimates[0] || !nextEpochEstimates[1]) {
      return 0;
    }

    const totalLiquidity = nextEpochEstimates[0].plus(nextEpochEstimates[1]);
    return nextEpochEstimates[1]?.div(totalLiquidity).toNumber();
  }, [nextEpochEstimates]);

  const nextEpochJuniorLiquidityRate = useMemo(() => {
    if (!nextEpochEstimates[0] || !nextEpochEstimates[1]) {
      return 0;
    }

    const totalLiquidity = nextEpochEstimates[0].plus(nextEpochEstimates[1]);
    return nextEpochEstimates[0]?.div(totalLiquidity).toNumber();
  }, [nextEpochEstimates]);

  const nextEpochUpsideLeverage = useMemo(() => {
    if (!nextEpochEstimates[0] || !nextEpochEstimates[1] || !nextEpochEstimates[2]) {
      return undefined;
    }

    if (nextEpochEstimates[0].eq(0)) {
      return new BigNumber(1);
    }

    return nextEpochEstimates[1]
      .div(nextEpochEstimates[0])
      .multipliedBy(new BigNumber(1).minus(nextEpochEstimates[2].unscaleBy(SMART_ALPHA_DECIMALS)!))
      .plus(1);
  }, [nextEpochEstimates]);

  const nextEpochDownsideLeverage = useMemo(() => {
    if (!nextEpochEstimates[0] || !nextEpochEstimates[1]) {
      return undefined;
    }

    if (nextEpochEstimates[0].eq(0)) {
      return new BigNumber(1);
    }

    return nextEpochEstimates[1].div(nextEpochEstimates[0]).plus(1);
  }, [nextEpochEstimates]);

  return {
    nextEpochEstimates,
    nextEpochSeniorLiquidityRate,
    nextEpochJuniorLiquidityRate,
    nextEpochUpsideLeverage,
    nextEpochDownsideLeverage,
  };
}
