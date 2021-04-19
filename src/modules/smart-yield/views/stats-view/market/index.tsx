import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import format from 'date-fns/format';
import { formatNumber, formatPercent, formatToken, formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import Tooltip from 'components/antd/tooltip';
import { Tabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

const tabs = [
  {
    children: 'Market details',
    id: 'market',
  },
  {
    children: 'Abond details',
    id: 'abond',
  },
];

const MarketDetails: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('market');
  const poolCtx = useSYPool();
  const { pool } = poolCtx;

  if (!pool) {
    return null;
  }

  const abond = pool.contracts.smartYield.abond;
  const abondDebt = pool.contracts.smartYield.abondDebt;

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <Tabs tabs={tabs} active={activeTab} onClick={setActiveTab} variation="normal" />
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
                      {formatUSD(new BigNumber(pool.state.seniorLiquidity))}
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
                  {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                    pool.state.seniorLiquidity,
                  )}
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
                      {formatUSD(new BigNumber(pool.state.juniorLiquidity))}
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
                  {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                    pool.state.juniorLiquidity,
                  )}
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
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Junior APY
              </Text>
              <Text type="p1" weight="semibold" color="purple">
                {formatPercent(pool.state.juniorApy)}
              </Text>
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
                      {formatUSD(new BigNumber(pool.state.juniorLiquidityLocked))}
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
                  {Intl.NumberFormat('en', { notation: 'compact', style: 'currency', currency: 'USD' }).format(
                    pool.state.juniorLiquidityLocked,
                  )}
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
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Abond principal
              </Text>
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
                      {formatUSD(abond?.principal.unscaleBy(pool.underlyingDecimals))}
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
                  {formatUSD(abond?.principal.unscaleBy(pool.underlyingDecimals), true)}
                </Text>
              </Tooltip>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Abond gain
              </Text>
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
                      {formatUSD(abond?.gain.unscaleBy(pool.underlyingDecimals))}
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
                  {formatUSD(abond?.gain.unscaleBy(pool.underlyingDecimals), true)}
                </Text>
              </Tooltip>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Abond matures at
              </Text>
              <div className="flex flow-col col-gap-8">
                <Text type="p1" weight="semibold" color="primary">
                  {(abond?.maturesAt && format(abond?.maturesAt, 'MM.dd.yyyy HH:mm')) ?? '-'}
                </Text>
              </div>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Abond debt
              </Text>
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
                      {formatUSD(abondDebt?.unscaleBy(pool.underlyingDecimals))}
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
                  {formatUSD(abondDebt?.unscaleBy(pool.underlyingDecimals), true)}
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
