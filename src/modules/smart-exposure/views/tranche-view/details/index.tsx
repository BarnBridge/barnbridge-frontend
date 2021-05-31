import React from 'react';
import cn from 'classnames';

import Divider from 'components/antd/divider';
import Icon from 'components/custom/icon';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';

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

export const TrancheDetails: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('rebalancing');
  // const poolCtx = useSYPool();
  // const { pool } = poolCtx;

  // if (!pool) {
  //   return null;
  // }

  // const abond = pool.contracts.smartYield.abond;
  // const abondDebt = pool.contracts.smartYield.abondDebt;

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
                <Icon name="token-wbtc" width={16} height={16} /> 75.00% <span className="ph-4">:</span>{' '}
                <Icon name="token-eth" width={16} height={16} /> 25.00%
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Current ratio
              </Text>
              <Text type="p1" weight="semibold" color="primary" className=" flex align-center col-gap-4">
                <Icon name="token-wbtc" width={16} height={16} /> 74.00% <span className="ph-4">:</span>{' '}
                <Icon name="token-eth" width={16} height={16} /> 26.00%
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
                Every day <span className="middle-dot ph-16 color-border" /> {'>'} 2% deviation from target
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
                WBTC price
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                $ 64,188.20
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                ETH price
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                $ 2,376.66
              </Text>
            </div>
          </div>
          <Divider />
          <div className="flexbox-grid p-24">
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Wallet WBTC balance
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
                Wallet ETH balance
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
                Pool WBTC balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                930.0000
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                $ 51,496,146.00
              </Text>
            </div>
            <div className="flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Pool ETH balance
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                16,777.0000
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                $ 40,400,693.70
              </Text>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
