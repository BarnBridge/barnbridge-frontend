import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import { Tabs } from 'components/custom/tabs';
import { useConfig } from 'components/providers/configProvider';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/walletProvider';

import DepositHeader from '../deposit-view/deposit-header';
import ApyTrend from './apy';
import JuniorBondsTable from './junior-bonds-table';
import Liquidity from './liquidity';
import MarketDetails from './market';
import PoolTxTable from './pool-tx-table';
import SeniorBondsTable from './senior-bonds-table';

import s from './s.module.scss';

const tabs = [
  {
    id: 'th',
    children: 'Transaction history',
  },
  {
    id: 'sb',
    children: 'Senior bonds',
  },
  {
    id: 'jb',
    children: 'Junior bonds',
  },
];

const StatsView: React.FC = () => {
  const config = useConfig();
  const wallet = useWallet();
  const syPool = useSYPool();

  const [activeTab, setActiveTab] = React.useState('th');

  const tabsComponent = <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} size="small" />;

  return (
    <Spin spinning={syPool.loading}>
      <div className="container-limit">
        <div className="mb-16">
          <Link to="smart-yield/markets" className="button-text">
            <Icon name="arrow-back" className="mr-8" color="inherit" />
            Markets
          </Link>
        </div>
        <div className="flex col-gap-24 row-gap-16 align-start mb-40">
          <DepositHeader />
          <div className="flex wrap col-gap-24 row-gap-16 ml-auto">
            <Link
              to={{
                pathname: `/smart-yield/deposit`,
                search: `?m=${syPool.marketId}&t=${syPool.tokenId}`,
              }}
              className="button-primary"
              {...{ disabled: !wallet.isActive }}>
              Deposit
            </Link>
            {config.features.faucets && (
              <Link to="/faucets" className="button-ghost ml-auto">
                Faucets
              </Link>
            )}
          </div>
        </div>

        <div className={cn(s.apyMarketRow, 'mb-32')}>
          <ApyTrend />
          <MarketDetails />
        </div>
        <Liquidity className="mb-32" />
        <section className="card">
          {activeTab === 'th' && <PoolTxTable tabs={tabsComponent} />}
          {activeTab === 'sb' && <SeniorBondsTable tabs={tabsComponent} />}
          {activeTab === 'jb' && <JuniorBondsTable tabs={tabsComponent} />}
        </section>
      </div>
    </Spin>
  );
};

export default StatsView;
