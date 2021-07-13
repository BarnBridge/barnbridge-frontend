import BigNumber from 'bignumber.js';

export function calculateRebalancingCondition(rebalancingCondition: string | number): BigNumber {
  return new BigNumber(1)
    .dividedBy(new BigNumber(1).minus(BigNumber.from(rebalancingCondition)?.dividedBy(10 ** 18) ?? BigNumber.ZERO))
    .minus(1);
}
