import React from 'react';
import cn from 'classnames';
import { formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import Icon from 'components/custom/icon';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import { TrancheApiType } from 'modules/smart-exposure/api';

import { calcTokensRatio } from 'modules/smart-exposure/utils';
import { getRelativeTime, numberFormat } from 'utils';

import s from './s.module.scss';

const tabs = [
  {
    id: 'rebalancing',
    children: 'Rebalancing details',
  },
  {
    id: 'pool',
    children: 'Pool details',
  },
];

type Props = {
  tranche: TrancheApiType;
};

export const TrancheDetails: React.FC<Props> = ({ tranche }) => {
  const [activeTab, setActiveTab] = React.useState('rebalancing');
  // const poolCtx = useSYPool();
  // const { pool } = poolCtx;

  // if (!pool) {
  //   return null;
  // }

  // const abond = pool.contracts.smartYield.abond;
  // const abondDebt = pool.contracts.smartYield.abondDebt;

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

  const [tokenARatio, tokenBRatio] = calcTokensRatio(tranche.targetRatio);

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} variation="normal" />
      </header>
      {activeTab === 'rebalancing' && (
        <>
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Target ratio
              </Text>
              <Text type="p1" weight="semibold" color="primary" className=" flex align-center col-gap-4">
                <Icon name={tokenA?.icon!} width={16} height={16} />{' '}
                {numberFormat(tokenARatio, { minimumFractionDigits: 2 })}% <span className="ph-4">:</span>{' '}
                <Icon name={tokenB?.icon!} width={16} height={16} />{' '}
                {numberFormat(tokenBRatio, { minimumFractionDigits: 2 })}%
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Current ratio
              </Text>
              <Text type="p1" weight="semibold" color="primary" className=" flex align-center col-gap-4">
                <Icon name={tokenA?.icon!} width={16} height={16} />{' '}
                {numberFormat(Number(tranche.tokenARatio) * 100, { minimumFractionDigits: 2 })}%{' '}
                <span className="ph-4">:</span> <Icon name={tokenB?.icon!} width={16} height={16} />{' '}
                {numberFormat(Number(tranche.tokenBRatio) * 100, { minimumFractionDigits: 2 })}%
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Rebalancing strategies
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                {getRelativeTime(tranche.rebalancingInterval)}
                <span className="middle-dot ph-16 color-border" /> {'>'} {tranche.rebalancingCondition}% deviation from
                target
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Last rebalance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                11.25.2020
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                16:32
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Conversion rate
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                $ 13,872.0007
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                per eToken
              </Text>
            </div>
          </div>
        </>
      )}
      {activeTab === 'pool' && (
        <>
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                {tranche.tokenA.symbol} price
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(tranche.tokenA.state.price)}
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                {tranche.tokenB.symbol} price
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatUSD(tranche.tokenB.state.price)}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Wallet {tranche.tokenA.symbol} balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                9.3000
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                $ 514,961.46
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Wallet {tranche.tokenB.symbol} balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                167.7000
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                $ 403,838.37
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Pool {tranche.tokenA.symbol} balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {tranche.state.tokenALiquidity}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {formatUSD(Number(tranche.state.tokenALiquidity) * Number(tranche.tokenA.state.price))}
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Pool {tranche.tokenB.symbol} balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {tranche.state.tokenBLiquidity}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {formatUSD(Number(tranche.state.tokenBLiquidity) * Number(tranche.tokenB.state.price))}
              </Text>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
