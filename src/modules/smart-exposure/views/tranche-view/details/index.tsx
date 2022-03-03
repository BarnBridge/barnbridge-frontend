﻿import { useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import { Tabs } from 'components/custom/tabs';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContract } from 'hooks/useContract';
import { TrancheApiType } from 'modules/smart-exposure/api';
import { useWallet } from 'wallets/walletProvider';

import { getRelativeTime } from 'utils';
import { formatDate, formatTime } from 'utils/date';

import s from './s.module.scss';

const tabs = [
  {
    id: 'rebalancing',
    children: 'Rebalancing details',
  },
  {
    id: 'tranche',
    children: 'Tranche details',
  },
];

type Props = {
  tranche: TrancheApiType;
};

export const Details: React.FC<Props> = ({ tranche }) => {
  const [activeTab, setActiveTab] = useState('rebalancing');

  return (
    <section className="card">
      <header className={cn('card-header flex align-center', s.header)}>
        <Tabs tabs={tabs} activeKey={activeTab} onClick={setActiveTab} variation="normal" />
      </header>
      {activeTab === 'rebalancing' && <RebalancingDetails tranche={tranche} />}
      {activeTab === 'tranche' && <TrancheDetails tranche={tranche} />}
    </section>
  );
};

const RebalancingDetails = ({ tranche }: { tranche: TrancheApiType }) => {
  const { getTokenBySymbol } = useKnownTokens();
  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

  return (
    <>
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Target ratio
          </Text>
          <Text type="body1" weight="semibold" color="primary" className=" flex align-center col-gap-4">
            <TokenIcon name={tokenA?.icon} size={16} /> {formatPercent(Number(tranche.tokenARatio))}
            <span className="ph-4">:</span> <TokenIcon name={tokenB?.icon} size={16} />{' '}
            {formatPercent(Number(tranche.tokenBRatio))}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Current ratio
          </Text>
          <Text type="body1" weight="semibold" color="primary" className=" flex align-center col-gap-4">
            <TokenIcon name={tokenA?.icon} size={16} /> {formatPercent(Number(tranche.state.tokenACurrentRatio))}{' '}
            <span className="ph-4">:</span> <TokenIcon name={tokenB?.icon} size={16} />{' '}
            {formatPercent(Number(tranche.state.tokenBCurrentRatio))}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="flex align-middle col-gap-4 mb-4">
            Rebalancing Strategy
            <InfoTooltip>
              Rebalancing of the tranche is triggered based on the conditions the pool is set up with. They can be
              either time or deviation based.
            </InfoTooltip>
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="flex align-center">
            Every {getRelativeTime(tranche.rebalancingInterval) || '0 seconds'}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Last rebalance
          </Text>
          {tranche.state.lastRebalance ? (
            <>
              <Text type="body1" weight="semibold" color="primary" className="mb-4">
                {formatDate(tranche.state.lastRebalance * 1000)}
              </Text>
              <Text type="caption" weight="semibold" color="secondary">
                {formatTime(tranche.state.lastRebalance * 1000)}
              </Text>
            </>
          ) : (
            <Text type="body1" weight="semibold" color="primary" className="mb-4">
              Always
            </Text>
          )}
        </div>
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Conversion rate
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="mb-4">
            {formatUSD(tranche.state.eTokenPrice)}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            per eToken
          </Text>
        </div>
      </div>
    </>
  );
};

const TrancheDetails = ({ tranche }: { tranche: TrancheApiType }) => {
  const wallet = useWallet();

  const tokenAContract = useContract(tranche.tokenA.address, { loadBalance: true });
  const tokenBContract = useContract(tranche.tokenB.address, { loadBalance: true });

  const tokenABalance = BigNumber.from(
    tokenAContract?.getBalanceOf(wallet.account)?.unscaleBy(tranche.tokenA.decimals),
  );

  const tokenBBalance = BigNumber.from(
    tokenBContract?.getBalanceOf(wallet.account)?.unscaleBy(tranche.tokenB.decimals),
  );

  return (
    <>
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            {tranche.tokenA.symbol} price
          </Text>
          <Text type="body1" weight="semibold" color="primary">
            {formatUSD(tranche.tokenA.state.price)}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            {tranche.tokenB.symbol} price
          </Text>
          <Text type="body1" weight="semibold" color="primary">
            {formatUSD(tranche.tokenB.state.price)}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Wallet {tranche.tokenA.symbol} balance
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="mb-4">
            {formatToken(tokenABalance) ?? '-'}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(tokenABalance?.multipliedBy(tranche.tokenA.state.price) ?? 0)}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Wallet {tranche.tokenB.symbol} balance
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="mb-4">
            {formatToken(tokenBBalance) ?? '-'}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(tokenBBalance?.multipliedBy(tranche.tokenB.state.price) ?? 0)}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flexbox-grid p-24">
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Pool {tranche.tokenA.symbol} balance
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="mb-4">
            {formatUSD(BigNumber.from(tranche.state.tokenALiquidity))}
          </Text>
          {/* <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(BigNumber.from(tranche.state.tokenALiquidity)?.multipliedBy(tranche.tokenA.state.price) ?? 0)}
          </Text> */}
        </div>
        <div className="flex flow-row">
          <Text type="caption" weight="semibold" color="secondary" className="mb-4">
            Pool {tranche.tokenB.symbol} balance
          </Text>
          <Text type="body1" weight="semibold" color="primary" className="mb-4">
            {formatUSD(BigNumber.from(tranche.state.tokenBLiquidity))}
          </Text>
          {/* <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(BigNumber.from(tranche.state.tokenBLiquidity)?.multipliedBy(tranche.tokenB.state.price) ?? 0)}
          </Text> */}
        </div>
      </div>
    </>
  );
};
