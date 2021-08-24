import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import format from 'date-fns/format';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import Tooltip from 'components/antd/tooltip';
import { AprLabel } from 'components/custom/label';
import { Tabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const tabs = [
  {
    id: 'market',
    children: 'Market details',
  },
  {
    id: 'abond',
    children: (
      <Hint
        maxWidth={475}
        text={
          <div>
            <div className="mb-8">
              In order to calculate the profits and losses of the pool efficiently - we do that by averaging all
              existing senior bonds into one "weighted average" aBOND with the following properties:
            </div>
            <dl className="ph-12 fw-semibold text-nowrap">
              <dd>- ABOND.principal -&gt; Principal locked</dd>
              <dd>- ABOND.gain -&gt; Guaranteed gains for all seniors</dd>
              <dd>- ABOND.debt -&gt; Amount owed to existing seniors</dd>
              <dd>- ABOND.issuedAt -&gt; Start timestamp</dd>
              <dd>- ABOND.maturesAt -&gt; Maturity date</dd>
            </dl>
          </div>
        }>
        Abond details
      </Hint>
    ),
  },
];

const MarketDetails: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('market');
  const { bondToken, stkAaveToken } = useKnownTokens();
  const poolCtx = useSYPool();
  const { pools } = useRewardPools();
  const { pool } = poolCtx;
  const { getToken, getAmountInUSD } = useTokens();

  if (!pool) {
    return null;
  }

  const abond = pool.contracts.smartYield.abond;
  const abondDebt = pool.contracts.smartYield.abondDebt;

  const token = getToken(pool.underlyingSymbol);
  const seniorLiquiditySum =
    BigNumber.from(pool.state.seniorLiquidity)
      ?.multipliedBy(token?.price ?? 0)
      .toString() ?? '0';
  const juniorLiquiditySum =
    BigNumber.from(pool.state.juniorLiquidity)
      ?.multipliedBy(token?.price ?? 0)
      .toString() ?? '0';

  const abondPrincipalSum =
    BigNumber.from(abond?.principal)
      ?.unscaleBy(pool.underlyingDecimals)
      ?.multipliedBy(token?.price ?? 0)
      .toString() ?? '0';
  const abondGainSum =
    BigNumber.from(abond?.gain)
      ?.unscaleBy(pool.underlyingDecimals)
      ?.multipliedBy(token?.price ?? 0)
      .toString() ?? '0';
  const abondDebtSum =
    BigNumber.from(abondDebt)
      ?.unscaleBy(pool.underlyingDecimals)
      ?.multipliedBy(token?.price ?? 0)
      .toString() ?? '0';

  const hasZeroBondRewardLeft = pools?.find(
    rPool =>
      rPool.rewardPool.address === pool.rewardPoolAddress &&
      Array.from(rPool.rewardTokens.values()).some(
        rewardToken =>
          !!(rewardToken === bondToken && rPool.rewardPool.getRewardLeftFor(rewardToken.address)?.isZero()),
      ),
  );

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} />
      </header>
      {activeTab === 'market' && (
        <>
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Senior Liquidity
              </Text>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(pool.state.seniorLiquidity, {
                        tokenName: pool.underlyingSymbol,
                      })}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(seniorLiquiditySum)}
                    </Text>
                  </>
                }>
                <div className="flex flow-col col-gap-8">
                  <Text type="p1" weight="semibold" color="primary">
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.seniorLiquidity)}
                  </Text>
                  <Text type="p1" weight="semibold" color="primary">
                    {pool.underlyingSymbol}
                  </Text>
                </div>

                <Text type="small" weight="semibold">
                  {formatUSD(seniorLiquiditySum, {
                    compact: true,
                  })}
                </Text>
              </Tooltip>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Junior Liquidity
              </Text>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(pool.state.juniorLiquidity, {
                        tokenName: pool.underlyingSymbol,
                      })}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(juniorLiquiditySum)}
                    </Text>
                  </>
                }>
                <div className="flex flow-col col-gap-8">
                  <Text type="p1" weight="semibold" color="primary">
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.juniorLiquidity)}
                  </Text>
                  <Text type="p1" weight="semibold" color="primary">
                    {pool.underlyingSymbol}
                  </Text>
                </div>
                <Text type="small" weight="semibold">
                  {formatUSD(juniorLiquiditySum, {
                    compact: true,
                  })}
                </Text>
              </Tooltip>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                # of seniors
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatNumber(pool.state.numberOfSeniors)}
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                # of juniors
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatNumber(pool.state.numberOfJuniors)}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Senior APY
              </Text>
              <Text type="p1" weight="semibold" color="green">
                {formatPercent(pool.state.seniorApy)}
              </Text>
            </div>
            <div className="flex flow-row align-start">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Junior APY
              </Text>
              <Text type="p1" weight="semibold" color="purple">
                {formatPercent(pool.state.juniorApy)}
              </Text>
              {pool.contracts.rewardPool?.rewardTokensCount! > 1 ? (
                <AprLabel icons={[bondToken.icon!, stkAaveToken.icon!]}>
                  +{formatPercent(pool.apy?.plus(hasZeroBondRewardLeft ? 0 : pool.apr ?? 0) ?? 0)} APR
                </AprLabel>
              ) : !hasZeroBondRewardLeft && pool.apr ? (
                <AprLabel icons={['bond']}>+{formatPercent(pool.apr ?? 0)} APR</AprLabel>
              ) : null}
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Hint text="The average maturity date of the current senior bonds in this pool.">
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Average senior maturity
                </Text>
              </Hint>
              <Text type="p1" weight="semibold" color="primary">
                {getFormattedDuration(
                  Date.now(),
                  Date.now() + (pool.state.avgSeniorMaturityDays ?? 0) * 24 * 60 * 60 * 1_000,
                )}
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Junior liquidity locked
              </Text>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(pool.state.juniorLiquidityLocked, {
                        tokenName: pool.underlyingSymbol,
                      })}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(
                        getAmountInUSD(BigNumber.from(pool.state.juniorLiquidityLocked), pool.underlyingSymbol),
                      )}
                    </Text>
                  </>
                }>
                <div className="flex flow-col col-gap-8">
                  <Text type="p1" weight="semibold" color="primary">
                    {Intl.NumberFormat('en', { notation: 'compact' }).format(pool.state.juniorLiquidityLocked)}
                  </Text>
                  <Text type="p1" weight="semibold" color="primary">
                    {pool.underlyingSymbol}
                  </Text>
                </div>
                <Text type="small" weight="semibold">
                  {formatUSD(getAmountInUSD(BigNumber.from(pool.state.juniorLiquidityLocked), pool.underlyingSymbol))}
                </Text>
              </Tooltip>
            </div>
          </div>
        </>
      )}
      {activeTab === 'abond' && (
        <>
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Hint text="This number shows the aggregated amount of liquidity deposited in senior bonds.">
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Abond principal
                </Text>
              </Hint>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(abond?.principal.unscaleBy(pool.underlyingDecimals), {
                        decimals: pool.underlyingDecimals,
                        tokenName: pool.underlyingSymbol,
                      }) ?? '-'}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(abondPrincipalSum)}
                    </Text>
                  </>
                }>
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(abond?.principal.unscaleBy(pool.underlyingDecimals), {
                    compact: true,
                    tokenName: pool.underlyingSymbol,
                  }) ?? '-'}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSD(abondPrincipalSum, {
                    compact: true,
                  })}
                </Text>
              </Tooltip>
            </div>
            <div className="flex flow-row">
              <Hint text="This number shows the aggregated gains of all senior bonds so far. This includes previously redeemed bonds.">
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Abond gain
                </Text>
              </Hint>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(abond?.gain.unscaleBy(pool.underlyingDecimals), {
                        decimals: pool.underlyingDecimals,
                        tokenName: pool.underlyingSymbol,
                      }) ?? '-'}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(abondGainSum)}
                    </Text>
                  </>
                }>
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(abond?.gain.unscaleBy(pool.underlyingDecimals), {
                    compact: true,
                    tokenName: pool.underlyingSymbol,
                  }) ?? '-'}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSD(abondGainSum, {
                    compact: true,
                  })}
                </Text>
              </Tooltip>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Hint text="This number shows the average date at which all existing seniors bonds end at. It's also the time that junior withdrawals .">
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Abond matures at
                </Text>
              </Hint>
              <div className="flex flow-col col-gap-8">
                <Text type="p1" weight="semibold" color="primary">
                  {(abond?.maturesAt && format(abond.maturesAt * 1_000, 'MM.dd.yyyy HH:mm')) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex flow-row">
              <Hint text="This number shows the total amount owed to the existing seniors. It's the total gain owed to senior bonds minus what was already paid out to redeemed bonds.">
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Abond debt
                </Text>
              </Hint>
              <Tooltip
                title={
                  <>
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {formatToken(abondDebt?.unscaleBy(pool.underlyingDecimals), {
                        decimals: pool.underlyingDecimals,
                        tokenName: pool.underlyingSymbol,
                      }) ?? '-'}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {formatUSD(abondDebtSum)}
                    </Text>
                  </>
                }>
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(abondDebt?.unscaleBy(pool.underlyingDecimals), {
                    compact: true,
                    tokenName: pool.underlyingSymbol,
                  }) ?? '-'}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSD(abondDebtSum, {
                    compact: true,
                  })}
                </Text>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MarketDetails;
