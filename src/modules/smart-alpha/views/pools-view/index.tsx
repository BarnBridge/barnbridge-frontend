import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { formatPercent, formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
// import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
// import { Icon } from 'components/icon';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType, useFetchPools } from 'modules/smart-alpha/api';

import { getRelativeTime } from 'utils';

import s from './s.module.scss';

const PoolsView = () => {
  const { data } = useFetchPools();
  return (
    <>
      <Text type="p1" weight="semibold" color="secondary" className="mb-4">
        Total value locked
      </Text>
      <div className="mb-40 flex align-center">
        <Text type="h2" weight="bold" color="primary" className="mr-8">
          {formatUSD(123)}
        </Text>
        {/* <Tooltip title={<>TBD</>}>
          <Icon name="insured" color="green" size={32} />
        </Tooltip> */}
      </div>
      <div className={s.cards}>
        {data?.map(item => (
          <PoolCard key={item.poolAddress} item={item} />
        ))}
      </div>
    </>
  );
};
export default PoolsView;

const PoolCard = ({ item }: { item: PoolApiType }) => {
  const location = useLocation();
  const { getToken } = useTokens();

  const poolToken = getToken(item.poolToken.symbol);

  return (
    <section
      className={classNames(s.poolCard, 'card p-24')}
      style={{ '--pool-card-progress': 30 } as React.CSSProperties}>
      <header className="flex align-center mb-32">
        <TokenIcon name={poolToken?.icon ?? 'unknown'} size={40} bubble2Name="usd" className="mr-16" />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
            {item.poolName}
          </Text>
          <Text type="small" weight="semibold" color="red" tag="small">
            Epoch {item.state.epoch}
          </Text>
        </div>
      </header>
      <dl className="mb-24">
        <div className={s.poolCardDlRow}>
          <dt>Epoch senior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD(item.state.seniorLiquidity)}>
              {formatUSD(item.state.seniorLiquidity, { compact: true })}
            </Text>
          </dd>
        </div>
        <div className={s.poolCardDlRow}>
          <dt>Upside exposure rate</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {formatPercent(Number(item.state.upsideExposureRate))}
            </Text>
          </dd>
        </div>
        <div className={s.poolCardDlRow}>
          <dt>Downside protection rate</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {formatPercent(Number(item.state.downsideProtectionRate))}
            </Text>
          </dd>
        </div>
        <div className={s.poolCardDlRow}>
          <dt>Epoch junior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD(item.state.juniorLiquidity)}>
              {formatUSD(item.state.juniorLiquidity, { compact: true })}
            </Text>
          </dd>
        </div>
        <div className={s.poolCardDlRow}>
          <dt>Epoch ends in</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {getRelativeTime(item.epoch1Start / 1000)}
            </Text>
          </dd>
        </div>
      </dl>
      <footer className={s.poolCardFooter}>
        <Link variation="ghost" to={`${location.pathname}/${item.poolAddress}`}>
          View details
        </Link>
      </footer>
    </section>
  );
};
